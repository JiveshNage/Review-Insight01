import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import OverviewCards from '@/components/dashboard/overview-cards';
import TopicExtractionCard from '@/components/dashboard/topic-extraction-card';
import TopicDeduplicationCard from '@/components/dashboard/topic-deduplication-card';
import TrendReportCard from '@/components/dashboard/trend-report-card';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 gap-6">
            <OverviewCards />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TopicExtractionCard />
              <TopicDeduplicationCard />
            </div>
            <TrendReportCard />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
