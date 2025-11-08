'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemePicker } from '@/components/theme-picker';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDark =
    theme === 'dark' ||
    theme === 'midnight-blue' ||
    theme === 'forest-green' ||
    theme === 'sunset-orange' ||
    theme === 'purple-haze' ||
    theme === 'high-contrast';

  return (
    <Button
      variant="outline"
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


export default function SettingsPage() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card>
          <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-semibold">Light / Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                    Toggle between light and dark themes.
                </p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                    <h3 className="font-semibold">Color Theme</h3>
                    <p className="text-sm text-muted-foreground">
                        Choose from a variety of color palettes.
                    </p>
                </div>
                <Button variant="outline" onClick={() => setIsPickerOpen(true)}>
                    <Paintbrush className="h-4 w-4 mr-2" />
                    Customize Theme
                </Button>
            </div>
          </CardContent>
      </Card>
      
      <ThemePicker open={isPickerOpen} onOpenChange={setIsPickerOpen} />
    </div>
  );
}
