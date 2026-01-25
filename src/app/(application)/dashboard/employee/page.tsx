import DashboardHeader from "@/components/dashboard/layout/header";
import OverviewSection from "@/components/dashboard/layout/overview-section";
import DashboardStatSection from "@/components/dashboard/layout/stat-section";


export default function Dashboard() {
    return (
        <section className='flex flex-col bg-primary-dashboard-foreground h-full'>
            {/* Header */}
            <DashboardHeader />

            {/* Stats Summary */}
            <DashboardStatSection />

            {/* Dashboard Overview */}
            <OverviewSection />
        </section >
    )
}
