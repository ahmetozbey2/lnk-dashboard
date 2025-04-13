'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * `SuccessPageView` shows a confirmation after a successful action (e.g. payment request created).
 */
export default function SuccessPageView() {
  return (
    <div className="min-h-screen bg-[#1D1D1D] flex flex-col items-center justify-center px-4">
      <div className="bg-[#242424] w-full max-w-md rounded-xl p-8 shadow-lg text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl text-purple font-semibold mb-2">Payment Request Sent!</h1>
        <p className="text-[#F5FAE6] mb-6 text-sm">
          Your payment request was created successfully. You can track the status from your dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/request-payment"
            className="rounded bg-purple px-4 py-2 text-white hover:bg-purple/90 transition text-sm font-medium">
            Go to Dashboard
          </Link>
          <Link
            href="/request-payment/new"
            className="rounded border border-[#F5FAE6] px-4 py-2 text-[#F5FAE6] hover:bg-[#333] transition text-sm font-medium">
            Request Another
          </Link>
        </div>
      </div>
    </div>
  );
}
