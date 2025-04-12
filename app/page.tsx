'use client';

import CheckoutButton from '@/components/checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  department?: string;
  position?: string;
  image: string;
};

export type PayrollRequest = {
  id: string;
  userId: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'TRY';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export default function Home() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
  const [payrollRequests, setPayrollRequests] = useState<PayrollRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const res = await fetch('/api/payrolls');
        const data = await res.json();
        setPayrollRequests(data.payrolls || []);
      } catch (error) {
        console.error('Failed to fetch payrolls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);

  const statusClasses: Record<PayrollRequest['status'], string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0d0d0d] sm:p-12">
      <div className="mx-auto grid max-w-5xl gap-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">Pending Payroll Requests</h1>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading payrolls...</p>
        ) : payrollRequests.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No payroll requests found.</p>
        ) : (
          payrollRequests.map((payrollRequest) => (
            <div
              key={payrollRequest.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-[#161616]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {payrollRequest.user?.name || 'Unknown'}
                </h2>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusClasses[payrollRequest.status]}`}>
                  {payrollRequest.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-medium">Reason:</span> {payrollRequest.reason || '—'}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> {payrollRequest.amount} {payrollRequest.currency}
                </p>
                <p>
                  <span className="font-medium">Requested At:</span>{' '}
                  {new Date(payrollRequest.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Last Updated:</span>{' '}
                  {new Date(payrollRequest.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-4">
                <Elements stripe={stripePromise}>
                  <CheckoutButton products={[{ product: payrollRequest, quantity: 1 }]} />
                </Elements>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
