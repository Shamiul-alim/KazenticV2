"use client"

import { X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateRoleDialog({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-xl">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-sm font-semibold">
                        Create New Role
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="space-y-5 mt-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium">Role Name</label>
                        <Input className="text-xs" placeholder="Type Here" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium">Status</label>
                        <Select>
                            <SelectTrigger className="shadow-none">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[#4157FE] px-5">
                        Cancel
                    </Button>
                    <Button className="px-5">Create</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
