"use client";

import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AddEventTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddEventTypeModal = ({ isOpen, onClose }: AddEventTypeModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[480px] bg-white rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[17px] font-bold text-slate-800">Add Event Type</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-5">

                    {/* Event Type Name */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-700">Event Type Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full h-11 px-4 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-slate-700">Status</label>
                        <div className="relative">
                            <select
                                defaultValue=""
                                className="w-full h-11 px-4 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all appearance-none bg-white font-medium text-slate-600 cursor-pointer"
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-8 pt-2">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
};
