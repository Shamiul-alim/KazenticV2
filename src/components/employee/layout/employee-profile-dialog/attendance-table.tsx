import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/employee/ui/table"
import { ATTENDANCE_DATA } from "@/data/employees-data"
import { TimePill } from "./time-pill"

export function AttendanceTable() {
    return (
        <div className="rounded-xl border overflow-hidden">
            <Table className="table-fixed">
                {/* Column widths */}
                <colgroup>
                    <col className="w-[25%]" />
                    <col className="w-[25%]" />
                    <col className="w-[25%]" />
                    <col className="w-[25%]" />
                </colgroup>

                <TableHeader className="bg-muted/40">
                    <TableRow>
                        <TableHead>Signed in</TableHead>
                        <TableHead>Signed out</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Break</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {ATTENDANCE_DATA.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <TimePill color="green">{row.signIn}</TimePill>
                            </TableCell>
                            <TableCell>
                                <TimePill color="red">{row.signOut}</TimePill>
                            </TableCell>
                            <TableCell>
                                <TimePill color="blue">{row.duration}</TimePill>
                            </TableCell>
                            <TableCell>
                                <TimePill color="yellow">{row.break}</TimePill>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
