'use client';

import PayrollCard from '@/packages/request-payment/components/payrollCard';
import { PayrollRequest } from '@/packages/request-payment/helpers/types';
import { useRoleStore } from '@/store/roleStore';
import Sidebar from '@/ui/layout/sidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RequestPaymentPageView() {
  const [payrollRequests, setPayrollRequests] = useState<PayrollRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useRoleStore();

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
  const pendingRequests = payrollRequests.filter((request) => request.status === 'pending');
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="w-full lg:flex-[4] px-4 sm:px-8 lg:px-20 py-8">
        {/* Header */}
        <div className="bg-[#1D1D1D] p-4 sm:p-5 rounded-md shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <p className="text-purple text-lg font-semibold">Payment Requests</p>
          {role === 'EMPLOYEE' && (
            <Link href="/request-payment/new" className="flex items-center gap-x-2 cursor-pointer">
              <p className="bg-green-600 w-5 h-5 flex items-center justify-center rounded-full text-white text-sm">+</p>
              <p className="text-white text-sm sm:text-base">Request Payment</p>
            </Link>
          )}
        </div>

        {/* Subheading */}
        <div className="bg-[#1D1D1D] rounded-md mb-4">
          <div className="flex items-center justify-start gap-x-4 p-4">
            <p className="text-purple text-base sm:text-lg">Pending Requests</p>
            <p className="text-[#b9b9b9] text-sm">({pendingRequests.length})</p>
          </div>
        </div>

        {/* Payroll Content */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading payrolls...</p>
          ) : payrollRequests.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No payroll requests found.</p>
          ) : (
            payrollRequests.map((payroll, i) => <PayrollCard payrollRequest={payroll} key={i} />)
          )}
        </div>
      </div>
    </div>
  );
}
