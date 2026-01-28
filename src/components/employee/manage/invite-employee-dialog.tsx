import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/employee/ui/dialog"
import { Input } from "@/components/employee/ui/input"
import { Button } from "@/components/employee/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function InviteEmployeeDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95%] sm:w-full max-w-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 text-[#191F38] text-xs sm:text-sm">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="font-semibold text-sm">
                        Invite Employee to the Workspace
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-xs sm:text-sm">
                    {/* Employee Name */}
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <Label className="font-medium text-xs sm:text-sm">
                            Employee Name
                        </Label>
                        <Input
                            placeholder="e.g. Jain Smith"
                            className="rounded-md h-9 sm:h-10 text-xs sm:text-sm"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <Label className="font-medium text-xs sm:text-sm">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            placeholder="e.g. jainsmith@kazentic.com"
                            className="rounded-md h-9 sm:h-10 text-xs sm:text-sm"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                    <Button
                        variant="outline"
                        className="h-8 sm:h-9 rounded-md px-6 sm:px-8 text-[#4157FE] text-[10px] sm:text-xs font-medium w-full sm:w-auto"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button className="h-8 sm:h-9 rounded-md px-6 sm:px-8 bg-[#4157FE] text-white text-[10px] sm:text-xs font-medium w-full sm:w-auto">
                        Invite
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
