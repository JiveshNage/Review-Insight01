import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import TrendReportCard from '@/components/dashboard/trend-report-card';

export default function TrendReportPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main className="p-4 lg:p-6">
          <TrendReportCard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
