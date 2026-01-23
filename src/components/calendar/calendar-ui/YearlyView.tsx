"use client";

import React from 'react';
import { cn } from "@/lib/utils";

import moment from 'moment';
import { events } from "@/data/calendar-data";

interface YearlyViewProps {
    onMonthClick?: (month: number) => void;
    currentDate: moment.Moment;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

export default function YearlyView({ onMonthClick, currentDate }: YearlyViewProps) {
    const year = currentDate.year();

    const renderMonth = (monthIndex: number) => {
        const monthName = months[monthIndex];
        const daysInMonth = getDaysInMonth(year, monthIndex);
        const firstDay = getFirstDayOfMonth(year, monthIndex);

        // Days from previous month
        const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
        const prevMonthYear = monthIndex === 0 ? year - 1 : year;
        const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonthIndex);

        const calendarDays = [];

        // Padding from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            calendarDays.push({ day: prevMonthDays - i, current: false });
        }
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push({ day: i, current: true });
        }
        // Padding for next month
        const remaining = 42 - calendarDays.length;
        for (let i = 1; i <= remaining; i++) {
            calendarDays.push({ day: i, current: false });
        }

        return (
            <div key={monthName} className="bg-white rounded-[14px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col pb-4">
                {/* Month Header */}
                <div className="bg-[#f4f9ff] py-2.5 text-center mb-4">
                    <span className="text-[14px] font-bold text-blue-600 uppercase tracking-wide">
                        {monthName}
                    </span>
                </div>

                {/* Calendar Grid */}
                <div className="px-4">
                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 text-center mb-2">
                        {weekDays.map((d, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "text-[11px] font-bold tracking-tight",
                                    (idx === 0 || idx === 6) ? "text-blue-600" : "text-slate-800"
                                )}
                            >
                                {d}{idx === 0 ? 'u' : idx === 1 ? 'o' : idx === 2 ? 'u' : idx === 3 ? 'e' : idx === 4 ? 'h' : idx === 5 ? 'r' : 'a'}
                            </div>
                        ))}
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 text-center">
                        {calendarDays.map((item, idx) => {
                            const isWeekend = idx % 7 === 0 || idx % 7 === 6;
                            const dateStr = item.current ? moment().year(year).month(monthIndex).date(item.day).format('YYYY-MM-DD') : '';
                            const hasEvents = item.current && events.some(e => e.date === dateStr);

                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "h-7 flex flex-col items-center justify-center text-[11px] font-bold transition-all cursor-pointer hover:bg-slate-50 rounded-md relative",
                                        !item.current ? "text-slate-300 font-medium" : (isWeekend ? "text-blue-600" : "text-slate-700")
                                    )}
                                    onClick={() => onMonthClick?.(monthIndex)}
                                >
                                    {item.day}
                                    {hasEvents && (
                                        <div className="absolute bottom-0.5 w-1 h-1 bg-blue-500 rounded-full" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto no-scrollbar bg-[#fafcff] p-8 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1300px] mx-auto pb-10">
                {months.map((_, index) => renderMonth(index))}
            </div>
        </div>
    );
}
