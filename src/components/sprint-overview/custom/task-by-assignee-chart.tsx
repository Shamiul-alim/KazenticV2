"use client"

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts"
import { LegendItem } from "./chart-legend-item"
import { TASK_BY_ASSIGNEE_DATA } from "@/data/sprint-data"

const chartColors: Record<string, string> = {
    "purple": "#C1BCFF",
    "pink": "#E0C0FF",
    "yellow": "#FFE3B4",
    "blue": "#BEE9FF",
}

const textColors: Record<string, string> = {
    "purple": "#4A3AFF",
    "pink": "#A855F7",
    "yellow": "#FF9F00",
    "blue": "#0E97DE",
}

export function TasksByAssigneeChart() {
    return (
        <div className="h-105">
            <ResponsiveContainer width="95%" height="95%">
                <PieChart>
                    <Pie
                        data={TASK_BY_ASSIGNEE_DATA}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={-270}
                        outerRadius={140}
                        label={renderLabel}
                        labelLine={false}
                    >
                        {TASK_BY_ASSIGNEE_DATA.map((entry, index) => (
                            <Cell key={index} fill={chartColors[entry.color]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm mb-6">
                {TASK_BY_ASSIGNEE_DATA.map((item) => (
                    <LegendItem
                        key={item.name}
                        label={item.name}
                        color={chartColors[item.color]}
                    />
                ))}
            </div>
        </div>
    )
}

function renderLabel({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    name,
    color
}: any) {
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 30
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <foreignObject
            x={x - 60}
            y={y - 18}
            width={250}
            height={60}
            className=""
        >
            <div className="w-fit rounded-lg rounded-br-none bg-white px-3 py-2 text-xs shadow-md inset-shadow-xs">
                <span className="font-semibold mr-1" style={{ color: textColors[color] }}>{name}</span>{" "}
                <span className="font-semibold text-[#191F38]">
                    {(percent * 100).toFixed(1)}%
                </span>
            </div>
        </foreignObject>
    )
}
