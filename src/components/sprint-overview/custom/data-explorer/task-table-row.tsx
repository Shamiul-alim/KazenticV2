// components/task-table/TaskTableRow.tsx
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
import { ChevronRight, ChevronDown, Plus, PencilLine, Flag, FlagTriangleRight, MoreHorizontal } from "lucide-react";
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

    return (
        <>
            <TableRow>
                {/* Checkbox */}
                <TableCell>
                    <Checkbox
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
                        className="flex items-center gap-2"
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
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                        )}

                        <span className="truncate font-medium">
                            {node.name} {level}
                        </span>
                    </div>
                </TableCell>

                {/* Subtask Button */}
                <TableCell>
                    {node.subtaskCount && (
                        <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs">
                            {node.subtaskCount} <SubtaskIcon className="inline-block mb-0.5" />
                        </span>
                    )}
                </TableCell>

                {/* Task Actions */}
                <TableCell>
                    <Button size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="ml-2">
                        <PencilLine className="h-4 w-4" />
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
                    <Button size="icon" variant="ghost">
                        {node.startDate}
                    </Button>
                </TableCell>

                {/* Due Date */}
                <TableCell>
                    <Button size="icon" variant="ghost">
                        {node.dueDate}
                    </Button>
                </TableCell>

                {/* Sprints */}
                <TableCell>
                    <div className="flex items-center gap-4">
                        <span className="text-[#4157FE] font-semibold">{node.sprint?.name} {node.sprint?.range}</span>
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
                    {node.sprint?.points}
                </TableCell>

                {/* Time Estimate */}
                <TableCell>
                    <Button size="icon" variant="ghost">
                        {node.sprint?.timeEstimate}
                    </Button>
                </TableCell>

                {/* Time Tracked */}
                <TableCell>
                    <Button size="icon" variant="ghost">
                        {node.sprint?.timeTracked}
                    </Button>
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
