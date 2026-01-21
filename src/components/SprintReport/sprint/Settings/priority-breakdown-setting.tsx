"use client"

import React, { useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"
import {
    RefreshCcw,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    X,
    Clock,
    Layers,
    ArrowUpDown,
} from "lucide-react"
import { Card } from "../../ui/card"
import { Switch } from "../../ui/switch"
import { cn } from "@/lib/utils"
import { TaskTable } from "../../list/TaskTable"

interface PriorityBreakdownSettingsProps {
    isOpen: boolean
    onClose: () => void
    data: any[]
}

export const PriorityBreakdownSettings = ({
    isOpen,
    onClose,
    data,
}: PriorityBreakdownSettingsProps) => {
    const [activeTab, setActiveTab] = useState<"Settings" | "Data">("Settings")

    if (!isOpen) return null

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
                    {/* ===== LEFT: CHART PREVIEW ===== */}
                    <div className="flex-[1.45] bg-[#fcfcfc] border-r border-gray-100 p-8 flex flex-col">
                        <h3 className="text-[18px] font-bold text-slate-800 mb-6">
                            Line Chart
                        </h3>

                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{ top: 10, right: 10, left: -25, bottom: 10 }}
                                >
                                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                                        dy={12}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                                        ticks={[0, 1000, 2000, 3000, 4000]}
                                        tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="review"
                                        stroke="#4f5bff"
                                        strokeWidth={2.5}
                                        dot={{
                                            r: 7,
                                            fill: "#fff",
                                            stroke: "#4f5bff",
                                            strokeWidth: 2,
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="progress"
                                        stroke="#d8ccff"
                                        strokeWidth={2.5}
                                        dot={{
                                            r: 7,
                                            fill: "#fff",
                                            stroke: "#d8ccff",
                                            strokeWidth: 2,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-8 mt-6">
                            <LegendItem color="#4f5bff" label="IN REVIEW" />
                            <LegendItem color="#d8ccff" label="IN PROGRESS" />
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
                        <div className="flex-1 overflow-y-auto p-6 space-y-10">
                            {activeTab === "Settings" ? (
                                <>
                                    {/* Display */}
                                    <Section title="Display">
                                        <Row label="Display as stacked area">
                                            <Switch defaultChecked />
                                        </Row>
                                        <Row label="Show Legend">
                                            <Switch defaultChecked />
                                        </Row>
                                    </Section>

                                    {/* X Axis */}
                                    <Section title="X-Axis">
                                        <SelectRow label="Measure" value="Time" icon={<ArrowUpDown />} />
                                        <SelectRow
                                            label="Time Range"
                                            value="This month"
                                            icon={<Clock />}
                                        />
                                        <ArrowRow label="Group by" value="Weeks" icon={<Layers />} />
                                    </Section>

                                    {/* Y Axis */}
                                    <Section title="Y-Axis">
                                        <SelectRow label="Measure" value="Time" icon={<ArrowUpDown />} />
                                        <ArrowRow label="Group by" value="Weeks" icon={<Layers />} />
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
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            {label}
        </span>
    </div>
)

const Section = ({ title, children }: any) => (
    <div className="space-y-4">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {title}
        </h4>
        {children}
    </div>
)

const Row = ({ label, children }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50">
        <span className="text-[13px] font-bold text-slate-600">{label}</span>
        {children}
    </div>
)

const SelectRow = ({ label, value, icon }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
            {icon}
            <span className="text-[13px] font-bold">{label}</span>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5 shadow-sm min-w-[120px]">
            <span className="text-[12px] font-bold text-slate-600">{value}</span>
            <ChevronDown />
        </div>
    </div>
)

const ArrowRow = ({ label, value, icon }: any) => (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
        <div className="flex items-center gap-3 text-slate-500">
            {icon}
            <span className="text-[13px] font-bold text-slate-600">{label}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[12px] font-bold">{value}</span>
            <ChevronRight size={14} />
        </div>
    </div>
)

const ChevronDown = () => (
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
