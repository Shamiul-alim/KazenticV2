"use client";

import { X } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "../../ui/sheet";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Assignee {
    id: string;
    name: string;
    count?: number;
    avatarUrl?: string;
    type: "user" | "team" | "unassigned";
}

interface AssigneeSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    assignees: Assignee[];
    value: string[];
    onChange: (ids: string[]) => void;
}

export function AssigneeSidebar({
    open,
    onOpenChange,
    assignees,
    value,
    onChange,
}: AssigneeSidebarProps) {
    const [query, setQuery] = useState("");

    const toggle = (id: string) =>
        onChange(
            value.includes(id)
                ? value.filter((v) => v !== id)
                : [...value, id]
        );

    const filtered = assignees.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase())
    );

    const people = filtered.filter((a) => a.type !== "team");
    const teams = filtered.filter((a) => a.type === "team");

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-90 p-0">
                {/* Header */}
                <SheetHeader className="border-b px-4 py-3">
                    <div className="flex items-center justify-between">
                        <SheetTitle>Select Assignees</SheetTitle>
                        {/* <button onClick={() => onOpenChange(false)}>
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button> */}
                    </div>
                </SheetHeader>

                {/* Search */}
                <div className="p-4">
                    <Input
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Content */}
                <div className="px-2">
                    {/* People */}
                    <Section title={`People ${people.length}`}>
                        {people.map((a) => (
                            <Row
                                key={a.id}
                                assignee={a}
                                checked={value.includes(a.id)}
                                onToggle={() => toggle(a.id)}
                            />
                        ))}
                    </Section>

                    {/* Teams */}
                    <Section title="Teams">
                        {teams.map((a) => (
                            <Row
                                key={a.id}
                                assignee={a}
                                checked={value.includes(a.id)}
                                onToggle={() => toggle(a.id)}
                            />
                        ))}
                    </Section>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-4">
            <div className="px-3 py-1 text-xs text-muted-foreground">
                {title}
            </div>
            <div>{children}</div>
        </div>
    );
}

function Row({
    assignee,
    checked,
    onToggle,
}: {
    assignee: any;
    checked: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            onClick={onToggle}
            className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2",
                checked && "bg-blue-50"
            )}
        >
            <Avatar className="h-6 w-6">
                {assignee.avatarUrl ? (
                    <AvatarImage src={assignee.avatarUrl} />
                ) : (
                    <AvatarFallback>
                        {assignee.name.charAt(0)}
                    </AvatarFallback>
                )}
            </Avatar>

            <span className="flex-1 truncate text-xs">
                {assignee.name}
                {assignee.count !== undefined && (
                    <span className="ml-1 text-muted-foreground">
                        ({assignee.count})
                    </span>
                )}
            </span>

            <Checkbox checked={checked} />
        </div>
    );
}
