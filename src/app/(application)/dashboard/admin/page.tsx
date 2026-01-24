'use client';

import { BillingProgress } from "@/components/dashboard/admin/billing-progress";
import { EmployeeRow } from "@/components/dashboard/admin/employee-row";
import { ProjectCard } from "@/components/dashboard/admin/project-card";
import { StatItem } from "@/components/dashboard/admin/stat-item";
import { TaskCompletionChart } from "@/components/dashboard/admin/task-completion-chart";
import { TicketCard } from "@/components/dashboard/admin/ticket-card";
import CardContainer from "@/components/dashboard/card-container";
import { CalendarEvent } from "@/components/dashboard/recent-items/calendar/calendar-event";
import { EmailItem } from "@/components/dashboard/recent-items/email-item";
import { LeaveItem } from "@/components/dashboard/recent-items/leave-item";
import { NoticeItem } from "@/components/dashboard/recent-items/notice-item";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TopTaskItem } from "@/components/dashboard/top-task-item";
import { Card } from "@/components/dashboard/ui/card";
import { Underline } from "@/components/dashboard/underline";
import { InsightRow } from "@/components/dashboard/work-trend/insight-row";
import { WorkTrendChart } from "@/components/dashboard/work-trend/work-trend-chart";
import { Badge } from "@/components/sprint-report/ui/badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPLOYEE_PERFORMANCE_DATA, ISSUE_TICKETS } from "@/data/dashboard-data";
import { ArrowDownLeft, Ban, BriefcaseBusiness, CalendarDays, CalendarFold, CalendarX2, Check, CheckCircle2, ChevronDown, CircleDollarSign, ClipboardList, CloudLightning, Coins, CreditCard, Eye, File, FilePlay, Folder, FolderOpen, Hourglass, Image, LifeBuoy, Mail, Pause, PencilLine, RefreshCcw, Sun, TrendingUp, Users, XCircle } from "lucide-react";

enum WEEKLY_CALENDAR_TABS {
    EVENTS = "events",
    NOTICES = "notices",
    LEAVES = "leaves",
}

export default function Dashboard() {
    return (
        <section className='flex flex-col bg-primary-dashboard-foreground h-full'>
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

                <StatsCard
                    title="Events"
                    left={{ value: "12", label: "Today", color: "text-primary-dashboard" }}
                    right={{ value: "100", label: "Upcoming", color: "text-success" }}
                    icon={<CalendarDays className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Notices"
                    left={{ value: "12", label: "New Notices", color: "text-primary-dashboard" }}
                    icon={<CalendarFold className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Forms"
                    left={{ value: "80", label: "New Submissions", color: "text-primary-dashboard" }}
                    // right={{ value: "2", label: "Approved", color: "text-green-600" }}
                    icon={<File className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Support"
                    left={{ value: "12", label: "Tickets Resolved", color: "text-success" }}
                    right={{ value: "2", label: "Tickets Pending", color: "text-orange-500" }}
                    icon={<LifeBuoy className="w-5 h-5 text-border-strong" />}
                />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">
                {/* <div className="flex flex-row gap-4"> */}
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

                {/* Subscription */}
                <CardContainer title="Subscription">
                    <Card className="m-4 flex flex-col gap-6">
                        {/* Top Section */}
                        <div className="flex flex-col justify-between items-start">
                            <div className="flex flex-row justify-between items-center w-full">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary-dashboard">$99</h2>
                                    <p className="text-lg font-semibold mt-1">Pro Plan / Month</p>
                                </div>
                                <Badge className="rounded-md border border-success/60 bg-success/20 text-success gap-1 px-3 py-1 text-sm">
                                    <Check className="w-4 h-4" />
                                    ACTIVE
                                </Badge>
                            </div>
                            <p className="text-muted-foreground mt-2">
                                Architecto voluptatem maiores. Perspiciatis commodi eos. Nam ex ut
                                perspiciatis rerum.
                            </p>

                        </div>

                        {/* Billing Cycle */}
                        <div className="space-y-3 w-full">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Billing Cycle</span>
                                <span className="text-muted-foreground">20% remaining</span>
                            </div>

                            <BillingProgress usedSegments={40} totalSegments={50} />

                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Oct 2025</span>
                                <span>Nov 25</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="m-4 flex flex-col gap-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <SummaryCard
                                label="Members"
                                value="24"
                                icon={<Users className="w-6 h-6 text-primary-dashboard" />}
                                iconClassName="border-primary-dashboard bg-primary-dashboard/10"
                            />
                            <SummaryCard
                                label="Usage"
                                value="80%"
                                icon={<TrendingUp className="w-6 h-6 text-success" />}
                                iconClassName="border-success bg-success/10"
                            />
                        </div>

                        {/* Button */}
                        <Button className="bg-primary-dashboard w-full rounded-xl text-base py-2">
                            Manage Subscriptions
                        </Button>
                    </Card>
                </CardContainer>
                {/* </div> */}
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 pt-0">
                <div className="col-span-2 gap-4 space-y-4 items-start">
                    {/* Kaznetic Overview */}
                    <CardContainer title={<span>Kaznetic Overview <ChevronDown className="w-4 h-4 inline-block text-primary-dashboard" /></span>}>
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

                    <div className="grid grid-cols-2 gap-4 items-start">
                        {/* Jobs Preview */}
                        <CardContainer className="col-span-1" title={<>Jobs Preview <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
                            <div className="grid grid-cols-2 gap-4 p-4">
                                <SummaryCard
                                    icon={<BriefcaseBusiness />}
                                    label="Total Jobs"
                                    value={24}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                                <SummaryCard
                                    icon={<FolderOpen />}
                                    label="Opened"
                                    value={24}
                                    iconClassName="bg-purple-700/10 text-purple-700 border-purple-700/60"
                                />
                                <SummaryCard
                                    icon={<BriefcaseBusiness />}
                                    label="Closed Jobs"
                                    value={2}
                                    iconClassName="bg-destructive/10 text-destructive border-destructive/60"
                                />
                                <SummaryCard
                                    icon={<CheckCircle2 />}
                                    label="Posted Today"
                                    value={2}
                                    iconClassName="bg-success/10 text-success border-success/60"
                                />
                            </div>
                        </CardContainer>

                        {/* Payroll */}
                        <CardContainer className="col-span-1" title={<>Payroll <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
                            <div className="grid grid-cols-2 gap-4 p-4">
                                <SummaryCard
                                    icon={<CircleDollarSign />}
                                    label="Total Payment"
                                    value={24}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                                <SummaryCard
                                    icon={<CreditCard />}
                                    label="Total Paid"
                                    value={24}
                                    iconClassName="bg-success/10 text-success border-success/60"
                                />
                                <SummaryCard
                                    icon={<Coins />}
                                    label="Total Remaining"
                                    value={2}
                                    iconClassName="bg-destructive/10 text-destructive border-destructive/60"
                                />
                            </div>
                        </CardContainer>

                        {/* Leaves */}
                        <CardContainer className="col-span-1" title={<>Leaves <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
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

                        {/* Storage Analytics */}
                        <CardContainer className="col-span-1" title="Storage Analytics">
                            {/* Header */}
                            <div className="flex flex-col gap-4 justify-center items-center p-4 w-full">
                                <h4 className="text-lg font-semibold">40.2 GB</h4>
                                <p className="text-xs text-muted-foreground">of 100 GB has been utilized</p>

                                <BillingProgress className="w-full" usedSegments={40} totalSegments={50} />
                                <p className="text-xs text-muted-foreground">60% remaining</p>
                            </div>


                            <div className="grid grid-cols-2 gap-4 p-4">
                                <SummaryCard
                                    icon={<File />}
                                    label="Documents"
                                    value={24}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                                <SummaryCard
                                    icon={<Folder />}
                                    label="ZIP Files"
                                    value={24}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                                <SummaryCard
                                    icon={<Image />}
                                    label="Images"
                                    value={2}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                                <SummaryCard
                                    icon={<FilePlay />}
                                    label="Videos"
                                    value={2}
                                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                                />
                            </div>
                        </CardContainer>
                    </div>

                    {/* Projects Overview */}
                    <CardContainer className="mt-4" title="Projects Overview">
                        <div className="p-4">

                            <TaskCompletionChart />

                            {/* Active Projects */}
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold">Active Projects</h2>

                                <div className="overflow-x-scroll flex gap-4">
                                    <ProjectCard name="Krown DEX" progress={70} />
                                    <ProjectCard name="Project Name" progress={70} />
                                    <ProjectCard name="Project Name" progress={70} />
                                    <ProjectCard name="Project Name" progress={70} />
                                </div>
                            </div>
                        </div>

                    </CardContainer>

                    {/* Employees Performance This Week */}
                    <CardContainer className="mt-4" title="Employees Performance This Week">
                        <div className="columns-1 p-4 space-y-3">
                            {
                                EMPLOYEE_PERFORMANCE_DATA.map((employee) => (
                                    <EmployeeRow
                                        key={employee.rank}
                                        rank={employee.rank}
                                        name={employee.name}
                                        role={employee.role}
                                        tasks={employee.tasks}
                                        hours={employee.hours}
                                        productivity={employee.productivity}
                                    />
                                ))
                            }
                        </div>
                    </CardContainer>

                </div>
                <div className="col-span-1 space-y-4 gap-4">
                    {/* Work Trend */}
                    <CardContainer title="John Doe's Work Trend">
                        <Card className="space-y-3 rounded-none flex flex-col border-0 text-xs mt-4 border-t border-t-muted-foreground/10">
                            <WorkTrendChart />

                            <div className="space-y-3 w-full">
                                <h4 className="font-semibold text-muted-foreground">
                                    Key Insights
                                </h4>

                                <InsightRow
                                    icon="clock"
                                    title="Peak Hours"
                                    value="10-11 AM, 1-2 PM"
                                />
                                <InsightRow
                                    icon="activity"
                                    title="Most Productive Day"
                                    value="Wednesday | 9H:25M"
                                />
                                <InsightRow
                                    icon="hourglass"
                                    title="Total Working Hours This Week"
                                    value="44H:00M"
                                />
                            </div>

                            {/* Highlight Box */}
                            <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-4 text-indigo-700">
                                💡 Your most productive hours are 10-11 AM and 1-2 PM. Consider
                                scheduling important tasks during these times.
                            </div>
                        </Card>
                    </CardContainer>

                    {/* Recent Tickets */}
                    <CardContainer title="Recent Tickets">
                        <div className="space-y-4 p-4 overflow-y-scroll max-h-180">
                            {
                                ISSUE_TICKETS.map((ticket, index) => (
                                    <TicketCard
                                        key={index}
                                        title={ticket.title}
                                        category={ticket.category}
                                        date={ticket.date}
                                        time={ticket.time}
                                        assignee={ticket.assignee}
                                        ticketId={ticket.ticketId}
                                        status={ticket.status}
                                        priority={ticket.priority}
                                    />
                                ))
                            }
                        </div>
                    </CardContainer>

                    {/* Deals Overview */}
                    <CardContainer title="Deals Overview">
                        <div className="grid grid-cols-2 m-4">
                            <div className="border-r-2 border-muted pb-6">
                                <StatItem value={126} label="Qualify To Buy" color="green" />
                            </div>

                            <div className="pl-6">
                                <StatItem value={25} label="Presentation" color="orange" />
                            </div>

                            <div className="border-r-2 border-muted pr-6 pt-6 border-t-2">
                                <StatItem value={12} label="Contact" color="blue" />
                            </div>

                            <div className="pl-6 pt-6 border-t-2 border-muted">
                                <StatItem value={26} label="Proposal" color="red" />
                            </div>
                        </div>
                    </CardContainer>

                    {/* Leads Overview */}
                    <CardContainer title="Leads Overview">
                        <div className="grid grid-cols-2 m-4">
                            <div className="border-r-2 border-muted pb-6">
                                <StatItem value={126} label="Not Contacted" color="orange" />
                            </div>

                            <div className="pl-6">
                                <StatItem value={25} label="Contacted" color="green" />
                            </div>

                            <div className="border-r-2 border-muted pr-6 pt-6 border-t-2">
                                <StatItem value={12} label="Closed" color="purple" />
                            </div>

                            <div className="pl-6 pt-6 border-t-2 border-muted">
                                <StatItem value={26} label="Lost" color="red" />
                            </div>
                        </div>
                    </CardContainer>
                </div>
            </div>
        </section >
    )
}
