import { SPRINT_REPORTING_DATA } from '@/data/sprint-data'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LegendItem } from './chart-legend-item'

export default function PriorityBreakdownChart() {
    return (
        <div className="h-105 pt-6">
            <ResponsiveContainer width="100%" height="90%" aspect={1.618} maxHeight={500}>
                <LineChart
                    data={SPRINT_REPORTING_DATA}
                    margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis tickMargin={15} interval={0} dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis width={20} tickMargin={15} tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} range={[0, 4000]} />
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