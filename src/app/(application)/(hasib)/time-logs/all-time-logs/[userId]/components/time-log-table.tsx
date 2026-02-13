"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TimeLogRow } from "./time-log-row"


export type TimeLog = {
    id: string
    task: string
    description?: string
    payable: boolean
    tag: string
    signedIn: string
    signedOut: string
    duration: string
}

type Props = {
    data: TimeLog[]
}

export function TimeLogTable({ data }: Props) {
    return (
        <div className="rounded-xl border bg-background overflow-hidden">
            <Table>
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "2%" }} />
                    <col style={{ width: "3%" }} />
                </colgroup>
                <TableHeader>
                    <TableRow className="text-xs font-semibold text-secondary">
                        <TableHead>Task</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Payable</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Signed In</TableHead>
                        <TableHead>Signed Out</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead />
                        <TableHead />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((log) => (
                        <TimeLogRow key={log.id} log={log} />
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}
