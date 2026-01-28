"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/sprint-report/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"

interface AddTeamSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function AddTeamSidebar({ isOpen, onClose }: AddTeamSidebarProps) {
    const [teamName, setTeamName] = React.useState("")

    // Reset state when closing
    React.useEffect(() => {
        if (!isOpen) {
            setTeamName("")
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
                "fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.05)] z-[101] transition-transform duration-300 ease-out flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {/* Header */}
                <div className="p-6 flex items-start justify-between">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-gray-900">Create New Team</h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[90%]">
                            Use Teams to easily create groups of people you can assign to tasks, mention in comments, or add as watchers.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shrink-0"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
                    <div className="space-y-6">
                        {/* Icon & Team Name */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-900">Icon & Team Name</label>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-bold text-lg shrink-0">
                                    {teamName.charAt(0).toUpperCase() || "P"}
                                </div>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Text"
                                    className="flex-1 h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Description</label>
                            <textarea
                                placeholder="Text"
                                className="w-full h-32 p-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Tags</label>
                            <div className="min-h-[42px] px-2 py-1.5 bg-white border border-gray-200 rounded-lg flex flex-wrap gap-2">
                                {["Tag 1", "Tag 2", "Tag 3"].map((tag) => (
                                    <div key={tag} className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-gray-100 rounded-md">
                                        <span className="text-xs font-medium text-gray-700">{tag}</span>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-900 block">Projects</label>
                                    <p className="text-xs text-gray-500">Select projects from below</p>
                                </div>
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                                    <Plus size={16} />
                                    <span className="text-sm font-bold">Add new</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                <button className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold">
                                    Workspace
                                </button>
                                {["Nitefeeder", "Multigent", "Bullsama", "POS"].map((project) => (
                                    <button key={project} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:border-gray-300 rounded-lg text-xs font-semibold transition-colors">
                                        {project}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Members */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-900 block">Members</label>
                                    <p className="text-xs text-gray-500">Select members from below</p>
                                </div>
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                                    <Plus size={16} />
                                    <span className="text-sm font-bold">Add new</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: "Tarik Bin Shams", image: "" },
                                    { name: "Tarik Bin Shams", image: "" },
                                    { name: "Tonmoy Asif", image: "" },
                                    { name: "John Doe", image: "" },
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm hover:border-gray-200 transition-colors cursor-pointer">
                                        <Avatar className="size-6">
                                            <AvatarImage src={member.image} />
                                            <AvatarFallback className="bg-orange-100 text-orange-600 text-[10px]">{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-bold text-gray-700">{member.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 flex items-center gap-4 bg-white mt-auto">
                    <Button variant="outline" onClick={onClose} className="flex-1 h-11 bg-white border-gray-200 text-gray-700 font-bold hover:bg-gray-50">Cancel</Button>
                    <Button className="flex-1 h-11 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-md shadow-blue-500/20">Save</Button>
                </div>
            </div>
        </>
    )
}
