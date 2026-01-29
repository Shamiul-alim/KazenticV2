"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { employmentDistributionData, paymentStatusData } from "@/data/payroll-data"

// Custom wrapper to add white border/gap effect
const renderCustomizedLabel = (props: any) => {
    // This is a placeholder if we wanted to render custom labels directly on chart
    return null;
}

interface ChartCardProps {
    title: string
    children: React.ReactNode
    legendData: { name: string; value: number; color: string }[]
}

function ChartCard({ title, children, legendData }: ChartCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-base font-semibold text-gray-900">{title}</h3>
            <div className="relative flex-1 min-h-[300px] flex items-center justify-center">
                {children}
                {/* Floating labels could go here individually if we hardcode positions, 
            but for dynamic we'll rely on the legend and tooltip */}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                {legendData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-gray-600">
                            {item.name} : <span className="text-gray-900">{item.value}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-white p-2 shadow-lg border border-gray-100 text-sm">
                <span className="font-semibold" style={{ color: payload[0].payload.color }}>
                    {payload[0].name}
                </span>
                : {payload[0].value}
            </div>
        )
    }
    return null
}

export function PayrollCharts() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Employment Type Distribution */}
            <ChartCard title="Employment Type Distribution" legendData={employmentDistributionData}>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={employmentDistributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {employmentDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Mock Floating Labels to match design aesthetics strictly */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        {/* Center text if needed, empty for now as design has hole */}
                    </div>
                    {/* Manual positioning of labels to mimic the image "look" exactly 
                In a real app, these would be calculated. Here we place them roughly.
            */}
                    <div className="absolute top-[20%] left-[25%] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-purple-600 z-10 hidden md:block">
                        Full Time 3
                    </div>
                    <div className="absolute top-[20%] right-[25%] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-emerald-500 z-10 hidden md:block">
                        Part Time 4
                    </div>
                    <div className="absolute bottom-[20%] left-[30%] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-indigo-500 z-10 hidden md:block">
                        Contract 6
                    </div>
                </div>
            </ChartCard>

            {/* Payment Status Breakdown */}
            <ChartCard title="Payment Status Breakdown" legendData={paymentStatusData}>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={paymentStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {paymentStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-[30%] right-[20%] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-emerald-500 z-10 hidden md:block">
                        Paid : 116
                    </div>
                    <div className="absolute bottom-[30%] left-[20%] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-amber-500 z-10 hidden md:block">
                        Pending : 126
                    </div>
                </div>
            </ChartCard>
        </div>
    )
}
