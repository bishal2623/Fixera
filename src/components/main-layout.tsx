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
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home, tooltip: 'Home' },
  { href: '/code-refactor', label: 'Code Refactor', icon: CodeXml, tooltip: 'Code Refactor' },
  { href: '/tutor', label: 'AI Tutor', icon: GraduationCap, tooltip: 'AI Tutor' },
  { href: '/creative-canvas', label: 'Creative Canvas', icon: Palette, tooltip: 'Creative Canvas' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
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
