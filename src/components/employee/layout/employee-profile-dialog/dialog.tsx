import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/employee/ui/dialog"
import { X } from "lucide-react"
import { EmployeeProfileBody } from "./employee-profile-body"

export function EmployeeProfileDialog({ open, onOpenChange }: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl p-0 text-xs">
                <DialogHeader className="flex flex-row items-center justify-between px-6 py-4">
                    <DialogTitle>Employee Profile</DialogTitle>
                    <DialogClose>
                    </DialogClose>
                </DialogHeader>

                <EmployeeProfileBody />
            </DialogContent>
        </Dialog>
    )
}
