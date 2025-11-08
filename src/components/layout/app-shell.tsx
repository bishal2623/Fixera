'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/new-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <main className="ml-64">{children}</main>
    </div>
  );
}
