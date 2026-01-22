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
    Settings,
    MoreHorizontal,
    LayoutGrid,
} from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from "@/lib/utils";
import { SprintBurnSettings } from './Settings/sprint-burn-setting';

const data = [
    { name: '1 Oct', value: 58 },
    { name: '3 Oct', value: 103 },
    { name: '7 Oct', value: 74 },
    { name: '10 Oct', value: null },
    { name: '14 Oct', value: 162 },
    { name: '20 Oct', value: 53 },
    { name: '23 Oct', value: 9 },
    { name: '27 Oct', value: 66 },
    { name: '30 Oct', value: 159 },
];

const MetricCard = ({ label, value, subValue }: { label: string, value: string, subValue: string }) => (
    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3 shadow-sm min-w-[140px]">
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">{label}</div>
        <div className="flex items-center gap-2">
            <span className="text-gray-950 font-black text-sm">{value}</span>
            <div className="h-3 w-[1px] bg-gray-100" />
            <span className="text-gray-300 font-bold text-[11px]">{subValue}</span>
        </div>
    </div>
);

export const SprintBurnDown = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <Card className="p-6 flex flex-col shadow-sm h-[480px] bg-white">
                {/* Header */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
                    <h3 className="text-[17px] font-bold text-slate-800 tracking-tight">Sprint Burn Down</h3>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <RefreshCcw size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <Maximize2 size={18} />
                        </button>
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            <Settings size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Sub Header */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] bg-slate-50/50 px-2.5 py-1 rounded-md">
                        <LayoutGrid size={14} className="text-slate-400" />
                        Sprint Category
                    </div>
                    <div className="h-3 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-[11px] bg-slate-50/50 px-2.5 py-1 rounded-md">
                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-600 flex items-center justify-center p-0.5">
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        </div>
                        Sprint 2 (7/12 - 8/12)
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-10">
                    <MetricCard label="Total Effort" value="9 pts" subValue="+29%" />
                    <MetricCard label="Guideline" value="3.9 pts" subValue="50%" />
                    <MetricCard label="Completed" value="0 pts" subValue="0%" />
                    <MetricCard label="Remaining Effort" value="9 pts" subValue="120%" />
                </div>

                {/* Chart Area */}
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="95%">
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
                                ticks={[0, 50, 100, 150, 200]}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#5b6cf9"
                                strokeWidth={2.5}
                                connectNulls={true}
                                dot={{
                                    r: 7,
                                    fill: '#fff',
                                    stroke: '#5b6cf9',
                                    strokeWidth: 2,
                                    fillOpacity: 1
                                }}
                                activeDot={{ r: 9, strokeWidth: 0, fill: '#5b6cf9' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <SprintBurnSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                data={data}
            />
        </>
    );
};
