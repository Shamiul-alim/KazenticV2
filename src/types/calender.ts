
export type EventType = 'Holiday' | 'Meeting' | 'Type' | 'Work';

export interface CalendarEvent {
    id: any;
    title: string;
    typeLabel?: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
    priority?: string;
    color: 'green' | 'purple' | 'blue' | string;
    allDay?: boolean;
    date?: string; // Format: YYYY-MM-DD
    assignee?: string;
    assignees?: string[]; // URLs to images
    // For time-grid events
    start?: string;
    end?: string;
    type?: string;
    badge?: string;
    style?: string;
    timeRange?: string;
    icon?: string;
}