'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit } from "lucide-react";

// Mock data - replace with actual data fetching
const historyItems = [
  { id: 1, type: 'AI Tutor', topic: 'React Hooks', date: '2 hours ago', status: 'Completed' },
  { id: 2, type: 'Code Refactor', topic: 'JavaScript Array Methods', date: 'Yesterday', status: 'Completed' },
  { id: 3, type: 'Creative Canvas', topic: 'Logo for a SaaS company', date: '3 days ago', status: 'Completed' },
  { id: 4, type: 'AI Tutor', topic: 'Python decorators', date: 'Last week', status: 'In Progress' },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">My History</h1>
          <p className="text-sm text-muted-foreground">
            A log of your recent sessions with Fixera
          </p>
        </div>
      </header>

      <div className="flex-1 p-6">
        {historyItems.length > 0 ? (
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {historyItems.map((item) => (
                <Card key={item.id} className="hover:bg-card-hover transition-colors">
                  <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                    <div className="space-y-1">
                      <CardTitle>{item.type}</CardTitle>
                      <CardDescription>{item.topic}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                      <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'} className="w-full justify-center">{item.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">{item.date}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8 border-2 border-dashed rounded-lg bg-background">
            <BrainCircuit className="size-12 mb-4" />
            <p className="font-medium">No history yet.</p>
            <p className="text-sm">
              Your session history will appear here once you start using the tools.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
