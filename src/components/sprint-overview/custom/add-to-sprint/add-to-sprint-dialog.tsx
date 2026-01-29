"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { MoreHorizontal, Trash, X, XCircle } from "lucide-react";
import PlayCircleIcon from "../../icons/play-circle";
import { useState } from "react";
import { StatusSelect } from "../status-group/task-status-select";

interface AddTaskToSprintDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedCount: number;
    children: React.ReactNode; // <-- your table goes here
}

export function AddTaskToSprintDialog({
    open,
    onOpenChange,
    selectedCount,
    children,
}: AddTaskToSprintDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[80vw] h-[65vh] p-0">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                    <DialogTitle>Add Task to Sprint</DialogTitle>
                </DialogHeader>

                {/* Table Area */}
                <div className="flex-1 overflow-auto px-4 py-2">
                    {children}
                </div>

                {/* Bottom Bulk Actions */}
                {selectedCount > 0 && (
                    <BottomActionBar selectedCount={selectedCount} />
                )}
            </DialogContent>
        </Dialog>
    );
}

function BottomActionBar({
    selectedCount,
}: {
    selectedCount: number;
}) {
    return (
        <div className="flex items-center justify-between border-t bg-blue-50 px-4 py-2">
            {/* Left: selection info */}
            <Button className="flex items-center gap-2 text-sm" variant="outline">
                <span className="rounded-full px-3 py-1">
                    {selectedCount} Tasks selected
                </span>
                <XCircle className="h-4 w-4 text-red-600 cursor-pointer" />
            </Button>

            {/* Right: bulk actions */}
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                    <PlayCircleIcon className="mr-0.5" />
                    Add To Sprint 1 (7/12 - 8/12)
                </Button>
                <StatusSelect value="Status" onChange={() => { }} />
                <Button variant="outline" size="sm">
                    Dates
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                >
                    <Trash className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Status */}
        </div>
    );
}
