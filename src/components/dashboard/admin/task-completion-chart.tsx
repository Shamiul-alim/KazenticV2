"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
} from "@/components/dashboard/ui/chart"
import { TASK_COMPLETION_DATA } from "@/data/dashboard-data"
import { CustomChartTooltip } from "./custom-chart-tooltip"

const config = {
    completed: {
        label: "Task Completed",
        color: "hsl(var(--primary))",
    },
    total: {
        label: "Total Tasks",
        color: "hsl(var(--muted))",
    },
}

export function TaskCompletionChart() {
    return (
        <ChartContainer config={config} className="h-65 w-full">
            <BarChart data={TASK_COMPLETION_DATA} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis
                    dataKey="project"
                    className="mt-4"
                    tickLine={false}
                    axisLine={true}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis className="mt-4" tickLine={false} axisLine={false} />
                <ChartTooltip
                    cursor={false}
                    content={<CustomChartTooltip />}
                />
                <Bar
                    dataKey="completed"
                    activeBar={{
                        fillOpacity: 0.8,
                    }}
                    fillOpacity={0.3}
                    radius={[8, 8, 0, 0]}
                    fill="#4f46e5"
                    maxBarSize={45}
                />
            </BarChart>
        </ChartContainer>
    )
}
