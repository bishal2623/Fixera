'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/new-sidebar';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

const protectedRoutes = [
    '/',
    '/code-refactor',
    '/tutor',
    '/creative-canvas',
    '/history',
    '/settings'
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // const { user, isLoading } = useUser();
  const isAuthPage = pathname === '/auth';

  // useEffect(() => {
  //   if (!isLoading && !user && protectedRoutes.includes(pathname)) {
  //       router.push('/auth');
  //   }
  // }, [user, isLoading, pathname, router]);

  // if (isLoading && protectedRoutes.includes(pathname)) {
  //   return (
  //       <div className="flex items-center justify-center h-screen">
  //           <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  //       </div>
  //   );
  // }

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
