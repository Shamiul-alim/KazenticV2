import { Card, CardAction, CardContent, CardFooter } from "@/components/access-control/ui/card"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

const availableRoles = ["Admin", "Member", "Editor"]

export function AssignRoleCard() {
    const [selectedRole, setSelectedRole] = useState<"admin" | "member" | "editor" | null>(null)

    return (
        <Card className="p-6 flex flex-col justify-between h-full">
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h2 className="text-sm font-semibold mb-4">Assign Role to User</h2>
                    <Select defaultValue="1">
                        <SelectTrigger className="w-full max-w-50 shadow-none">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">
                                    <Avatar className="inline-block p-1 mr-2 h-4.5 w-4.5 align-middle">
                                        <AvatarFallback className="text-[9px]">P</AvatarFallback>
                                    </Avatar>
                                    Pat Cummins
                                </SelectItem>
                                <SelectItem value="2">
                                    <Avatar className="inline-block p-1 mr-2 h-4.5 w-4.5 align-middle">
                                        <AvatarFallback className="text-[9px]">J</AvatarFallback>
                                    </Avatar>
                                    John Doe
                                </SelectItem>
                                <SelectItem value="3">
                                    <Avatar className="inline-block p-1 mr-2 h-4.5 w-4.5 align-middle">
                                        <AvatarFallback className="text-[9px]">B</AvatarFallback>
                                    </Avatar>
                                    Bob Smith
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col items-center gap-2 text-center bg-[#F2F9FE] p-5 rounded-md">
                    <Avatar className="h-9 w-9 mb-2">
                        <AvatarFallback className="text-xl font-normal">P</AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-medium">Pat Cummins</p>
                    <p className="text-[11px] font-medium text-[#697588]">Developer</p>
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-medium text-[#697588]">Select roles from below</p>
                    <div className="flex gap-2 flex-wrap">
                        {availableRoles.map((role) => (
                            <Button
                                key={role}
                                variant="outline"
                                data-active={selectedRole === role.toLowerCase()}
                                onClick={() => setSelectedRole(role.toLowerCase() as "admin" | "member" | "editor")}
                                className="cursor-pointer px-4 py-1 text-[#191F38] data-[active=true]:text-[#4157FE] data-[active=true]:border-[#4157FE26] data-[active=true]:bg-[#F2F9FE] data-[active=true]:shadow-xs text-xs font-medium"
                            >
                                {role}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-3 bg-transparent border-t-0">
                <Button variant="outline" className="text-[#191F38]">Reset</Button>
                <Button className="font-normal">Save</Button>
            </CardFooter>
        </Card>
    )
}
