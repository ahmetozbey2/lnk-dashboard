import type { CartItem } from '@/components/checkout';
import type { NextRequest } from 'next/server';
// Import as type to fix eslint warning
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

/**
 * Handles incoming POST requests to create a Stripe PaymentIntent.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {Promise<NextResponse>} - A JSON response containing the PaymentIntent client secret or an error message.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body to extract products
    const body: { products: CartItem[] } = (await req.json()) as { products: CartItem[] };
    const { products } = body;

    // Calculate the total amount in cents
    const totalAmount = products.reduce((sum, product) => {
      return sum + product.product.amount * 100; // Convert price to cents for Stripe
    }, 0);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Ensure error type is properly narrowed
    if (error instanceof Error) {
      console.error('Error creating PaymentIntent:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error('Unknown error occurred:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
