
export type EventType = 'Holiday' | 'Meeting' | 'Type' | 'Work';

export interface CalendarEvent {
    id: string;
    title: string;
    typeLabel?: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
    priority?: 'High' | 'Medium' | 'Low';
    color: 'green' | 'purple' | 'blue';
    isAllDay?: boolean;
    assignees?: string[]; // URLs to images
}