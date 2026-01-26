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
            <DialogContent className="max-w-lg rounded-2xl p-6">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl font-semibold">
                        Invite Employee to the Workspace
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="mt-6 space-y-6">
                    {/* Employee Name */}
                    <div className="space-y-2">
                        <Label className="text-base font-medium">
                            Employee Name
                        </Label>
                        <Input
                            placeholder="e.g. Jain Smith"
                            className="h-12 rounded-xl"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="text-base font-medium">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            placeholder="e.g. jainsmith@kazentic.com"
                            className="h-12 rounded-xl"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 flex justify-end gap-4">
                    <Button
                        variant="outline"
                        className="h-12 rounded-xl px-8"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button className="h-12 rounded-xl px-8">
                        Invite
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
