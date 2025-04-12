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
      <Link href={href} className="flex items-center p-4 shadow-md rounded-lg cursor-pointer bg-[#242424]">
        <div className="text-blue-500 text-2xl mr-4">{icon}</div>
        <span className="text-lg font-semibold text-[#F5FAE6]">{label}</span>
      </Link>
    );
  }
  return (
    <div className="flex items-center p-4 shadow-md rounded-lg cursor-pointer bg-[#242424]">
      <div className="text-blue-500 text-2xl mr-4">{icon}</div>
      <span className="text-lg font-semibold text-[#F5FAE6]">{label}</span>
    </div>
  );
}
