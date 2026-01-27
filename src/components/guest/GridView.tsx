"use client"

import React from 'react'
import { Guest } from '@/data/guest-data'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { StatusBadge } from "@/components/sprint-report/ui/status-badge"
import { Phone, Mail, Copy } from 'lucide-react'
import { cn } from "@/lib/utils"

interface GridViewProps {
    guests: Guest[]
}

const GridView = ({ guests }: GridViewProps) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {guests.map((guest) => (
                <div
                    key={guest.id}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 border-2 border-white shadow-sm ring-1 ring-gray-100">
                                <AvatarImage src={guest.avatar} />
                                <AvatarFallback className="bg-blue-600 text-white font-bold text-base">
                                    {guest.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-xs">
                                    {guest.name}
                                </h3>
                                <p className="text-gray-500 text-[11px] font-medium">
                                    {guest.designation}
                                </p>
                            </div>
                        </div>
                        <StatusBadge
                            label={guest.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                            variant={guest.status === 'ACTIVE' ? 'green' : 'blue'}
                            className={cn(
                                "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                                guest.status === 'INACTIVE' && "opacity-60 grayscale bg-gray-100 text-gray-500 border-gray-200"
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all group/item">
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded-md bg-white border border-gray-100 shadow-xs">
                                    <Phone className="size-3 text-gray-400 group-hover/item:text-blue-500" />
                                </div>
                                <span className="text-gray-600 text-[11px] font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                                    {guest.phone}
                                </span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(guest.phone)}
                                title="Copy Phone Number"
                                className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
                            >
                                <Copy className="size-3" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all group/item">
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded-md bg-white border border-gray-100 shadow-xs">
                                    <Mail className="size-3 text-gray-400 group-hover/item:text-blue-500" />
                                </div>
                                <span className="text-gray-600 text-[11px] font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                    {guest.email}
                                </span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(guest.email)}
                                title="Copy Email Address"
                                className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
                            >
                                <Copy className="size-3" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridView
