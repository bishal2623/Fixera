'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml, Palette, BotMessageSquare } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/', label: 'Code Refactor', icon: CodeXml, tooltip: 'Code Refactor' },
  { href: '/creative-canvas', label: 'Creative Canvas', icon: Palette, tooltip: 'Creative Canvas' },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-2">
          <div className="flex h-10 items-center gap-2 rounded-md bg-card px-3">
             <Link href="/" className="flex items-center gap-2 font-semibold">
                <BotMessageSquare className="size-6 text-primary" />
                <span className="text-lg">AI Co-Builder</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="max-w-full overflow-x-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:hidden">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">AI Co-Builder</h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
