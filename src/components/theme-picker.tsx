'use client';

import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface ThemePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themes = [
  {
    name: 'light',
    label: 'Light',
    description: 'The default light theme.',
    colors: ['#FFFFFF', '#F0F4F8', '#29ABE2'],
  },
  {
    name: 'dark',
    label: 'Dark',
    description: 'The default dark theme.',
    colors: ['#0B1120', '#111827', '#29ABE2'],
  },
  {
    name: 'midnight-blue',
    label: 'Midnight Blue',
    description: 'A deep blue and purple professional theme.',
    colors: ['#1D243D', '#283150', '#7C3AED'],
  },
  {
    name: 'forest-green',
    label: 'Forest Green',
    description: 'A calming theme with greens and teals.',
    colors: ['#162420', '#1A2D27', '#10B981'],
  },
  {
    name: 'sunset-orange',
    label: 'Sunset Orange',
    description: 'A warm and energetic orange/coral theme.',
    colors: ['#2A211E', '#3B2D2A', '#F97316'],
  },
  {
    name: 'ocean-blue',
    label: 'Ocean Blue',
    description: 'A cool and refreshing blue/cyan theme.',
    colors: ['#F0F9FF', '#E0F2FE', '#0EA5E9'],
  },
  {
    name: 'purple-haze',
    label: 'Purple Haze',
    description: 'A vibrant theme with purple and pink gradients.',
    colors: ['#1F1C2C', '#2A263E', '#A855F7'],
  },
  {
    name: 'high-contrast',
    label: 'High Contrast',
    description: 'An accessibility-focused theme.',
    colors: ['#000000', '#FFFFFF', '#FFFF00'],
  },
];

export function ThemePicker({ open, onOpenChange }: ThemePickerProps) {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Customize Theme</SheetTitle>
          <SheetDescription>
            Pick a theme that fits your style. The changes will be applied
            instantly.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-4rem)] mt-4 pr-4">
          <div className="grid grid-cols-1 gap-4 py-4">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className={cn(
                  'rounded-lg border-2 p-4 transition-all',
                  activeTheme === theme.name
                    ? 'border-primary'
                    : 'border-transparent hover:border-border'
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{theme.label}</h3>
                  {activeTheme === theme.name && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="mb-3 flex items-center space-x-2">
                  {theme.colors.map((color) => (
                    <div
                      key={color}
                      className="h-8 w-8 rounded-full border border-border/50"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {theme.description}
                </p>
                <Button
                  onClick={() => {
                    setTheme(theme.name);
                    onOpenChange(false);
                  }}
                  variant={activeTheme === theme.name ? 'default' : 'outline'}
                  className="w-full"
                >
                  Apply Theme
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
