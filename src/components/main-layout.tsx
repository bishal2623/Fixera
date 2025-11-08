'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CodeXml,
  Palette,
  BotMessageSquare,
  Home,
  GraduationCap,
  History,
  Settings,
} from 'lucide-react';
import type { ReactNode } from 'react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const mainNavItems = [
  { href: '/', label: 'Home', icon: Home, tooltip: 'Home' },
  {
    href: '/code-refactor',
    label: 'Code Refactor',
    icon: CodeXml,
    tooltip: 'Code Refactor',
  },
  {
    href: '/tutor',
    label: 'AI Tutor',
    icon: GraduationCap,
    tooltip: 'AI Tutor',
  },
  {
    href: '/creative-canvas',
    label: 'Creative Canvas',
    icon: Palette,
    tooltip: 'Creative Canvas',
  },
];

const secondaryNavItems = [
    {
        href: '/history',
        label: 'My History',
        icon: History,
        tooltip: 'My History'
    },
    {
        href: '/settings',
        label: 'Settings',
        icon: Settings,
        tooltip: 'Settings'
    }
]

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
            {mainNavItems.map((item) => (
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
          <SidebarSeparator />
           <SidebarMenu>
            {secondaryNavItems.map((item) => (
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
        <SidebarFooter>
            {/* Footer can be used for user profile, etc. later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="max-w-full overflow-x-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">AI Co-Builder</h1>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
