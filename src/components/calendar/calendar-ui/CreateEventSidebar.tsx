"use client"

import * as React from "react"
import { X, ChevronDown, Calendar, Clock, MapPin, Bell, AlignLeft, Paperclip, Lock, Eye, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateEventSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export const CreateEventSidebar = ({ isOpen, onClose }: CreateEventSidebarProps) => {
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
                "fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] z-[101] transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-5 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[17px] font-bold text-slate-800">Create Event</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-24">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700">Title</label>
                        <input
                            type="text"
                            placeholder="Add title.."
                            suppressHydrationWarning
                            className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-3">
                        <label className="text-[13px] font-bold text-slate-700">Date & Time</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    defaultValue="Tuesday, August 13"
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                                />
                            </div>
                            <div className="w-[100px]">
                                <input
                                    type="text"
                                    defaultValue="11:40 AM"
                                    className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-center text-[13px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                                />
                            </div>
                            <div className="w-[100px]">
                                <input
                                    type="text"
                                    defaultValue="12:40 PM"
                                    className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-center text-[13px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-50" />
                                <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">All Day</span>
                            </label>
                            <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Add Timezone
                            </button>
                        </div>
                    </div>

                    {/* Repeat */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700">Repeat</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all">
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            <button className="h-11 px-6 bg-blue-600 text-white text-[13px] font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Find a time
                            </button>
                        </div>
                    </div>

                    {/* Guest & Created By & Color */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700">Guest/Participants</label>
                            <input
                                type="text"
                                placeholder="Type email"
                                suppressHydrationWarning
                                className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2 col-span-1">
                                <label className="text-[13px] font-bold text-slate-700">Created By</label>
                                <div className="relative">
                                    <select className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-[13px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2 col-span-1">
                                <label className="text-[13px] font-bold text-slate-700">Color</label>
                                <div className="relative">
                                    <div className="flex items-center gap-2 w-full h-11 px-3 bg-white border border-slate-200 rounded-lg cursor-pointer">
                                        <div className="w-4 h-4 rounded-full bg-blue-600" />
                                        <ChevronDown size={14} className="ml-auto text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location & Reminder */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700">Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type location.."
                                    className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700">Reminder</label>
                            <div className="relative">
                                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all">
                                    <option>30 mins before</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700">Description</label>
                        <textarea
                            placeholder="Add description..."
                            rows={4}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none focus:border-blue-500 transition-all resize-none"
                        />
                    </div>

                    {/* Attachments */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[13px] font-bold text-slate-700">Attachments</label>
                            <label className="text-[13px] font-bold text-slate-700">Event Format</label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-lg group">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon size={16} className="text-blue-500" />
                                        <span className="text-[13px] font-semibold text-slate-700">File Name</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                        <X size={14} />
                                    </button>
                                </div>
                                <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    Add Attachments
                                </button>
                            </div>
                            <div className="relative">
                                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all">
                                    <option>Select</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Event Privacy & Visibility */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700">Event Privacy</label>
                            <div className="relative">
                                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all">
                                    <option>Select</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700">Visibility</label>
                            <div className="relative">
                                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] font-medium outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all">
                                    <option>Select</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-50 bg-white flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-[14px] hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-[14px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        Create
                    </button>
                </div>
            </div>
        </>
    )
}
