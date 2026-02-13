"use client"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { ChevronDown, DollarSign, Clock, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { TimeLog } from "./time-log-table"
import DollarIcon from "@/components/icons/dollar"

type Props = {
    log: TimeLog
}

export function TimeLogRow({ log }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible open={open} onOpenChange={setOpen} asChild>
            <>
                {/* Main Row */}
                <TableRow className="text-2xs">
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 p-0"
                                >
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""
                                            }`}
                                    />
                                </Button>
                            </CollapsibleTrigger>

                            {log.task}
                        </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                        {log.description ?? "-"}
                    </TableCell>

                    <TableCell className="text-center">
                        {log.payable ? (
                            <Badge variant="outline" className="size-6.5 p-1">
                                <DollarIcon className="h-4 w-4 text-[#059669]" />
                            </Badge>
                        ) : (
                            "-"
                        )}
                    </TableCell>

                    <TableCell>
                        <Badge className="bg-[#F0E4FF] text-[#722BCC] border-[#B187E5] text-2xs">{log.tag}</Badge>
                    </TableCell>

                    <TableCell>
                        <div className="rounded-md bg-green-100 px-2 py-1 text-2xs">
                            {log.signedIn}
                        </div>
                    </TableCell>

                    <TableCell>
                        <div className="rounded-md bg-red-100 px-2 py-1 text-2xs">
                            {log.signedOut}
                        </div>
                    </TableCell>

                    <TableCell>
                        <div className="rounded-md bg-blue-100 px-2 py-1 text-2xs">
                            {log.duration}
                        </div>
                    </TableCell>

                    <TableCell>
                        <Clock className="h-4 w-4 text-[#A4541A]" />
                    </TableCell>

                    <TableCell>
                        <MoreHorizontal className="h-4 w-4" />
                    </TableCell>
                </TableRow>

                {/* Collapsible Content Row */}
                <CollapsibleContent asChild>
                    <TableRow>
                        <TableCell colSpan={8} className="bg-muted/40">
                            <div className="p-4 text-sm text-muted-foreground">
                                Expanded content goes here.
                                <br />
                                You can show:
                                <ul className="list-disc pl-4 mt-2 space-y-1">
                                    <li>Activity logs</li>
                                    <li>Edit buttons</li>
                                    <li>Notes</li>
                                    <li>Audit history</li>
                                </ul>
                            </div>
                        </TableCell>
                    </TableRow>
                </CollapsibleContent>
            </>
        </Collapsible>
    )
}
