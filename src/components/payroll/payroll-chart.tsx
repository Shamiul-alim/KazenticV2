"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { payrollTrendData } from "@/data/payroll-data"

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-[#1F2937] p-3 shadow-lg">
                <p className="mb-2 text-sm font-medium text-white">{label}</p>
                <div className="flex flex-col gap-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm font-medium text-white">
                                ${entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return null
}

export function PayrollChart() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-base font-semibold text-gray-900">
                Monthly Payroll Trend
            </h3>
            <div className="h-[300px] w-full md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={payrollTrendData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E5E7EB"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            tickFormatter={(value) => `${value}`}
                            domain={[75000, 375000]}
                            ticks={[75000, 150000, 225000, 300000]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#6366F1"
                            strokeWidth={2}
                            dot={{ r: 6, fill: "#fff", stroke: "#6366F1", strokeWidth: 2 }}
                            activeDot={{ r: 8, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="fullTime"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ r: 6, fill: "#fff", stroke: "#10B981", strokeWidth: 2 }}
                            activeDot={{ r: 8, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="contractual"
                            stroke="#C084FC"
                            strokeWidth={2}
                            dot={{ r: 6, fill: "#fff", stroke: "#C084FC", strokeWidth: 2 }}
                            activeDot={{ r: 8, fill: "#C084FC", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
