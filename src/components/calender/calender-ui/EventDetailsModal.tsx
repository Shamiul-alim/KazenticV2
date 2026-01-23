"use client";

import React from 'react';
import { X, MoreVertical, Calendar as CalendarIcon, Globe } from 'lucide-react';
import { cn } from "@/lib/utils";

interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

export const EventDetailsModal = ({ isOpen, onClose, event }: EventDetailsModalProps) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center isolate">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/5 backdrop-blur-[1px]"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-7 animate-in fade-in zoom-in-95 duration-200 border border-slate-100">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] font-bold text-[#1e293b]">Event Details</h2>
                    <div className="flex items-center gap-1.5">
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                            <MoreVertical size={18} strokeWidth={2} />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Event Title Row */}
                <div className="flex items-start gap-4 mb-1">
                    <div className="w-6 h-6 mt-1.5 rounded-[5px] bg-[#0fa968] rotate-45 shrink-0 shadow-sm" />
                    <div>
                        <h1 className="text-[22px] font-bold text-[#1e293b] leading-tight tracking-tight">
                            {event.title || 'Holiday Name'}
                        </h1>
                        <p className="text-[15px] text-slate-500 mt-0.5 font-medium">Public Holiday</p>
                    </div>
                </div>

                {/* Badge & Date */}
                <div className="flex items-center gap-3 ml-10 mb-7 mt-3">
                    <div className="px-3.5 py-1 rounded-lg bg-indigo-50/50 text-indigo-600 border border-indigo-100 text-[13px] font-bold">
                        Type
                    </div>
                    <span className="text-[15px] text-slate-400 font-medium">
                        Wednesday, August 14 <span className="mx-1 text-slate-300">|</span> 12:30-1:30 PM
                    </span>
                </div>

                {/* Details List */}
                <div className="space-y-4 ml-10">
                    {/* Calendar Info */}
                    <div className="flex items-center gap-3.5 text-slate-500">
                        <CalendarIcon size={20} className="text-slate-400" />
                        <span className="text-[15px] font-semibold text-slate-600">Holidays in Bangladesh</span>
                    </div>

                    {/* Visibility */}
                    <div className="flex items-center gap-3.5 text-slate-500">
                        <Globe size={20} className="text-slate-400" />
                        <span className="text-[15px] font-semibold text-slate-600">Public</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
