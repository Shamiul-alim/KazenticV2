"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { events } from "@/data/calendar-data";
import moment from 'moment';

interface MonthlyViewProps {
    onEventClick: (event: any) => void;
    currentDate: moment.Moment;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MonthlyView({ onEventClick, currentDate }: MonthlyViewProps) {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const daysInMonth = startOfMonth.daysInMonth();
    const startDay = startOfMonth.day(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

    const days = [];

    // Previous month padding
    const prevMonth = moment(startOfMonth).subtract(1, 'month');
    const prevMonthDays = prevMonth.daysInMonth();
    for (let i = startDay - 1; i >= 0; i--) {
        days.push({
            day: prevMonthDays - i,
            currentMonth: false,
            date: moment(prevMonth).date(prevMonthDays - i)
        });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            currentMonth: true,
            date: moment(startOfMonth).date(i)
        });
    }

    // Next month padding
    const remaining = 42 - days.length;
    const nextMonth = moment(startOfMonth).add(1, 'month');
    for (let i = 1; i <= remaining; i++) {
        days.push({
            day: i,
            currentMonth: false,
            date: moment(nextMonth).date(i)
        });
    }

    return (
        <div className="flex flex-col h-full bg-white border-t border-gray-100">
            {/* Weekday Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-slate-50/30">
                {weekDays.map((day) => (
                    <div key={day} className="py-3 text-center text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6">
                {days.map((item, i) => {
                    const isToday = item.date.isSame(moment(), 'day');
                    const dayString = item.date.format('YYYY-MM-DD');
                    // Filter events for this specific day
                    const dayEvents = events.filter(e => e.date === dayString);

                    return (
                        <div
                            key={i}
                            className={cn(
                                "border-r border-b border-gray-100 p-2 transition-colors hover:bg-slate-50/50 flex flex-col gap-1 min-h-0 overflow-hidden",
                                !item.currentMonth && "bg-slate-50/20"
                            )}
                        >
                            <div className="flex items-center justify-center mb-1">
                                <span className={cn(
                                    "text-[13px] font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                                    item.currentMonth ? "text-slate-700" : "text-slate-300 font-medium",
                                    isToday && "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                )}>
                                    {item.day}
                                </span>
                            </div>

                            {/* Events List */}
                            <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar">
                                {dayEvents.map((evt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => onEventClick?.(evt)}
                                        className={cn(
                                            "text-[10px] font-bold px-2 py-1 rounded-md text-left truncate transition-all active:scale-95",
                                            evt.color === 'green' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                                evt.color === 'purple' ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                                    "bg-blue-50 text-blue-600 border border-blue-100"
                                        )}
                                    >
                                        {evt.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
