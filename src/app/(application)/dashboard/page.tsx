'use client';

import { CalendarEvent } from "@/components/dashboard/recent-items/calendar/calendar-event";
import { EmailItem } from "@/components/dashboard/recent-items/email-item";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Ban, ClipboardList, CloudLightning, Ellipsis, Mail, Sun } from "lucide-react";
import { useState } from "react";

enum TABS {
    EVENTS = "events",
    NOTICES = "notices",
    LEAVES = "leaves",
}
type Tab = (typeof TABS)[keyof typeof TABS]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>(TABS.EVENTS)
    return (
        <section className='flex flex-col bg-primary-foreground h-full overflow-scroll'>
            <div className="p-4 flex items-center justify-between border-b border-b-border">
                <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-6 tracking-[-0.05em] align-middle">
                        {/* TODO: text-primary should be the color of text-btn-primary */}
                        Good Morning, <span className="text-btn-primary">John Doe</span> <Sun className="inline-block w-4 h-4" color="#FD6A45" />
                    </h1>
                    <p className="text-xs font-medium leading-6 tracking-[-0.05em] align-middle text-muted-foreground">
                        Welcome back! Here's an overview of your workspace.
                    </p>
                </div>

                <Button variant="default" size="sm" className="px-2 py-1.5 text-sm rounded-md">Task Summary</Button>
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
                    <div className="flex-1 rounded-xl border border-border bg-background overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between bg-[#F2F9FE] px-4 py-3">
                            <p className="text-sm font-semibold">Recent Emails</p>
                            <Ellipsis className="text-muted-foreground" />
                        </div>

                        {/* List */}
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

                    </div>

                    {/* Weekly Calendar */}
                    <div className="flex-1 rounded-xl border border-border bg-background overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between bg-[#F2F9FE] px-4 py-3">
                            <p className="text-sm font-semibold">Weekly Calendar</p>
                            <Ellipsis className="text-muted-foreground" />
                        </div>

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
                                                ? "bg-primary text-primary-foreground"
                                                : "text-foreground"
                                                }`}
                                        >
                                            {day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        {/* <div className="border-b px-4">
                            <div className="flex gap-6 text-sm font-medium">
                                {[
                                    { id: "events", label: "Events" },
                                    { id: "notices", label: "Recent Notices" },
                                    { id: "leaves", label: "Leaves" },
                                ].map((tab) => {
                                    const active = activeTab === tab.id

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as Tab)}
                                            className={cn(
                                                "relative pb-3 transition",
                                                active ? "text-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            {tab.label}
                                            {active && (
                                                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div> */}

                        <Tabs defaultValue={TABS.EVENTS}
                            className="w-full p-4"
                        >
                            {/* Tabs header */}
                            <TabsList className="h-auto bg-transparent p-0" variant="line">
                                <TabsTrigger value={TABS.EVENTS}>
                                    Events
                                    {/* <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary data-[state=inactive]:hidden" /> */}
                                </TabsTrigger>

                                <TabsTrigger value={TABS.NOTICES}>
                                    Recent Notices
                                    {/* <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary data-[state=inactive]:hidden" /> */}
                                </TabsTrigger>

                                <TabsTrigger value={TABS.LEAVES}>
                                    Leaves
                                    {/* <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary data-[state=inactive]:hidden" /> */}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value={TABS.EVENTS}>
                                <div className="space-y-3 p-4">
                                    <CalendarEvent />
                                    <CalendarEvent />
                                    <CalendarEvent />
                                </div>
                            </TabsContent>
                            <TabsContent value={TABS.NOTICES}>Change your password here.</TabsContent>
                            <TabsContent value={TABS.LEAVES}>Delete your account here.</TabsContent>
                        </Tabs>
                    </div>

                    {/* My Assigned Tasks */}
                    <div className="flex-1 rounded-xl border border-border bg-background overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between bg-[#F2F9FE] px-4 py-3">
                            <p className="text-sm font-semibold">Recent Emails</p>
                            <Ellipsis className="text-muted-foreground" />
                        </div>

                        {/* List */}
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

                    </div>
                </div>
                <div>
                    <div className="flex-1 h-20 w-full rounded-xl border border-border bg-background overflow-hidden">
                    </div>
                </div>
                <div>
                    <div className="flex-1 h-20 w-full rounded-xl border border-border bg-background overflow-hidden">
                    </div>
                </div>
            </div>
        </section >
    )
}
