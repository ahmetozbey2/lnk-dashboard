'use client';

import Logo from '@/assets/logo_nobg.svg';
import { cn } from '@/lib/utils';
import { useRoleStore } from '@/store/roleStore';
import Image from 'next/image';
import Link from 'next/link';

export default function Auth() {
  const { role, setRole } = useRoleStore();

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#1D1D1D] min-h-screen overflow-hidden px-4">
      <div className="fixed left-0 top-0 p-4">
        <Image src={Logo} alt="Viola Logo" width={400} height={40} />
      </div>
      {/* Background Image - Only visible on larger screens */}
      <Image
        alt="login-graphic"
        src="https://portal.coda.co/spa/assets/signup-element.webp"
        width={700}
        height={700}
        className="absolute right-0 -top-80 pointer-events-none hidden sm:block"
      />

      <div className="bg-[#F5FAE6] w-full max-w-md z-10 rounded-xl px-6 py-8 sm:px-8 sm:py-10 shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900">Select Your Role</h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setRole('ADMIN')}
            className={cn(
              'w-full py-3 rounded-md font-semibold text-white transition duration-300',
              role === 'ADMIN' ? 'bg-[#1D1D1D]' : 'bg-[#888]',
            )}>
            Manager
          </button>
          <button
            onClick={() => setRole('EMPLOYEE')}
            className={cn(
              'w-full py-3 rounded-md font-semibold text-white transition duration-300',
              role === 'EMPLOYEE' ? 'bg-[#1D1D1D]' : 'bg-[#888]',
            )}>
            Employee
          </button>
        </div>

        {/* Login Button */}
        <Link
          href="/api/auth/login"
          onClick={(e) => {
            if (!role) {
              e.preventDefault();
              alert('Please select a role first!');
            }
          }}
          className="block text-center w-full py-3 rounded-md bg-[#4F5144] text-white font-bold transition duration-300 hover:bg-purple-800">
          Login
        </Link>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">You must be logged in to access this page.</p>
      </div>
    </div>
  );
}
