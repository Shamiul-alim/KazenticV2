import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/access-control/ui/table"
import { Badge } from "@/components/access-control/ui/badge"
import { Button } from "@/components/access-control/ui/button"
import { Check, ChevronsUpDown, Info, Pencil, PencilLine, Plus, PlusIcon } from "lucide-react"
import { useState } from "react"
import { set } from "react-hook-form"
import { CreateRoleDialog } from "./create-role-dialog"

const roles = [
    { id: 1, name: "Admin", status: "active" },
    { id: 2, name: "Member", status: "active" },
    { id: 3, name: "Editor", status: "active" },
    { id: 4, name: "Member", status: "in active" },
]

const colors = {
    header: "#F2F9FE",
    border: "#EBEBEB",
    active: "green",
    inactive: "red",
    text: "#191F38",
}

export function RolesTable() {
    const [open, setOpen] = useState(false)

    return (
        <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Roles</h2>
                <Button onClick={() => setOpen(true)} size="xs" className="font-light h-8 px-4 flex items-center">
                    <Plus className="h-5 w-5 text-lg text-white stroke-4" />
                    Create Role
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#EBEBEB]">
                <Table>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "20%" }} />
                    </colgroup>
                    <TableHeader>
                        <TableRow className="bg-[#F2F9FE]">
                            <TableHead className="text-[11px] font-semibold text-[#191F38]">Sl. No.</TableHead>
                            <TableHead className="text-[11px] font-semibold text-[#191F38]">
                                Name
                                <ChevronsUpDown className="ml-2 inline-block h-4 w-4 cursor-pointer text-[#697588]" />
                            </TableHead>
                            <TableHead className="text-[11px] font-semibold text-[#191F38]">
                                Status
                                <ChevronsUpDown className="ml-2 inline-block h-4 w-4 cursor-pointer text-[#697588]" />
                            </TableHead>
                            <TableHead className="text-[11px] font-semibold text-[#191F38]">
                                Action
                                <ChevronsUpDown className="ml-2 inline-block h-4 w-4 cursor-pointer text-[#697588]" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="text-xs font-medium">
                        {roles.map((role, i) => (
                            <TableRow key={role.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={role.status === "active" ? "success" : "muted"}
                                    >
                                        {
                                            role.status === "active" ? (
                                                <Check className="mr-1 h-3.5 w-3.5 stroke-2.5" />
                                            ) : (
                                                <Info className="mr-1 h-3.5 w-3.5 stroke-2.5" />
                                            )
                                        }
                                        {role.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="icon-xs">
                                        <PencilLine className="h-3.5 w-3.5 stroke-2.5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <CreateRoleDialog open={open} onOpenChange={setOpen} />
            </div>
        </div>
    )
}