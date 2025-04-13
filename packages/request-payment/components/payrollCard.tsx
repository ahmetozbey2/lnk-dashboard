'use client';

import CheckoutButton from '@/components/checkout';
import { useRoleStore } from '@/store/roleStore';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle2, FileText } from 'lucide-react';
import { JSX, useState } from 'react';

import { PayrollRequest } from '../helpers/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const statusClasses: Record<PayrollRequest['status'], string> = {
  pending: 'text-yellow-600',
  approved: 'text-green-600',
  rejected: 'text-red-600',
};

type PayrollCardProps = {
  /**
   * The payroll request object to render in the card.
   */
  payrollRequest: PayrollRequest;
};

/**
 * `PayrollCard` renders a single payroll request card with dynamic status,
 * formatting, and admin actions like approving or rejecting a request.
 *
 * @param {PayrollCardProps} props - The payroll request data.
 * @returns {JSX.Element} A formatted, responsive payroll card.
 */
export default function PayrollCard({ payrollRequest }: PayrollCardProps): JSX.Element {
  const { role } = useRoleStore();

  // 🔁 Local UI state for status (for instant updates after Reject)
  const [status, setStatus] = useState<PayrollRequest['status']>(payrollRequest.status);

  const createdAt = new Date(payrollRequest.createdAt);
  const startDate = new Date(createdAt);
  startDate.setMonth(startDate.getMonth() - 1);

  /**
   * Formats a JavaScript Date to a localized string.
   * @param d - Date object
   * @returns A string in DD MMM YYYY format
   */
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  /**
   * Sends a reject request to the backend and updates local UI on success.
   *
   * @param payrollId - ID of the payroll to reject.
   */
  const handleReject = async (payrollId: string) => {
    try {
      const res = await fetch('/api/payroll/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payrollId }),
      });

      const data = await res.json();
      if (data.success) {
        console.log('✅ Payroll rejected:', data.payroll);
        setStatus('rejected'); // ⚡️ Update UI immediately
      }
    } catch (err) {
      console.error('❌ Failed to reject payroll', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-5 bg-[#1e1e1e] border-b text-white rounded-md">
      {/* Date + Amount */}
      <div className="w-full sm:w-1/5">
        <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
        <p className="text-base font-bold">
          {payrollRequest.amount.toFixed(2)} {payrollRequest.currency}
        </p>
      </div>

      {/* Reason + Date Range */}
      <div className="w-full sm:w-2/5 flex items-start gap-2">
        <FileText size={20} className="text-purple-500 mt-1" />
        <div>
          <p className="text-sm font-medium break-words">{payrollRequest.reason}</p>
          <p className="text-xs text-gray-400">
            {formatDate(startDate)} – {formatDate(createdAt)}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="w-full sm:w-1/5 flex items-center gap-2">
        {status === 'approved' && <CheckCircle2 className="text-green-500" size={18} />}
        <span className={`text-sm font-medium ${statusClasses[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-full sm:w-1/5">
        {status === 'pending' && role === 'ADMIN' && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Elements stripe={stripePromise}>
              <CheckoutButton products={[{ product: payrollRequest, quantity: 1 }]} />
            </Elements>
            <button
              onClick={() => handleReject(payrollRequest.id)}
              className="rounded-[4px] bg-red-500 p-2 px-5 text-white text-sm hover:bg-red-500/80 transition">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
