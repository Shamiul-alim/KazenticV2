"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { MessageSquare } from "lucide-react"
import { Activity } from "@/data/teams-data"

interface ActivityItemProps extends Activity { }

export function ActivityItem({ user, action, target, date }: ActivityItemProps) {
    return (
        <Card className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-gray-100 bg-white hover:shadow-sm transition-shadow relative overflow-hidden group gap-4 w-full">
            {/* Blue accent bar on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-60" />

            <div className="flex items-center gap-4 pl-2">
                <div className="size-10 shrink-0 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                    <MessageSquare className="size-5 text-blue-500 fill-blue-50/50" />
                </div>
                <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-900">
                        {user} <span className="font-medium text-gray-600">{action}</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        {user} {action} on a project <span className="text-blue-600 cursor-pointer hover:underline">{target}</span>
                    </p>
                </div>
            </div>

            <div className="text-[11px] sm:text-xs font-semibold text-gray-400 pl-14 sm:pl-0">
                {date}
            </div>
        </Card>
    )
}

interface ActivityViewProps {
    activities: Activity[]
}

export default function ActivityView({ activities }: ActivityViewProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {activities.map((activity) => (
                <ActivityItem key={activity.id} {...activity} />
            ))}
        </div>
    )
}
