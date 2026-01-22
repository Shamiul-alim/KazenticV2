"use client";

import React from 'react';
import { MoreHorizontal, Clock, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { events } from "@/lib/calendar-data";
import EventItem from './EventItem';

interface WeeklyViewProps {
    onEventClick: (event: any) => void;
}

const hours = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 PM', '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM'
];

const weekDays = [
    { date: '25', day: 'Sat', month: 'Aug' },
    { date: '26', day: 'Sun', month: 'Aug' },
    { date: '27', day: 'Mon', month: 'Aug' },
    { date: '28', day: 'Tue', month: 'Aug' },
    { date: '29', day: 'Wed', month: 'Aug' },
    { date: '30', day: 'Thu', month: 'Aug' },
    { date: '31', day: 'Fri', month: 'Aug' },
];

export default function WeeklyView({ onEventClick }: WeeklyViewProps) {

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-t border-gray-100">
            {/* Header Row */}
            <div className="flex bg-white z-30">
                <div className="w-20 min-w-[5rem] flex items-center justify-center border-r border-gray-100 text-[11px] font-bold text-slate-400">
                    GMT+5
                </div>
                <div className="flex-1 grid grid-cols-7 border-b border-gray-100">
                    {weekDays.map((day, i) => (
                        <div key={i} className="py-3 px-3 border-r border-gray-100 last:border-r-0">
                            <div className="text-[13px] font-bold text-slate-800 tracking-tight leading-none mb-1">{day.date}</div>
                            <div className="text-[11px] font-medium text-slate-400 capitalize tracking-tight leading-none">
                                {day.month}, {day.day === 'Sat' ? 'Saturday' : day.day === 'Sun' ? 'Sunday' : day.day === 'Mon' ? 'Monday' : day.day === 'Tue' ? 'Tuesday' : day.day === 'Wed' ? 'Wednesday' : day.day === 'Thu' ? 'Thursday' : 'Friday'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex">

                {/* Time Axis Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col z-0">
                    {hours.map((_, h) => (
                        <div key={`grid-${h}`} className="h-[96px] border-b border-gray-100/60 w-full" />
                    ))}
                </div>

                {/* Time Column (Sticky) */}
                <div className="w-20 min-w-[5rem] border-r border-gray-100 bg-white z-20">
                    {hours.map((time, h) => (
                        <div key={`time-${h}`} className="h-[96px] relative pointer-events-none">
                            <span className="absolute -top-[7px] right-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-white px-1">
                                {time}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Grid Columns */}
                <div className="flex-1 grid grid-cols-7 relative z-10">
                    {weekDays.map((_, i) => (
                        <div key={i} className="border-r border-gray-100 last:border-r-0 relative min-h-[1400px] bg-transparent">

                            {/* Events for this day */}
                            {i === 0 && (
                                <div className="p-2 space-y-2 relative z-10">
                                    <div className="h-[56px]">
                                        <EventItem
                                            event={{
                                                title: 'Holiday',
                                                typeLabel: 'Type',
                                                duration: '3h',
                                                priority: 'High',
                                                startTime: '7:00-7:30 AM',
                                                color: 'green'
                                            }}
                                            variant="block"
                                            onClick={() => { }}
                                        />
                                    </div>
                                    <div className="h-[64px]">
                                        <EventItem
                                            event={{
                                                title: 'V3 Reported Design Update',
                                                typeLabel: 'Type',
                                                duration: '3h',
                                                priority: 'High',
                                                startTime: '7:30-8:00 AM',
                                                color: 'blue',
                                                assignees: ['https://i.pravatar.cc/150?u=1']
                                            }}
                                            variant="block"
                                            onClick={() => { }}
                                        />
                                    </div>
                                </div>
                            )}

                            {i === 6 && (
                                <div className="p-2 space-y-2 relative z-10">
                                    <div className="h-[56px]">
                                        <EventItem
                                            event={{
                                                title: 'Holiday',
                                                typeLabel: 'Type',
                                                duration: '3h',
                                                priority: 'High',
                                                startTime: '7:00-7:30 AM',
                                                color: 'green'
                                            }}
                                            variant="block"
                                            onClick={() => { }}
                                        />
                                    </div>
                                    <div className="h-[64px]">
                                        <EventItem
                                            event={{
                                                title: 'V3 Reported Design Update',
                                                typeLabel: 'Type',
                                                duration: '3h',
                                                priority: 'High',
                                                startTime: '7:30-8:00 AM',
                                                color: 'blue'
                                            }}
                                            variant="block"
                                            onClick={() => { }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
