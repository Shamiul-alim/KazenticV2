import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/employee/ui/table"
import { Button } from "@/components/employee/ui/button"
import {
    Avatar,
    AvatarFallback,
} from "@/components/employee/ui/avatar"
import {
    ChevronsUpDown,
    Copy,
    Send,
    Trash,
} from "lucide-react"

import { INVITE_MEMBERS } from "@/data/employees-data"
import { InviteStatusPill } from "./invite-status-pill"

export function InviteMembersTable() {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table className="table-fixed">
                {/* column widths */}
                <colgroup>
                    <col className="w-20" />
                    <col className="w-70" />
                    <col className="w-[320px]" />
                    <col className="w-50" />
                    <col className="w-50" />
                </colgroup>

                <TableHeader className="bg-muted/40">
                    <TableRow>
                        {["Sl. No.", "Name", "Email", "Status", "Action"].map((h) => (
                            <TableHead key={h}>
                                <div className="flex items-center gap-1">
                                    {h}
                                    {
                                        h !== "Sl. No." && (
                                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                                        )
                                    }
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {INVITE_MEMBERS.map((row, index) => (
                        <TableRow key={row.id}>
                            {/* Sl no */}
                            <TableCell>{index + 1}.</TableCell>

                            {/* Name */}
                            <TableCell className="flex items-center gap-3 font-medium">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                {row.name}
                            </TableCell>

                            {/* Email */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {row.email}
                                    <Copy className="h-4 w-4 cursor-pointer text-muted-foreground" />
                                </div>
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                <InviteStatusPill status={row.status} />
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <Send className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <Copy className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8 text-red-600 border-red-500"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
