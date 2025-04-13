import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  // ✅ LOG 1: Ham veri
  console.log('[Webhook Raw Body]', body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // ✅ LOG 2: Stripe event
    console.log('[Webhook Event]', JSON.stringify(event, null, 2));
  } catch (err: any) {
    console.error('❌ Invalid webhook signature:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('✅ Checkout session completed:', session.id);

    let lineItems;
    try {
      lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // ✅ LOG 3: Line items kontrol
      console.log('[Line Items]', JSON.stringify(lineItems, null, 2));
    } catch (err: any) {
      console.error('❌ Failed to list line items:', err.message);
      return NextResponse.json({ error: 'List line items failed' }, { status: 500 });
    }

    for (const item of lineItems.data) {
      const product = item.price?.product;

      // ✅ LOG 4: Ürün tipi kontrolü
      console.log('[Product value]', product);

      if (typeof product === 'object' && 'metadata' in product) {
        const payrollId = product.metadata?.payroll_id;

        if (!payrollId) {
          console.warn('⚠️ payroll_id not found in product metadata');
          continue;
        }

        try {
          await prisma.payroll.update({
            where: { id: payrollId },
            data: { status: 'approved' },
          });

          console.log(`✅ Payroll ${payrollId} marked as approved`);
        } catch (err: any) {
          console.error(`❌ Failed to update payroll ${payrollId}:`, err.message);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }
      } else {
        console.warn('⚠️ Product is not expanded or has no metadata');
      }
    }
  }

  return NextResponse.json({ received: true });
}
