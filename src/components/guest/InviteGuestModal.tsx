"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/sprint-report/ui/dialog"
import { Button } from "@/components/sprint-report/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'

interface InviteGuestModalProps {
    isOpen: boolean
    onClose: () => void
}

const InviteGuestModal = ({ isOpen, onClose }: InviteGuestModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[480px] p-8 gap-6 rounded-3xl border-0">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <DialogTitle className="text-[#101828] text-xl font-bold tracking-tight">
                        Invite Guest to the Workspace
                    </DialogTitle>
                    {/* The DialogContent already has a close button, but we can customize it or use our own if needed. 
                        Based on the reference image, the close button is in the top right corner with a light blue circle background.
                    */}
                </DialogHeader>

                <div className="space-y-5 py-2">
                    <div className="space-y-2.5">
                        <Label htmlFor="guestName" className="text-[#344054] font-semibold text-sm">
                            Guest Name
                        </Label>
                        <Input
                            id="guestName"
                            placeholder="e.g. Jain Smith"
                            className="h-12 rounded-xl border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="email" className="text-[#344054] font-semibold text-sm">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            placeholder="e.g. jainsmith@kazentic.com"
                            className="h-12 rounded-xl border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                <DialogFooter className="flex items-center gap-3 sm:justify-end pt-4">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 sm:flex-none h-11 px-8 rounded-xl border border-gray-200 text-blue-600 font-bold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 sm:flex-none h-11 px-10 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-sm transition-all shadow-blue-100"
                    >
                        Invite
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default InviteGuestModal
