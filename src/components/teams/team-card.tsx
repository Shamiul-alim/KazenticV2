"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { MoreHorizontal, User, Pencil, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/sprint-report/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AddNewMemberModal } from "./add-new-member-modal"

interface Member {
    id: string
    name: string
    image?: string
}

interface TeamCardProps {
    id: string
    name: string
    description: string
    members: Member[]
    initial: string
    onClick?: () => void
}

export function TeamCard({ name, description, members, initial, onClick }: TeamCardProps) {
    const [isAddMemberOpen, setIsAddMemberOpen] = React.useState(false)

    const handleCardClick = () => {
        if (onClick) {
            onClick()
        }
    }



    return (
        <div
            className="group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl transition-all duration-200 h-full"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleCardClick()
                }
            }}
        >
            <Card className="relative flex flex-col h-full bg-white rounded-xl border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:border-blue-100 group-hover:translate-y-[-2px] p-0">
                {/* Upper Half - Clickable for Details */}
                <div
                    onClick={handleCardClick}
                    className="p-4 flex flex-col gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-xl"
                >
                    <div className="flex items-start justify-between">
                        <div className="size-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
                            {initial}
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded-full transition-colors group/menu z-10 outline-none data-[state=open]:bg-gray-100">
                                    <MoreHorizontal className="size-4 text-gray-400 group-hover/menu:text-gray-600" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px]">
                                    <DropdownMenuItem className="text-blue-600 focus:text-blue-600 focus:bg-blue-50 cursor-pointer">
                                        <Pencil className="mr-2 size-4" />
                                        Edit Team
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                                        <Trash2 className="mr-2 size-4" />
                                        Delete Team
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-[15px] font-bold text-[#111827] leading-tight group-hover:text-blue-600 transition-colors">
                            {name}
                        </h3>
                        <p className="text-[13px] text-gray-500 line-clamp-2 leading-[1.5]">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Lower Half - Actions */}
                <div className="px-4 py-3 bg-gray-50/30 border-t border-gray-100 rounded-b-xl mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2.5">
                            {members.slice(0, 3).map((member, i) => (
                                <Avatar key={member.id} className="border-2 border-white size-8 shadow-sm">
                                    {member.image ? (
                                        <AvatarImage src={member.image} alt={member.name} />
                                    ) : (
                                        <AvatarFallback className="bg-[#E5E7EB] text-[11px] font-bold text-gray-700">
                                            {member.name.charAt(0)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            ))}
                            {members.length > 3 && (
                                <div className="size-8 rounded-full bg-[#F3F4F6] border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm">
                                    +{members.length - 3}
                                </div>
                            )}
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsAddMemberOpen(true)
                            }}
                            className="size-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 shadow-sm hover:bg-gray-50 hover:text-gray-600 transition-all cursor-pointer"
                        >
                            <User className="size-3.5" />
                        </div>
                    </div>
                </div>
            </Card>
            <AddNewMemberModal open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} />
        </div >
    )
}
