"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/dashboard/ui/chart"
import { TASK_COMPLETION_DATA } from "@/data/dashboard-data"

const config = {
    completed: {
        label: "Task Completed",
        color: "hsl(var(--primary))",
    },
}

export function TaskCompletionChart() {
    return (
        <ChartContainer config={config} className="h-65 w-full">
            <BarChart data={TASK_COMPLETION_DATA} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="project" className="mt-4" tickLine={false} axisLine={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <Bar
                    dataKey="completed"
                    // fill="var(--primary-dashboard)"
                    // className="bg-primary-dashboard/20"
                    activeBar
                    fill="bg-primary-dashboard/20"
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    )
}
