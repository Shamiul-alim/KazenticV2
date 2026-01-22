"use client";
// Still need to work on feature 
import React, { useState } from 'react';
import { Card } from '../ui/card';
import {
    LayoutGrid,
    BarChart2,
    PlusCircle,
    MinusCircle,
    CheckCircle2,
    AlertCircle,
    XCircle,
    ChevronDown,
    ChevronRight,
    ChevronsUpDown,
    RefreshCcw,
    Maximize2,
    Settings,
    MoreHorizontal,
    Filter,
    Settings2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { StatusPopover } from './StatusPopover';
import { FilterPopover } from "../list/FilterPopover"
import { CustomizeViewSidebar } from "../list/CustomizeViewSidebar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"

/* ===================== SUB COMPONENTS ===================== */

const MetricCard = ({ label, value }: { label: string, value: string }) => (
    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3 shadow-sm min-w-[120px]">
        <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">{label}</div>
        <div className="text-gray-950 font-black text-sm">{value}</div>
    </div>
);

interface StatusBadgeProps {
    label: string;
    icon: React.ReactNode;
    variant: 'blue' | 'green' | 'red' | 'orange' | 'purple';
    onClick?: () => void;
    className?: string;
}

const StatusBadge = ({ label, icon, variant, onClick, className }: StatusBadgeProps) => {
    const variants = {
        blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/50",
        green: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100/50",
        red: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100/50",
        orange: "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100/50",
        purple: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/50",
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all",
                variants[variant],
                className
            )}
        >
            {icon}
            {label}
        </button>
    );
};

interface BreakdownSectionProps {
    label: string;
    icon: React.ReactNode;
    variant: 'blue' | 'green' | 'red' | 'orange' | 'purple';
    isOpen: boolean;
    onToggle: () => void;
    columns: string[];
    data: any[];
}

const BreakdownSection = ({ label, icon, variant, isOpen, onToggle, columns, data }: BreakdownSectionProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentLabel, setCurrentLabel] = useState(label);
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [currentVariant, setCurrentVariant] = useState(variant);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 select-none group">
                <button
                    onClick={onToggle}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                    {isOpen ? (
                        <ChevronDown size={18} fill="currentColor" className="text-slate-400" />
                    ) : (
                        <ChevronRight size={18} fill="currentColor" className="text-slate-400" />
                    )}
                </button>
                <div className="relative">
                    <StatusBadge
                        label={currentLabel}
                        icon={currentIcon}
                        variant={currentVariant as any}
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    />
                    {isPopoverOpen && (
                        <StatusPopover
                            currentStatus={currentLabel}
                            onClose={() => setIsPopoverOpen(false)}
                            onSelect={(status) => {
                                setCurrentLabel(status.label);
                                setCurrentIcon(status.icon);
                                // Map colors/variants if needed, for now keep variant or update logic
                                if (status.label === 'TO DO') setCurrentVariant('orange');
                                if (status.label === 'IN PROGRESS') setCurrentVariant('purple');
                                if (status.label === 'ACTIVE') setCurrentVariant('green');
                                if (status.label === 'IN REVIEW') setCurrentVariant('blue');
                                if (status.label === 'PENDING') setCurrentVariant('orange');
                                if (status.label === 'REJECTED') setCurrentVariant('red');
                                if (status.label === 'QUALITY ASSURANCE') setCurrentVariant('purple');
                                if (status.label === 'CLOSED') setCurrentVariant('green');
                            }}
                        />
                    )}
                </div>
            </div>

            {isOpen && data.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f1f5f9]/50 border-b border-gray-100">
                                {columns.map((col, i) => (
                                    <th key={i} className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                                        <div className="flex items-center gap-1.5">
                                            {col}
                                            <ChevronsUpDown size={13} className="text-slate-300" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {data.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-[13px] font-bold text-slate-700">{row.name}</td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{row.date}</td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-500">{row.details}</td>
                                    <td className="px-6 py-4 text-[13px] font-bold text-slate-900">{row.change || row.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

/* ===================== MAIN COMPONENT ===================== */

export const SprintTaskReport = () => {
    const [openSections, setOpenSections] = useState({
        committed: true,
        added: true,
        removed: true,
        completed: false,
        remaining: false,
        afterClose: false,
    });

    const toggleSection = (key: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

    const taskRow1 = { id: 1, name: 'Auth, Profile, Dashboard...', date: 'Dec 6 at 5:00 am', details: 'Task Added', points: '3 pts' };
    const taskRow2 = { id: 2, name: 'Auth, Profile, Dashboard...', date: 'Dec 6 at 5:00 am', details: 'effort changed', change: '+3 pts' };

    return (
        <>
            <Card className="p-6 shadow-sm bg-white w-full max-w-[1240px] mx-auto overflow-visible">
                {/* Header */}
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                    <h3 className="text-[17px] font-extrabold text-slate-800 tracking-tight">Sprint Task Report</h3>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <RefreshCcw size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all hidden sm:block">
                            <Maximize2 size={18} />
                        </button>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-[12px] font-bold text-gray-600 gap-1.5 px-3 border border-gray-100 bg-white hover:bg-gray-50 shadow-sm rounded-lg transition-all active:scale-95">
                                    <Filter size={14} className="text-slate-400" />
                                    <span className="hidden sm:inline">Filter</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto z-[999]" align="end" sideOffset={8}>
                                <FilterPopover />
                            </PopoverContent>
                        </Popover>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCustomizeOpen(true)}
                            className="h-8 text-[12px] font-bold text-gray-600 gap-1.5 px-3 border border-gray-100 bg-white hover:bg-gray-50 shadow-sm rounded-lg transition-all active:scale-95"
                        >
                            <Settings2 size={14} className="text-slate-400" />
                            <span className="hidden sm:inline">Customize view</span>
                        </Button>

                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <Settings size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Sub Header */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] bg-slate-50/50 px-2.5 py-1 rounded-md">
                        <LayoutGrid size={13} className="text-slate-400" />
                        Sprint Category
                    </div>
                    <div className="h-3 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-[11px] bg-slate-50/50 px-2.5 py-1 rounded-md">
                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-600 flex items-center justify-center p-0.5">
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                        </div>
                        Sprint 2 (7/12 - 8/12)
                    </div>
                    <div className="h-3 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                    <div className="text-slate-400 font-bold text-[11px]">
                        Confirmed : <span className="text-slate-500">Dec 6 at 6:00 pm</span>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                    <MetricCard label="Committed" value="9 pts" />
                    <MetricCard label="Added" value="9 pts" />
                    <MetricCard label="Removed" value="9 pts" />
                    <MetricCard label="Completed" value="9 pts" />
                    <MetricCard label="Remaining" value="9 pts" />
                </div>

                <div className="space-y-8">
                    <h4 className="text-slate-800 font-bold text-[13px] tracking-tight">Task Breakdown</h4>

                    <BreakdownSection
                        label="Committed"
                        icon={<BarChart2 size={13} />}
                        variant="blue"
                        isOpen={openSections.committed}
                        onToggle={() => toggleSection('committed')}
                        columns={['Task Name', 'Date', 'Details', 'Sprint Points']}
                        data={[taskRow1, taskRow1]}
                    />

                    <BreakdownSection
                        label="Added"
                        icon={<PlusCircle size={13} />}
                        variant="green"
                        isOpen={openSections.added}
                        onToggle={() => toggleSection('added')}
                        columns={['Task Name', 'Date', 'Details', 'Change']}
                        data={[taskRow2]}
                    />

                    <BreakdownSection
                        label="Removed"
                        icon={<MinusCircle size={13} />}
                        variant="red"
                        isOpen={openSections.removed}
                        onToggle={() => toggleSection('removed')}
                        columns={['Task Name', 'Date', 'Details', 'Change']}
                        data={[taskRow2]}
                    />

                    <BreakdownSection
                        label="Completed"
                        icon={<CheckCircle2 size={13} />}
                        variant="green"
                        isOpen={openSections.completed}
                        onToggle={() => toggleSection('completed')}
                        columns={['Task Name', 'Date', 'Details', 'Change']}
                        data={[]}
                    />

                    <BreakdownSection
                        label="Remaining"
                        icon={<AlertCircle size={13} />}
                        variant="orange"
                        isOpen={openSections.remaining}
                        onToggle={() => toggleSection('remaining')}
                        columns={['Task Name', 'Date', 'Details', 'Change']}
                        data={[]}
                    />

                    <BreakdownSection
                        label="After Sprint Close"
                        icon={<XCircle size={13} />}
                        variant="purple"
                        isOpen={openSections.afterClose}
                        onToggle={() => toggleSection('afterClose')}
                        columns={['Task Name', 'Date', 'Details', 'Change']}
                        data={[]}
                    />
                </div>
            </Card>
            <div className="z-[999] relative">
                <CustomizeViewSidebar
                    isOpen={isCustomizeOpen}
                    onClose={() => setIsCustomizeOpen(false)}
                />
            </div>
        </>
    );
};
