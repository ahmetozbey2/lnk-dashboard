'use client';

import Sidebar from '@/ui/layout/sidebar';
import { BanknoteArrowUp, History, TreePalm } from 'lucide-react';

import DetailCard, { DetailCardProps } from './components/detailCard';

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
    href: '/payment-history',
  },
];

/**
 * `HomepageView` component represents the main dashboard layout.
 * It consists of:
 * - A sidebar on the left
 * - A grid of interactive detail cards
 * - A right section that shows upcoming payment requests
 *
 * @param props - No props currently used, but `IAppProps` interface is in place for future extensibility.
 * @returns A JSX layout combining sidebar, detail cards, and content sections.
 */
export default function HomepageView() {
  return (
    <div className="flex items-start">
      {/* Sidebar section */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-[5] flex items-start pt-10 px-10 gap-x-10">
        {/* Grid of detail cards */}
        <div className="grid grid-cols-2 gap-4 px-4 flex-[2.5]">
          {detailCardDatas.map((detailCardData, index) => (
            <DetailCard
              key={index}
              icon={detailCardData.icon}
              label={detailCardData.label}
              href={detailCardData.href}
            />
          ))}
        </div>

        {/* Right-side content section */}
        <div className="flex-1 w-full bg-[#242424]">
          {[...Array(3)].map((_, index) => (
            <div key={index} className={`px-5 py-4 ${index < 2 ? 'border-b-[1px] border-[#b9b9b9]' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-blue-400">PAYMENT REQUEST</p>
                <p className="text-xs text-[#b9b9b9]">Wednesday</p>
              </div>
              <h2 className="text-base font-semibold mb-1 text-white">Upcoming Payment</h2>
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
