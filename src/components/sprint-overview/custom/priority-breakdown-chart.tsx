import { SPRINT_REPORTING_DATA } from '@/data/sprint-data'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LegendItem } from './chart-legend-item'

export default function PriorityBreakdownChart() {
    return (
        <div className="h-auto min-h-62.5 sm:min-h-75 lg:h-105 pt-3 sm:pt-4 lg:pt-6">
            <ResponsiveContainer width="100%" height="90%" aspect={1.618} maxHeight={500} minHeight={200}>
                <LineChart
                    data={SPRINT_REPORTING_DATA}
                    margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        tickMargin={10}
                        interval={0}
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        className="sm:text-xs"
                    />
                    <YAxis
                        width={20}
                        tickMargin={8}
                        tickFormatter={(v) => `${v / 1000}k`}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        range={[0, 4000]}
                        className="sm:text-xs"
                    />
                    <Tooltip />

                    <Line
                        type="linear"
                        dataKey="inReview"
                        stroke="#3B5BFF"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        className="sm:stroke-[2.5] lg:stroke-3"
                    />

                    <Line
                        type="linear"
                        dataKey="inProgress"
                        stroke="#D8B4FE"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        className="sm:stroke-[2.5] lg:stroke-3"
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-2 sm:mt-3 lg:mt-4 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 text-xs sm:text-sm">
                <LegendItem color="#3B5BFF" label="IN REVIEW" />
                <LegendItem color="#D8B4FE" label="IN PROGRESS" />
            </div>
        </div>
    )
}