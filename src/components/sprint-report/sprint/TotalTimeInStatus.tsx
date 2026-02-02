"use client";

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';
import { LayoutGrid } from 'lucide-react';
import Card from "@/components/ui/card"
import { ChartHeader } from "../components/chart-header"
import { TotalTimeStatusSettings } from './Settings/total-time-status-setting';
import { FilterPopover } from '../list/FilterPopover';

const data = [
    { name: 'Active', value: 85, color: '#a7f3d0', label: '20h 44m' },
    { name: 'To Do', value: 85, color: '#ffedd5', label: '20h 44m' },
    { name: 'On Hold', value: 115, color: '#c5ae9d', label: '20h 44m' },
    { name: 'In Progress', value: 175, color: '#c4b5fd', label: '20h 44m' },
    { name: 'In Review', value: 170, color: '#c7d2fe', label: '20h 44m' },
    { name: 'Pending', value: 118, color: '#ffed96', label: '20h 44m' },
];

const renderCustomizedLabel = (props: any) => {
    const { x, y, width, index } = props;
    const label = data[index].label;

    return (
        <text
            x={x + width / 2}
            y={y - 12}
            fill="#6b7280"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fontWeight={700}
        >
            {label}
        </text>
    );
};

export const TotalTimeInStatus = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <Card className="p-6 flex flex-col shadow-sm h-[480px]">
                <ChartHeader
                    title="Total Time In Status"
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    filterContent={<FilterPopover />}
                />

                {/* Sub Header */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                        <LayoutGrid size={14} />
                        Sprint Category
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center p-0.5">
                            <div className="w-full h-full bg-blue-500 rounded-full" />
                        </div>
                        Sprint 2 (7/12 - 8/12)
                    </div>
                </div>

                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="85%" minWidth={0}>
                        <BarChart data={data} margin={{ top: 30, right: 30, left: -20, bottom: 20 }} barGap={0}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                ticks={[0, 100, 200]}
                                tickFormatter={(value) => `${value}h`}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8faff', radius: 10 }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                barSize={40}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <LabelList dataKey="value" content={renderCustomizedLabel} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 px-4 w-full">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 group cursor-pointer">
                                <div className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 shadow-sm" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tight whitespace-nowrap">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <TotalTimeStatusSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                data={data}
            />
        </>
    );
};
