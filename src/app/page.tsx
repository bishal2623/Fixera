'use client';

import { FeatureCard } from '@/components/landing/feature-card';
import { HowItWorksStep } from '@/components/landing/how-it-works-step';
import { Button } from '@/components/ui/button';
import {
  Code2,
  GraduationCap,
  Palette,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 ml-64">
        {/* Hero Section */}
        <section
          id="home"
          className="h-screen flex items-center justify-center text-center bg-gradient-to-b from-background to-card/50"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
              One Toolkit for All Your Creative Needs
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transform your workflow with AI Co-Builder. Stop switching tabs
              and start co-creating with AI.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--glow)/0.3)] hover:shadow-[0_0_30px_hsl(var(--glow)/0.5)] transition-all"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border hover:bg-card-hover"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Code2}
                title="Code Refactor"
                description="Get AI-powered refactoring suggestions tailored to your coding style"
              />
              <FeatureCard
                icon={GraduationCap}
                title="AI Tutor"
                description="Learn with guided hints and step-by-step problem solving assistance"
              />
              <FeatureCard
                icon={Palette}
                title="Creative Canvas"
                description="AI-powered creative companion for art and design projects"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-12 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Three simple steps to supercharge your creativity with AI
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <HowItWorksStep
                icon={Target}
                step={1}
                title="Choose Your Tool"
                description="Select from Code Refactor, AI Tutor, or Creative Canvas based on your needs"
              />
              <HowItWorksStep
                icon={Sparkles}
                step={2}
                title="Collaborate with AI"
                description="Work alongside AI assistance that understands your unique style and goals"
              />
              <HowItWorksStep
                icon={Zap}
                step={3}
                title="Create & Iterate"
                description="Refine your work with instant feedback and suggestions in real-time"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators using AI Co-Builder to enhance their
              projects
            </p>
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--glow)/0.3)] hover:shadow-[0_0_30px_hsl(var(--glow)/0.5)] transition-all"
            >
              Start Building Now
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
