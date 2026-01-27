"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { Phone, Mail, Copy, ChevronDown, XCircle } from "lucide-react"
import { Member } from "@/data/teams-data"

interface MemberCardProps extends Member { }

export function MemberCard({ name, role, phone, email, image, isHighlighted }: MemberCardProps) {
    return (
        <Card className={`p-4 flex flex-col gap-4 border-gray-100 transition-all ${isHighlighted ? "bg-[#F4F9FF] border-[#E0EFFF]" : "bg-white"}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-white shadow-sm">
                        <AvatarImage src={image} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-[#111827] text-[15px]">{name}</h4>
                        <div className="flex items-center gap-1 cursor-pointer group">
                            <span className="text-[13px] text-gray-500 font-medium group-hover:text-blue-600">{role}</span>
                            <ChevronDown className="size-3 text-gray-400 group-hover:text-blue-600" />
                        </div>
                    </div>
                </div>
                {isHighlighted && (
                    <button className="text-red-400 hover:text-red-600 transition-colors">
                        <XCircle className="size-5" />
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm">
                            <Phone className="size-3.5 text-gray-400" />
                        </div>
                        <span className="text-[13px] text-gray-600 font-medium">{phone}</span>
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                        <Copy className="size-3.5 text-gray-400" />
                    </button>
                </div>

                <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm">
                            <Mail className="size-3.5 text-gray-400" />
                        </div>
                        <span className="text-[13px] text-gray-600 font-medium">{email}</span>
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                        <Copy className="size-3.5 text-gray-400" />
                    </button>
                </div>
            </div>
        </Card>
    )
}

interface MembersViewProps {
    members: Member[]
}

export default function MembersView({ members }: MembersViewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
                <MemberCard key={member.id} {...member} />
            ))}
        </div>
    )
}
