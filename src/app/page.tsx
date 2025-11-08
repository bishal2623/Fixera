'use client';

import { useRouter } from 'next/navigation';
import { Code2, GraduationCap, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      id: 'ai-tutor',
      title: 'AI Tutor',
      description:
        'Learn with guided hints and step-by-step problem solving assistance',
      icon: GraduationCap,
      path: '/tutor',
      gradient: 'from-accent/20 to-primary/20',
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
    <div className="relative min-h-screen w-full p-8 flex flex-col items-center justify-center bg-background">
      {/* --- Hero Section --- */}
      <div className="w-full text-center py-12 px-4">
        <h1 className="text-5xl font-extrabold mb-4">AI Co-Builder</h1>
        <p className="text-xl text-muted-foreground mb-8">
          One toolkit for all your creative needs.
          <br />
          Stop switching tabs and start co-creating with AI.
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
              style={{
                animation: `fade-in 0.5s ease-out ${
                  index * 100
                }ms forwards`,
              }}
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

      {/* --- How It Works Section --- */}
      <div className="w-full text-center py-16 px-4 mt-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Get production-ready results in 3 simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full font-bold text-2xl mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Tool</h3>
            <p className="text-muted-foreground">
              Pick a specialized AI partner, from a Code Refactor to a Creative
              Canvas.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full font-bold text-2xl mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Provide Your Context</h3>
            <p className="text-muted-foreground">
              Give the AI your code, your topic, or your creative ideas to get
              started.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full font-bold text-2xl mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Co-Create & Iterate</h3>
            <p className="text-muted-foreground">
              Collaborate with the AI, refine your results, and export your
              final work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
