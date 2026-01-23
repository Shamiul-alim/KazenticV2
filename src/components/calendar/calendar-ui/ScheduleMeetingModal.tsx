"use client";

import React from 'react';
import { X, ChevronDown, Copy } from 'lucide-react';

interface ScheduleMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ScheduleMeetingModal = ({ isOpen, onClose }: ScheduleMeetingModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center isolate">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[19px] font-bold text-slate-800">Schedule a Meeting</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-slate-700">Title</label>
                        <input
                            type="text"
                            placeholder="Add title.."
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-slate-700">Date & Time</label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    defaultValue="Tuesday, August 13"
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="w-[110px]">
                                <input
                                    type="text"
                                    defaultValue="11:40 AM"
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none text-center focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="w-[110px]">
                                <input
                                    type="text"
                                    defaultValue="12:40 PM"
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none text-center focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-slate-700">Description</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 transition-all resize-none font-medium"
                        />
                    </div>

                    {/* Guests & Created By & Color */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-5 space-y-2">
                            <label className="text-[14px] font-bold text-slate-700">Guest/Participants</label>
                            <input
                                type="text"
                                placeholder="Type email"
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div className="col-span-6 md:col-span-4 space-y-2">
                            <label className="text-[14px] font-bold text-slate-700">Created By</label>
                            <div className="relative">
                                <select className="w-full h-12 px-4 bg-white rounded-xl border border-slate-200 text-sm outline-none appearance-none cursor-pointer focus:border-blue-500 transition-all font-medium">
                                    <option>Select</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3 space-y-2">
                            <label className="text-[14px] font-bold text-slate-700">Color</label>
                            <div className="relative">
                                <div className="flex items-center justify-between w-full h-12 px-4 rounded-xl border border-slate-200 cursor-pointer">
                                    <div className="w-5 h-5 rounded-full bg-blue-600" />
                                    <ChevronDown className="text-slate-400" size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meeting Link */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-slate-700">Meeting Link</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Link"
                                className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 transition-all font-medium text-slate-400"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-10">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-8 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Create
                    </button>
                </div>

            </div>
        </div>
    );
};
