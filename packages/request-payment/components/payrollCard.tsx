'use client';

import CheckoutButton from '@/components/checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle2, FileText } from 'lucide-react';

import { PayrollRequest } from '../helpers/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

/**
 * Maps status to text color and icon color classes
 */
const statusClasses: Record<PayrollRequest['status'], string> = {
  pending: 'text-yellow-600',
  approved: 'text-green-600',
  rejected: 'text-red-600',
};

type PayrollCardProps = {
  /**
   * The payroll request object to render.
   */
  payrollRequest: PayrollRequest;
};

/**
 * `PayrollCard` is a horizontally aligned component mimicking an invoice-like layout.
 *
 * @param {PayrollCardProps} props - Contains payroll information.
 * @returns {JSX.Element}
 */
export default function PayrollCard({ payrollRequest }: PayrollCardProps) {
  const createdAt = new Date(payrollRequest.createdAt);
  const startDate = new Date(createdAt);
  startDate.setMonth(startDate.getMonth() - 1); // 1 ay öncesi

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#1e1e1e] border-b text-white">
      <div className="w-1/5">
        <p className="text-sm ">{formatDate(createdAt)}</p>
        <p className="text-base font-medium ">
          {payrollRequest.amount.toFixed(2)} {payrollRequest.currency}
        </p>
      </div>

      <div className="w-2/5 flex items-start gap-2">
        <FileText size={16} className="text-purple-500" />
        <div>
          <p className="text-sm font-medium ">{payrollRequest.reason}</p>
          <p className="text-xs">
            {formatDate(startDate)} – {formatDate(createdAt)}
          </p>
        </div>
      </div>

      <div className="w-1/5 flex items-center gap-2">
        {payrollRequest.status === 'approved' && <CheckCircle2 className="text-green-500" size={16} />}
        <span className={`text-sm font-medium ${statusClasses[payrollRequest.status]}`}>
          {payrollRequest.status.charAt(0).toUpperCase() + payrollRequest.status.slice(1)}
        </span>
      </div>

      <div className="w-1/5">
        {payrollRequest.status !== 'approved' && (
          <Elements stripe={stripePromise}>
            <CheckoutButton products={[{ product: payrollRequest, quantity: 1 }]} />
          </Elements>
        )}
      </div>
    </div>
  );
}
