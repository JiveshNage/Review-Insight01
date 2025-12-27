import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import TopicDeduplicationCard from '@/components/dashboard/topic-deduplication-card';

export default function TopicDeduplicationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main className="p-4 lg:p-6">
          <TopicDeduplicationCard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
