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
            <DialogContent className="max-w-lg rounded-2xl p-6 text-[#191F38] text-sm">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="font-semibold">
                        Invite Employee to the Workspace
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="mt-6 space-y-6 text-sm">
                    {/* Employee Name */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-medium text-sm">
                            Employee Name
                        </Label>
                        <Input
                            placeholder="e.g. Jain Smith"
                            className="rounded-md"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <Label className="font-medium text-sm">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            placeholder="e.g. jainsmith@kazentic.com"
                            className="rounded-md"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 flex justify-end gap-4">
                    <Button
                        variant="outline"
                        className="h-8 rounded-md px-8 text-[#4157FE] text-xs font-medium"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button className="h-8 rounded-md px-8 bg-[#4157FE] text-white text-xs font-medium">
                        Invite
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
