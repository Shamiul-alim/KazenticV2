"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

interface AssigneeSelectProps {
    users: User[];
    value?: string;
    onChange: (userId: string) => void;
}


export function AssigneeSelect({
    users,
    value,
    onChange,
}: AssigneeSelectProps) {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(
        users.find((user) => user.id === value)
    );

    useEffect(() => {
        console.log(value);

        if (value && !users.find((user) => user.id === value)) {
            setSelectedUser(undefined);
            return;
        }
        setSelectedUser(users.find((user) => user.id === value));
    }, [value, users, onChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    size="icon-lg"
                >
                    <Avatar className="h-5 w-5">
                        <AvatarImage src={selectedUser?.avatarUrl} />
                        <AvatarFallback>
                            {selectedUser?.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-55 p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                        {users.map((user) => (
                            <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => {
                                    onChange(user.id);
                                    setOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={user.avatarUrl} />
                                        <AvatarFallback>
                                            {user.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{user.name}</span>
                                </div>

                                <Check
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === user.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
