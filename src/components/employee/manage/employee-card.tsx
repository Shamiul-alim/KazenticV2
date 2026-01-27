import { useState } from "react"
import {
    Phone,
    Mail,
    Copy,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

type EmployeeCardProps = {
    name: string;
    designation: string;
    phone: string;
    email: string;
    status: "ACTIVE" | "INACTIVE";
    viewMode?: "join-request" | "invite";
}

export function EmployeeCard({
    name,
    designation,
    phone,
    email,
    status,
    viewMode = "join-request",
}: EmployeeCardProps) {
    const [currentStatus, setCurrentStatus] = useState<"ACTIVE" | "INACTIVE">(status);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialog = () => {
        setDialogOpen(true);
    }

    return (
        <Card>
            <CardContent className="p-4 pb-0 space-y-2 text-[11px]">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 flex flex-col justify-center">
                        <p className="font-semibold leading-none" onClick={handleDialog}>{name}</p>
                        <Select defaultValue={designation}>
                            <SelectTrigger className="p-0 m-0 max-w-60 border-none text-muted-foreground shadow-none text-[11px] focus:ring-0 focus:ring-offset-0">
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
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Phone className="h-4 w-4" />
                            </div>
                            {phone}
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full border flex items-center justify-center">
                                <Mail className="h-4 w-4" />
                            </div>
                            {email}
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* <EmployeeProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} /> */}
            </CardContent>

            {/* Status */}
            {viewMode === "join-request" && (
                <CardFooter className="p-3">
                    <div className="flex items-center justify-between w-full">
                        <Button size="sm">Accept</Button>
                        <Button size="sm" variant="outline">Remove</Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
