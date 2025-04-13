'use client';

import PayrollCard from '@/packages/request-payment/components/payrollCard';
import { PayrollRequest } from '@/packages/request-payment/helpers/types';
import { useRoleStore } from '@/store/roleStore';
import Sidebar from '@/ui/layout/sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

/**
 * This component renders the Request Payment page.
 * It fetches payroll data depending on the user role (employee or admin),
 * and displays pending requests in a list using `PayrollCard`.
 */
export default function RequestPaymentPageView() {
  const { role } = useRoleStore();
  const { user } = useUser();

  /** Holds the current user data fetched from the backend. */
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /** Holds the list of fetched payroll requests. */
  const [payrollRequests, setPayrollRequests] = useState<PayrollRequest[]>([]);

  /** Indicates whether the payroll list is currently being loaded. */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch user info from the backend using the Auth0 subject ID.
   */
  useEffect(() => {
    if (!user?.sub) return;

    const fetchUser = async () => {
      try {
        const userId = user?.sub?.replace('google-oauth2|', '');
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {
        console.error('❌ Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [user?.sub]);

  /**
   * Determines the correct API endpoint to use
   * depending on whether the user is an EMPLOYEE or an ADMIN.
   */
  const endpoint = useMemo(() => {
    if (!currentUser) return null;
    return role === 'EMPLOYEE' ? `/api/payrolls/${currentUser.id}` : `/api/payrolls`;
  }, [role, currentUser]);

  /**
   * Fetch payroll requests from the backend when the endpoint becomes available.
   */
  useEffect(() => {
    if (!endpoint) return;

    const fetchPayrolls = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setPayrollRequests(data.payrolls || []);
      } catch (error) {
        console.error('❌ Failed to fetch payrolls:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayrolls();
  }, [endpoint]);

  /**
   * Extract only the pending payroll requests for the summary section.
   */
  const pendingRequests = useMemo(() => payrollRequests.filter((r) => r.status === 'pending'), [payrollRequests]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="w-full lg:flex-[4] px-4 sm:px-8 lg:px-20 py-8">
        {/* Page Header */}
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
          {isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading payrolls...</p>
          ) : payrollRequests.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No payroll requests found.</p>
          ) : (
            payrollRequests.map((payroll) => <PayrollCard key={payroll.id} payrollRequest={payroll} />)
          )}
        </div>
      </div>
    </div>
  );
}
