'use client';

import { Filter, Plus, RefreshCcw, Settings } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import { CustomizeViewTrigger } from "../custom/customize-view-trigger";
import { StatCard } from "../custom/stat-card";
import CardContainer from "./card-container";
import PriorityBreakdownChart from "../custom/priority-breakdown-chart";
import { TasksByAssigneeChart } from "../custom/task-by-assignee-chart";
import TotalTimeInStatusChart from "../custom/total-time-status-chart";
import { SprintBurnDownChart } from "../custom/sprint-burn-down-chart";
import { SprintMeta, SprintStats } from "../custom/sprint-task-report";
import { TaskBreakdown } from "../custom/task-breakdown";

type filterType = "collapsed" | "expanded" | "separate"

export default function SprintReportingTab() {
    const [filterType, setFilterType] = useState<filterType>("collapsed")

    return (
        <div className="flex flex-col">
            {/* header */}
            <div className="flex justify-between items-center border-b px-4 pb-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <RefreshCcw className="mr-0.5" />
                            Refresh
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuRadioGroup defaultChecked onValueChange={(value) => setFilterType(value as filterType)} value={filterType}>
                            <DropdownMenuLabel>Filter Subtask</DropdownMenuLabel>
                            <DropdownMenuRadioItem value="collapsed">Collapsed</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="expanded">Expanded</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="separate">Separate</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-0.5" />
                        Filter
                    </Button>

                    {/* Customize View Button */}
                    <CustomizeViewTrigger />

                    <Button size="sm">
                        <Plus className="mr-0.5 stroke-3" />
                        Add Widget
                    </Button>
                </div>
            </div>

            {/* body */}
            <div className="grow">
                <div className="grid grid-cols-4 gap-4 p-4">
                    {/* Stat Cards */}
                    <StatCard label="Total Tasks" total={120} />
                    <StatCard label="Not Started" total={85} />
                    <StatCard label="Overdue" total={25} />
                    <StatCard label="Completed" total={10} />

                    {/* Summary */}
                    <CardContainer
                        className="col-span-2"
                        title="Priority Breakdown"
                        chartTitle="Line Chart"
                        chart={true}
                    >
                        <PriorityBreakdownChart />
                    </CardContainer>

                    <CardContainer
                        className="col-span-2"
                        title="Tasks by Assignee"
                        chartTitle="Pie Chart"
                        chart={true}
                    >
                        <TasksByAssigneeChart />
                    </CardContainer>

                    <CardContainer
                        className="col-span-2"
                        title="Total time in Status"
                        chartTitle="Bar Chart"
                        chart={true}
                    >
                        <TotalTimeInStatusChart />
                    </CardContainer>

                    <CardContainer
                        className="col-span-2"
                        title="Sprint Burn down"
                        chartTitle="Sprint Burn down"
                        chart={true}
                    >
                        <SprintBurnDownChart />
                    </CardContainer>

                    <CardContainer className="col-span-2" title="Sprint Task Report" filterBtn={false}>
                        <div className="space-y-4">
                            <SprintMeta />
                            <SprintStats />
                            <TaskBreakdown />
                        </div>
                    </CardContainer>

                </div>
            </div>
        </div >
    )
}