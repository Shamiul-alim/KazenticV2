"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface ScheduleItem {
    id: string;
    date: {
        day: string;
        month: string;
    };
    title: string;
    description: string;
    scheduleText: string;
    type: string;
    color: 'blue' | 'orange' | 'purple' | 'green';
}

const DEMO_DATA: ScheduleItem[] = [
    {
        id: '1',
        date: { day: '20', month: 'Aug' },
        title: 'Eid Al Fitr',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
    {
        id: '2',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'orange'
    },
    {
        id: '3',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'orange'
    },
    {
        id: '4',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'purple'
    },
    {
        id: '5',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'purple'
    },
    {
        id: '6',
        date: { day: '20', month: 'Aug' },
        title: 'Holiday',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'purple'
    },
    {
        id: '7',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
    {
        id: '8',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
    {
        id: '9',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
    {
        id: '10',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
    {
        id: '11',
        date: { day: '20', month: 'Aug' },
        title: 'Meeting with Client',
        description: 'Lorem ipsum dolor sit amet consectetur. Felis mi at lacinia maecenas convallis vitae.',
        scheduleText: 'At Wednesday, 12:30-1:30 PM',
        type: 'Type',
        color: 'blue'
    },
];

export default function ScheduleView() {
    return (
        <div className="flex-1 overflow-y-auto bg-[#fafcff] p-6 no-scrollbar h-full border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto space-y-3">
                {DEMO_DATA.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-[14px] border border-slate-100 p-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md transition-all group"
                    >
                        {/* Left Section: Date and Content */}
                        <div className="flex items-center gap-6">
                            {/* Date Circle */}
                            <div className={cn(
                                "w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 border",
                                item.color === 'blue' && "bg-[#f4f9ff] border-blue-100",
                                item.color === 'orange' && "bg-[#fff8f0] border-orange-100",
                                item.color === 'purple' && "bg-[#faf5ff] border-purple-100",
                                item.color === 'green' && "bg-[#f0fdf4] border-emerald-100"
                            )}>
                                <span className={cn(
                                    "text-[16px] font-bold leading-none",
                                    item.color === 'blue' && "text-blue-600",
                                    item.color === 'orange' && "text-orange-500",
                                    item.color === 'purple' && "text-purple-600",
                                    item.color === 'green' && "text-emerald-600"
                                )}>
                                    {item.date.day}
                                </span>
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-tight",
                                    item.color === 'blue' && "text-blue-400",
                                    item.color === 'orange' && "text-orange-400",
                                    item.color === 'purple' && "text-purple-400",
                                    item.color === 'green' && "text-emerald-400"
                                )}>
                                    {item.date.month}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-1">
                                <h3 className="text-[16px] font-bold text-slate-800 leading-none">
                                    {item.title}
                                </h3>
                                <p className="text-[13px] font-medium text-slate-400 max-w-[600px] line-clamp-1">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Time and Type */}
                        <div className="flex items-center gap-6">
                            <span className="text-[13px] font-bold text-slate-400/80">
                                {item.scheduleText}
                            </span>
                            <div className="px-5 py-1.5 rounded-lg border border-indigo-100 bg-indigo-50/30 text-indigo-600 text-[12px] font-bold uppercase tracking-wide">
                                {item.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
