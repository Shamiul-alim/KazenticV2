"use client";

import {
    TableRow,
    TableCell,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
} from "../../ui/collapsible";
import { Button } from "../../ui/button";
import { ChevronRight, ChevronDown, Plus, PencilLine, Flag, FlagTriangleRight, MoreHorizontal, Star, Hourglass, Timer } from "lucide-react";
import { TaskNode } from "./data.types";
import { useEffect, useState } from "react";
import SubtaskIcon from "../../icons/subtask";
import FlagIcon from "../../icons/flag";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { AssigneeSelect } from "../assignee-select";
import { TASK_USER_DATA } from "./task.mock";
import { StatusSelect } from "../status-group/task-status-select";
import { TaskStatus } from "@/data/task-status.enum";
import { TaskActionsMenu } from "../task-actions/task-action-menu";
import { SprintSelectPopover } from "../sprint-select/sprint-select-popover";
import { Badge } from "../../ui/badge";
import { useRouter } from "next/navigation";

interface Props {
    node: TaskNode;
    level: number;
    expanded: Record<string, boolean>;
    setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    selected: Record<string, boolean>;
    setSelected: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
const INDENT_SIZE = 30;

export function TaskTableRow({
    node,
    level,
    expanded,
    setExpanded,
    selected,
    setSelected,
}: Props) {
    // const isOpen = expanded[node.id];
    // const hasChildren = !!node.children?.length;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hasChildren, setHasChildren] = useState<boolean>(!!node.children?.length);
    const [assigneeId, setAssigneeId] = useState<string | undefined>(node.assignee?.id);
    const router = useRouter();

    return (
        <>
            <TableRow className="text-[10px] sm:text-xs">
                {/* Checkbox */}
                <TableCell>
                    <Checkbox
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        checked={!!selected[node.id]}
                        onCheckedChange={() =>
                            setSelected((s) => ({
                                ...s,
                                [node.id]: !s[node.id],
                            }))
                        }
                    />
                </TableCell>

                {/* Task name + hierarchy */}
                <TableCell>
                    <div
                        className="flex items-center gap-1.5 sm:gap-2"
                        style={{ paddingLeft: `${level * INDENT_SIZE}px` }}
                    >
                        {hasChildren && (
                            <button
                                onClick={() => {
                                    setHasChildren(true);
                                    setIsOpen(!isOpen);
                                    setExpanded((e) => ({
                                        ...e,
                                        [node.id]: !e[node.id],
                                    }))
                                }}
                                className="text-muted-foreground"
                            >
                                {isOpen ? (
                                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                                ) : (
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                            </button>
                        )}

                        <Button onClick={() => router.push(`/tasks/${node.id}`)} variant="ghost" className="truncate font-medium text-[10px] sm:text-xs">
                            {node.name}
                        </Button>
                    </div>
                </TableCell>

                {/* Subtask Button */}
                <TableCell>
                    {node.subtaskCount && (
                        <span className="ml-1 sm:ml-2 rounded bg-muted px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs">
                            {node.subtaskCount} <SubtaskIcon className="inline-block mb-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                    )}
                </TableCell>

                {/* Task Actions */}
                <TableCell>
                    <Button size="icon" variant="outline" className="h-7 w-7 sm:h-8 sm:w-8">
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="ml-1 sm:ml-2 h-7 w-7 sm:h-8 sm:w-8">
                        <PencilLine className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                </TableCell>

                {/* Priority */}
                <TableCell>
                    <StatusSelect value={node.priority as TaskStatus | "Urgent"} onChange={() => { }} />
                </TableCell>

                {/* Assignee */}
                <TableCell>
                    <AssigneeSelect value={assigneeId} users={TASK_USER_DATA} onChange={setAssigneeId} />
                </TableCell>

                {/* Start Date */}
                <TableCell>
                    <Button size="icon" variant="ghost" className="text-[10px] sm:text-xs">
                        {node.startDate}
                    </Button>
                </TableCell>

                {/* Due Date */}
                <TableCell>
                    <Button size="icon" variant="ghost" className="text-[10px] sm:text-xs">
                        {node.dueDate}
                    </Button>
                </TableCell>

                {/* Sprints */}
                <TableCell>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="text-[#4157FE] font-semibold text-[10px] sm:text-xs whitespace-nowrap">{node.sprint?.name} {node.sprint?.range}</span>
                        <SprintSelectPopover
                            sprints={[
                                { id: "s1", name: "Sprint 1", range: "7/12 - 8/12" },
                                { id: "s2", name: "Sprint 2", range: "7/12 - 8/12" },
                            ]}
                            onChange={() => { }}
                            value={`${node.sprint?.name} ${node.sprint?.range}` || ""}
                        />
                    </div>
                </TableCell>

                {/* Sprint Points */}
                <TableCell>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                        <Star size={12} className="inline-block mr-0.5 sm:mr-1 mb-0.5 sm:w-3.5 sm:h-3.5" />
                        {node.sprint?.points}
                    </Badge>
                </TableCell>

                {/* Time Estimate */}
                <TableCell>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                        <Hourglass size={12} className="inline-block mr-0.5 sm:mr-1 mb-0.5 sm:w-3.5 sm:h-3.5" />
                        {node.sprint?.timeEstimate}
                    </Badge>
                </TableCell>

                {/* Time Tracked */}
                <TableCell>
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                        <Timer size={12} className="inline-block mr-0.5 sm:mr-1 mb-0.5 sm:w-3.5 sm:h-3.5" />
                        {node.sprint?.timeTracked}
                    </Badge>
                </TableCell>

                {/* Action */}
                <TableCell>
                    <TaskActionsMenu />
                </TableCell>
            </TableRow>

            {/* Children */}
            {isOpen && hasChildren && (
                <>
                    {node.children!.map((child) => (
                        <TaskTableRow
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
                </>
            )}
        </>
    );
}
