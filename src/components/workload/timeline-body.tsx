'use client'

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import { cn } from "@/lib/utils";

dayjs.extend(minMax);
import type { Day } from './timeline-header';
import { useMemo } from 'react'
import { useWorkload } from './workload-context'
import { Separator } from '../ui/separator';

type Subtask = {
    id: string;
    name: string;
}

type User = {
    id: string;
    name: string;
    subtasks?: Subtask[];
}

type TimelineBodyProps = {
    days: Day[];
    dayWidth: number;
    rowHeight: number;
}

export default function TimelineBody({ days, dayWidth, rowHeight }: TimelineBodyProps) {
    const { expandedUsers } = useWorkload()

    // Memoize users data
    const users = useMemo<User[]>(() => [
        {
            id: '1',
            name: 'Alif Hassan',
            subtasks: [
                { id: '1-1', name: 'Dashboard Design' },
                { id: '1-2', name: 'Mobile Prototype' },
            ]
        },
        {
            id: '2',
            name: 'Tonmoy Asif',
            subtasks: [
                { id: '2-1', name: 'Sprint Planning' },
            ]
        },
        { id: '3', name: 'John Doe' },
    ], [])

    // Memoize workload data
    const mockWorkloads = useMemo<Record<string, WorkloadItem[]>>(() => ({
        '1': [
            {
                id: '1',
                title: 'UI Design',
                startDate: new Date(Date.now()).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'purple' as const,
                hoursPerDay: 6,
            },
            {
                id: '2',
                title: 'Dashboard Layout',
                startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'green' as const,
                hoursPerDay: 4,
            },
        ],
        '2': [
            {
                id: '3',
                title: 'Sprint Planning',
                startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'purple' as const,
                hoursPerDay: 5,
            },
        ],
        '3': [],
        '1-1': [
            {
                id: '1-1-1',
                title: 'Wireframes',
                startDate: new Date(Date.now()).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'green' as const,
                hoursPerDay: 4,
            },
        ],
        '1-2': [
            {
                id: '1-2-1',
                title: 'Mobile UI',
                startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'purple' as const,
                hoursPerDay: 5,
            },
        ],
        '2-1': [
            {
                id: '2-1-1',
                title: 'Meeting Prep',
                startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                color: 'green' as const,
                hoursPerDay: 3,
            },
        ],
    }), [])

    return (
        <div>
            {users.map(user => (
                <div key={user.id} className='border-b hello'>
                    <TimelineRow
                        user={user}
                        days={days}
                        workloadItems={mockWorkloads[user.id] || []}
                        dayWidth={dayWidth}
                        rowHeight={rowHeight}
                    />
                    {expandedUsers.has(user.id) && user.subtasks?.map((subtask) => (
                        <TimelineRow
                            key={subtask.id}
                            user={subtask}
                            days={days}
                            workloadItems={mockWorkloads[subtask.id] || []}
                            isSubtask
                            dayWidth={dayWidth}
                            rowHeight={rowHeight}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

type TimelineRowProps = {
    user: User | Subtask;
    days: Day[];
    workloadItems: WorkloadItem[];
    isSubtask?: boolean;
    dayWidth: number;
    rowHeight: number;
}

function TimelineRow({ user, days, workloadItems, isSubtask, dayWidth, rowHeight }: TimelineRowProps) {
    // Calculate scheduled hours per day
    const scheduledHoursPerDay = useMemo(() => {
        const hoursMap: Record<string, number> = {}

        workloadItems.forEach(item => {
            const startIndex = dayIndex(item.startDate)
            const endIndex = dayIndex(item.endDate)

            for (let i = startIndex; i <= endIndex; i++) {
                if (i >= 0 && i < days.length) {
                    const dayDate = days[i].date
                    hoursMap[dayDate] = (hoursMap[dayDate] || 0) + item.hoursPerDay
                }
            }
        })

        return hoursMap
    }, [workloadItems, days])

    return (
        <div
            className="relative"
            style={{ height: rowHeight }}
        >
            {/* grid background with capacity info */}
            <div
                className="absolute inset-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${days.length}, ${dayWidth}px)`,
                }}
            >
                {days.map(day => {
                    const scheduledHours = scheduledHoursPerDay[day.date] || 0
                    const progressPercentage = (scheduledHours / day.capacityHours) * 100

                    return (
                        <div
                            key={day.date}
                            className="border-r bg-muted/20 relative flex flex-col"
                        >
                            {/* Scheduled hours display */}
                            <div className="p-2 text-muted-foreground">
                                {scheduledHours > 0 && (
                                    <span className={cn(
                                        "font-medium",
                                        scheduledHours > day.capacityHours && "text-red-500"
                                    )}>
                                        {scheduledHours}h / {day.capacityHours}h
                                    </span>
                                )}
                            </div>

                            {/* Progress bar at bottom */}
                            {scheduledHours > 0 && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                                    <div
                                        className={cn(
                                            "h-full transition-all",
                                            progressPercentage <= 100 ? "bg-green-500" : "bg-red-500"
                                        )}
                                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* workload bars */}
            <div className="absolute inset-0 top-5 pointer-events-none">
                <div className="pointer-events-auto">
                    {workloadItems.map(item => (
                        <WorkloadBar key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

type WorkloadItem = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    color: "purple" | "green";
    hoursPerDay: number;
    dayWidth?: number;
    rowHeight?: number;
}

function WorkloadBar({ item: { dayWidth = 100, rowHeight = 70, ...rest } }: { item: WorkloadItem }) {
    const position = useMemo(() => {
        const startIndex = dayIndex(rest.startDate)
        const endIndex = dayIndex(rest.endDate)
        const left = startIndex * dayWidth
        const width = (endIndex - startIndex + 1) * dayWidth
        return { left, width }
    }, [rest.startDate, rest.endDate])

    return (
        <div
            className={cn(
                "absolute top-4 h-7 rounded-md px-1.5 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity",
                rest.color === "purple" && "bg-purple-100 text-purple-800",
                rest.color === "green" && "bg-green-100 text-green-800"
            )}
            style={{ left: position.left, width: position.width }}
        >
            <Separator orientation="vertical" className="w-0.5 h-5.5 bg-current rounded-lg" />
            <span className="font-medium truncate">{rest.title}</span>
            <span className="opacity-70 whitespace-nowrap">{rest.hoursPerDay}h/day</span>
        </div>
    )
}

function dayIndex(dateStr: string): number {
    const date = new Date(dateStr)
    date.setHours(0, 0, 0, 0)

    const startDate = new Date() // Timeline starts today
    startDate.setHours(0, 0, 0, 0)

    const diffTime = date.getTime() - startDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

function getTimelineRange(viewDate: dayjs.Dayjs, viewType = "month"): { start: dayjs.Dayjs, end: dayjs.Dayjs } {
    const start =
        viewType === "month"
            ? dayjs(viewDate).startOf("month")
            : dayjs(viewDate).startOf("week");

    const end =
        viewType === "month"
            ? dayjs(viewDate).endOf("month")
            : dayjs(viewDate).endOf("week");

    return { start, end };
}

const DAY_WIDTH = 100 // px
const ROW_HEIGHT = 70

function dateToX(date: dayjs.Dayjs, timelineStart: dayjs.Dayjs): number {
    const diffDays = dayjs(date).diff(timelineStart, "day");
    return diffDays * DAY_WIDTH;
}

function taskWidth(startDate: string, endDate: string): number {
    const duration = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
    return duration * DAY_WIDTH;
}

function getTaskBar(task: WorkloadItem, timelineStart: dayjs.Dayjs) {
    return {
        id: task.id,
        x: dateToX(dayjs(task.startDate), timelineStart),
        width: taskWidth(task.startDate, task.endDate),
    };
}

function getTodayX(timelineStart: dayjs.Dayjs): number {
    return dateToX(dayjs(), timelineStart);
}

function buildHeader(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    const days = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, "day")) {
        days.push({
            date: current.format("YYYY-MM-DD"),
            day: current.format("DD"),
            weekday: current.format("ddd"),
        });
        current = current.add(1, "day");
    }

    return days;
}

function clampTaskToView(task: WorkloadItem, start: dayjs.Dayjs, end: dayjs.Dayjs) {
    const taskStart = dayjs(task.startDate);
    const taskEnd = dayjs(task.endDate);

    if (taskEnd.isBefore(start) || taskStart.isAfter(end)) return null;

    return {
        ...task,
        startDate: dayjs.max(taskStart, start).format("YYYY-MM-DD"),
        endDate: dayjs.min(taskEnd, end).format("YYYY-MM-DD"),
    };
}

function isOverlapping(a: WorkloadItem, b: WorkloadItem) {
    return dayjs(a.startDate).isBetween(b.startDate, b.endDate, null, "[]") ||
        dayjs(b.startDate).isBetween(a.startDate, a.endDate, null, "[]");
}

const ZOOM_LEVELS = {
    day: 40,
    week: 12,
    month: 4,
};

function setZoom(level: keyof typeof ZOOM_LEVELS): number {
    return ZOOM_LEVELS[level];
}

const { start, end } = getTimelineRange(dayjs("2026-02-10"));

const header = buildHeader(start, end);

// const positionedTasks = days
//     .map(t => clampTaskToView(t, start, end))
//     .filter(Boolean)
//     .map(t => getTaskBar(t, start));
