'use client';

import PayrollCard from '@/packages/request-payment/components/payrollCard';
import { PayrollRequest } from '@/packages/request-payment/helpers/types';
import Sidebar from '@/ui/layout/sidebar';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  department?: string;
  position?: string;
  image: string;
  role: 'ADMIN' | 'EMPLOYEE';
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
    <div className="flex items-start">
      <Sidebar />

      <div className="mx-auto mt-16 min-h-screen flex-[4] gap-6 px-20">
        <div className="bg-[#1D1D1D] p-5 rounded-md shadow-md flex justify-between mb-4">
          <p className="text-purple">Payment Requests</p>
          <Link href="/request-payment/new" className="flex items-center gap-x-2 cursor-pointer">
            <p className="bg-green-600 size-4 flex items-center justify-center rounded-full pb-[2px] text-white">+</p>
            <p className="text-white">Request Payment</p>
          </Link>
        </div>
        <div className="bg-[#1D1D1D] rounded-md">
          <div className="flex items-center justify-start gap-x-4 p-4">
            <p className="text-purple">Pending Requests</p>
            <p className="text-[#b9b9b9]">({payrollRequests.length})</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading payrolls...</p>
        ) : payrollRequests.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No payroll requests found.</p>
        ) : (
          payrollRequests.map((payroll, i) => <PayrollCard payrollRequest={payroll} key={i} />)
        )}
      </div>
    </div>
  );
}
