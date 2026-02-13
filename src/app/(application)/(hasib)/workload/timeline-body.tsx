'use client';

import { Button } from '@/components/employee/ui/button';
import { Separator } from '@/components/employee/ui/separator';
import ProfileIcon from '@/components/icons/profile';
import { TASK_DB, USER_DB } from '@/components/workload/data'
import ArrowRightBoldIcon from '@/components/workload/icons/arrow-right-bold';
import { SidebarUserRow } from '@/components/workload/sidebar/sidebar-row';
import { Subtask, User } from '@/components/workload/types/workload.types'
import { useWorkload } from '@/components/workload/workload-context'
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react'

export default function TimelineBody() {
    const {
        expandedUsers,
        toggleUser,
        isCollapsed,
        toggleCollapsed,
        engine,
        shiftPrev,
        shiftNext,
        getDateRange,
        groupBy,
        sortOrder
    } = useWorkload()

    // Map users based on groupBy selection
    const users: User[] = useMemo(() => {
        let mappedUsers: User[] = []

        if (groupBy === 'Assignee') {
            mappedUsers = USER_DB.map(user => ({
                id: user.id,
                name: user.name,
                role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                avatar: user.avatar || "/assets/workload/avatar.png",
                loggedHours: "12h / 126h",
                subtasks: TASK_DB.filter(task => task.assignees.includes(user.id)).map(task => ({
                    id: task.id,
                    name: task.title,
                    loggedHours: "4h / 8h"
                })) as Subtask[]
            }))
        } else if (groupBy === 'Status') {
            const statuses = ['todo', 'in_progress', 'review', 'done']
            mappedUsers = statuses.map(status => ({
                id: status,
                name: status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                role: 'Status Group',
                avatar: null,
                loggedHours: undefined,
                subtasks: []
            }))
        } else if (groupBy === 'Priority') {
            const priorities = ['urgent', 'high', 'medium', 'low']
            mappedUsers = priorities.map(priority => ({
                id: priority,
                name: priority.charAt(0).toUpperCase() + priority.slice(1),
                role: 'Priority Group',
                avatar: null,
                loggedHours: undefined,
                subtasks: []
            }))
        } else if (groupBy === 'Task Type') {
            const taskTypes = ['sprint_point', 'task_group', 'time_estimate']
            mappedUsers = taskTypes.map(type => ({
                id: type,
                name: type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                role: 'Task Type Group',
                avatar: null,
                loggedHours: undefined,
                subtasks: []
            }))
        } else if (groupBy === 'Tags') {
            const allTags = [...new Set(TASK_DB.flatMap(t => t.tags))]
            mappedUsers = allTags.map(tag => ({
                id: tag,
                name: tag.charAt(0).toUpperCase() + tag.slice(1),
                role: 'Tag Group',
                avatar: null,
                loggedHours: undefined,
                subtasks: []
            }))
        } else if (groupBy === 'Due Date') {
            const allDates = [...new Set(TASK_DB.map(t => t.dueDate))].sort()
            mappedUsers = allDates.map(date => ({
                id: date,
                name: date,
                role: 'Due Date Group',
                avatar: null,
                loggedHours: undefined,
                subtasks: []
            }))
        }

        // Apply sort order
        if (sortOrder === 'Descending') {
            mappedUsers.reverse()
        }

        return mappedUsers
    }, [groupBy, sortOrder])

    return (
        <div className='grow flex flex-col'>
            {users.map((user) => {
                const isUserExpanded = expandedUsers.has(user.id)

                return (
                    <div key={user.id} className="flex items-center">
                        {/* Sticky Sidebar */}
                        <div className={cn(
                            "max-w-80 sticky top-0 left-0 flex flex-col text-sm font-medium border-r bg-background",
                            isCollapsed ? "w-20" : "w-80"
                        )}>
                            <div key={user.id} className="border-b border-muted">
                                <SidebarUserRow
                                    user={user}
                                    isExpanded={isUserExpanded}
                                    onToggle={() => toggleUser(user.id)}
                                    isCollapsed={isCollapsed}
                                />
                                {isUserExpanded && user.subtasks?.map((subtask) => (
                                    <Separator key={subtask.id} className="bg-white" style={{ height: 32 }} />
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Body Row */}
                        <div className="flex items-center h-full border-b border-muted">
                            {
                                Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} className="w-60 h-full border-r shrink-0">
                                        Header {i + 1}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            })}

            {/* Sticky Sidebar */}
            <div className="flex items-center">
                <div className={cn(
                    "max-w-80 sticky top-0 left-0 flex flex-col text-sm font-medium bg-background border-r",
                    isCollapsed ? "w-20" : "w-80"
                )}>
                    {/* Unassigned - only show when groupBy is Assignee */}
                    {
                        groupBy === 'Assignee' && (
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full rounded-none flex items-center border-b border-muted hover:bg-muted transition h-18",
                                    isCollapsed ? "justify-center px-2" : "justify-between px-4"
                                )}
                            >
                                {isCollapsed ? (
                                    <ProfileIcon className="h-9 w-9 text-muted-foreground border rounded-full p-1" />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <ProfileIcon className="h-9 w-9 text-muted-foreground border rounded-full p-1" />
                                            <span className="font-medium">Unassigned</span>
                                        </div>
                                        <ArrowRightBoldIcon className="h-4 w-4 text-muted-foreground" />
                                    </>
                                )}
                            </Button>
                        )
                    }
                </div>

                {/* Scrollable Body Row */}
                <div className="flex items-center h-full">
                    {
                        Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="w-60 h-full border-r shrink-0">
                                Header {i + 1}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


