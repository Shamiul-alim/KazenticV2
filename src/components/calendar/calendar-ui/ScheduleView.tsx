"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { events } from "@/data/calendar-data";
import moment from 'moment';

interface ScheduleViewProps {
    onEventClick: (event: any) => void;
    currentDate: moment.Moment;
}

export default function ScheduleView({ onEventClick, currentDate }: ScheduleViewProps) {
    // Filter events to show events from the current month of the selected date
    // or just show all events sorted - usually Schedule view shows everything upcoming.
    // Let's filter for the month of the currentDate to make it relevant to the user's selection
    const filteredEvents = events.filter(event => {
        const eventDate = moment(event.date);
        const startOfRange = moment(currentDate).startOf('month');
        const endOfRange = moment(currentDate).add(1, 'months').endOf('month');
        return eventDate.isBetween(startOfRange, endOfRange, 'day', '[]');
    });

    // Sort events by date and then by start time if available
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = moment(a.date);
        const dateB = moment(b.date);
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;

        // If same date, sort by start time
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        if (a.start && b.start) {
            return moment(a.start, 'hh:mm AM').diff(moment(b.start, 'hh:mm AM'));
        }
        return 0;
    });

    return (
        <div className="flex-1 overflow-y-auto bg-[#fafcff] p-6 no-scrollbar h-full border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto space-y-3 pb-10">
                {sortedEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <p className="font-medium text-[16px]">No events scheduled for this period</p>
                    </div>
                ) : (
                    sortedEvents.map((item) => {
                        const eventDate = moment(item.date);
                        const day = eventDate.format('DD');
                        const month = eventDate.format('MMM');
                        const scheduleText = item.allDay
                            ? `All Day, ${eventDate.format('dddd')}`
                            : `At ${eventDate.format('dddd')}, ${item.start || ''}${item.end ? ` - ${item.end}` : ''}`;

                        return (
                            <div
                                key={item.id}
                                onClick={() => onEventClick(item)}
                                className="bg-white rounded-[14px] border border-slate-100 p-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md transition-all group cursor-pointer"
                            >
                                {/* Left Section: Date and Content */}
                                <div className="flex items-center gap-6">
                                    {/* Date Circle */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-full flex flex-col items-center justify-center shrink-0 border",
                                        item.color === 'blue' && "bg-[#f4f9ff] border-blue-100",
                                        (item.color === 'orange' || item.color === 'purple') && "bg-[#faf5ff] border-purple-100",
                                        item.color === 'green' && "bg-[#f0fdf4] border-emerald-100"
                                    )}>
                                        <span className={cn(
                                            "text-[16px] font-bold leading-none",
                                            item.color === 'blue' && "text-blue-600",
                                            (item.color === 'orange' || item.color === 'purple') && "text-purple-600",
                                            item.color === 'green' && "text-emerald-600"
                                        )}>
                                            {day}
                                        </span>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-tight",
                                            item.color === 'blue' && "text-blue-400",
                                            (item.color === 'orange' || item.color === 'purple') && "text-purple-400",
                                            item.color === 'green' && "text-emerald-400"
                                        )}>
                                            {month}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-1">
                                        <h3 className="text-[16px] font-bold text-slate-800 leading-none group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13px] font-medium text-slate-400 max-w-[600px] line-clamp-1">
                                            {item.badge || item.type} • {item.duration || (item.allDay ? 'Full Day' : 'Limited time')}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section: Time and Type */}
                                <div className="flex items-center gap-6 text-right">
                                    <span className="text-[13px] font-bold text-slate-400/80">
                                        {scheduleText}
                                    </span>
                                    <div className="px-5 py-1.5 rounded-lg border border-indigo-100 bg-indigo-50/30 text-indigo-600 text-[12px] font-bold uppercase tracking-wide min-w-[100px] text-center">
                                        {item.badge || item.type}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
