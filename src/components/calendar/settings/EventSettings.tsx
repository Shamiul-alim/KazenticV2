"use client";

import React, { useState } from 'react';
import { Plus, ChevronsUpDown, Check, ArrowLeft } from 'lucide-react';
import { AddEventTypeModal } from './AddEventTypeModal';

interface EventSettingsProps {
    onBack: () => void;
}

export const EventSettings = ({ onBack }: EventSettingsProps) => {
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock data based on the screenshot (mostly repeated "Holiday" entries)
    const eventTypes = Array(8).fill({
        id: 1,
        name: "Holiday",
        status: "ACTIVE"
    });

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] p-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-500"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">Event type</h1>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Add Event Type
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f8fafc] border-b border-slate-200">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-24">
                                    Sl. No.
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group">
                                    <div className="flex items-center gap-2">
                                        Type Name
                                        <ChevronsUpDown size={14} className="text-slate-400 group-hover:text-slate-600" />
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group w-48">
                                    <div className="flex items-center gap-2">
                                        Status
                                        <ChevronsUpDown size={14} className="text-slate-400 group-hover:text-slate-600" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {eventTypes.map((type, index) => (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                                        {index + 1}.
                                    </td>
                                    <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                                        {type.name}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-600 text-[11px] font-bold tracking-wide">
                                            <Check size={12} strokeWidth={3} />
                                            {type.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddEventTypeModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
        </div>
    );
};
