import Link from 'next/link';

export default function Auth() {
  return (
    <div className="h-[70vh] flex items-center justify-center flex-col space-y-2 bg-orange-400">
      <p>You must be logged in to access this page.</p>
      <Link
        className="animate-fadeIn mt-10 bg-smoke hover:bg-transparent hover:text-smoke duration-300 w-fit px-20 text-white h-12 lg:h-16 flex items-center justify-center font-bold"
        href="/api/auth/login">
        Login
      </Link>
    </div>
  );
}
