import { SPRINT_REPORTING_DATA } from '@/data/sprint-data'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LegendItem } from './chart-legend-item'

export default function PriorityBreakdownChart() {
    return (
        <div className="h-105 pt-6">
            <ResponsiveContainer width="95%" height="90%">
                <LineChart data={SPRINT_REPORTING_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => `${v / 1000}k`} axisLine={false} tickLine={false} range={[0, 4000]} />
                    <Tooltip />

                    <Line
                        type="linear"
                        dataKey="inReview"
                        stroke="#3B5BFF"
                        strokeWidth={3}
                        dot={{ r: 8 }}
                        activeDot={{ r: 10 }}
                    />

                    <Line
                        type="linear"
                        dataKey="inProgress"
                        stroke="#D8B4FE"
                        strokeWidth={3}
                        dot={{ r: 8 }}
                        activeDot={{ r: 10 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-4 flex justify-center gap-8 text-sm">
                <LegendItem color="#3B5BFF" label="IN REVIEW" />
                <LegendItem color="#D8B4FE" label="IN PROGRESS" />
            </div>
        </div>
    )
}