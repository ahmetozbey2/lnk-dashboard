'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * `CancelPageView` is shown when the user cancels a payment or action.
 */
export default function CancelPageView() {
  return (
    <div className="min-h-screen bg-[#1D1D1D] flex flex-col items-center justify-center px-4">
      <div className="bg-[#242424] w-full max-w-md rounded-xl p-8 shadow-lg text-center">
        <XCircle size={48} className="text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl text-purple font-semibold mb-2">Payment Cancelled</h1>
        <p className="text-[#F5FAE6] mb-6 text-sm">
          The payment was cancelled. No changes were made to your account or request.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/request-payment"
            className="rounded bg-purple px-4 py-2 text-white hover:bg-purple/90 transition text-sm font-medium">
            Back to Dashboard
          </Link>
          <Link
            href="/request-payment/new"
            className="rounded border border-[#F5FAE6] px-4 py-2 text-[#F5FAE6] hover:bg-[#333] transition text-sm font-medium">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
