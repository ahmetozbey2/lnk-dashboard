'use client';

import Sidebar from '@/ui/layout/sidebar';
import { BanknoteArrowUp, History, TreePalm } from 'lucide-react';

import type { DetailCardProps } from './components/detailCard';
import DetailCard from './components/detailCard';

const detailCardDatas: Array<DetailCardProps> = [
  {
    icon: <TreePalm color="#F5FAE6" />,
    label: 'Request Time Off',
  },
  {
    icon: <BanknoteArrowUp color="#F5FAE6" />,
    label: 'Request Payment',
    href: '/request-payment',
  },
  {
    icon: <History color="#F5FAE6" />,
    label: 'Payment History',
  },
];

/**
 * `HomepageView` is the main dashboard component.
 * It renders a sidebar, a set of feature cards, and upcoming payment info.
 */
export default function HomepageView() {
  return (
    <div className="flex flex-col lg:flex-row items-start min-h-screen">
      {/* Sidebar section */}
      <Sidebar />

      {/* Main content */}
      <div className="w-full flex flex-col lg:flex-row flex-[5] gap-6 px-4 sm:px-6 lg:px-10 pt-6 sm:pt-16 items-start">
        {/* Grid of detail cards */}
        <div className="lg:grid lg:flex-[2.5] lg:grid-cols-2 lg:gap-4 lg:px-4 max-lg:flex-col max-lg:gap-y-2 max-lg:flex max-lg:w-full">
          {detailCardDatas.map((detailCardData, index) => (
            <DetailCard
              key={index}
              icon={detailCardData.icon}
              label={detailCardData.label}
              href={detailCardData.href}
            />
          ))}
        </div>

        {/* Right-side panel */}
        <div className="w-full lg:w-auto lg:flex-1 bg-[#242424] rounded-md h-fit">
          {[...Array(3)].map((_, index) => (
            <div key={index} className={`px-4 sm:px-5 py-4 ${index < 2 ? 'border-b border-[#b9b9b9]' : ''}`}>
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs text-blue-400">PAYMENT REQUEST</p>
                <p className="text-xs text-[#b9b9b9]">Wednesday</p>
              </div>
              <h2 className="mb-1 text-base font-semibold text-white">Upcoming Payment</h2>
              <p className="text-xs text-[#b9b9b9]">
                This is a simple homepage layout with a sidebar and some content.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
