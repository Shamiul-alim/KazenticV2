"use client"

import * as React from "react"
import { Search, User, X, Check } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/sprint-report/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/sprint-report/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { Checkbox } from "@/components/sprint-report/ui/checkbox"
import { cn } from "@/lib/utils"

interface Member {
    id: string
    name: string
    role?: string
    image?: string
}

interface AddNewMemberModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const DUMMY_MEMBERS: Member[] = [
    { id: "1", name: "Alif Hassan", image: "/image/allimage.png" }, // Using the image from portfolio/user request history 
    { id: "2", name: "Tonmoy Asif", image: "/image/allimage.png" },
    { id: "3", name: "John Doe", image: "/image/allimage.png" },
    { id: "4", name: "Nat qwe", image: "/image/allimage.png" },
]

export function AddNewMemberModal({ open, onOpenChange }: AddNewMemberModalProps) {
    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([])
    const [searchTerm, setSearchTerm] = React.useState("")

    const toggleMember = (id: string) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((memberId) => memberId !== id)
                : [...prev, id]
        )
    }

    const filteredMembers = DUMMY_MEMBERS.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="sm:max-w-[450px] p-0 gap-0 overflow-hidden bg-white border-0 shadow-xl rounded-2xl outline-none">
                <DialogHeader className="px-6 pt-6 pb-4 bg-white">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px] font-bold text-[#111827]">Add New Member</DialogTitle>
                        <DialogClose className="rounded-full bg-[#EFF6FF] p-1.5 text-blue-600 hover:bg-blue-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            <X className="w-4 h-4" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className="px-6 pb-2">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-500" />
                        <Input
                            placeholder="Search"
                            className="pl-10 bg-[#F9FAFB] border-transparent h-11 text-[15px] placeholder:text-gray-500 focus-visible:ring-0 focus-visible:bg-white focus-visible:border-blue-500 rounded-xl transition-all shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="px-6 pb-4 mt-2">
                    <p className="text-[14px] text-gray-400 mb-3 font-normal">Select Members from below</p>

                    <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                        {filteredMembers.map((member) => {
                            const isSelected = selectedMembers.includes(member.id);
                            return (
                                <div
                                    key={member.id}
                                    className={cn(
                                        "flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 border",
                                        isSelected
                                            ? "bg-[#EFF6FF] border-[#EFF6FF]"
                                            : "border-transparent hover:bg-gray-50"
                                    )}
                                    onClick={() => toggleMember(member.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                                <AvatarImage src={member.image} alt={member.name} />
                                                <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-xs">
                                                    {member.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <span className={cn(
                                            "text-[15px] font-medium",
                                            isSelected ? "text-blue-600" : "text-[#374151]"
                                        )}>
                                            {member.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <User className={cn("size-[18px]", isSelected ? "text-blue-500" : "text-gray-400")} />
                                        <div className={cn(
                                            "size-5 flex items-center justify-center transition-all duration-200",
                                            isSelected
                                                ? "bg-blue-600 rounded-full"
                                                : "border-[1.5px] border-gray-300 rounded-[6px] bg-white"
                                        )}>
                                            {isSelected && (
                                                <Check className="size-3 text-white stroke-[3px]" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="h-10 px-6 rounded-lg border-gray-200 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-200 rounded-lg transition-all active:scale-95"
                    >
                        Add
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
