import KazenticOverview from "../kazentic-overview";
import LeavesCard from "../leaves-card";
import RecentEmailsCard from "../recent-emails-card";
import WeeklyCalendarCard from "../weekly-calendar-card";
import WorkTrendCard from "../work-trend-card";
import MyAssignedTasksCard from "./my-assigned-tasks-card";
import MyStorageCard from "./my-storage-card";
import MyTopTasksCard from "./my-top-tasks-card";

export default function OverviewSection() {
    return (
        <div className='p-4 flex flex-col gap-4'>
            <div className="flex flex-row gap-4">
                {/* Recent Emails */}
                <RecentEmailsCard />

                {/* Weekly Calendar */}
                <WeeklyCalendarCard />

                {/* My Assigned Tasks */}
                <MyAssignedTasksCard />
            </div>

            <div className="flex flex-row gap-4">
                {/* Leaves */}
                <LeavesCard />

                {/* Kazentic Overview */}
                <KazenticOverview />
            </div>

            <div className="flex flex-row gap-4 pt-0">
                <div className="flex-2 flex flex-col gap-4">
                    {/* My Top Tasks */}
                    <MyTopTasksCard />

                    {/* My Storage */}
                    <MyStorageCard />
                </div>
                <div className="flex-1">
                    {/* Work Trend */}
                    <WorkTrendCard />
                </div>
            </div>
        </div>
    )
}
