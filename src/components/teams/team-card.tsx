"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { MoreHorizontal, User } from "lucide-react"
import { cn } from "@/lib/utils"

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
    const handleCardClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click when clicking the menu
        console.log(`Menu clicked for: ${name}`)
    }

    return (
        <div
            onClick={handleCardClick}
            className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl transition-all duration-200 h-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleCardClick()
                }
            }}
        >
            <Card className="relative flex flex-col gap-4 p-4 hover:shadow-lg transition-all duration-300 border-gray-100 group-hover:border-blue-100 group-hover:translate-y-[-2px] h-full bg-white rounded-xl">
                <div className="flex items-start justify-between">
                    <div className="size-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
                        {initial}
                    </div>
                    <button
                        onClick={handleMenuClick}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors group/menu z-10"
                    >
                        <MoreHorizontal className="size-4 text-gray-400 group-hover/menu:text-gray-600" />
                    </button>
                </div>

                <div className="space-y-1.5">
                    <h3 className="text-[15px] font-bold text-[#111827] leading-tight group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-[13px] text-gray-500 line-clamp-2 leading-[1.5]">
                        {description}
                    </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-gray-100 mt-auto">
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
                    <div className="size-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 shadow-sm hover:bg-gray-50 hover:text-gray-600 transition-all cursor-pointer">
                        <User className="size-3.5" />
                    </div>
                </div>
            </Card>
        </div>
    )
}
