import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
    ArrowDown,
    ArrowDown01,
    Check,
    ChevronDown,
    ChevronsUpDown,
    Copy,
    Info,
} from "lucide-react"

import { employees } from "@/data/employees-data"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"
import StatusSelect from "../custom/status-select"

export function EmployeeTable() {
    return (
        <div className="rounded-lg border w-full overflow-hidden">
            <Table>
                {/* <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup> */}
                <TableHeader className="bg-primary-dashboard/10">
                    <TableRow>
                        {[
                            "Name",
                            "Email",
                            "Phone",
                            "Designation",
                            "Position",
                            "Joining Date",
                            "Status",
                        ].map((h) => (
                            <TableHead key={h}>
                                <div className="flex items-center gap-1 text-[11px]">
                                    {h}
                                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {employees.map((emp) => (
                        <TableRow key={emp.id} className="text-xs">
                            {/* Name */}
                            <TableCell>
                                <div className="flex gap-3">
                                    <Avatar size="xs">
                                        <AvatarImage
                                            src="/avatars/01.png"
                                            alt="avatar"
                                        />
                                        <AvatarFallback className="bg-primary-dashboard text-primary-dashboard-foreground">{emp.name[0]}</AvatarFallback>
                                    </Avatar>
                                    {emp.name}
                                </div>
                            </TableCell>

                            {/* Email */}
                            < TableCell >
                                <div className="flex items-center gap-2">
                                    {emp.email}
                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                        <Copy className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </TableCell>

                            {/* Phone */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {emp.phone}
                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                        <Copy className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </TableCell>

                            {/* Designation */}
                            <TableCell>
                                <Select defaultValue={emp.designation}>
                                    <SelectTrigger className="w-full p-0 m-0 max-w-60 border-none shadow-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Designations</SelectLabel>
                                            <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                            <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                                            <SelectItem value="Developer">Developer</SelectItem>
                                            <SelectItem value="Database Admin">Database Admin</SelectItem>
                                            <SelectItem value="Designer">UI/UX Designer</SelectItem>
                                            <SelectItem value="Project Manager">Project Manager</SelectItem>
                                            <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>

                            {/* Position */}
                            <TableCell>{emp.position}</TableCell>

                            {/* Date */}
                            <TableCell>{emp.joiningDate}</TableCell>

                            {/* Status */}
                            <TableCell>
                                <StatusSelect status={emp.status} className="w-fit" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </div >
    )
}
