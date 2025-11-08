'use client';

import { Archive } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My History</h1>

      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-lg border border-dashed">
        <Archive className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No History Yet</h2>
        <p className="text-muted-foreground">
          Your saved chats and refactored code will appear here.
        </p>
      </div>
    </div>
  );
}
