"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

import {
    Pencil,
    Plus,
    Copy,
    MoveRight,
    Timer,
    Boxes,
    Link,
    Trash2,
    MoreHorizontal,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { MoveTaskDialog } from "./move-task-dialog";

interface TaskActionsMenuProps {
    onRename?: () => void;
    onDuplicate?: () => void;
    onDelete?: () => void;
}

export function TaskActionsMenu({
    onRename,
    onDuplicate,
    onDelete,
}: TaskActionsMenuProps) {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                    {/* Rename */}
                    <DropdownMenuItem onClick={onRename}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                    </DropdownMenuItem>

                    {/* Add To (submenu) */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Plus className="mr-2 h-4 w-4" />
                            Add To
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Project</DropdownMenuItem>
                            <DropdownMenuItem>Sprint</DropdownMenuItem>
                            <DropdownMenuItem>Epic</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Duplicate */}
                    <DropdownMenuItem onClick={onDuplicate}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate Task
                    </DropdownMenuItem>

                    {/* Move Task (dialog) */}
                    <DropdownMenuItem>
                        <Button onClick={openDialog} variant="ghost" className="w-full justify-between">
                            Move Task
                            <ChevronRight className="mr-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuItem>

                    {/* Start Timer */}
                    <DropdownMenuItem>
                        <Timer className="mr-2 h-4 w-4" />
                        Start Timer
                    </DropdownMenuItem>

                    {/* Dependencies */}
                    <DropdownMenuItem>
                        <Boxes className="mr-2 h-4 w-4" />
                        Set Dependencies
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Copy links */}
                    <DropdownMenuItem>
                        <Link className="mr-2 h-4 w-4" />
                        Copy Task Link
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link className="mr-2 h-4 w-4" />
                        Copy Task ID
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Delete */}
                    <DropdownMenuItem
                        onClick={onDelete}
                        className="text-red-600 focus:text-red-600"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <MoveTaskDialog
                open={open}
                onOpenChange={setOpen}
                projects={[
                    { id: '1', name: 'Project Alpha', color: '#FF5733' },
                    { id: '2', name: 'Project Beta', color: '#33C1FF' },
                    { id: '3', name: 'Project Gamma', color: '#75FF33' },
                ]}
                onConfirm={() => { }}
            />
        </>
    );
}
