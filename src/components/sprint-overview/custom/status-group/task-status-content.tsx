import React from 'react'
import { PopoverContent } from '../../ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '../../ui/command';
import { STATUS_OPTIONS } from '../../config/task-status.config';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { TaskStatus } from '@/data/task-status.enum';

type TaskStatusContentProps = {
    value: TaskStatus | "Urgent" | string;
    onChange: (status: TaskStatus) => void;
    setOpen: (open: boolean) => void;
    className?: string;
}

export default function TaskStatusContent({ value, onChange, setOpen, className }: TaskStatusContentProps) {
    return (
        <Command className={className}>
            {/* Search */}
            <CommandInput className="[cmdk-input-wrapper]:border-0" placeholder="Search" />

            <CommandList>
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
                    <span>Statuses</span>
                    <button className="text-primary">Select All</button>
                </div>

                <CommandGroup>
                    {STATUS_OPTIONS.map((status) => {
                        const Icon = status.icon;
                        const selected = value === status.value;

                        return (
                            <CommandItem
                                key={status.value}
                                value={status.label}
                                onSelect={() => {
                                    onChange(status.value);
                                    setOpen(false);
                                }}
                                className={cn(
                                    "flex items-center gap-2",
                                    selected && "bg-accent text-accent-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="flex-1">{status.label}</span>
                                <Check
                                    className={cn(
                                        "h-4 w-4",
                                        selected ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
