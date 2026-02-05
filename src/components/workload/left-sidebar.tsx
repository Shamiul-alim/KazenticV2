'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Button } from '../ui/Button'
import { ArrowLeftToLine, ChevronRight, User } from 'lucide-react'
import Calendar2Icon from './icons/calendar-2'
import ProfileIcon from "./icons/profile"
import ArrowRightBoldIcon from "./icons/arrow-right-bold"
import ArrowLeftBoldIcon from "./icons/arrow-left-bold"
import { useWorkload } from './workload-context'
import { Separator } from "../ui/separator"
import { ROW_HEIGHT } from "./workload-timeline"

const HEADER_HEIGHT = 70 // px

type Subtask = {
    id: string
    name: string
    loggedHours?: string
}

type User = {
    id: string
    name: string
    role?: string
    avatar?: string
    loggedHours?: string
    subtasks?: Subtask[]
}

const users: User[] = [
    {
        id: "1",
        name: "Alif Hassan",
        role: "UI/UX Designer",
        avatar: "/assets/workload/avatar.png",
        loggedHours: "12h / 126h",
        subtasks: [
            { id: "1-1", name: "Dashboard Design", loggedHours: "6h / 40h" },
            { id: "1-2", name: "Mobile Prototype", loggedHours: "6h / 60h" },
        ]
    },
    {
        id: "2",
        name: "Tonmoy Asif",
        role: "Project Manager",
        avatar: "/assets/workload/avatar.png",
        loggedHours: "12h / 126h",
        subtasks: [
            { id: "2-1", name: "Sprint Planning", loggedHours: "8h / 30h" },
        ]
    },
]

export default function WorkloadLeftSidebar() {
    const { expandedUsers, toggleUser, isCollapsed, toggleCollapsed } = useWorkload()

    return (
        <aside className={cn(
            'border-r bg-background flex flex-col transition-all duration-300',
            isCollapsed ? 'w-20' : 'w-80'
        )}>
            {/* Header */}
            <div className="w-full flex flex-col border-b" style={{ height: HEADER_HEIGHT }}>
                <div className='flex justify-between items-start px-4 pt-2'>
                    {!isCollapsed && (
                        <span className='flex border rounded-md overflow-hidden'>
                            <Button variant="ghost" size="sm" className="px-0 py-1">
                                <ArrowLeftBoldIcon className='h-4 w-4 text-muted-foreground' />
                            </Button>
                            <Button variant="ghost" size="sm" className='w-full flex items-center gap-1 p-1'>
                                <Calendar2Icon className='h-4 w-4 text-muted-foreground' />
                                Jan 8 - 22
                            </Button>
                            <Button variant="ghost" size="sm" className="px-0 py-1">
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
                <span className="w-full px-4 py-2">Users</span>
            </div>


            <div className="flex-1 overflow-y-auto">
                {users.map((user) => (
                    <div key={user.id} className="border-b border-muted">
                        <SidebarUserRow
                            user={user}
                            isExpanded={expandedUsers.has(user.id)}
                            onToggle={() => toggleUser(user.id)}
                            isCollapsed={isCollapsed}
                        />
                        {!isCollapsed && expandedUsers.has(user.id) && user.subtasks?.map((subtask) => (
                            // <SidebarSubtaskRow key={subtask.id} subtask={subtask} />
                            <Separator className="bg-white" style={{ height: ROW_HEIGHT }} />
                        ))}
                    </div>
                ))}

                {/* Unassigned */}
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full flex items-center border-b border-muted hover:bg-muted transition",
                        isCollapsed ? "justify-center px-2" : "justify-between px-4"
                    )}
                    style={{ height: ROW_HEIGHT }}
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
            </div>
        </aside >
    )
}

function SidebarUserRow({ user, isExpanded, onToggle, isCollapsed }: { user: User; isExpanded: boolean; onToggle: () => void; isCollapsed: boolean }) {
    if (isCollapsed) {
        return (
            <Button
                variant="ghost"
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-center px-2 border-t border-muted",
                    "hover:bg-muted transition"
                )}
                style={{ height: ROW_HEIGHT }}
            >
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
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
            style={{ height: ROW_HEIGHT }}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>

                <div className="text-left">
                    <p className="font-medium leading-none">
                        {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.role}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {user.loggedHours && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-sm">
                        {user.loggedHours}
                    </span>
                )}
            </div>

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

function SidebarSubtaskRow({ subtask }: { subtask: Subtask }) {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full flex items-center justify-between pl-16 pr-4 border-t border-muted",
                "hover:bg-muted/50 transition"
            )}
            style={{ height: ROW_HEIGHT }}
        >
        </Button>
    )
}



