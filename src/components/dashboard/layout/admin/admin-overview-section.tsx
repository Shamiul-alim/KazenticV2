import RecentEmailsCard from "../recent-emails-card";
import WeeklyCalendarCard from "../weekly-calendar-card";
import SubscriptionCard from "./subscription-card";
import KazenticOverview from "../kazentic-overview";
import JobsPreviewCard from "./jobs-preview-card";
import PayrollCard from "./payroll-card";
import LeavesCard from "../leaves-card";
import StorageAnalyticsCard from "./storage-analytics-card";
import ProjectsOverviewCard from "./projects-overview-card";
import EmployeesPerformanceCard from "./employees-performance-card";
import WorkTrendCard from "../work-trend-card";
import RecentTicketsCard from "./recent-tickets-card";
import DealsOverviewCard from "./deals-overview-card";
import LeadsOverviewCard from "./leads-overview-card";

export default function AdminOverviewSection() {
    return (
        <>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <RecentEmailsCard />

                {/* Weekly Calendar */}
                <WeeklyCalendarCard />

                {/* Subscription */}
                <SubscriptionCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pt-0 text-xs">
                <div className="lg:col-span-2 gap-4 space-y-4 items-start">
                    {/* Kaznetic Overview */}
                    <KazenticOverview />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        {/* Jobs Preview */}
                        <JobsPreviewCard />

                        {/* Payroll */}
                        <PayrollCard />

                        {/* Leaves */}
                        <LeavesCard />

                        {/* Storage Analytics */}
                        <StorageAnalyticsCard />
                    </div>

                    {/* Projects Overview */}
                    <ProjectsOverviewCard />

                    {/* Employees Performance This Week */}
                    <EmployeesPerformanceCard />
                </div>

                <div className="lg:col-span-1 space-y-4 gap-4">
                    {/* Work Trend */}
                    <WorkTrendCard />

                    {/* Recent Tickets */}
                    <RecentTicketsCard />

                    {/* Deals Overview */}
                    <DealsOverviewCard />

                    {/* Leads Overview */}
                    <LeadsOverviewCard />
                </div>
            </div></>
    )
}
