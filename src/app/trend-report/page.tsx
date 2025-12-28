import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import TrendReportCard from '@/components/dashboard/trend-report-card';
<<<<<<< HEAD
import ReviewSourceCard from '@/components/dashboard/review-source-card';
import { ReviewProvider } from '@/context/review-provider';

export default function TrendReportPage() {
  return (
    <ReviewProvider>
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
            <AppHeader />
            <main className="p-4 lg:p-6 space-y-6">
            <ReviewSourceCard />
            <TrendReportCard />
            </main>
        </SidebarInset>
        </SidebarProvider>
    </ReviewProvider>
=======

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
>>>>>>> origin/main
  );
}
