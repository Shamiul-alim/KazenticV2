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
        <Card className="w-full">
            <CardContent className="p-3 sm:p-4 pb-0 space-y-2 text-[10px] sm:text-[11px]">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1 sm:gap-2 justify-center min-w-0 flex-1">
                        <span className="font-semibold leading-none inline-block truncate cursor-pointer" onClick={handleDialog}>{name}</span>
                        <span className="inline-block truncate">{designation}</span>
                    </div>

                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 text-[10px] sm:text-[11px] px-7 py-0 my-0 bg-[#C4FFE2] text-[#178D6C] border-[#05966980] ml-auto shrink-0 whitespace-nowrap"
                    >
                        Active
                    </Button>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center shrink-0">
                                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                            <span className="truncate">{phone}</span>
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center shrink-0">
                                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                            <span className="truncate">{email}</span>
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                </div>

                {/* <EmployeeProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} /> */}
            </CardContent>

            {/* Status */}
            {viewMode === "join-request" && (
                <CardFooter className="p-2 sm:p-3">
                    <div className="flex items-center justify-between w-full gap-2">
                        <Button size="sm" className="flex-1 text-[10px] sm:text-xs h-7 sm:h-8">Accept</Button>
                        <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs h-7 sm:h-8">Remove</Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}
