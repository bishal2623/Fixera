'use client';

import { useRouter } from 'next/navigation';
import { Code2, GraduationCap, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();

  const tools = [
    {
      id: 'code-refactor',
      title: 'Code Refactor',
      description:
        'Get AI-powered refactoring suggestions tailored to your coding style',
      icon: Code2,
      path: '/code-refactor',
      gradient: 'from-primary/20 to-accent/20',
    },
    {
      id: 'creative-canvas',
      title: 'Creative Canvas',
      description: 'AI-powered creative companion for art and design projects',
      icon: Palette,
      path: '/creative-canvas',
      gradient: 'from-secondary/20 to-primary/20',
    },
  ];

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center justify-center bg-background">
      <div className="text-center mb-16" style={{ animation: 'fade-in 0.5s ease-out' }}>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          AI Co-Builder
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your AI-powered tool to enhance your workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              onClick={() => router.push(tool.path)}
              className={cn(
                'bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg',
                'flex flex-col items-center text-center',
                'transition-all duration-300',
                'hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl cursor-pointer',
                'opacity-0'
              )}
              style={{ animation: `fade-in 0.5s ease-out ${index * 100}ms forwards` }}
            >
              <div
                className={cn(
                  'w-20 h-20 rounded-2xl mb-6',
                  'flex items-center justify-center',
                  'bg-gradient-to-br',
                  tool.gradient
                )}
              >
                <Icon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">{tool.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
