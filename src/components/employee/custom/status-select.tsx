'use client';

import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/lib/utils'
import { Check, Info } from 'lucide-react'

type StatusSelectProps = {
    status: "ACTIVE" | "INACTIVE";
    className?: string;
    onChange?: (value: "ACTIVE" | "INACTIVE") => void;
}

const colors = {
    status: {
        ACTIVE: {
            border: "#05966980",
            background: "#C4FFE2",
            text: "#059669",
        },
        INACTIVE: {
            border: "#69758880",
            background: "#EBEBEB",
            text: "#697588",
        },
    }
}

export default function StatusSelect({ status, className, onChange }: StatusSelectProps) {
    const [currentStatus, setCurrentStatus] = React.useState<"ACTIVE" | "INACTIVE">(status);

    return (
        <Select defaultValue={status} onValueChange={(value) => {
            setCurrentStatus(value as "ACTIVE" | "INACTIVE");
            if (onChange) {
                onChange(value as "ACTIVE" | "INACTIVE");
            }
        }}>
            <SelectTrigger className={cn(
                currentStatus === "ACTIVE"
                    ? "border-[#05966980] bg-[#C4FFE2] text-[#059669]"
                    : "border-[#69758880] bg-[#EBEBEB] text-[#697588]",
                "h-5 border outline-none w-fit px-1 py-0 rounded-sm flex items-center gap-1 text-[11px] font-medium",
                className
            )}>
                {
                    currentStatus === "ACTIVE" ? (
                        <Check className="h-3.5 w-3.5" />
                    ) : (
                        <Info className="h-3.5 w-3.5" />
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
