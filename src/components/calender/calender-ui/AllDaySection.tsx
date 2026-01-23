import React from 'react';
import EventItem from './EventItem';
import { events } from "@/lib/calendar-data";

interface AllDaySectionProps {
    onEventClick: (event: any) => void;
}

export default function AllDaySection({ onEventClick }: AllDaySectionProps) {
    // Filter events that are marked as allDay
    const allDayEvents = events.filter(event => event.allDay);

    return (
        <div className="flex border-b border-gray-200">
            {/* Left Label */}
            <div className="w-20 min-w-[5rem] p-3 text-xs text-gray-500 font-medium border-r border-gray-100">
                All Day
            </div>

            {/* Events Stack */}
            <div className="flex-1 p-1 flex flex-col gap-1">
                {allDayEvents.map((evt) => (
                    // @ts-ignore
                    <EventItem
                        key={evt.id}
                        // @ts-ignore
                        event={{
                            title: evt.title,
                            typeLabel: evt.badge,
                            color: evt.color as any,
                            duration: evt.duration,
                            priority: evt.priority,
                            startTime: evt.timeRange?.split('-')[0],
                            endTime: evt.timeRange?.split('-')[1],
                            assignees: evt.assignee ? ['https://github.com/shadcn.png'] : undefined
                        }}
                        variant="row"
                        onClick={() => onEventClick(evt)}
                    />
                ))}
            </div>
        </div>
    );
}