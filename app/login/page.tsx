import Link from 'next/link';

export default function Auth() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center space-y-2 bg-orange-400">
      <p>You must be logged in to access this page.</p>
      <Link
        className="animate-fadeIn bg-smoke hover:text-smoke mt-10 flex h-12 w-fit items-center justify-center px-20 font-bold text-white duration-300 hover:bg-transparent lg:h-16"
        href="/api/auth/login">
        Login
      </Link>
    </div>
  );
}
