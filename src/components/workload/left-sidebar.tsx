'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Button } from '../ui/Button'
import { ArrowLeftToLine, ChevronRight, User, Group as GroupIcon } from 'lucide-react'
import Calendar2Icon from './icons/calendar-2'
import ProfileIcon from "./icons/profile"
import ArrowRightBoldIcon from "./icons/arrow-right-bold"
import ArrowLeftBoldIcon from "./icons/arrow-left-bold"
import { useWorkload } from './workload-context'
import { Separator } from "../ui/separator"
import { TimeLimitPopover } from "./time-limit-popover"
import { USER_DB, TASK_DB } from './data'
import { useMemo } from 'react'

type Subtask = {
    id: string
    name: string
    loggedHours?: string
}

type User = {
    id: string
    name: string
    role?: string
    avatar?: string | null
    loggedHours?: string
    subtasks?: Subtask[]
}

export default function WorkloadLeftSidebar() {
    const { expandedUsers, toggleUser, isCollapsed, toggleCollapsed, engine, shiftPrev, shiftNext, getDateRange, groupBy, sortOrder } = useWorkload()

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
                }))
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
        <aside
            className={cn(
                'border-r bg-background flex flex-col transition-all duration-300',
                !isCollapsed && 'w-80'
            )}
            style={{ width: isCollapsed ? '32px' : undefined }}
        >
            {/* Header */}
            <div className="w-full flex flex-col border-b" style={{ height: isCollapsed ? 32 : 66 }}>
                <div className='flex justify-between items-start px-4 pt-2'>
                    {!isCollapsed && (
                        <span className='flex border rounded-md overflow-hidden'>
                            <Button variant="ghost" size="sm" className="px-0 py-1" onClick={shiftPrev}>
                                <ArrowLeftBoldIcon className='h-4 w-4 text-muted-foreground' />
                            </Button>
                            <Button variant="ghost" size="sm" className='w-full flex items-center gap-1 p-1'>
                                <Calendar2Icon className='h-4 w-4 text-muted-foreground' />
                                {getDateRange()}
                            </Button>
                            <Button variant="ghost" size="sm" className="px-0 py-1" onClick={shiftNext}>
                                <ArrowRightBoldIcon className='h-4 w-4 text-muted-foreground' />
                            </Button>
                        </span>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        className={cn('p-1 px-2', isCollapsed && 'w-full')}
                        onClick={toggleCollapsed}
                    >
                        <ArrowLeftToLine className={cn(
                            'h-4 w-4 text-muted-foreground transition-transform',
                            isCollapsed && 'rotate-180'
                        )} />
                    </Button>
                </div>
                <span className="w-full px-4 py-2">{groupBy}</span>
            </div>


            <div className="flex-1 overflow-y-auto">
                {users.map((user) => {
                    const isUserExpanded = expandedUsers.has(user.id)
                    const userRowHeight = isCollapsed ? 32 : (isUserExpanded ? 32 : 66)

                    return (
                        <div key={user.id} className="border-b border-muted">
                            <SidebarUserRow
                                user={user}
                                isExpanded={isUserExpanded}
                                onToggle={() => toggleUser(user.id)}
                                isCollapsed={isCollapsed}
                                cellHeight={userRowHeight}
                            />
                            {isUserExpanded && user.subtasks?.map((subtask) => (
                                <Separator key={subtask.id} className="bg-white" style={{ height: 32 }} />
                            ))}
                        </div>
                    )
                })}

                {/* Unassigned - only show when groupBy is Assignee */}
                {groupBy === 'Assignee' && (
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full flex items-center border-b border-muted hover:bg-muted transition",
                            isCollapsed ? "justify-center px-2" : "justify-between px-4"
                        )}
                        style={{ height: isCollapsed ? 32 : 66 }}
                    >
                        {isCollapsed ? (
                            <ProfileIcon className="h-6 w-6 text-muted-foreground border rounded-full p-1" />
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <ProfileIcon className="h-6 w-6 text-muted-foreground border rounded-full p-1" />
                                    <span className="font-medium">Unassigned</span>
                                </div>
                                <ArrowRightBoldIcon className="h-4 w-4 text-muted-foreground" />
                            </>
                        )}
                    </Button>
                )}
            </div>
        </aside >
    )
}

type SidebarUserRowProps = {
    user: User
    isExpanded: boolean
    onToggle: () => void
    isCollapsed: boolean
    cellHeight: number
}

function SidebarUserRow({ user, isExpanded, onToggle, isCollapsed, cellHeight }: SidebarUserRowProps) {
    const isGroupRow = !user.avatar // Group rows have no avatar

    if (isCollapsed) {
        return (
            <Button
                variant="ghost"
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-center px-2 border-t border-muted",
                    "hover:bg-muted transition"
                )}
                style={{ height: cellHeight }}
            >
                {isGroupRow ? (
                    <GroupIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                )}
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            onClick={onToggle}
            className={cn(
                "w-full flex items-center justify-between px-4 border-t border-muted",
                "hover:bg-muted transition"
            )}
            style={{ height: cellHeight }}
        >
            <div className="flex items-center gap-3">
                {isGroupRow ? (
                    <GroupIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div className="text-left">
                    <p className="font-medium leading-none">
                        {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.role}
                    </p>
                </div>
            </div>

            {user.loggedHours && (
                <div onClick={(e) => e.stopPropagation()}>
                    <TimeLimitPopover userId={user.id} loggedHours={user.loggedHours} />
                </div>
            )}

            {user.subtasks && user.subtasks.length > 0 && (
                <ArrowRightBoldIcon
                    className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isExpanded && "rotate-90"
                    )}
                />
            )}
        </Button>
    )
}
