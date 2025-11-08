'use client';
import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
}

export function HowItWorksStep({ icon: Icon, step, title, description }: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(var(--glow)/0.15)]">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
}
