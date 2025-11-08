'use client';

import { Sidebar } from '@/components/layout/new-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <main className="ml-64">{children}</main>
    </div>
  );
}
