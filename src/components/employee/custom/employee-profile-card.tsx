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
import StatusSelect from "./status-select"
import { EmployeeProfileDialog } from "../layout/employee-profile-dialog/dialog"

type EmployeeProfileCardProps = {
    name: string;
    designation: string;
    phone: string;
    email: string;
    status: "ACTIVE" | "INACTIVE";
}

export function EmployeeProfileCard({
    name,
    designation,
    phone,
    email,
    status,
}: EmployeeProfileCardProps) {
    const [currentStatus, setCurrentStatus] = useState<"ACTIVE" | "INACTIVE">(status);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialog = () => {
        setDialogOpen(true);
    }

    return (
        <Card className="w-full">
            <CardContent className="p-3 sm:p-4 pb-0 space-y-2 text-[10px] sm:text-[11px]">
                {/* Header */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0">
                        {/* <AvatarImage src="https://i.pravatar.cc/100" /> */}
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 flex flex-col gap-2 justify-center min-w-0">
                        <p className="font-semibold leading-none truncate cursor-pointer" onClick={handleDialog}>{name}</p>
                        <Select defaultValue={designation}>
                            <SelectTrigger className="justify-start h-4 p-0 m-0 border-none text-muted-foreground shadow-none text-[10px] sm:text-[11px] focus:ring-0 focus:ring-offset-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-[10px] sm:text-[11px]">
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
                    <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center flex-shrink-0">
                                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                            <span className="truncate">{phone}</span>
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center flex-shrink-0">
                                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                            <span className="truncate">{email}</span>
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                </div>

                <EmployeeProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            </CardContent>

            {/* Status */}
            <CardFooter className="p-2 sm:p-3">
                <StatusSelect status={currentStatus} onChange={(v) => setCurrentStatus(v)} />
            </CardFooter>
        </Card>
    )
}
