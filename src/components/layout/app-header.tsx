import { Bot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex md:hidden" />
        <Bot className="hidden size-6 text-primary md:flex" />
        <h1 className="text-xl font-semibold text-card-foreground">
          Review Insights
        </h1>
      </div>
    </header>
  );
}
