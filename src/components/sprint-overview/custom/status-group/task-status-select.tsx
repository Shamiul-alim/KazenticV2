"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../../ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
} from "../../ui/command";
import { Button } from "../../ui/button";
import { STATUS_OPTIONS } from "../../config/task-status.config";
import { TaskStatus } from "@/data/task-status.enum";
import FlagIcon from "../../icons/flag";
import { useState } from "react";
import TaskStatusContent from "./task-status-content";


interface StatusSelectProps {
    value: TaskStatus | "Urgent" | string;
    onChange: (status: TaskStatus) => void;
    children?: React.ReactNode;
}

export function StatusSelect({ value, onChange, children }: StatusSelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {
                    children ? children : (
                        Object.values(TaskStatus).includes(value as TaskStatus) ? (
                            <Button size="sm" variant="outline">
                                {children}
                            </Button>
                        ) : (
                            <Button size="sm" variant="ghost">
                                <FlagIcon className="mr-1 h-6 w-6 text-red-500" />
                                {value}
                            </Button>
                        )
                    )
                }
            </PopoverTrigger>

            <PopoverContent className="w-60 p-0">
                <TaskStatusContent value={value} onChange={onChange} setOpen={setOpen} />
            </PopoverContent>
        </Popover>
    );
}
