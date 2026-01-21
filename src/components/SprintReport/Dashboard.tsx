/**
 * Dashboard Component
 * 
 * Provides a high-level overview of project metrics using:
 * - Summary cards for task status counts
 * - Charts for priority, assignee, time, and burn down
 * - Detailed sprint task reports
 */

import React from 'react';

// --- Components ---
import { SummaryCard } from './SummaryCard';
import { PriorityBreakdown } from './sprint/PriorityBreakdown';
import { TasksByAssignee } from './sprint/TasksByAssignee';
import { TotalTimeInStatus } from './sprint/TotalTimeInStatus';
import { SprintBurnDown } from './sprint/SprintBurnDown';
import { SprintTaskReport } from './sprint/SprintTaskReport';

export const Dashboard = () => {
    return (
        <div className="p-8 bg-[#fcfcfc] min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard title="Total Tasks" value={26} />
                    <SummaryCard title="Not Started" value={26} />
                    <SummaryCard title="Overdue" value={26} />
                    <SummaryCard title="Completed" value={26} />
                </div>

                {/* Charts Section 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PriorityBreakdown />
                    <TasksByAssignee />
                </div>

                {/* Charts Section 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TotalTimeInStatus />
                    <SprintBurnDown />
                </div>

                {/* Full Width Report Section */}
                <div className="w-full">
                    <SprintTaskReport />
                </div>
            </div>
        </div>
    );
};
