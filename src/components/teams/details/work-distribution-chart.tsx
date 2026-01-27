"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"

const DATA = [
    { name: "COMPLETED", value: 4, color: "#99F6E4" },
    { name: "IN PROGRESS", value: 3, color: "#D8B4FE" },
    { name: "IN REVIEW", value: 6, color: "#C7D2FE" },
]

export function WorkDistributionChart() {
    return (
        <Card className="p-6 bg-white border-gray-100 flex flex-col h-full ">
            <h3 className="font-bold text-gray-900 mb-6">Work Distribution</h3>
            <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={DATA}
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    const { cx, cy } = viewBox as any
                                    return (
                                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                                            <tspan x={cx} y={cy - 10} className="fill-gray-400 text-xs font-semibold uppercase tracking-wider">
                                                Pending
                                            </tspan>
                                            <tspan x={cx} y={cy + 20} className="fill-gray-900 text-3xl font-bold">
                                                6
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Custom Labels like in image */}
                <div className="hidden sm:block absolute top-1/4 left-0 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-50">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase">In Progress <span className="text-gray-900 ml-1">3</span></p>
                </div>
                <div className="hidden sm:block absolute top-1/4 right-0 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-50">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Completed <span className="text-gray-900 ml-1">4</span></p>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
                {DATA.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="size-2.5 md:size-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase">{item.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}
