"use client";

import { useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { TaskTableRow } from "./task-table-row";
import { TaskNode } from "./data.types";
import { ChevronsUpDown, Plus } from "lucide-react";
import { DropdownMenuSubmenu } from "../dropdown-submenu";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";

interface Props {
    data: TaskNode[];
    isExtendable?: boolean;
}

export function TaskTable({ data, isExtendable = true }: Props) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [addTask, setAddTask] = useState<boolean>(false);

    return (
        <div className="overflow-x-hidden rounded-md border w-full">
            <Table>
                <colgroup>
                    <col style={{ width: '40px' }} />
                    <col style={{ minWidth: '220px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '120px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ minWidth: '100px' }} />
                    <col style={{ width: '80px' }} />
                </colgroup>
                <TableHeader>
                    <TableRow className="items-center">
                        <TableHead>
                            <Checkbox className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Task Name
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs" />
                        <TableHead className="text-[10px] sm:text-xs" />
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Priority
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Assignee
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Start Date
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Due Date
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Sprints
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Sprint Points
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Time Estimate
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead className="text-[10px] sm:text-xs whitespace-nowrap">
                            Time Tracked
                            <ChevronsUpDown className="inline-block ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data && data.map((node) => (
                        <TaskTableRow
                            key={node.id}
                            node={node}
                            level={0}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
                    {
                        isExtendable && (
                            <TableRow className="text-[10px] sm:text-[11px] items-center h-8 sm:h-10">
                                {
                                    addTask ? (
                                        <>
                                            {/* Checkbox */}
                                            <TableCell className="h-4">
                                                <Checkbox className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            </TableCell>

                                            {/* Task Name */}
                                            <TableCell colSpan={3}>
                                                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                                                    <Input variant="ghost" size="sm" placeholder="Enter task name" autoFocus className="text-xs" />
                                                    <div className="flex gap-1.5 sm:gap-2 whitespace-nowrap">
                                                        <Button size="sm" variant="outline" onClick={() => setAddTask(false)} className="text-xs px-2 sm:px-3">
                                                            Cancel
                                                        </Button>
                                                        <Button size="sm" onClick={() => setAddTask(false)} className="text-xs px-2 sm:px-3">
                                                            Save
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            {/* Checkbox */}
                                            <TableCell className="h-4" />

                                            {/* Task Name */}
                                            <TableCell colSpan={3} className="text-[#9BA2AD]">
                                                <Button variant="ghost" size="sm" className="p-0 text-[10px] sm:text-xs" onClick={() => setAddTask(true)}>
                                                    <Plus className="inline-block mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                                    Create Task
                                                </Button>
                                            </TableCell>
                                        </>
                                    )
                                }

                                {/* Priority */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Assignee */}
                                <TableCell className="text-[#9BA2AD]">
                                    1
                                </TableCell>

                                {/* Start Date */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Due Date */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Sprints */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Sprint Points */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Time Estimate */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>

                                {/* Time Tracked */}
                                <TableCell className="text-[#9BA2AD]">
                                    <DropdownMenuSubmenu />
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div >
    );
}
