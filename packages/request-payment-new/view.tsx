'use client';

import Sidebar from '@/ui/layout/sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { supportedCurrencies } from './helpers/utils';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function RequestNewPaymentPageView() {
  const { user } = useUser();

  const [form, setForm] = useState({
    amount: '',
    currency: 'TRY',
    reason: '',
    email: user?.email,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users/${user?.sub?.replace('google-oauth2|', '')}`);
        const data = await res.json();
        setUsers(data.user);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/create-payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: users?.id,
          amount: parseInt(form.amount),
          currency: form.currency,
          reason: form.reason,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage('✅ Payment request created successfully!');
        setForm({ amount: '', currency: 'TRY', reason: '', email: user?.email });
      } else {
        alert(data.message || '❌ Something went wrong.');
      }
    } catch (error) {
      console.error('Error creating payroll:', error);
      alert('❌ Error creating payroll');
    } finally {
      setLoading(false);
    }
  };

  const currencies = ['USD', 'EUR', 'TRY'];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <div className="w-full flex-[4] px-4 sm:px-6 lg:px-10 py-10">
        <div className="rounded-xl bg-[#242424] shadow-lg p-6 sm:p-10">
          {/* Header */}
          <div className="mb-6 border-b border-[#4c4c4c] pb-4">
            <h2 className="text-xl sm:text-2xl text-purple font-semibold">Request payment</h2>
            <p className="text-sm sm:text-base text-[#F5FAE6]">Let the client know how much they should pay you</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount and currency */}
            <div>
              <p className="mb-2 text-purple">Amount to pay</p>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  required
                  className="w-full sm:w-60 rounded border border-[#F5FAE6] bg-transparent px-3 py-2 text-[#F5FAE6] focus:outline-none"
                />
                <div className="relative w-full sm:w-24">
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="appearance-none w-full rounded border border-[#F5FAE6] bg-transparent px-3 py-2 pr-8 text-[#F5FAE6] focus:outline-none">
                    {supportedCurrencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                  {/* Chevron simgesi */}
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <svg className="h-4 w-4 text-[#F5FAE6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <p className="mb-2 text-purple">Description</p>
              <input
                type="text"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Reason (optional)"
                className="w-full rounded border border-[#F5FAE6] bg-transparent px-3 py-2 text-[#F5FAE6] focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded bg-purple px-4 py-2 text-white hover:bg-purple/80 duration-300 transition">
                {loading ? 'Creating...' : 'Request Payment'}
              </button>
              <Link
                href="/request-payment"
                type="button"
                className="text-[#F5FAE6] underline underline-offset-4 hover:text-white">
                Cancel
              </Link>
            </div>

            {successMessage && <p className="text-sm text-green-500 font-medium">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
