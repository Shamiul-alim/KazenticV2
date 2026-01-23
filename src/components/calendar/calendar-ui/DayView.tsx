"use client";

import React, { useState } from 'react';
import AllDaySection from './AllDaySection';
import TimeColumn, { hours } from './TimeColumn';
import EventItem from './EventItem';
import { events } from "@/data/calendar-data";
import { QuickAddPopover } from './QuickAddPopover';
import moment from 'moment';

interface DayViewProps {
    onEventClick: (event: any) => void;
    currentDate: moment.Moment;
}

export default function DayView({ onEventClick, currentDate }: DayViewProps) {
    const [quickAddPos, setQuickAddPos] = useState<number | null>(null);

    // Filter for time-grid events (not allDay) that match the current date
    const timeEvents = events.filter(e =>
        !e.allDay && e.start && e.date === currentDate.format('YYYY-MM-DD')
    );

    // Helper to calculate top offset (assuming 7 AM start, 96px per hour)
    const getPosition = (timeStr: string) => {
        if (!timeStr) return 0;
        const part = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!part) return 0;

        let [_, h, m, ampm] = part;
        let h_num = parseInt(h);
        const minutes = parseInt(m);

        if (ampm.toUpperCase() === 'PM' && h_num !== 12) h_num += 12;
        if (ampm.toUpperCase() === 'AM' && h_num === 12) h_num = 0;

        // Start at 7 AM
        const startHour = 7;
        let totalHours = h_num - startHour;
        if (totalHours < 0) totalHours += 24; // Handle midnight wrap-around
        totalHours += (minutes / 60);

        return Math.max(0, totalHours * 96); // 96px = h-24 (24 * 4px)
    };

    // Helper to calculate height
    const getHeight = (start: string, end: string) => {
        const top = getPosition(start);
        const bottom = getPosition(end);
        const calcHeight = bottom - top;
        return Math.max(30, calcHeight - 2); // 2px gap
    };

    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;

        // Snap to nearest slot if needed, or just use raw position.
        // Let's snap to nearest 15 mins (~24px) for better UX
        const snappedY = Math.floor(offsetY / 24) * 24;

        setQuickAddPos(snappedY);
    };

    return (
        <div className="h-full overflow-y-auto no-scrollbar">
            {/* All Day Section */}
            <AllDaySection onEventClick={onEventClick} currentDate={currentDate} />

            {/* Main Grid Area */}
            <div className="flex w-full">
                {/* Time Column Sidebar */}
                <TimeColumn />

                <div
                    className="flex-1 relative bg-white cursor-crosshair"
                    style={{ minHeight: `${hours.length * 96}px` }}
                    onClick={handleGridClick}
                >
                    {/* Grid Lines (Background) */}
                    {hours.map((_, i) => (
                        <div key={i} className="h-24 border-b border-gray-100 w-full box-border" />
                    ))}

                    {/* Ghost / Quick Add Popover */}
                    {quickAddPos !== null && (
                        <QuickAddPopover
                            top={quickAddPos}
                            onClose={() => setQuickAddPos(null)}
                        />
                    )}

                    {/* Events Layer */}
                    {timeEvents.map((evt) => {
                        const top = getPosition(evt.start!);
                        const height = getHeight(evt.start!, evt.end!);

                        return (
                            <div
                                key={evt.id}
                                className="absolute left-2 right-2 z-10"
                                style={{ top: `${top}px`, height: `${height}px` }}
                            >
                                {/* @ts-ignore */}
                                <EventItem
                                    event={{
                                        ...evt,
                                        typeLabel: evt.badge || evt.type,
                                        startTime: evt.start,
                                        endTime: evt.end,
                                        assignees: evt.assignee ? ['https://github.com/shadcn.png'] : undefined
                                    } as any}
                                    variant="block"
                                    onClick={() => onEventClick(evt)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
