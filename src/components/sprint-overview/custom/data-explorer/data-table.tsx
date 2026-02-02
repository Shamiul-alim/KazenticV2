// components/task-table/TaskTable.tsx
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
import { ChevronDown, ChevronRight, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { DropdownMenuSubmenu } from "../dropdown-submenu";

interface Props {
    data: TaskNode[];
}

export function TaskTable({ data }: Props) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    return (
        <div className="rounded-md overflow-hidden border mx-2">
            <Table>
                <TableHeader>
                    <TableRow className="items-center">
                        <TableHead className="w-10">
                            <Checkbox />
                        </TableHead>
                        <TableHead>
                            Task Name
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead />
                        <TableHead />
                        <TableHead>
                            Priority
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Assignee
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Start Date
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Due Date
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Sprints
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Sprint Points
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Time Estimate
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead>
                            Time Tracked
                            <ChevronsUpDown className="inline-block ml-1 h-4 w-4" />
                        </TableHead>
                        <TableHead className="w-24" />
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
                    <TableRow className="text-[11px] items-center h-10">
                        {/* Checkbox */}
                        <TableCell className="h-4" />

                        {/* Task Name */}
                        <TableCell colSpan={3} className="text-[#9BA2AD]">
                            <Plus className="inline-block mr-1 h-4 w-4" />
                            Create Task
                        </TableCell>

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
                </TableBody>
            </Table>
        </div>
    );
}
