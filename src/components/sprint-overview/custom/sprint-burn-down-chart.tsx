"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts"
import { SPRINT_BURN_DOWN_DATA } from "@/data/sprint-data"

export function SprintBurnDownChart() {
    return (
        <div className="h-auto min-h-62.5 sm:min-h-75 lg:h-105 pt-3 sm:pt-4 lg:pt-6">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                <LineChart data={SPRINT_BURN_DOWN_DATA} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <Tooltip />

                    <XAxis
                        tickMargin={10}
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        className="sm:text-xs"
                    />

                    <YAxis
                        width={20}
                        tickMargin={8}
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        ticks={[0, 50, 100, 150, 200]}
                        className="sm:text-xs"
                    />

                    <Line
                        type="linear"
                        dataKey="effort"
                        stroke="#3B5BFF"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        className="sm:stroke-[2.5] lg:stroke-3"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
