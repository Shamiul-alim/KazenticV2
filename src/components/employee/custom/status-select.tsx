'use client';

import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/lib/utils'
import { Check, Info } from 'lucide-react'

type StatusSelectProps = {
    status: "ACTIVE" | "INACTIVE";
    className?: string;
}

export default function StatusSelect({ status, className }: StatusSelectProps) {
    const [currentStatus, setCurrentStatus] = React.useState<"ACTIVE" | "INACTIVE">(status);

    return (
        <Select defaultValue={status} onValueChange={(value) => setCurrentStatus(value as "ACTIVE" | "INACTIVE")}>
            <SelectTrigger className={cn(
                currentStatus === "ACTIVE"
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-muted-foreground bg-muted text-muted-foreground",
                "border outline-none w-fit px-2 py-0 rounded-md flex items-center gap-2 text-xs",
                className
            )}>
                {
                    currentStatus === "ACTIVE" ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Info className="h-4 w-4" />
                    )
                }
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectGroup>
            </SelectContent>

        </Select>
    )
}
