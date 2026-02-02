"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Settings,
    Users,
    UserPlus,
    ShieldCheck,
    BarChart3,
    Sliders,
    Timer,
    Briefcase,
    FileText,
    Users2,
    CalendarDays,
    ClipboardCheck,
    History,
    Mail,
    ChevronDown,
    ChevronRight,
    Search,
    BookOpen,
    FolderKanban,
    Zap,
    Layout,
    Plus,
    Home,
    Clock,
    Layers,
    PieChart,
    Calendar,
    UserCircle,
    Activity,
    RotateCw,
    PlayCircle,
    Cloud,
    Database,
    Send,
    Trash2,
    CircleDashed,
    StickyNote,
    UserCheck,
    CircleDollarSign,
    Ban,
    BellDot,
    UserRound,
    MessageSquare,
    MessagesSquare,
    File
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

const NavItem = ({
    icon: Icon,
    label,
    isActive = false,
    hasSubmenu = false,
    isOpen = false,
    onClick,
    count,
    variant = "ghost"
}: {
    icon: any,
    label: string,
    isActive?: boolean,
    hasSubmenu?: boolean,
    isOpen?: boolean,
    onClick?: () => void,
    count?: number,
    variant?: "ghost" | "active-section"
}) => {
    return (
        <div className="px-2 py-0.5">
            <div
                onClick={onClick}
                className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group",
                    variant === "active-section" ? "bg-[#f0f9ff] border border-[#e0f2fe]" : "text-gray-700 hover:bg-gray-50",
                    isActive && variant === "ghost" && "text-blue-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <Icon size={18} className={cn(
                        variant === "active-section" || isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                    )} />
                    <span className={cn(
                        "text-[13px] font-bold tracking-tight",
                        variant === "active-section" || isActive ? "text-[#475569]" : "text-[#475569]"
                    )}>{label}</span>
                </div>
                <div className="flex items-center gap-1">
                    {count !== undefined && (
                        <span className="bg-blue-600 text-white text-[10px] h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 font-bold">
                            {count}
                        </span>
                    )}
                    {hasSubmenu && (
                        isOpen ? <ChevronDown size={14} className="text-blue-500" /> : <ChevronRight size={14} className="text-gray-400" />
                    )}
                </div>
            </div>
        </div>
    )
}

const SubNavItem = ({ label, isActive = false, icon: Icon }: { label: string, isActive?: boolean, icon?: any }) => {
    return (
        <div className="pl-10 pr-2 py-0.5">
            <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group",
                isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            )}>
                {Icon && <Icon size={18} className={isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"} />}
                <span className="text-[13px] font-bold text-[#475569]">{label}</span>
            </div>
        </div>
    )
}

export const Sidebar = () => {
    const [openSections, setOpenSections] = React.useState({
        manage: true,
        tasks: true,
        reports: true,
        storage: true,
        hrm: true,
        crm: true,
        email: false
    })

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    return (
        <div className="flex h-full border-r border-gray-100 bg-white select-none">
            {/* Slim Left Rail */}
            <div className="w-[60px] flex flex-col items-center py-4 gap-4 bg-[#131A57] border-r border-gray-50 shrink-0">
                <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform">K</div>

                <div className="flex flex-col gap-3 mt-4">
                    <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center font-bold rounded-lg cursor-pointer shadow-sm">C</div>
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-bold rounded-lg cursor-pointer border-2 border-white ring-2 ring-blue-100">D</div>
                    <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center font-bold rounded-lg cursor-pointer">L</div>
                    <div className="w-8 h-8 border-2 border-dashed border-gray-200 text-gray-400 flex items-center justify-center font-bold rounded-lg cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors">
                        <Plus size={16} />
                    </div>
                </div>

                <div className="mt-auto mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded-lg cursor-pointer shadow-lg shadow-blue-200">
                        <Plus size={20} />
                    </div>
                </div>
            </div>

            {/* Main Navigation Sidebar */}
            <div className="w-[220px] flex flex-col h-full bg-white overflow-hidden min-h-0">
                {/* Brand Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-orange-500 text-white rounded flex items-center justify-center font-bold text-xs">C</div>
                        <span className="font-bold text-gray-900 text-[13px] tracking-tight">Carbon Stream</span>
                    </div>
                    <Layout className="text-gray-300 w-4 h-4 cursor-pointer hover:text-gray-500" />
                </div>

                {/* Navigation Items (Scrollable) */}
                <div className="flex-1 min-h-0">
                    <ScrollArea className="h-full">
                        <div className="py-4 space-y-1 pb-20">
                            <NavItem icon={Home} label="Dashboard" />

                            <div className="px-2">
                                <Collapsible
                                    open={openSections.manage}
                                    onOpenChange={() => toggleSection('manage')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.manage && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <Layers size={18} className={cn(openSections.manage ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">Manage</span>
                                            </div>
                                            <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.manage && "-rotate-90 text-gray-400")} />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2">
                                        <SubNavItem icon={Settings} label="Settings" />
                                        <SubNavItem icon={Users} label="Employees" />
                                        <SubNavItem icon={UserCircle} label="Guests" />
                                        <SubNavItem icon={Users2} label="Teams" />
                                        <SubNavItem icon={ShieldCheck} label="Access Control" />
                                        <SubNavItem icon={PieChart} label="Statistics" />
                                        <SubNavItem icon={Sliders} label="Configurations" />
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            <NavItem icon={Clock} label="Time Tracker" />

                            <div className="px-2">
                                <Collapsible
                                    open={openSections.tasks}
                                    onOpenChange={() => toggleSection('tasks')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.tasks && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <Briefcase size={18} className={cn(openSections.tasks ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">Tasks</span>
                                            </div>
                                            <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.tasks && "-rotate-90 text-gray-400")} />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2 space-y-1">
                                        <SubNavItem icon={FolderKanban} label="Projects" />

                                        {/* Sprints Nested Section */}
                                        <div className="px-2">
                                            <div className="bg-white rounded-xl border border-[#e0f2fe] p-1 shadow-sm">
                                                <div className="flex items-center justify-between px-3 py-2 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <PlayCircle size={18} className="text-blue-600" />
                                                        <span className="text-[13px] font-bold text-blue-600">Sprints</span>
                                                    </div>
                                                    <ChevronDown size={14} className="text-blue-500" />
                                                </div>
                                                <div className="pb-2">
                                                    <div className="flex items-center gap-3 px-8 py-2 text-blue-600">
                                                        <RotateCw size={16} className="text-blue-600" />
                                                        <span className="text-[12px] font-bold">Sprint 1 (7/12..</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 px-8 py-2 text-gray-500">
                                                        <RotateCw size={16} className="text-gray-500" />
                                                        <span className="text-[12px] font-bold">Sprint 2 (7/12..</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            <div className="px-2">
                                <Collapsible
                                    open={openSections.reports}
                                    onOpenChange={() => toggleSection('reports')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.reports && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <FileText size={18} className={cn(openSections.reports ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">Reports</span>
                                            </div>
                                            <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.reports && "-rotate-90 text-gray-400")} />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2">
                                        <SubNavItem icon={Activity} label="General Reports" />
                                        <SubNavItem icon={UserCircle} label="User Reports" />
                                        <SubNavItem icon={Calendar} label="Weekly Reports" />
                                        <SubNavItem icon={BookOpen} label="Project Report" />
                                        <SubNavItem icon={History} label="Activity Logs" />
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            <NavItem icon={Mail} label="Email" count={12} />

                            {/* Storage Section */}
                            <div className="px-2">
                                <Collapsible
                                    open={openSections.storage}
                                    onOpenChange={() => toggleSection('storage')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.storage && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <Cloud size={18} className={cn(openSections.storage ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">Storage</span>
                                            </div>
                                            <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.storage && "-rotate-90 text-gray-400")} />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2">
                                        <SubNavItem icon={Database} label="My Storage" />
                                        <SubNavItem icon={Send} label="Shared" />
                                        <SubNavItem icon={Trash2} label="Trash" />
                                        <SubNavItem icon={CircleDashed} label="Storage Status" />
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            <NavItem icon={Calendar} label="Calendar" />
                            <NavItem icon={FileText} label="Docs" />
                            <NavItem icon={StickyNote} label="Notes" />

                            {/* HRM Section */}
                            <div className="px-2">
                                <Collapsible
                                    open={openSections.hrm}
                                    onOpenChange={() => toggleSection('hrm')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.hrm && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <MessageSquare size={18} className={cn(openSections.hrm ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">HRM</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-blue-600 text-white text-[10px] h-4 min-w-[16px] flex items-center justify-center rounded-full px-1 font-bold">12</span>
                                                <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.hrm && "-rotate-90 text-gray-400")} />
                                            </div>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2">
                                        <SubNavItem icon={UserCheck} label="Hirings" />
                                        <SubNavItem icon={CircleDollarSign} label="Payroll" />
                                        <SubNavItem icon={Zap} label="Performance" />
                                        <SubNavItem icon={Ban} label="Leaves" />
                                        <SubNavItem icon={BellDot} label="Notices" />
                                        <SubNavItem icon={Briefcase} label="Find Jobs" />
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            {/* CRM Section */}
                            <div className="px-2">
                                <Collapsible
                                    open={openSections.crm}
                                    onOpenChange={() => toggleSection('crm')}
                                    className={cn("rounded-xl transition-all duration-200", openSections.crm && "bg-[#f0f9ff] border border-[#e0f2fe]")}
                                >
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between px-3 py-2 cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <UserRound size={18} className={cn(openSections.crm ? "text-blue-600" : "text-gray-500")} />
                                                <span className="text-[13px] font-bold text-blue-600">CRM</span>
                                            </div>
                                            <ChevronDown size={14} className={cn("transition-transform duration-200 text-blue-500", !openSections.crm && "-rotate-90 text-gray-400")} />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-2">
                                        <SubNavItem icon={Users2} label="Leads" />
                                        <SubNavItem icon={Briefcase} label="Deals" />
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>

                            <NavItem icon={MessagesSquare} label="Chat" count={12} />
                            <NavItem icon={File} label="Forms" />

                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
