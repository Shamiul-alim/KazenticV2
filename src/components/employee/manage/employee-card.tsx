import { useState } from "react"
import {
    Phone,
    Mail,
    Copy,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

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
        <Card className="max-w-64 w-64">
            <CardContent className="p-4 pb-0 space-y-2 text-[11px]">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-2 justify-center">
                        <span className="font-semibold leading-none inline-block" onClick={handleDialog}>{name}</span>
                        <span className="inline-block">{designation}</span>
                        {/* <Select defaultValue={designation}>
                            <SelectTrigger className="h-4 p-0 m-0 max-w-60 border-none text-muted-foreground shadow-none text-[11px] focus:ring-0 focus:ring-offset-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-[11px]">
                                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                                    <SelectItem value="Developer">Developer</SelectItem>
                                    <SelectItem value="Database Admin">Database Admin</SelectItem>
                                    <SelectItem value="Designer">UI/UX Designer</SelectItem>
                                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select> */}
                    </div>

                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 text-[11px] px-7 py-0 my-0 bg-[#C4FFE2] text-[#178D6C] border-[#05966980] ml-auto"
                    >
                        Active
                    </Button>
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
