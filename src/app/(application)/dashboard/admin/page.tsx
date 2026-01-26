import DashboardHeader from "@/components/dashboard/layout/header";
import AdminStatSection from "@/components/dashboard/layout/admin/admin-stat-section";
import AdminOverviewSection from "@/components/dashboard/layout/admin/admin-overview-section";

export default function Dashboard() {
    return (
        <section className='flex flex-col bg-primary-dashboard-foreground h-full'>
            {/* Header */}
            <DashboardHeader />

            {/* Stats Summary */}
            <AdminStatSection />

            {/* Admin Overview */}
            <AdminOverviewSection />
        </section >
    )
}
