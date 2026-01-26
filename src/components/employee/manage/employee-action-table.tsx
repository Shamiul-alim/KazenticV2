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
import { ChevronsUpDown, Copy, XCircle, CheckCircle2 } from "lucide-react"
import { EMPLOYEE_DATA } from "@/data/employees-data"

export function EmployeeActionTable() {
    return (
        <div className="rounded-lg border">
            <Table>
                {/* column widths */}
                <colgroup>
                    <col className="w-65" />
                    <col className="w-65" />
                    <col className="w-65" />
                    <col className="w-65" />
                    <col className="w-65" />
                    <col className="w-65" />
                </colgroup>

                <TableHeader className="bg-muted/40">
                    <TableRow>
                        {["Name", "Email", "Phone", "Designation", "Position", "Action"].map(
                            (h) => (
                                <TableHead key={h}>
                                    <div className="flex items-center gap-1">
                                        {h}
                                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </TableHead>
                            )
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {EMPLOYEE_DATA.map((emp) => (
                        <TableRow key={emp.id}>
                            {/* Name */}
                            <TableCell className="flex items-center gap-3 font-medium text-xs">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                {emp.name}
                            </TableCell>

                            {/* Email */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {emp.email}
                                    <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                </div>
                            </TableCell>

                            {/* Phone */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {emp.phone}
                                    <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                </div>
                            </TableCell>

                            {/* Designation */}
                            <TableCell>{emp.designation}</TableCell>

                            {/* Position */}
                            <TableCell>{emp.position}</TableCell>

                            {/* Action */}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8 text-green-600 border-green-500"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8 text-red-600 border-red-500"
                                    >
                                        <XCircle className="h-4 w-4" />
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
