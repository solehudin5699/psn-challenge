import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PrimeReactProvider } from 'primereact/api';
import Providers from '@/providers';
import { ConfirmDialog } from 'primereact/confirmdialog';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Comment Management',
  description: 'Comment Management Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}>
          <Providers>
            {children}
            <ConfirmDialog />
          </Providers>
        </body>
      </PrimeReactProvider>
    </html>
  );
}
