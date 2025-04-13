'use client';

import { PayrollRequest } from '@/packages/request-payment/helpers/types';
import React from 'react';

/**
 * Interface representing an item in the shopping cart.
 */
export interface CartItem {
  product: PayrollRequest;
  quantity: number;
}
/**
 * Props for the CheckoutButton component.
 *
 * @property {CartItem[]} products - An array of products in the cart.
 */
export interface CheckoutButtonProps {
  products: CartItem[];
}

/**
 * CheckoutButton component handles the creation of a checkout session and redirects users to the Stripe Checkout page.
 *
 * @param {CheckoutButtonProps} props - Props containing cart products.
 * @returns {React.FC} - A button component for initiating checkout.
 */
const CheckoutButton: React.FC<CheckoutButtonProps> = ({ products }) => {
  /**
   * Initiates the checkout process by creating a checkout session and redirecting to Stripe Checkout.
   *
   * @async
   * @function
   */
  const handleCheckout = async (): Promise<void> => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url }: { url: string } = (await response.json()) as { url: string };

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating checkout session:', error.message);
      } else {
        console.error('Unknown error occurred during checkout');
      }
    }
  };

  return (
    <button
      className="rounded-[4px] bg-green-500 p-2  text-white duration-300 text-sm hover:bg-green-500/80"
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-void
        void (async () => {
          await handleCheckout();
        })();
      }}>
      Approve
    </button>
  );
};

export default CheckoutButton;
