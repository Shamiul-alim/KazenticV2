"use client"

import React from "react"
import { Card } from "@/components/sprint-report/ui/card"
import { Badge } from "@/components/sprint-report/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Lock, Link, Eye, Upload, ClipboardList, GitBranch, LayoutGrid, Trash2 } from "lucide-react"
import { Project } from "@/data/teams-data"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/employee/ui/dropdown-menu"

interface ProjectCardProps extends Project { }

export function ProjectCard({
    name,
    status,
    type,
    progress,
    members,
    isPrivate,
    iconInitial,
    iconColor
}: ProjectCardProps) {
    return (
        <Card className="p-4 flex flex-col gap-4 border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className={`size-8 rounded-md flex items-center justify-center text-white font-bold text-sm ${iconColor}`}>
                        {iconInitial}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-[#111827] text-[15px]">{name}</h4>
                        {isPrivate && <Lock className="size-3.5 text-gray-400" />}
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 outline-none">
                            <MoreHorizontal className="size-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[220px] p-1.5 bg-white rounded-xl shadow-2xl border-gray-100">
                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors">
                            <Link className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">Copy Project Link</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors">
                            <Eye className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">View Details</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors">
                            <Upload className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">Export Report</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors border-t border-gray-50 mt-1 pt-3">
                            <ClipboardList className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">View All Tasks</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors">
                            <GitBranch className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">View All Sub Tasks</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group transition-colors">
                            <LayoutGrid className="size-4 text-gray-400 group-hover:text-blue-600" />
                            <span className="text-[13px] font-bold text-gray-600 group-hover:text-blue-600">View Board</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-red-50 rounded-lg group transition-colors border-t border-gray-50 mt-1 pt-3">
                            <Trash2 className="size-4 text-red-500 group-hover:text-red-600" />
                            <span className="text-[13px] font-bold text-red-500 group-hover:text-red-600">Delete Project</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Status</p>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        {status}
                    </Badge>
                </div>
                <div className="space-y-1">
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Project Type</p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        {type}
                    </Badge>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Progress value={progress} className="h-1.5 flex-1 bg-blue-100" />
                    <span className="text-[12px] font-semibold text-gray-500 ml-3">{progress}%</span>
                </div>
            </div>

            <div className="flex -space-x-2">
                {members.slice(0, 3).map((member) => (
                    <Avatar key={member.id} className="size-7 border-2 border-white">
                        <AvatarImage src={member.image} />
                        <AvatarFallback className="text-[10px] bg-gray-100">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
                {members.length > 3 && (
                    <div className="size-7 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                        +{members.length - 3}
                    </div>
                )}
            </div>
        </Card>
    )
}

interface ProjectsViewProps {
    projects: Project[]
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </div>
    )
}
