'use client';

import CardContainer from "@/components/dashboard/card-container";
import { CalendarEvent } from "@/components/dashboard/recent-items/calendar/calendar-event";
import { EmailItem } from "@/components/dashboard/recent-items/email-item";
import { LeaveItem } from "@/components/dashboard/recent-items/leave-item";
import { NoticeItem } from "@/components/dashboard/recent-items/notice-item";
import { TaskItem } from "@/components/dashboard/recent-items/task-item";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TopTaskItem } from "@/components/dashboard/top-task-item";
import { Card } from "@/components/dashboard/ui/card";
import { Underline } from "@/components/dashboard/underline";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown01, ArrowDownLeft, ArrowDownNarrowWide, Ban, CalendarDays, CalendarFold, CalendarX2, CheckCircle, CheckCircle2, ChevronDown, ClipboardList, Clock, CloudLightning, Ellipsis, Eye, Hourglass, Mail, Pause, PencilLine, RefreshCcw, Sun, XCircle } from "lucide-react";

enum WEEKLY_CALENDAR_TABS {
    EVENTS = "events",
    NOTICES = "notices",
    LEAVES = "leaves",
}

enum ASSIGNED_TASKS_TABS {
    RECENT = "recent",
    DUE = "due"
}


export default function Dashboard() {
    return (
        <section className='flex flex-col bg-primary-dashboard-foreground h-full overflow-scroll'>
            <div className="p-4 flex items-center justify-between border-b border-b-border">
                <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-6 tracking-[-0.05em] align-middle">
                        Good Morning, <span className="text-primary-dashboard">John Doe</span> <Sun className="inline-block w-4 h-4" color="#FD6A45" />
                    </h1>
                    <p className="text-xs font-medium leading-6 tracking-[-0.05em] align-middle text-muted-foreground">
                        Welcome back! Here's an overview of your workspace.
                    </p>
                </div>

                <Button variant="default" size="sm" className="px-2 py-1.5 text-sm rounded-md bg-primary-dashboard text-primary-dashboard-foreground">Task Summary</Button>
            </div>
            <div className="p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4 border-b border-b-border">
                <StatsCard
                    title="Emails"
                    left={{ value: "12", label: "Unread", color: "text-blue-600" }}
                    right={{ value: "100", label: "Received Today", color: "text-green-600" }}
                    icon={<Mail className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Tasks"
                    left={{ value: "12", label: "Completed", color: "text-green-600" }}
                    right={{ value: "2", label: "Pending", color: "text-orange-500" }}
                    icon={<ClipboardList className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Storage"
                    left={{ value: "80 GB", label: "Overall Storage Used", color: "text-blue-600" }}
                    icon={<CloudLightning className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Leaves"
                    left={{ value: "12", label: "Pending", color: "text-orange-500" }}
                    right={{ value: "2", label: "Approved", color: "text-green-600" }}
                    icon={<Ban className="w-5 h-5 text-border-strong" />}
                />
            </div>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    {/* Recent Emails */}
                    <CardContainer title="Recent Emails">
                        <div className="space-y-3 p-4">
                            <EmailItem
                                starred
                                title="Project Update Required"
                                sender="Md. Al-Amin"
                                time="2 Min Ago"
                            />

                            <EmailItem
                                starred
                                title="Project Update Required"
                                sender="Md. Al-Amin"
                                time="2 Min Ago"
                            />

                            <EmailItem
                                title="Project Update Required"
                                sender="Md. Al-Amin"
                                time="2 Min Ago"
                            />

                            <EmailItem
                                title="Project Update Required"
                                sender="Md. Al-Amin"
                                time="2 Min Ago"
                            />

                            <EmailItem
                                title="Welcome Aboard"
                                sender="Md. Al-Amin"
                                time="2 Min Ago"
                            />
                        </div>
                    </CardContainer>

                    {/* Weekly Calendar */}
                    <CardContainer title="Weekly Calendar">
                        {/* Calendar dates */}
                        <div className="px-4 pt-4">
                            <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                    <span key={d}>{d}</span>
                                ))}
                            </div>

                            <div className="mt-2 grid grid-cols-7 text-center">
                                {[14, 15, 16, 17, 18, 19, 20].map((day, i) => (
                                    <div key={day} className="flex justify-center">
                                        <span
                                            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${i === 0
                                                ? "bg-primary-dashboard text-primary-dashboard-foreground"
                                                : "text-foreground"
                                                }`}
                                        >
                                            {day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Tabs defaultValue={WEEKLY_CALENDAR_TABS.EVENTS}
                            className="w-full py-4"
                        >
                            {/* Tabs header */}
                            <TabsList className="relative h-auto bg-transparent p-0" variant="line">
                                <TabsTrigger value={WEEKLY_CALENDAR_TABS.EVENTS}>
                                    <CalendarDays className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                                    Events
                                    <Underline />
                                </TabsTrigger>

                                <TabsTrigger value={WEEKLY_CALENDAR_TABS.NOTICES}>
                                    <CalendarFold className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                                    Recent Notices
                                    <Underline />
                                </TabsTrigger>

                                <TabsTrigger value={WEEKLY_CALENDAR_TABS.LEAVES}>
                                    <Ban className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                                    Leaves
                                    <Underline />
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value={WEEKLY_CALENDAR_TABS.EVENTS}>
                                <div className="space-y-3 px-4">
                                    <CalendarEvent />
                                    <CalendarEvent />
                                    <CalendarEvent />
                                </div>
                            </TabsContent>
                            <TabsContent value={WEEKLY_CALENDAR_TABS.NOTICES}>
                                <div className="space-y-3 px-4">
                                    <NoticeItem />
                                    <NoticeItem />
                                    <NoticeItem />
                                </div>
                            </TabsContent>
                            <TabsContent value={WEEKLY_CALENDAR_TABS.LEAVES}>
                                <div className="space-y-3 px-4">
                                    <LeaveItem />
                                    <LeaveItem />
                                    <LeaveItem />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContainer>

                    {/* My Assigned Tasks */}
                    <CardContainer title="My Assigned Tasks">
                        <Tabs defaultValue={ASSIGNED_TASKS_TABS.RECENT}
                            className="w-full py-4"
                        >
                            {/* Tabs header */}
                            <TabsList className="relative h-auto bg-transparent p-0" variant="line">
                                <TabsTrigger value={ASSIGNED_TASKS_TABS.RECENT}>
                                    <ClipboardList className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                                    Recent Tasks
                                    <Underline />
                                </TabsTrigger>

                                <TabsTrigger value={ASSIGNED_TASKS_TABS.DUE}>
                                    <Clock className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                                    Due Soon
                                    <Underline />
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value={ASSIGNED_TASKS_TABS.RECENT}>
                                <div className="space-y-3 px-4">
                                    <TaskItem />
                                    <TaskItem />
                                    <TaskItem />
                                </div>
                            </TabsContent>
                            <TabsContent value={ASSIGNED_TASKS_TABS.DUE}>
                                <div className="space-y-3 px-4">
                                    <TaskItem />
                                    <TaskItem />
                                    <TaskItem />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContainer>
                </div>
            </div>
            <div className="flex flex-row gap-4 p-4 pt-0">
                <CardContainer className="flex-1" title={<>Leaves <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <SummaryCard
                            icon={<CalendarDays />}
                            label="Annual Leaves"
                            value={24}
                            iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                        />
                        <SummaryCard
                            icon={<CheckCircle2 />}
                            label="Approved"
                            value={24}
                            iconClassName="bg-success/10 text-success border-success/60"
                        />
                        <SummaryCard
                            icon={<Ban />}
                            label="Emergency"
                            value={2}
                            iconClassName="bg-destructive/10 text-destructive border-destructive/60"
                        />
                        <SummaryCard
                            icon={<CalendarX2 />}
                            label="Unpaid Leave"
                            value={2}
                            iconClassName="bg-cyan-500/10 text-cyan-500 border-cyan-500/60"
                        />
                    </div>
                </CardContainer>
                <CardContainer className="flex-2" title={<span>Kaznetic Overview <ChevronDown className="w-4 h-4 inline-block text-primary-dashboard" /></span>}>
                    <div className="grid grid-cols-4 gap-4 p-4">
                        <SummaryCard
                            icon={<PencilLine />}
                            label="To Do"
                            value={24}
                            iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                        />
                        <SummaryCard
                            icon={<Hourglass />}
                            label="In Progress"
                            value={24}
                            iconClassName="bg-purple-600/10 text-purple-600 border-purple-600/60"
                        />
                        <SummaryCard
                            icon={<Pause />}
                            label="On Hold"
                            value={24}
                            iconClassName="bg-orange-600/10 text-orange-600 border-orange-600/60"
                        />
                        <SummaryCard
                            icon={<XCircle />}
                            label="Cancelled"
                            value={24}
                            iconClassName="bg-red-600/10 text-red-600 border-red-600/60"
                        />
                        <SummaryCard
                            icon={<ArrowDownLeft />}
                            label="Backlog"
                            value={24}
                            iconClassName="bg-sky-600/10 text-sky-600 border-sky-600/60"
                        />
                        <SummaryCard
                            icon={<Eye />}
                            label="Code Review"
                            value={24}
                            iconClassName="bg-slate-600/10 text-slate-600 border-slate-600/60"
                        />
                        <SummaryCard
                            icon={<CheckCircle2 />}
                            label="Completed"
                            value={24}
                            iconClassName="bg-success/10 text-success border-success/60"
                        />
                        <SummaryCard
                            icon={<RefreshCcw />}
                            label="In Review"
                            value={24}
                            iconClassName="bg-amber-700/10 text-amber-700 border-amber-700/60"
                        />
                    </div>
                </CardContainer>
            </div>
            <div className="flex flex-row gap-4 p-4 pt-0">
                <div className="flex-3 flex flex-col gap-4">
                    <CardContainer title="My Top Tasks">
                        <div className="space-y-4 p-4">
                            <TopTaskItem />
                            <TopTaskItem />
                            <TopTaskItem />
                        </div>
                    </CardContainer>
                    <CardContainer title={<>My Storage <span className="text-xs font-light text-muted-foreground">(Recent Uploaded Files &amp; Folders)</span></>}>
                        <Card className="p-4">
                            <TaskItem />
                        </Card>
                    </CardContainer>
                </div>
                <div className="flex-1">
                    <CardContainer title="John Doe's Work Trend">
                        <TaskItem />
                    </CardContainer>
                </div>
            </div>
        </section >
    )
}
