"use client"

import React, { useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
} from "recharts"
import {
    RefreshCcw,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    X,
    ArrowUpDown,
    Eye,
    ListFilter,
} from "lucide-react"
import Card from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { TaskTable } from "../../list/TaskTable"

interface TotalTimeStatusSettingsProps {
    isOpen: boolean
    onClose: () => void
    data: any[]
}

export const TotalTimeStatusSettings = ({
    isOpen,
    onClose,
    data: initialData,
}: TotalTimeStatusSettingsProps) => {
    const [activeTab, setActiveTab] = useState<"Settings" | "Data">("Settings")

    if (!isOpen) return null

    // Preview data matching the image: Normal(4), High(8), Urgent(6), Low(2)
    const previewData = [
        { name: 'Normal', value: 4, color: '#a5b4ff' },
        { name: 'High', value: 8, color: '#bca695' },
        { name: 'Urgent', value: 6, color: '#ffc1c1' },
        { name: 'Low', value: 2, color: '#a7b4bc' },
    ]

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <Card className="w-full max-w-[1220px] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-none animate-in zoom-in-95 duration-300">
                {/* ================= HEADER ================= */}
                <div className="h-14 px-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <HeaderIcon>
                            <ChevronLeft size={16} />
                        </HeaderIcon>
                        <HeaderIcon>
                            <ChevronRight size={16} />
                        </HeaderIcon>
                    </div>

                    <div className="flex items-center gap-2">
                        <HeaderIcon>
                            <RefreshCcw size={18} />
                        </HeaderIcon>
                        <HeaderIcon>
                            <MoreHorizontal size={18} />
                        </HeaderIcon>
                        <div className="w-px h-4 bg-gray-200 mx-1" />
                        <HeaderIcon danger onClick={onClose}>
                            <X size={18} />
                        </HeaderIcon>
                    </div>
                </div>

                {/* ================= BODY ================= */}
                <div className="flex flex-1 overflow-hidden">
                    {/* ===== LEFT: BAR CHART PREVIEW ===== */}
                    <div className="flex-[1.45] bg-[#fcfcfc] border-r border-gray-100 p-8 flex flex-col">
                        <h3 className="text-[18px] font-bold text-slate-800 mb-6">
                            Bar Chart
                        </h3>

                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={previewData}
                                    margin={{ top: 20, right: 30, left: -20, bottom: 10 }}
                                    barSize={32}
                                >
                                    <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                                        ticks={[0, 2, 4, 6, 8, 10]}
                                    />
                                    <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="3 3" />
                                    <Bar
                                        dataKey="value"
                                        radius={[8, 8, 0, 0]}
                                        label={{ position: 'top', fill: '#64748b', fontSize: 12, fontWeight: 700, offset: 8 }}
                                    >
                                        {previewData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-6 mt-6">
                            {previewData.map((item, index) => (
                                <LegendItem key={index} color={item.color} label={item.name} />
                            ))}
                        </div>
                    </div>

                    {/* ===== RIGHT: SETTINGS PANEL ===== */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 shrink-0">
                            {["Settings", "Data"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={cn(
                                        "flex-1 py-4 text-[13px] font-bold relative transition-colors",
                                        activeTab === tab
                                            ? "text-blue-600"
                                            : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
                            {activeTab === "Settings" ? (
                                <>
                                    {/* Display Section */}
                                    <Section title="Display">
                                        <Row label="Show Average Line">
                                            <Switch defaultChecked />
                                        </Row>
                                        <Row label="Show Data Labels">
                                            <Switch defaultChecked />
                                        </Row>
                                        <Row label="Show Legend">
                                            <Switch defaultChecked />
                                        </Row>
                                    </Section>

                                    {/* X-Axis Section */}
                                    <Section title="X-Axis">
                                        <SelectRow label="Measure" value="Status" icon={<ArrowUpDown size={18} />} />
                                        <SelectRow
                                            label="Sort by"
                                            value="Default"
                                            icon={<ListFilter size={18} />}
                                        />
                                        <SelectRow label="Show" value="Select Option" icon={<Eye size={18} />} />
                                    </Section>

                                    {/* Y-Axis Section */}
                                    <Section title="Y-Axis">
                                        <SelectRow label="Measure" value="Status" icon={<ArrowUpDown size={18} />} />
                                    </Section>
                                </>
                            ) : (
                                <div className="w-full h-full overflow-x-auto custom-scrollbar">
                                    <TaskTable />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

/* ================= HELPERS ================= */

const HeaderIcon = ({
    children,
    danger,
    onClick,
}: any) => (
    <button
        onClick={onClick}
        className={cn(
            "p-1.5 rounded-lg border border-gray-100 text-slate-400 hover:bg-gray-50 transition",
            danger && "hover:bg-red-50 hover:text-red-500"
        )}
    >
        {children}
    </button>
)

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] font-bold text-slate-500 tracking-tight">
            {label}
        </span>
    </div>
)

const Section = ({ title, children }: any) => (
    <div className="space-y-4">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            {title}
        </h4>
        {children}
    </div>
)

const Row = ({ label, children }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <span className="text-[13px] font-bold text-slate-600">{label}</span>
        {children}
    </div>
)

const SelectRow = ({ label, value, icon }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3 text-slate-400">
            {icon}
            <span className="text-[13px] font-bold text-slate-600">{label}</span>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5 shadow-sm min-w-[140px]">
            <span className="flex-1 text-[12px] font-bold text-slate-600 text-right mr-1">{value}</span>
            <ChevronDownIcon />
        </div>
    </div>
)

const ChevronDownIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-300"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
)
