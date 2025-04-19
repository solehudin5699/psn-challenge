import Loading from '@/components/elements/LoadingPage';
import DashboardLayout from '@/components/layout/Dashboard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    redirect('/login');
  }
  return (
    <Suspense fallback={<Loading />}>
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}

export default Layout;
