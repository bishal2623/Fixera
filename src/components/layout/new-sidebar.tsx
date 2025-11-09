'use client';
import { Home, Code2, GraduationCap, Palette, History, Settings, Bot, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Code2, label: "Code Refactor", href: "/code-refactor" },
  { icon: GraduationCap, label: "AI Tutor", href: "/tutor" },
  { icon: Palette, label: "Creative Canvas", href: "/creative-canvas" },
  { icon: History, label: "My History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">Fixera</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.label);
                router.push(item.href);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {/* Placeholder for future auth */}
      </div>
    </aside>
  );
}
