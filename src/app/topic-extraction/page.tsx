import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import TopicExtractionCard from '@/components/dashboard/topic-extraction-card';

export default function TopicExtractionPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main className="p-4 lg:p-6">
          <TopicExtractionCard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
