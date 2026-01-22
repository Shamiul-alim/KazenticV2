"use client";

import React from 'react';
import { X, MoreVertical, Calendar as CalendarIcon, Globe, MapPin, AlignLeft } from 'lucide-react';
import { cn } from "@/lib/utils";

interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

export const EventDetailsModal = ({ isOpen, onClose, event }: EventDetailsModalProps) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Event Details</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                            <MoreVertical size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors bg-blue-50 text-blue-600"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Event Title Row */}
                <div className="flex items-start gap-4 mb-2">
                    <div className={cn(
                        "w-5 h-5 mt-1 rounded-sm rotate-45 shrink-0",
                        event.color === 'green' && "bg-emerald-500",
                        event.color === 'purple' && "bg-purple-500",
                        event.color === 'blue' && "bg-blue-500",
                        !event.color && "bg-gray-500"
                    )} />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">
                            {event.title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium">{event.type || 'Event'}</p>
                    </div>
                </div>

                {/* Badge & Date */}
                <div className="flex flex-wrap items-center gap-3 ml-9 mb-6">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider">
                        {event.badge || 'Event'}
                    </span>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                        Wednesday, August 14 <span className="text-gray-300">|</span> {event.timeRange || 'All Day'}
                    </span>
                </div>

                {/* Details List */}
                <div className="space-y-4 ml-9">
                    {/* Calendar Info */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm font-medium">Holidays in Bangladesh</span>
                    </div>

                    {/* Visibility */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <Globe size={18} className="text-gray-400" />
                        <span className="text-sm font-medium">Public</span>
                    </div>

                    {/* Description (Optional Placeholder) */}
                    <div className="flex items-start gap-3 text-gray-600">
                        <AlignLeft size={18} className="text-gray-400 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-gray-900 mb-0.5">Description</p>
                            <span className="text-gray-500">
                                This is a public holiday event. No description provided.
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
