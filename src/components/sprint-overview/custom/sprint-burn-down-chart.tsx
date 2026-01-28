"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"
import { SPRINT_BURN_DOWN_DATA } from "@/data/sprint-data"

export function SprintBurnDownChart() {
    return (
        <div className="h-105 pt-6">
            <ResponsiveContainer width="95%" height="100%">
                <LineChart data={SPRINT_BURN_DOWN_DATA}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        ticks={[0, 50, 100, 150, 200]}
                    />

                    <Line
                        type="linear"
                        dataKey="effort"
                        stroke="#3B5BFF"
                        strokeWidth={3}
                        dot={{ r: 8 }}
                        activeDot={{ r: 10 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
