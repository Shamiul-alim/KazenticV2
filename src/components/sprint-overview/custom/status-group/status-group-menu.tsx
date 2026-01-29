"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

import {
    Pencil,
    Plus,
    RefreshCw,
    ChevronRight,
    Minimize2,
    Layers,
    MoreHorizontal,
} from "lucide-react";
import EditStatusPopover from "./edit-status-popover";
import { useState } from "react";
import TaskStatusContent from "./task-status-content";
import { Popover, PopoverTrigger } from "../../ui/popover";

interface StatusGroupMenuProps {
    onRename?: () => void;
    onNewStatus?: () => void;
    onEditStatus?: () => void;
    onCollapseGroup?: () => void;
    onCollapseAll?: () => void;
}

export function StatusGroupMenu({
    onRename,
    onNewStatus,
    onEditStatus,
    onCollapseGroup,
    onCollapseAll,
}: StatusGroupMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52 p-2" align="start">
                <DropdownMenuItem onClick={onRename}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onNewStatus}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Status
                </DropdownMenuItem>

                {/* Edit Status submenu */}
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <span className="flex items-center">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Edit Status
                        </span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <TaskStatusContent value="" onChange={() => { }} setOpen={() => { }} />
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={onCollapseGroup}>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    Collapse Group
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onCollapseAll}>
                    <Layers className="mr-2 h-4 w-4" />
                    Collapse All Groups
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
