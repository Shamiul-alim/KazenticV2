"use client"

import { useState } from "react"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/sprint-report/ui/popover"
import ArrowDownLight from "@/components/workload/icons/arrow-down-light"

type User = {
    id: number
    name: string
}

type CapacityCardProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    user: User
    children: React.ReactNode
}

export function CapacityCard({ open, onOpenChange, user, children }: CapacityCardProps) {
    const [period, setPeriod] = useState("weekly")
    const [hours, setHours] = useState(40)

    const handleReset = () => {
        setPeriod("weekly")
        setHours(40)
    }

    const handleSave = () => {
        console.log({ period, hours })
        // connect to API later
    }

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-68 p-4">
                <div className="space-y-3 text-xs">
                    {/* Row 1 */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#191F38]">
                            {user.name}'s Timezone
                        </span>

                        <span>
                            +06 (UTC+6)
                        </span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-[#191F38]">
                            My Capacity
                        </span>

                        <Select value={period} onValueChange={setPeriod}>
                            <SelectTrigger className="w-20 h-7.5">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent className="w-31 text-[11px]">
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectSeparator />
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#191F38]">
                            Weekly Hours
                        </span>

                        <Input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="w-20 h-7.5 text-[11px] font-medium"
                            min={0}
                        />
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-primary text-primary hover:bg-primary/10 font-medium"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                        <Button
                            onClick={handleSave}
                            size="lg"
                            className="font-medium"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover >
    )
}
