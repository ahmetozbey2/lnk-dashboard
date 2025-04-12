'use client';

import CheckoutButton from '@/components/checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export type User = {
  id: string;
  name: string;
  email: string;
  department?: string;
  position?: string;
  image: string;
};

export type PayrollRequest = {
  id: string;
  userId: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'TRY'; // gerekirse genişletilebilir
  reason: string; // maaş talebinin nedeni (örnek: "Ek mesai", "Prim", vb.)
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  user?: User; // eager load ile birlikte getirilecekse
};
export default function Home() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

  const users: User[] = [
    {
      id: 'u1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u2',
      name: 'Elif Kaya',
      email: 'elif@company.com',
      department: 'Design',
      position: 'Product Designer',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u3',
      name: 'Mert Demir',
      email: 'mert@company.com',
      department: 'Marketing',
      position: 'Content Strategist',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u4',
      name: 'Zeynep Çelik',
      email: 'zeynep@company.com',
      department: 'Sales',
      position: 'Account Manager',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u5',
      name: 'Can Aydın',
      email: 'can@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u6',
      name: 'Derya Koç',
      email: 'derya@company.com',
      department: 'HR',
      position: 'Recruiter',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u7',
      name: 'Emre Şahin',
      email: 'emre@company.com',
      department: 'Customer Support',
      position: 'Support Specialist',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u8',
      name: 'Nazlı Güven',
      email: 'nazli@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u9',
      name: 'Selim Arı',
      email: 'selim@company.com',
      department: 'Engineering',
      position: 'DevOps Engineer',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
    {
      id: 'u10',
      name: 'Melis Türkmen',
      email: 'melis@company.com',
      department: 'Legal',
      position: 'Legal Advisor',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    },
  ];

  const payrollRequests: PayrollRequest[] = [
    {
      id: 'p1',
      userId: 'u1',
      amount: 8000,
      currency: 'TRY',
      reason: 'Overtime payment for project deadline',
      status: 'pending',
      createdAt: '2025-04-10T08:00:00Z',
      updatedAt: '2025-04-10T08:00:00Z',
      user: users[0],
    },
    {
      id: 'p2',
      userId: 'u2',
      amount: 300,
      currency: 'USD',
      reason: 'Design sprint bonus',
      status: 'approved',
      createdAt: '2025-04-09T10:30:00Z',
      updatedAt: '2025-04-10T12:00:00Z',
      user: users[1],
    },
    {
      id: 'p3',
      userId: 'u3',
      amount: 500,
      currency: 'EUR',
      reason: 'Quarterly content initiative',
      status: 'rejected',
      createdAt: '2025-04-08T11:15:00Z',
      updatedAt: '2025-04-09T09:00:00Z',
      user: users[2],
    },
    {
      id: 'p4',
      userId: 'u4',
      amount: 1000,
      currency: 'USD',
      reason: 'Client acquisition bonus',
      status: 'approved',
      createdAt: '2025-04-07T14:45:00Z',
      updatedAt: '2025-04-07T15:00:00Z',
      user: users[3],
    },
    {
      id: 'p5',
      userId: 'u5',
      amount: 12000,
      currency: 'TRY',
      reason: 'Night shift support',
      status: 'pending',
      createdAt: '2025-04-11T09:00:00Z',
      updatedAt: '2025-04-11T09:00:00Z',
      user: users[4],
    },
    {
      id: 'p6',
      userId: 'u6',
      amount: 200,
      currency: 'EUR',
      reason: 'Recruitment milestone',
      status: 'approved',
      createdAt: '2025-04-05T13:20:00Z',
      updatedAt: '2025-04-06T10:10:00Z',
      user: users[5],
    },
    {
      id: 'p7',
      userId: 'u7',
      amount: 3500,
      currency: 'TRY',
      reason: 'Weekend support compensation',
      status: 'pending',
      createdAt: '2025-04-10T16:00:00Z',
      updatedAt: '2025-04-10T16:00:00Z',
      user: users[6],
    },
    {
      id: 'p8',
      userId: 'u8',
      amount: 450,
      currency: 'USD',
      reason: 'Quarter-end report success',
      status: 'approved',
      createdAt: '2025-04-03T17:30:00Z',
      updatedAt: '2025-04-04T09:00:00Z',
      user: users[7],
    },
    {
      id: 'p9',
      userId: 'u9',
      amount: 750,
      currency: 'USD',
      reason: 'System migration duty',
      status: 'rejected',
      createdAt: '2025-04-06T08:00:00Z',
      updatedAt: '2025-04-07T08:30:00Z',
      user: users[8],
    },
    {
      id: 'p10',
      userId: 'u10',
      amount: 1000,
      currency: 'EUR',
      reason: 'Legal documentation completion',
      status: 'pending',
      createdAt: '2025-04-12T07:45:00Z',
      updatedAt: '2025-04-12T07:45:00Z',
      user: users[9],
    },
  ];
  const statusClasses: Record<PayrollRequest['status'], string> = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-[#0d0d0d] sm:p-12">
      <div className="mx-auto grid max-w-5xl gap-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">Pending Payroll Requests</h1>

        {payrollRequests.map((payrollRequest) => (
          <div
            key={payrollRequest.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-[#161616]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{payrollRequest.user?.name}</h2>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusClasses[payrollRequest.status]}`}>
                {payrollRequest.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Reason:</span> {payrollRequest.reason || '—'}
              </p>
              <p>
                <span className="font-medium">Amount:</span> {payrollRequest.amount} {payrollRequest.currency}
              </p>
              <p>
                <span className="font-medium">Requested At:</span> {new Date(payrollRequest.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span> {new Date(payrollRequest.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <Elements stripe={stripePromise}>
                <CheckoutButton products={[{ product: payrollRequest, quantity: 1 }]} />
              </Elements>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
