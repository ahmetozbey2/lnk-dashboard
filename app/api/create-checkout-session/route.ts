import type { CartItem } from '@/components/checkout';
import { User } from '@/packages/request-payment/helpers/types';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { products }: { products: CartItem[] } = await req.json();

    const userId = 'admin_hr_panel_user'; // HR kullanıcısı olarak temsili ID

    // Stripe line item'larını oluştur
    const lineItems = products.map((item) => {
      const payroll = item.product;
      const user = payroll.user as User;

      return {
        price_data: {
          currency: payroll.currency.toLowerCase(), // usd, eur, try
          product_data: {
            name: `${user.name} - ${payroll.reason}`,
            images: [user.image],
            metadata: {
              payroll_id: payroll.id,
              user_id: payroll.userId,
            },
          },
          unit_amount: payroll.amount * 100,
        },
        quantity: item.quantity,
      };
    });

    const origin = req.headers.get('origin') ?? process.env.BASE_URL;

    if (!origin) {
      throw new Error('Missing origin or BASE_URL');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: { created_by: userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Error creating Checkout Session:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
