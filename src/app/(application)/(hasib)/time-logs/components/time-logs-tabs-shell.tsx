"use client"

import ClockIcon from "@/components/icons/clock"
import HourGlassIcon from "@/components/icons/hour-glass"
import TimerClockIcon from "@/components/icons/timer-clock"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import * as React from "react"

const tabs = [
    {
        value: "time-tracker",
        label: "Time Tracker",
        icon: TimerClockIcon,
    },
    {
        value: "time-logs",
        label: "Time Logs",
        icon: ClockIcon,
    },
    {
        value: "all-time-logs",
        label: "All Time Logs",
        icon: HourGlassIcon,
    },
    {
        value: "review-requests",
        label: "Review Requests",
        icon: CheckCircle2,
    },
] as const

export default function TimeLogsTabsShell({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const segment = useSelectedLayoutSegment()

    const activeTab = React.useMemo(() => {
        const candidate = segment ?? "all-time-logs"
        return tabs.some((t) => t.value === candidate) ? candidate : "all-time-logs"
    }, [segment])

    return (
        <div className="flex items-center w-full">
            <Tabs
                value={activeTab}
                onValueChange={(value) => router.push(`/time-logs/${value}`)}
                className="w-full"
            >
                <TabsList variant="line">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="py-2">
                            <tab.icon className="mr-1 h-4 w-4" />
                            <span className="font-medium">{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="w-full">{children}</div>
            </Tabs>
        </div>
    )
}
