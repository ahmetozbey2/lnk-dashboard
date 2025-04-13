'use client';

import Sidebar from '@/ui/layout/sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

/**
 * Represents a simplified user object.
 */
type User = {
  id: string;
  name: string;
  email: string;
};

/**
 * CreatePayrollForm component
 *
 * Displays a form where an HR/admin can request a payment for a user.
 * Includes fields for amount, currency, and description.
 */
export default function CreatePayrollForm() {
  const { user } = useUser();

  // Form state
  const [form, setForm] = useState({
    amount: '',
    currency: 'TRY',
    reason: '',
    email: user?.email,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState<User | null>(null);

  /**
   * Fetch all users on component mount.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users/${user?.sub?.replace('google-oauth2|', '')}`);
        const data = await res.json();
        console.log('data', data);
        setUsers(data.user); // Adjust based on your actual API response
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, [user]);

  /**
   * Handles input changes for both <input> and <select> elements.
   *
   * @param e - Input or select change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles form submission and creates a payroll request via API.
   *
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/create-payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: users?.id, // ⚠️ Update this field when enabling dynamic user selection
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
  console.log('user', user);
  // Supported currency options
  const currencies = [/* currency list omitted for brevity */ 'USD', 'EUR', 'TRY' /* ... */];

  return (
    <div className="flex items-start gap-x-10">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Payroll form container */}
      <div className="mr-5 mt-16 flex-[4] rounded-xl bg-[#242424] py-5 shadow-lg">
        {/* Header section */}
        <div className="mb-3 border-b border-[#4c4c4c] px-10 pb-3">
          <h2 className="mb-1 text-xl text-purple">Request payment</h2>
          <p className="text-[#F5FAE6]">Let the client know how much they should pay you</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Amount and currency input */}
          <div className="mb-3 border-b border-[#4c4c4c] px-10 pb-4">
            <p className="mb-2 text-purple">Amount to pay</p>
            <div className="flex items-center gap-x-3">
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="w-60 rounded border border-[#F5FAE6] bg-transparent px-3 py-2 text-[#F5FAE6] focus:outline-none"
              />
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-20 rounded border border-[#F5FAE6] bg-transparent px-3 py-2 text-[#F5FAE6] focus:outline-none">
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description input */}
          <div className="mb-3 border-b border-[#4c4c4c] px-10 pb-4">
            <p className="mb-2 text-purple">Description</p>
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Reason (optional)"
              className="w-full rounded border border-[#F5FAE6] bg-transparent px-3 py-2 text-[#F5FAE6]"
            />
          </div>

          {/* Optional user select (disabled for now) */}
          {/* 
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 bg-transparent border-[#F5FAE6] text-[#F5FAE6] focus:outline-none"
          >
            <option value="">Select a user</option>
            {users?.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
          */}

          {/* Submit + Cancel buttons */}
          <div className="flex items-center gap-x-3 px-10">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-purple px-4 py-2 text-white hover:bg-blue-700">
              {loading ? 'Creating...' : 'Request Payment'}
            </button>
            <button type="button" className="text-[#F5FAE6] underline underline-offset-4 hover:text-white">
              Cancel
            </button>
          </div>

          {/* Success message */}
          {successMessage && <p className="px-10 pt-2 text-green-600">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}
