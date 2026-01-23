"use client";

import React from 'react';
import { events } from "@/data/calendar-data";
import EventItem from './EventItem';
import moment from 'moment';
import TimeColumn, { hours } from './TimeColumn';

interface FourDayViewProps {
    onEventClick: (event: any) => void;
    currentDate: moment.Moment;
}

export default function FourDayView({ onEventClick, currentDate }: FourDayViewProps) {
    const getPosition = (timeStr: string) => {
        if (!timeStr) return 0;
        const part = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!part) return 0;

        let [_, h, m, ampm] = part;
        let h_num = parseInt(h);
        const minutes = parseInt(m);

        if (ampm.toUpperCase() === 'PM' && h_num !== 12) h_num += 12;
        if (ampm.toUpperCase() === 'AM' && h_num === 12) h_num = 0;

        const startHour = 7;
        let totalHours = h_num - startHour;
        if (totalHours < 0) totalHours += 24;
        totalHours += (minutes / 60);

        return Math.max(0, totalHours * 96) + 16; // Added 16px (pt-4) offset
    };

    const getHeight = (start: string, end: string) => {
        const top = getPosition(start);
        const bottom = getPosition(end);
        const calcHeight = bottom - top;
        return Math.max(30, calcHeight - 2); // 2px gap
    };

    const fourDays = Array.from({ length: 4 }, (_, i) => {
        const day = moment(currentDate).add(i, 'days');
        const dayString = day.format('YYYY-MM-DD');
        const dayEvents = events.filter(e => e.date === dayString);
        return {
            date: day.format('D'),
            day: day.format('ddd'),
            month: day.format('MMM'),
            fullDay: day.format('dddd'),
            isToday: day.isSame(moment(), 'day'),
            allDayEvents: dayEvents.filter(e => e.allDay),
            timeEvents: dayEvents.filter(e => !e.allDay && (e.start || e.timeRange))
        };
    });

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-t border-gray-100">
            {/* Header Row */}
            <div className="flex bg-white z-40 shrink-0">
                <div className="w-20 min-w-[5rem] flex items-center justify-center border-r border-gray-100 text-[11px] font-bold text-slate-400">
                    GMT+5
                </div>
                <div className="flex-1 grid grid-cols-4 border-b border-gray-100">
                    {fourDays.map((day, i) => (
                        <div key={i} className="py-3 px-3 border-r border-gray-100 last:border-r-0">
                            <div className={`text-[13px] font-bold tracking-tight leading-none mb-1 ${day.isToday ? 'text-blue-600' : 'text-slate-800'}`}>{day.date}</div>
                            <div className="text-[11px] font-medium text-slate-400 capitalize tracking-tight leading-none">
                                {day.month}, {day.fullDay}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Day Row */}
            <div className="flex bg-slate-50/50 border-b border-gray-200 z-30 shrink-0">
                <div className="w-20 min-w-[5rem] p-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider border-r border-gray-100 flex items-center">
                    All Day
                </div>
                <div className="flex-1 grid grid-cols-4">
                    {fourDays.map((day, i) => (
                        <div key={i} className="p-1 border-r border-gray-100 last:border-r-0 min-h-[40px] flex flex-col gap-1">
                            {day.allDayEvents.map((evt: any) => (
                                <EventItem
                                    key={evt.id}
                                    event={{
                                        ...evt,
                                        typeLabel: evt.badge || evt.type || 'Holiday',
                                        startTime: 'All Day'
                                    } as any}
                                    variant="row"
                                    onClick={() => onEventClick(evt)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex">

                {/* Time Axis Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col z-0 pt-4">
                    {hours.map((_, h) => (
                        <div key={`grid-${h}`} className="h-[96px] border-b border-gray-100/60 w-full" />
                    ))}
                </div>

                {/* Time Column Sidebar */}
                <div className="w-20 min-w-[5rem] border-r border-gray-100 bg-white z-20 pt-4">
                    {hours.map((time, h) => (
                        <div key={`time-${h}`} className="h-24 relative pointer-events-none">
                            <span className="absolute -top-3 right-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-white px-1">
                                {time}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Grid Columns */}
                <div className="flex-1 grid grid-cols-4 relative z-10 pt-4" style={{ minHeight: `${hours.length * 96 + 16}px` }}>
                    {fourDays.map((day, i) => (
                        <div key={i} className="border-r border-gray-100 last:border-r-0 relative bg-transparent overflow-visible">
                            {/* Events Layer */}
                            {day.timeEvents.map((evt: any) => {
                                const startTime = evt.start || evt.timeRange?.split('-')[0];
                                const endTime = evt.end || evt.timeRange?.split('-')[1];

                                const top = getPosition(startTime);
                                const height = endTime ? getHeight(startTime, endTime) : 64;

                                return (
                                    <div
                                        key={evt.id}
                                        className="absolute left-1 right-1 z-10"
                                        style={{ top: `${top}px`, height: `${height}px` }}
                                    >
                                        <EventItem
                                            event={{
                                                ...evt,
                                                typeLabel: evt.badge || evt.type || 'Event',
                                                startTime: startTime,
                                                endTime: endTime,
                                                assignees: evt.assignee ? ['https://i.pravatar.cc/150?u=1'] : undefined
                                            } as any}
                                            variant="block"
                                            onClick={() => onEventClick(evt)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
