import { TASK_STATUS_DATA } from '@/data/sprint-data'
import { Bar, BarChart, CartesianGrid, LabelList, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { LegendItem } from './chart-legend-item'

export default function TotalTimeInStatusChart() {
    return (
        <div className="h-105 pt-6">
            <ResponsiveContainer width="95%" height="85%">
                <BarChart data={TASK_STATUS_DATA} barCategoryGap={28}>
                    <CartesianGrid
                        strokeDasharray="6 6"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="status"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        ticks={[0, 100, 200]}
                        tickFormatter={(v) =>
                            v === 0 ? "0m" : `${v}h`
                        }
                    />

                    <Bar
                        dataKey="hours"
                        radius={[16, 16, 0, 0]}
                    >
                        {TASK_STATUS_DATA.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={entry.color}
                            />
                        ))}

                        <LabelList
                            dataKey="hours"
                            position="top"
                            formatter={() => "20h 44m"}
                            className="fill-muted-foreground text-xs"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                {TASK_STATUS_DATA.map((item) => (
                    <LegendItem
                        key={item.status}
                        label={item.status}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    )
}
