"use client";

import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    RefreshCcw,
    Maximize2,
    Filter,
    Settings,
    MoreHorizontal,
    ClipboardList,
    Hourglass,
    Upload,
    ChevronRight,
    Trash2
} from 'lucide-react';
import Card from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PriorityBreakdownSettings } from './Settings/priority-breakdown-setting';

const data = [
    { name: '1 Oct', review: 1800, progress: 200 },
    { name: '3 Oct', review: 2600, progress: 1200 },
    { name: '7 Oct', review: 2000, progress: 1500 },
    { name: '10 Oct', review: 3000, progress: 700 },
    { name: '14 Oct', review: 3900, progress: 2900 },
    { name: '20 Oct', review: 1600, progress: 3800 },
    { name: '23 Oct', review: 600, progress: 2800 },
    { name: '27 Oct', review: 1800, progress: 3600 },
    { name: '30 Oct', review: 3800, progress: 2100 },
];

export const PriorityBreakdown = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <Card className="p-6 flex flex-col shadow-sm h-[480px] bg-white border border-gray-100">
                {/* Header */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-8 md:mb-10">
                    <h3 className="text-[17px] font-bold text-slate-800 tracking-tight">Priority Breakdown</h3>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <RefreshCcw size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <Maximize2 size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <Filter size={18} />
                        </button>
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            <Settings size={18} />
                        </button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                                    <MoreHorizontal size={18} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-1.5 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-gray-100 z-[200]" align="end" sideOffset={8}>
                                <div className="space-y-0.5">
                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <ClipboardList size={18} className="text-blue-500" />
                                            <span className="text-[13px] font-bold">Duplicate</span>
                                        </div>
                                    </button>

                                    <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Hourglass size={18} className="text-slate-400" />
                                            <span className="text-[13px] font-bold">Show Legend</span>
                                        </div>
                                        <Checkbox defaultChecked className="rounded-md border-gray-200" />
                                    </div>

                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Upload size={18} className="text-slate-400" />
                                            <span className="text-[13px] font-bold">Export</span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300" />
                                    </button>

                                    <div className="h-px bg-gray-50 mx-2 my-1.5" />

                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Trash2 size={18} className="text-red-400" />
                                            <span className="text-[13px] font-bold">Delete Widget</span>
                                        </div>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                ticks={[0, 1000, 2000, 3000, 4000]}
                                tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="review"
                                stroke="#5b6cf9"
                                strokeWidth={2}
                                dot={{
                                    r: 7,
                                    fill: '#fff',
                                    stroke: '#5b6cf9',
                                    strokeWidth: 2,
                                    fillOpacity: 1
                                }}
                                activeDot={{ r: 9, strokeWidth: 0, fill: '#5b6cf9' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="progress"
                                stroke="#e0d7ff"
                                strokeWidth={2}
                                dot={{
                                    r: 7,
                                    fill: '#fff',
                                    stroke: '#e0d7ff',
                                    strokeWidth: 2,
                                    fillOpacity: 1
                                }}
                                activeDot={{ r: 9, strokeWidth: 0, fill: '#e0d7ff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-md bg-[#5b6cf9]" />
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight whitespace-nowrap">IN REVIEW</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-md bg-[#e0d7ff]" />
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight whitespace-nowrap">IN PROGRESS</span>
                    </div>
                </div>
            </Card>

            <PriorityBreakdownSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                data={data}
            />
        </>
    );
};
