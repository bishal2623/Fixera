'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CodeXml,
  Palette,
  BotMessageSquare,
  Home,
  GraduationCap,
  Sun,
  Moon,
  Paintbrush,
} from 'lucide-react';
import { type ReactNode, useState, useEffect } from 'react';
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
import { ThemePicker } from '@/components/theme-picker';

const navItems = [
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    // Render a placeholder or null on the server and initial client render
    return <div className="h-10 w-10" />;
  }

  // Find if the current theme is one of the dark variants
  const isDark =
    theme === 'dark' ||
    theme === 'midnight-blue' ||
    theme === 'forest-green' ||
    theme === 'sunset-orange' ||
    theme === 'purple-haze' ||
    theme === 'high-contrast';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle light/dark theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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
          <div className="flex items-center justify-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPickerOpen(true)}
            >
              <Paintbrush className="h-5 w-5" />
            </Button>
          </div>
          <ThemePicker open={isPickerOpen} onOpenChange={setIsPickerOpen} />
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
