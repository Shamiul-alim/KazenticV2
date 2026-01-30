"use client";

import {
    Link2,
    MoreHorizontal,
    Check,
    Play,
    Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../../ui/popover";
import { Command, CommandItem } from "../../ui/command";
import { Button } from "../../ui/button";
import { CommandEmpty } from "cmdk";
import { Input } from "../../ui/input";
import PlayOutlineDashedIcon from "@/components/icons/play-outline-dashed";
import { useRouter } from "next/navigation";

interface Sprint {
    id: string;
    name: string;
    range: string;
}

interface SprintSelectPopoverProps {
    value?: string;
    sprints: Sprint[];
    onChange: (id: string) => void;
    children?: React.ReactNode;
    className?: string;
}

export function SprintSelectPopover({
    value,
    sprints,
    onChange,
    children,
    className,
}: SprintSelectPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className={cn("cursor-pointer", className)} asChild>
                {!children ? (
                    <Button size="icon-xs" variant="outline">
                        <Plus className="h-4 w-4" />
                    </Button>
                ) : (
                    children
                )}
            </PopoverTrigger>

            <PopoverContent className="w-[320px] p-0">
                {/* Header */}
                <div className="flex items-center gap-2 px-3 py-2 text-xs">
                    {value}
                </div>

                <div className="px-2 mb-4">
                    <Input className="px-2 w-full" placeholder="Search" />
                </div>

                {/* List */}
                <Command>
                    <CommandEmpty>No sprints found.</CommandEmpty>

                    {sprints.map((sprint) => {
                        const selected = sprint.id === value;

                        return (
                            <CommandItem
                                key={sprint.id}
                                onSelect={() => onChange(sprint.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 text-xs rounded-none",
                                    selected && "text-blue-600"
                                )}
                            >
                                <PlayOutlineDashedIcon
                                    className={cn(
                                        "h-4 w-4",
                                        selected
                                            ? "stroke-blue-600"
                                            : "text-muted-foreground"
                                    )}
                                />

                                <span className="flex-1">
                                    {sprint.name} ({sprint.range})
                                </span>

                                {selected && (
                                    <Check className="h-4 w-4 text-blue-600" />
                                )}
                            </CommandItem>
                        );
                    })}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
