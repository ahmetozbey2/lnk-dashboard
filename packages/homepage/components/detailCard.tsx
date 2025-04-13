'use client';

import Link from 'next/link';
import * as React from 'react';

export interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

export default function DetailCard({ icon, label, href }: DetailCardProps) {
  if (href) {
    return (
      <Link href={href} className="flex cursor-pointer items-center rounded-lg bg-[#242424] p-4 shadow-md">
        <div className="mr-4 text-2xl text-blue-500">{icon}</div>
        <span className="text-lg font-semibold text-[#F5FAE6]">{label}</span>
      </Link>
    );
  }
  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-[#242424] p-4 shadow-md">
      <div className="mr-4 text-2xl text-blue-500">{icon}</div>
      <span className="text-lg font-semibold text-[#F5FAE6]">{label}</span>
    </div>
  );
}
