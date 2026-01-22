import React, { useState } from 'react';
import EventItem from './EventItem';
import { events } from "@/lib/calendar-data";
import { QuickAddPopover } from './QuickAddPopover';

interface CalendarDayProps {
    onEventClick: (event: any) => void;
}

export default function CalendarDay({ onEventClick }: CalendarDayProps) {
    const [quickAddPos, setQuickAddPos] = useState<number | null>(null);

    // Filter for time-grid events (not allDay)
    const timeEvents = events.filter(e => !e.allDay && e.start);

    // Helper to calculate top offset (assuming 7 AM start, 96px per hour)
    const getPosition = (timeStr: string) => {
        if (!timeStr) return 0;
        const part = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!part) return 0;

        let [_, h, m, ampm] = part;
        let hours = parseInt(h);
        const minutes = parseInt(m);

        if (ampm.toUpperCase() === 'PM' && hours !== 12) hours += 12;
        if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;

        // Start at 7 AM
        const startHour = 7;
        const totalHours = hours - startHour + (minutes / 60);

        return Math.max(0, totalHours * 96); // 96px = h-24 (24 * 4px)
    };

    // Helper to calculate height
    const getHeight = (start: string, end: string) => {
        const top = getPosition(start);
        const bottom = getPosition(end);
        return Math.max(32, bottom - top); // Minimum height
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
        <div
            className="flex-1 relative bg-white min-h-[1200px] cursor-crosshair"
            onClick={handleGridClick}
        >
            {/* Grid Lines (Background) for 7 AM to 5 PM (11 hours) */}
            {[...Array(11)].map((_, i) => (
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
                            // @ts-ignore
                            event={{
                                title: evt.title,
                                typeLabel: evt.badge,
                                duration: evt.duration,
                                priority: evt.priority,
                                startTime: evt.start,
                                endTime: evt.end,
                                color: evt.color as any,
                                assignees: evt.assignee ? ['https://github.com/shadcn.png'] : undefined
                            }}
                            variant="block"
                            onClick={() => onEventClick(evt)}
                        />
                    </div>
                );
            })}
        </div>
    );
}