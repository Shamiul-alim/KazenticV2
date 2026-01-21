"use client"

import * as React from "react"
import {
    X,
    List as ListIcon,
    Pencil,
    Filter,
    Layers,
    GitBranch,
    Pin,
    ShieldCheck,
    Lock,
    Home,
    Link2,
    Download,
    Trash2,
    ChevronRight,
    ArrowLeft,
    Search,
    GripVertical,
    RefreshCw,
    Flag,
    Box,
    PlayCircle,
    Target,
    Calendar,
    Hourglass,
    Clock,
    UserCircle,
    MessageSquare,
    Hash
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ToggleProps {
    enabled: boolean
    onChange: () => void
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onChange();
        }}
        className={cn(
            "w-9 h-5 rounded-full p-1 cursor-pointer transition-all duration-200 ease-in-out shrink-0",
            enabled ? "bg-blue-600" : "bg-slate-200"
        )}
    >
        <div className={cn(
            "w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out",
            enabled ? "translate-x-4" : "translate-x-0"
        )} />
    </div>
)

interface SidebarItemProps {
    icon: any
    label: string
    value?: string
    onClick?: () => void
    isToggle?: boolean
    enabled?: boolean
    onToggle?: () => void
    isDelete?: boolean
    hasCarat?: boolean
}

const SidebarItem = ({
    icon: Icon,
    label,
    value,
    onClick,
    isToggle,
    enabled = false,
    onToggle,
    isDelete,
    hasCarat = true
}: SidebarItemProps) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-colors hover:bg-slate-50",
            isDelete ? "text-red-500 hover:bg-red-50" : "text-slate-600"
        )}
    >
        <div className="flex items-center gap-3">
            <Icon size={16} className={cn(isDelete ? "text-red-500" : "text-slate-400")} />
            <span className="text-[13px] font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {isToggle ? (
                <Toggle enabled={enabled} onChange={onToggle || (() => { })} />
            ) : (
                <>
                    {value && <span className="text-[12px] text-slate-400 font-medium">{value}</span>}
                    {hasCarat && <ChevronRight size={14} className="text-slate-300" />}
                </>
            )}
        </div>
    </div>
)

const FieldRow = ({ icon: Icon, label, enabled, onToggle }: { icon: any, label: string, enabled: boolean, onToggle: () => void }) => (
    <div className="group flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
            <GripVertical size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon size={16} className="text-slate-400" />
            <span className="text-[13px] font-medium text-slate-600">{label}</span>
        </div>
        <Toggle enabled={enabled} onChange={onToggle} />
    </div>
)

const FieldsView = ({ onBack }: { onBack: () => void }) => {
    const [fieldStates, setFieldStates] = React.useState<Record<string, boolean>>({
        status: true,
        priority: true,
        taskType: true,
        sprints: true,
        points: true,
        startDate: true,
        dueDate: true,
        dateCreated: true,
        dateClosed: true,
        timeEst: true,
        timeTracked: true,
        createdBy: true,
        comments: true,
        taskId: true,
        custom: true
    })

    const toggle = (id: string) => setFieldStates(prev => ({ ...prev, [id]: !prev[id] }))

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-800">
                        <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-[15px] font-bold text-slate-800">Fields</h2>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <X size={18} />
                </div>
            </div>

            <div className="p-4 pb-2">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-9 pl-9 pr-4 bg-[#f8fafc] border border-transparent rounded-lg text-[13px] font-medium outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-6 no-scrollbar">
                {/* Task Basics */}
                <div className="mb-4">
                    <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Task Basics</span>
                        <button className="text-[11px] font-bold text-slate-400 hover:text-blue-600">Hide All</button>
                    </div>
                    <div className="px-1">
                        <FieldRow icon={RefreshCw} label="Status" enabled={fieldStates.status} onToggle={() => toggle("status")} />
                        <FieldRow icon={Flag} label="Priority" enabled={fieldStates.priority} onToggle={() => toggle("priority")} />
                        <FieldRow icon={Box} label="Task Type" enabled={fieldStates.taskType} onToggle={() => toggle("taskType")} />
                        <FieldRow icon={PlayCircle} label="Sprints" enabled={fieldStates.sprints} onToggle={() => toggle("sprints")} />
                        <FieldRow icon={Target} label="Sprint Points" enabled={fieldStates.points} onToggle={() => toggle("points")} />
                    </div>
                </div>

                {/* Dates */}
                <div className="mb-4">
                    <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dates</span>
                    </div>
                    <div className="px-1">
                        <FieldRow icon={Calendar} label="Start Date" enabled={fieldStates.startDate} onToggle={() => toggle("startDate")} />
                        <FieldRow icon={Calendar} label="Due Date" enabled={fieldStates.dueDate} onToggle={() => toggle("dueDate")} />
                        <FieldRow icon={Calendar} label="Date Created" enabled={fieldStates.dateCreated} onToggle={() => toggle("dateCreated")} />
                        <FieldRow icon={Calendar} label="Date Closed" enabled={fieldStates.dateClosed} onToggle={() => toggle("dateClosed")} />
                    </div>
                </div>

                {/* Time */}
                <div className="mb-4">
                    <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
                    </div>
                    <div className="px-1">
                        <FieldRow icon={Hourglass} label="Time Estimated" enabled={fieldStates.timeEst} onToggle={() => toggle("timeEst")} />
                        <FieldRow icon={Clock} label="Time Tracked" enabled={fieldStates.timeTracked} onToggle={() => toggle("timeTracked")} />
                    </div>
                </div>

                {/* Meta data */}
                <div className="mb-4">
                    <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Meta data</span>
                    </div>
                    <div className="px-1">
                        <FieldRow icon={UserCircle} label="Created by" enabled={fieldStates.createdBy} onToggle={() => toggle("createdBy")} />
                        <FieldRow icon={MessageSquare} label="Comments" enabled={fieldStates.comments} onToggle={() => toggle("comments")} />
                        <FieldRow icon={Hash} label="Task ID" enabled={fieldStates.taskId} onToggle={() => toggle("taskId")} />
                        <FieldRow icon={Pencil} label="Custom" enabled={fieldStates.custom} onToggle={() => toggle("custom")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const CustomizeViewSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [currentView, setCurrentView] = React.useState<"main" | "fields">("main")
    const [settings, setSettings] = React.useState({
        showEmpty: true,
        showClosed: true,
        pinView: true,
        secureView: true,
        privateView: true,
        makeDefault: true
    })

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    // Reset view when closing
    React.useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setCurrentView("main"), 300)
        }
    }, [isOpen])

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
                "fixed top-0 right-0 h-full w-[340px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] z-[101] transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {currentView === "main" ? (
                    <>
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-slate-50">
                            <h2 className="text-[15px] font-bold text-slate-800">Customize View</h2>
                            <button
                                onClick={onClose}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Search / Input */}
                        <div className="p-4">
                            <div className="flex items-center gap-3 px-3 h-10 border border-slate-200 rounded-lg">
                                <ListIcon size={16} className="text-blue-600" />
                                <span className="text-[13px] font-medium text-slate-600">List</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto pb-6 no-scrollbar px-1">
                            {/* Quick Actions */}
                            <div className="mb-4">
                                <div className="px-4 py-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</span>
                                </div>
                                <div className="px-1">
                                    <SidebarItem
                                        icon={Layers}
                                        label="Show Empty Statuses"
                                        isToggle
                                        enabled={settings.showEmpty}
                                        onToggle={() => toggleSetting("showEmpty")}
                                        hasCarat={false}
                                    />
                                    <SidebarItem
                                        icon={Layers}
                                        label="Show Closed Tasks"
                                        isToggle
                                        enabled={settings.showClosed}
                                        onToggle={() => toggleSetting("showClosed")}
                                        hasCarat={false}
                                    />
                                </div>
                            </div>

                            {/* Task Visibility */}
                            <div className="mb-4">
                                <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Task Visibility</span>
                                </div>
                                <div className="px-1">
                                    <SidebarItem
                                        icon={Pencil}
                                        label="Fields"
                                        value="12 Shown"
                                        onClick={() => setCurrentView("fields")}
                                    />
                                    <SidebarItem icon={Filter} label="Filter" value="None" />
                                    <SidebarItem icon={Layers} label="Group" value="Status" />
                                    <SidebarItem icon={GitBranch} label="Subtasks" value="Collapsed" />
                                </div>
                            </div>

                            {/* View Settings */}
                            <div className="mb-4">
                                <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">View Settings</span>
                                </div>
                                <div className="px-1">
                                    <SidebarItem
                                        icon={Pin}
                                        label="Pin This View"
                                        isToggle
                                        enabled={settings.pinView}
                                        onToggle={() => toggleSetting("pinView")}
                                        hasCarat={false}
                                    />
                                    <SidebarItem
                                        icon={ShieldCheck}
                                        label="Secure View"
                                        isToggle
                                        enabled={settings.secureView}
                                        onToggle={() => toggleSetting("secureView")}
                                        hasCarat={false}
                                    />
                                    <SidebarItem
                                        icon={Lock}
                                        label="Private View"
                                        isToggle
                                        enabled={settings.privateView}
                                        onToggle={() => toggleSetting("privateView")}
                                        hasCarat={false}
                                    />
                                    <SidebarItem
                                        icon={Home}
                                        label="Make Default"
                                        isToggle
                                        enabled={settings.makeDefault}
                                        onToggle={() => toggleSetting("makeDefault")}
                                        hasCarat={false}
                                    />
                                </div>
                            </div>

                            {/* Utility Actions */}
                            <div>
                                <div className="px-4 py-2 border-t border-slate-50 mt-2 pt-4">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Utility Actions</span>
                                </div>
                                <div className="px-1">
                                    <SidebarItem icon={Link2} label="Copy View Link" hasCarat={false} />
                                    <SidebarItem icon={Download} label="Export View" />
                                    <SidebarItem icon={Trash2} label="Delete View" isDelete hasCarat={false} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <FieldsView onBack={() => setCurrentView("main")} />
                )}
            </div>
        </>
    )
}
