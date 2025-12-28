import AppHeader from '@/components/layout/app-header';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import OverviewCards from '@/components/dashboard/overview-cards';
import ReviewSourceCard from '@/components/dashboard/review-source-card';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReviewSourceCard />
            <OverviewCards />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
