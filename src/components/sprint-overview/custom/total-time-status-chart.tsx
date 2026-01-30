import { TASK_STATUS_DATA } from '@/data/sprint-data'
import { Bar, BarChart, CartesianGrid, LabelList, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { LegendItem } from './chart-legend-item'

export default function TotalTimeInStatusChart() {
    return (
        <div className="h-auto min-h-[280px] sm:min-h-[350px] lg:h-105 pt-3 sm:pt-4 lg:pt-6">
            <ResponsiveContainer width="100%" height="85%" minHeight={220}>
                <BarChart data={TASK_STATUS_DATA} barCategoryGap={10} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid
                        strokeDasharray="6 6"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="status"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        className="sm:text-xs"
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        ticks={[0, 100, 200]}
                        tickFormatter={(v) =>
                            v === 0 ? "0m" : `${v}h`
                        }
                        tick={{ fontSize: 10 }}
                        className="sm:text-xs"
                    />

                    <Bar
                        dataKey="hours"
                        radius={[12, 12, 0, 0]}
                        maxBarSize={60}
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
                            className="fill-muted-foreground text-[10px] sm:text-xs"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-3 sm:mt-4 lg:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm px-2">
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
