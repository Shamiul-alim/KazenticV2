import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import SettingsIcon from "@/components/icons/setting"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar } from "@radix-ui/react-avatar"
import { CapacityCard } from "./capacity-card"
import React, { useEffect } from "react"
import { TIME_LOG_DATA, TimeLog, TimeLogUser } from "../time-log-data"
import { TableHeaderDropdown } from "@/components/projects/custom/project-header-dropdown"
import { cn } from "@/lib/utils"
import Link from "next/link"

type AllTimeLogsTableProps = {
    userTimeLogs?: TimeLogUser[]
}

export default function AllTimeLogsTable({ userTimeLogs }: AllTimeLogsTableProps) {
    const [open, setOpen] = React.useState(false)
    const [timeLogsData, setTimeLogsData] = React.useState<TimeLogUser[]>([])
    const [days, setDays] = React.useState<string[]>([])

    useEffect(() => {
        // TIME_LOG_DATA
        setTimeLogsData(userTimeLogs || TIME_LOG_DATA)
        // Generate next 7 days
        const next7Days = Array.from({ length: 7 }).map((_, i) =>
            dayjs().add(i, "day").format("YYYY-MM-DD")
        )
        setDays(next7Days)
    }, [userTimeLogs])

    return (
        <div className="m-4 w-full rounded-md overflow-hidden border">
            <Table>
                <colgroup>
                    <col style={{ width: "45%" }} />
                    {
                        Array.from({ length: 8 }).map((_, i) => (
                            <col key={i} style={{ width: "80px" }} />
                        ))
                    }
                </colgroup>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border-r">
                            <TableHeaderDropdown>
                                <Button variant="ghost" className="h-10 flex items-center justify-start gap-1 w-full px-0!">
                                    <span className="text-[#191F38] text-[11px] font-semibold h-full flex items-center">
                                        People
                                    </span>
                                </Button>
                            </TableHeaderDropdown>
                        </TableHead>

                        {
                            days.map((day, i) => (
                                <TableHead key={i} className="text-center border-r">
                                    {dayjs(day).format('ddd, MMM D')}
                                </TableHead>
                            ))
                        }
                        <TableHead className="text-center">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        timeLogsData.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="border-r">
                                    <Link href={`/time-logs/all-time-logs/${log.id}`} className="flex items-center gap-2">
                                        <div className="w-full font-medium flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-5.5">
                                                    <AvatarImage src={log.avatar} />
                                                    <AvatarFallback style={{ fontSize: 8 }}>{log.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span>{log.name} <span className="text-muted-foreground ml-2">({log.capacity}h)</span></span>
                                            </div>
                                            <CapacityCard user={{ id: log.id, name: log.name }}>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation();
                                                }} variant="ghost" size="sm">
                                                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            </CapacityCard>
                                        </div>
                                    </Link>
                                </TableCell>
                                {
                                    days.map((day, i) => {
                                        const allocation = log.allocations.find(a => dayjs(a.date, 'D/M/YYYY').isSame(day, 'day')) || { percentage: 0, trackedHours: 0 }

                                        return <TableCell key={i} className="text-center border-r p-0 align-top">
                                            <div className={
                                                cn(
                                                    "flex h-full min-h-10 flex-col",
                                                    (dayjs(day).day() === 0 || dayjs(day).day() === 6) && "bg-[#F3F4F6]" // Highlight weekends
                                                )
                                            }>
                                                <div className="h-1.25 w-full bg-[#E4E4E4] overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#10B981]"
                                                        style={{
                                                            width: `${Math.min(
                                                                100,
                                                                allocation.percentage
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="flex flex-1 items-center justify-center font-medium">{allocation.trackedHours}h</span>
                                            </div>
                                        </TableCell>
                                    })
                                }
                                <TableCell className="text-center p-0 align-top">
                                    <div className="flex h-full min-h-10 flex-col">
                                        <div className="h-1.25 w-full overflow-hidden bg-muted">
                                            <div
                                                className="h-full bg-[#10B981]"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        log.totalPercentage || 0
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="flex flex-1 items-center justify-center font-medium">
                                            {log.totalCapacity}h
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
