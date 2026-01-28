import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ChartColumn, Copy, Filter, Plus, RefreshCcw, Timer, User } from 'lucide-react'
import SubtaskIcon from '../icons/subtask'
import { CustomizeViewTrigger } from '../custom/customize-view-trigger'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StatCard } from '../custom/stat-card'
import SubtaskSummary from './subtask-summary'
import { TaskSection } from './task-section'
import { TaskTable } from './task-table'

export default function SprintListTab() {
    return (
        <div className="flex flex-col h-full">
            {/* header */}
            <div className="flex justify-between items-center border-b px-4 pb-2">
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SubtaskIcon className="mr-0.5" />
                                Subtasks
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                            please implement submenu items here
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SubtaskIcon className="mr-0.5" />
                                Group By: Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-0.5" />
                        Filter
                    </Button>

                    <Button variant="outline" size="sm">
                        <Avatar size="xs" className="mr-0.5">
                            <AvatarFallback>AH</AvatarFallback>
                        </Avatar>
                        Alif Hassan
                    </Button>

                    {/* Customize View Button */}
                    <CustomizeViewTrigger />

                    <Button size="sm">
                        <Plus className="mr-0.5 stroke-3" />
                        Add Task to Sprint
                    </Button>
                </div>
            </div>

            {/* body */}
            <div className="p-4 flex flex-col gap-4 text-xs">
                <div className='flex gap-4'>
                    <SubtaskSummary
                        title="Backlog"
                        subtitle="4 new tasks added"
                        icon={<Copy />}
                        color="green"
                    />
                    <SubtaskSummary
                        title="Unassigned"
                        subtitle="1 task missing assignee"
                        icon={<User />}
                        color="yellow"
                    />
                    <SubtaskSummary
                        title="Missing Effort"
                        subtitle="1 task needs effort estimate"
                        icon={<Timer />}
                        color="red"
                    />
                </div>
                <div>
                    <TaskSection
                        title={<span className="flex gap-1"><ChartColumn className="h-4 w-4" />Committed</span>}
                        color="blue"
                    >
                        <TaskTable
                            columns={[
                                "Task Name",
                                "Priority",
                                "Assignee",
                                "Start Date",
                                "Due Date",
                                "Sprints",
                                "Sprint Points",
                            ]}
                            rows={[
                                [
                                    "[kzt-1] Auth, Profile, Dashboard...",
                                    "Urgent",
                                    "Alif Hassan",
                                    "Dec 6 at 5:00 am",
                                    "Dec 10 at 5:00 am",
                                    "Sprint 1",
                                    "3 pts",
                                ],
                                [
                                    "[kzt-2] Auth, Profile, Dashboard...",
                                    "High",
                                    "Alif Hassan",
                                    "Dec 6 at 5:00 am",
                                    "Dec 10 at 5:00 am",
                                    "Sprint 1",
                                    "5 pts",
                                ],
                            ]}
                        />
                    </TaskSection>
                </div>
            </div>
        </div>
    )
}
