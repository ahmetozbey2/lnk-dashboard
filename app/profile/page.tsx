'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

/**
 * A form page that allows users to create their profile.
 * This component uses Auth0 for authentication and sends a POST request
 * to the `/api/create-user` endpoint to store the profile in the database.
 */
export default function CreateProfilePage() {
  const { user } = useUser();

  // Form state for holding user input
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    image: '',
    role: '',
  });

  // Response message after submission
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  /**
   * Updates the form state when input values change.
   *
   * @param e - React change event from input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles form submission. Sends user data to the API.
   *
   * @param e - React form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // Show success or error message based on API response
    if (data.success) {
      setResponseMsg('✅ Profile created successfully!');
    } else {
      setResponseMsg('❌ Failed to create profile.');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Create Profile</h1>

      {/* Profile creation form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Render standard input fields */}
        {['name', 'department', 'position', 'image', 'role'].map((field) => (
          <div key={field}>
            <label className="mb-1 block capitalize" htmlFor={field}>
              {field}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required={field !== 'image'}
            />
          </div>
        ))}

        {/* Pre-filled email from Auth0 */}
        <div>
          <label className="mb-1 block" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={user?.email || ''}
            onChange={handleChange}
            className="w-full rounded border bg-gray-100 px-3 py-2"
            disabled
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Create
        </button>
      </form>

      {/* Display response message */}
      {responseMsg && <p className="mt-4">{responseMsg}</p>}
    </div>
  );
}
