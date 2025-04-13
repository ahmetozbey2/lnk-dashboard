import AuthGate from '@/ui/layout/authGate';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Viola | Payroll Dashboard',
  description:
    'Easily request and manage payrolls using a modern, responsive HR dashboard with secure Stripe payments.',
  metadataBase: new URL('https://your-app-domain.com'), // kendi domainini yaz

  openGraph: {
    title: 'Request Payment | Payroll Dashboard',
    description: 'Manage payments and employee payrolls with a simple, fast and secure dashboard.',
    url: 'https://your-app-domain.com',
    siteName: 'Payroll Dashboard',
    images: [
      {
        url: '/og-image.png', // Next.js public dizininde olmalı
        width: 1200,
        height: 630,
        alt: 'Payroll Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Request Payment | Payroll Dashboard',
    description: 'Streamline your payroll operations securely and efficiently.',
    images: ['/og-image.png'],
  },

  themeColor: '#1D1D1D',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <AuthGate />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
