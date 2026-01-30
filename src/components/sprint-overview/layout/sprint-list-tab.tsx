'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ChartColumn, Check, ChevronRight, Copy, Plus, Timer, User } from 'lucide-react'
import SubtaskIcon from '../icons/subtask'
import { CustomizeViewTrigger } from '../custom/customize-view-trigger'
import { Avatar, AvatarFallback } from '../ui/avatar'
import SubtaskSummary from './subtask-summary'
import { TaskSection } from './task-section'
import { TaskTable } from '../custom/data-explorer/data-table'
import { TASK_DATA } from '../custom/data-explorer/task.mock'
import { FilterPopover } from '../custom/filters/filter-popover'
import { useState } from 'react'
import { AssigneeSidebar } from '../custom/assignee-sidebar/assignee-sidebar'
import { AddTaskToSprintDialog } from '../custom/add-to-sprint/add-to-sprint-dialog';

export default function SprintListTab() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
    const openAssigneeSider = () => {
        setOpenSidebar(true);
    }

    return (
        <div className="flex flex-col h-full">
            {/* header */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0 border-b px-2 sm:px-4 py-2 sm:pb-2">
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    {/* Subtasks */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs">
                                <SubtaskIcon className="mr-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span className="hidden xs:inline">Subtasks</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Show Subtasks</DropdownMenuLabel>
                                <DropdownMenuItem>Collapsed</DropdownMenuItem>
                                <DropdownMenuItem>Expanded</DropdownMenuItem>
                                <DropdownMenuItem>Separate</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Group By */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs">
                                <SubtaskIcon className="mr-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Group By: Status</span>
                                <span className="sm:hidden">Group By</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Button variant="outline" className="w-full justify-between">
                                            Status
                                            <ChevronRight className="inline-block ml-1 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Status</DropdownMenuItem>
                                            <DropdownMenuItem>Assignee</DropdownMenuItem>
                                            <DropdownMenuItem>Priority</DropdownMenuItem>
                                            <DropdownMenuItem>Tags</DropdownMenuItem>
                                            <DropdownMenuItem>Due Date</DropdownMenuItem>
                                            <DropdownMenuItem>Task Type</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Button variant="outline" className="w-full justify-between">
                                            Ascending
                                            <ChevronRight className="inline-block ml-1 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Ascending</DropdownMenuItem>
                                            <DropdownMenuItem>Descending</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    <FilterPopover />

                    <Button onClick={openAssigneeSider} variant="outline" size="sm" className="flex-1 sm:flex-none text-xs">
                        <Avatar size="xs" className="mr-0.5">
                            <AvatarFallback>AH</AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline">Alif Hassan</span>
                        <span className="sm:hidden">AH</span>
                    </Button>

                    {/* Customize View Button */}
                    <CustomizeViewTrigger />

                    <Button size="sm" onClick={() => setOpenDialog(true)} className="flex-1 sm:flex-none text-xs">
                        <Plus className="mr-0.5 stroke-3 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden md:inline">Add Task to Sprint</span>
                        <span className="md:hidden">Add Task</span>
                    </Button>
                </div>
            </div>

            {/* body */}
            <div className="p-2 sm:p-4 flex flex-col gap-3 sm:gap-4 text-xs overflow-auto">
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
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
                <div className='flex flex-col gap-4'>
                    <TaskSection
                        title={
                            <span className="flex gap-1">
                                <Check className="h-4 w-4" />
                                ACTIVE
                            </span>
                        }
                        taskCount={4}
                        color="green"
                    >
                        <TaskTable
                            data={TASK_DATA}
                        />
                    </TaskSection>
                </div>
            </div>

            {/* Sidebar */}
            <AssigneeSidebar
                open={openSidebar}
                onOpenChange={setOpenSidebar}
                assignees={[
                    { id: "1", name: "Alif Hassan", count: 2, type: "user" },
                    { id: "2", name: "Tommoy Asif", count: 2, type: "user" },
                    { id: "3", name: "John Doe", count: 3, type: "user" },
                    { id: "4", name: "Unassigned", count: 9, type: "unassigned" },
                    { id: "5", name: "Kazentic", type: "team" },
                ]}
                value={selectedAssignees}
                onChange={setSelectedAssignees}
            />

            {/* Add to Sprint Dialog */}
            <AddTaskToSprintDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                selectedCount={3}
            >
                <TaskSection
                    title={<span className="flex gap-1"><ChartColumn className="h-4 w-4" />Committed</span>}
                    color="blue"
                >
                    <TaskTable
                        data={TASK_DATA}
                    />
                </TaskSection>

            </AddTaskToSprintDialog>
        </div>
    )
}
