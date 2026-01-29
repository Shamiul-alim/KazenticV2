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
        <div className="h-105 pt-6">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SPRINT_BURN_DOWN_DATA} margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <Tooltip />

                    <XAxis
                        tickMargin={15}
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        width={20}
                        tickMargin={15}
                        tick={{ fontSize: 12 }}
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
