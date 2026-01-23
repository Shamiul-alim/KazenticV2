import React from 'react';
import EventItem from './EventItem';
import { events } from "@/data/calendar-data";

import moment from 'moment';

interface AllDaySectionProps {
    onEventClick: (event: any) => void;
    currentDate: moment.Moment;
}

export default function AllDaySection({ onEventClick, currentDate }: AllDaySectionProps) {
    // Filter events that are marked as allDay and match the current date
    const allDayEvents = events.filter(event =>
        event.allDay && event.date === currentDate.format('YYYY-MM-DD')
    );

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
                        event={{
                            ...evt,
                            typeLabel: evt.badge || evt.type,
                            startTime: evt.allDay ? 'All Day' : (evt.start || evt.timeRange?.split('-')[0]),
                            endTime: evt.allDay ? '' : (evt.end || evt.timeRange?.split('-')[1]),
                            assignees: evt.assignee ? ['https://github.com/shadcn.png'] : undefined
                        } as any}
                        variant="row"
                        onClick={() => onEventClick(evt)}
                    />
                ))}
            </div>
        </div>
    );
}