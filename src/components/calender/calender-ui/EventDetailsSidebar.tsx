"use client"

import * as React from "react"
import { X, MoreVertical, Calendar as CalendarIcon, Globe, MapPin, AlignLeft, Clock, Trash2, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventDetailsSidebarProps {
    isOpen: boolean
    onClose: () => void
    event: any
}

export const EventDetailsSidebar = ({ isOpen, onClose, event }: EventDetailsSidebarProps) => {
    if (!event) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[100] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={cn(
                "fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] z-[101] transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-5 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[17px] font-bold text-slate-800">Event Details</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                            <Edit2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                            <Trash2 size={18} />
                        </button>
                        <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">

                    {/* Event Title & Type */}
                    <div className="flex items-start gap-5">
                        <div className={cn(
                            "w-6 h-6 mt-1.5 rounded-md shrink-0 shadow-sm",
                            event.color === 'green' && "bg-emerald-500",
                            event.color === 'purple' && "bg-purple-500",
                            event.color === 'blue' && "bg-blue-500",
                            !event.color && "bg-blue-600"
                        )} />
                        <div className="space-y-1.5">
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold uppercase tracking-wider">
                                    {event.badge || 'Event'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Time & Date */}
                    <div className="flex items-start gap-5 text-slate-600">
                        <CalendarIcon size={20} className="text-slate-400 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[15px] font-bold text-slate-800">Wednesday, August 14, 2026</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <Clock size={14} />
                                <span>{event.timeRange || '11:40 AM – 12:40 PM'}</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500">GMT+6</span>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-5 text-slate-600">
                        <MapPin size={20} className="text-slate-400 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[15px] font-bold text-slate-800">Location</p>
                            <p className="text-sm font-medium text-slate-500">{event.location || 'Kazentic HQ, Dhaka, Bangladesh'}</p>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="flex items-start gap-5 text-slate-600">
                        <Globe size={20} className="text-slate-400 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[15px] font-bold text-slate-800">Visibility & Privacy</p>
                            <p className="text-sm font-medium text-slate-500">Public • Shared with Everyone</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-slate-50 rounded-2xl p-6 flex items-start gap-5">
                        <AlignLeft size={20} className="text-slate-400 mt-0.5" />
                        <div className="space-y-2">
                            <p className="text-[15px] font-bold text-slate-800">Description</p>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                {event.description || "This is a public event scheduled in the project calendar. It details the upcoming sprint planning and team synchronization for the Kazentic V2 platform development."}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t border-slate-50 bg-white flex items-center justify-between gap-4">
                    <button className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all">
                        Edit Event
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}
