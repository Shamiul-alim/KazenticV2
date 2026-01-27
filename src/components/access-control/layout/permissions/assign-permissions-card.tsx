"use client"

import { XCircle } from "lucide-react"
import WarningIcon from "../../icon/warning"
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert"
import { Button } from "../../ui/button"
import { Card, CardContent, CardFooter } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { useState } from "react"

const permissions = [
    ["view", "View Teams"],
    ["add", "Add Teams"],
    ["delete", "Delete Teams"],
    ["manage", "Manage Teams"],
    ["edit", "Edit Teams"],
]

type PermissionType = "view" | "add" | "delete" | "manage" | "edit"

export function AssignPermissionsCard() {
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([])

    const handlePermissionSelection = (permission: string) => {
        if (selectedPermissions.includes(permission as PermissionType)) {
            setSelectedPermissions(prev => prev.filter(p => p !== permission))
        } else {
            setSelectedPermissions(prev => [...prev, permission as PermissionType])
        }
    }

    return (
        <Card>
            <CardContent className="space-y-6">
                <h2 className="text-sm font-semibold">Assign Permission to Users</h2>

                <Alert variant="default" className="border-0 rounded-md">
                    <AlertDescription className="flex flex-row items-center justify-between">
                        <div>
                            <WarningIcon className="inline-block mr-2 h-4 w-4" />
                            <span className="text-xs font-medium">By selecting designation, all users under selected designation
                                will receive the selected permissions.</span>
                        </div>
                        <XCircle className="h-4 w-4 cursor-pointer" />
                    </AlertDescription>
                </Alert>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">Select Module</label>
                        <Select defaultValue="teams">
                            <SelectTrigger className="w-52 shadow-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="teams">Teams</SelectItem>
                                <SelectItem value="users">Users</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">Select Roles</label>
                        <Select defaultValue="developer">
                            <SelectTrigger className="w-52 shadow-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-medium text-[#697588]">
                        Select permissions from below
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {permissions.map((perm) => (
                            <Button
                                key={perm[0]}
                                variant="outline"
                                onClick={
                                    () => handlePermissionSelection(perm[0])
                                }
                                data-active={selectedPermissions.includes(perm[0] as PermissionType)}
                                className="
                                    text-[11px] font-medium text-[#191F38]
                                    data-[active=true]:border-[#4157FE26] data-[active=true]:text-[#4157FE]
                                    data-[active=true]:bg-[#F2F9FE]
                                    "
                            >
                                {perm[1]}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="justify-end gap-2 bg-transparent">
                <Button variant="outline" className="px-6">Reset</Button>
                <Button className="px-6">Save</Button>
            </CardFooter>
        </Card>
    )
}
