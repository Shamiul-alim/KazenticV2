"use client"

import React, { useState } from "react"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts"
import {
    RefreshCcw,
    Maximize2,
    Filter,
    Settings,
    MoreHorizontal,
} from "lucide-react"
import { Card } from "../ui/card"
import { TasksByAssigneeSettings } from "./Settings/tasks-by-assignee-setting"

/* ===================== DATA ===================== */

const data = [
    { name: 'Alif Hassan', value: 25, color: '#b7b4ff', textColor: '#4f46e5' },
    { name: 'Tonmoy Asif', value: 20, color: '#e6ccff', textColor: '#a855f7' },
    { name: 'Ababa', value: 11, color: '#fedbad', textColor: '#f59e0b' },
    { name: 'John Doe', value: 12.5, color: '#bef0ff', textColor: '#0ea5e9' },
]

/* ===================== CUSTOM LABEL ===================== */

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const item = data[index];

    return (
        <foreignObject x={x - 70} y={y - 20} width="140" height="40">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-xl shadow-lg border border-gray-50/50 whitespace-nowrap">
                <span className="text-[11px] font-bold mr-1.5" style={{ color: item.textColor }}>
                    {item.name}
                </span>
                <span className="text-[11px] font-bold text-gray-900">
                    {item.value}%
                </span>
            </div>
        </foreignObject>
    );
};

/* ===================== MAIN COMPONENT ===================== */

export const TasksByAssignee = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    return (
        <>
            <Card className="p-6 flex flex-col shadow-sm h-[480px] bg-white relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[17px] font-bold text-slate-800 tracking-tight">Tasks By Assignee</h3>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <RefreshCcw size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <Maximize2 size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <Filter size={18} />
                        </button>
                        <button
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"
                            onClick={() => setIsSettingsOpen(true)}
                        >
                            <Settings size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 w-full min-h-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                stroke="none"
                                label={renderCustomLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex justify-center items-center gap-6 mt-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[11px] font-bold text-slate-500 tracking-tight">{item.name}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <TasksByAssigneeSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                data={data}
            />
        </>
    )
}
