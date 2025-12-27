'use client';

import {
  Bot,
  Combine,
  FileText,
  LayoutDashboard,
  Tags,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/#topic-extraction',
    icon: Tags,
    label: 'Topic Extraction',
  },
  {
    href: '/#topic-deduplication',
    icon: Combine,
    label: 'Topic Deduplication',
  },
  {
    href: '/#trend-report',
    icon: FileText,
    label: 'Trend Report',
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50 bg-card text-card-foreground" variant="sidebar">
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-2 p-2">
          <Bot className="size-8 text-primary" />
          <span className="text-lg font-semibold">Review Insights</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                // A simple way to check for active link.
                // For a real app, a more robust solution is needed.
                isActive={pathname === item.href}
                className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
