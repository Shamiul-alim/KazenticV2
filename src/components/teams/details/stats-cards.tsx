"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { Briefcase, CheckCircle2, Users } from "lucide-react"

interface StatsCardsProps {
    stats: {
        totalProjects: number
        completedProjects: number
        activeMembers: number
    }
}

export function StatsCards({ stats: teamStats }: StatsCardsProps) {
    const stats = [
        {
            label: "Total Projects",
            value: teamStats.totalProjects.toString(),
            icon: Briefcase,
            borderColor: "border-blue-200",
            iconColor: "text-[#4F46E5]",
        },
        {
            label: "Projects Completed",
            value: teamStats.completedProjects.toString(),
            icon: CheckCircle2,
            borderColor: "border-blue-200",
            iconColor: "text-[#4F46E5]",
        },
        {
            label: "Active Members",
            value: teamStats.activeMembers.toString(),
            icon: Users,
            borderColor: "border-blue-200",
            iconColor: "text-[#4F46E5]",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:w-[66%]">
            {stats.map((stat) => (
                <Card key={stat.label} className="p-4 md:p-6 flex items-center gap-4 bg-white border-gray-100 rounded-[18px] shadow-sm">
                    <div className={`p-3 rounded-xl border ${stat.borderColor} bg-white flex items-center justify-center`}>
                        <stat.icon className={`size-6 ${stat.iconColor}`} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[13px] md:text-[14px] font-bold text-[#111827] leading-tight mb-1">{stat.label}</p>
                        <p className="text-[12px] font-medium text-gray-500">{stat.value}</p>
                    </div>
                </Card>
            ))}
        </div>
    )
}
