'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml, Palette, BotMessageSquare, Home, GraduationCap, Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTheme } from 'next-themes';

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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const navItems = [
  { href: '/', label: 'Home', icon: Home, tooltip: 'Home' },
  { href: '/code-refactor', label: 'Code Refactor', icon: CodeXml, tooltip: 'Code Refactor' },
  { href: '/tutor', label: 'AI Tutor', icon: GraduationCap, tooltip: 'AI Tutor' },
  { href: '/creative-canvas', label: 'Creative Canvas', icon: Palette, tooltip: 'Creative Canvas' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        id="theme-switch"
        checked={isDark}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  )
}


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
        <SidebarFooter>
          <ThemeToggle />
        </SidebarFooter>
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
