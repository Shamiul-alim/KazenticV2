"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnterIcon from "./icons/enter";
import { useWorkload } from "./workload-context";
import { useState } from "react";

type TimeLimitPopoverProps = {
    loggedHours?: string
    userId?: string
}

export function TimeLimitPopover({ loggedHours, userId }: TimeLimitPopoverProps) {
    const { data, setData } = useWorkload()
    const [newHours, setNewHours] = useState(loggedHours || "")

    const handleSave = (newHours: string) => {
        if (!userId) return
        const updatedData = data.map(item => {
            if (item.userId === userId) {
                return { ...item, workloadHours: parseInt(newHours) }
            }
            return item
        }
        )
        setData(updatedData)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-2">
                    <span className="bg-muted px-2 py-1 rounded-sm">
                        {loggedHours}
                    </span>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-43 rounded-xl p-2.5 space-y-2 select-none text-[11px]">
                {/* Header */}
                <div className="font-medium text-muted-foreground">
                    Set time limit for
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-4 w-4">
                        <AvatarImage src="/avatar.jpg" />
                        <AvatarFallback className="text-[8px]">AH</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-xs">Alif Hassan</span>
                </div>

                {/* Time Input */}
                <Input
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    className="h-7 text-[11px]"
                />

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                    <Checkbox id="apply-others" className="w-4 h-4" />
                    <label
                        htmlFor="apply-others"
                        className="text-muted-foreground cursor-pointer text-[11px]"
                    >
                        Apply for other 2 Users
                    </label>
                </div>

                {/* Save Button */}
                <Button
                    className="w-full rounded-md mt-5 flex items-center justify-center"
                    onClick={() => handleSave(newHours)}
                >
                    <EnterIcon className="h-4 w-4 mr-1" />
                    Save
                </Button>
            </PopoverContent>
        </Popover>
    );
}
