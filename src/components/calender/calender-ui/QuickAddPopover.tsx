"use client";

import React, { useState } from 'react';
import { X, User, Hourglass, Circle, Flag, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/SprintReport/ui/avatar";

interface QuickAddPopoverProps {
    top: number;
    onClose: () => void;
}

export const QuickAddPopover = ({ top, onClose }: QuickAddPopoverProps) => {
    return (
        <div
            className="absolute left-4 right-4 z-[50] bg-white rounded-xl shadow-xl border border-blue-100 p-3 animate-in fade-in zoom-in-95 duration-200 slide-in-from-top-2"
            style={{ top: top }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-start justify-between mb-3">
                <input
                    type="text"
                    placeholder="Task Name..."
                    autoFocus
                    className="w-full text-base font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent"
                />
                <button
                    onClick={onClose}
                    className="text-gray-300 hover:text-gray-500 transition-colors ml-2"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                {/* Assignee */}
                <div className="flex items-center -space-x-2 shrink-0 cursor-pointer hover:brightness-95">
                    <div className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400">
                        <User size={14} />
                    </div>
                    <Avatar className="w-8 h-8 border-2 border-white">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                {/* Time Estimate */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group shrink-0">
                    <Hourglass size={14} className="text-gray-400 group-hover:text-blue-500" />
                    <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600 whitespace-nowrap">Time Estimate</span>
                </button>

                {/* Status */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group shrink-0">
                    <Circle size={14} className="text-gray-400 group-hover:text-blue-500" />
                    <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600 whitespace-nowrap">Status</span>
                </button>

                {/* Priority */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group shrink-0">
                    <Flag size={14} className="text-gray-400 group-hover:text-blue-500" />
                    <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600 whitespace-nowrap">Add priority</span>
                </button>

                {/* Due Time (Default fixed for UI) */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 bg-gray-50 shrink-0">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-xs font-semibold text-gray-600">1:00</span>
                </button>
            </div>
        </div>
    );
};
