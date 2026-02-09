'use client'

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import { useMemo } from 'react'
import { useWorkload, GroupByOption } from '../workload-context'
import { TimelineColumn, WorkloadItem } from '../workload-engine';
import { TASK_DB, USER_DB } from '../data';
import { CapacityIndicatorRow } from './capacity-indicator-row';
import { TimelineRowContainer } from './timeline-row-container';

type Subtask = {
    id: string;
    name: string;
}

type User = {
    id: string;
    name: string;
    subtasks?: Subtask[];
}

export interface ColumnType extends TimelineColumn {
    capacityHours: number;
    workloadHours: number;
}

type TimelineBodyProps = {
    columns: ColumnType[];
    workloadItems: Record<string, WorkloadItem[]>;
}

export default function TimelineBody({ columns, workloadItems }: TimelineBodyProps) {
    const { expandedUsers, unit, engine, cellWidth, groupBy, sortOrder } = useWorkload()

    // Map USER_DB to the User format needed for timeline
    const users = useMemo<User[]>(() => {
        let mappedUsers: User[] = []

        if (groupBy === 'Assignee') {
            mappedUsers = USER_DB.map(user => ({
                id: user.id,
                name: user.name,
                subtasks: TASK_DB
                    .filter(task => task.parentId && task.assignees.includes(user.id))
                    .reduce((acc, task) => {
                        if (!acc.find(s => s.id === task.id)) {
                            acc.push({ id: task.id, name: task.title })
                        }
                        return acc
                    }, [] as Subtask[])
            }))

            // Add unassigned row
            mappedUsers.push({
                id: 'unassigned',
                name: 'Unassigned',
                subtasks: []
            })
        } else if (groupBy === 'Status') {
            const statuses = ['todo', 'in_progress', 'review', 'done']
            mappedUsers = statuses.map(status => ({
                id: status,
                name: status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                subtasks: []
            }))
        } else if (groupBy === 'Priority') {
            const priorities = ['urgent', 'high', 'medium', 'low']
            mappedUsers = priorities.map(priority => ({
                id: priority,
                name: priority.charAt(0).toUpperCase() + priority.slice(1),
                subtasks: []
            }))
        } else if (groupBy === 'Task Type') {
            const taskTypes = ['sprint_point', 'task_group', 'time_estimate']
            mappedUsers = taskTypes.map(type => ({
                id: type,
                name: type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                subtasks: []
            }))
        } else if (groupBy === 'Tags') {
            const allTags = [...new Set(TASK_DB.flatMap(t => t.tags))]
            mappedUsers = allTags.map(tag => ({
                id: tag,
                name: tag.charAt(0).toUpperCase() + tag.slice(1),
                subtasks: []
            }))
        } else if (groupBy === 'Due Date') {
            const allDates = [...new Set(TASK_DB.map(t => t.dueDate))].sort()
            mappedUsers = allDates.map(date => ({
                id: date,
                name: date,
                subtasks: []
            }))
        }

        // Apply sort order
        if (sortOrder === 'Descending') {
            mappedUsers.reverse()
        }

        return mappedUsers
    }, [groupBy, sortOrder])

    // Calculate capacity by date for each user's workload items
    const getUserCapacityByDate = (userId: string) => {
        const items = workloadItems[userId] || []
        const map: Record<string, { used: number; capacity: number }> = {}

        items.forEach(item => {
            const s = engine.dateToColumnIndex(item.startDate)
            const e = engine.dateToColumnIndex(item.endDate)
            const itemValue = getItemValue(item)
            const daysSpan = e - s + 1

            for (let i = s; i <= e; i++) {
                const col = columns[i]
                if (!col) continue

                const dailyValue = unit === 'sprint-points'
                    ? itemValue / daysSpan
                    : unit === 'tasks'
                        ? 1 / daysSpan
                        : item.hoursPerDay

                map[col.date] = {
                    used: (map[col.date]?.used || 0) + dailyValue,
                    capacity: col.capacityHours,
                }
            }
        })

        return map
    }

    const getItemValue = (item: WorkloadItem): number => {
        switch (unit) {
            case 'sprint-points':
                return item.sprintPoints ?? 0
            case 'tasks':
                return 1
            case 'time-estimates':
                return item.timeEstimate ?? item.hoursPerDay ?? 0
            default:
                return 0
        }
    }

    return (
        <div>
            {users.map(user => (
                <div key={user.id} className='border-b'>
                    {/* Capacity Indicator Row */}
                    <CapacityIndicatorRow
                        columns={columns}
                        capacityByDate={getUserCapacityByDate(user.id)}
                        dayWidth={cellWidth}
                    />

                    {!expandedUsers.has(user.id) ? (
                        // When not expanded: show single row with all items combined
                        <TimelineRowContainer
                            key={user.id}
                            workloadItems={workloadItems[user.id] || []}
                            columns={columns}
                            isSubtask={false}
                        />
                    ) : (
                        // When expanded: show each task in separate rows
                        <>
                            {/* Parent tasks (tasks without parentId or top-level tasks) */}
                            {(workloadItems[user.id] || [])
                                .filter(item => !TASK_DB.find(t => t.id === item.id)?.parentId)
                                .map((item) => (
                                    <TimelineRowContainer
                                        key={item.id}
                                        workloadItems={[item]}
                                        columns={columns}
                                        isSubtask={false}
                                    />
                                ))}

                            {/* Child tasks (tasks with parentId - shown as subtasks) */}
                            {(workloadItems[user.id] || [])
                                .filter(item => TASK_DB.find(t => t.id === item.id)?.parentId)
                                .map((item) => (
                                    <TimelineRowContainer
                                        key={item.id}
                                        workloadItems={[item]}
                                        columns={columns}
                                        isSubtask={true}
                                    />
                                ))}
                        </>
                    )}

                </div>
            ))}
        </div>
    )

}
