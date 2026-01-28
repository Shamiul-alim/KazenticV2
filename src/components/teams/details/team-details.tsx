"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/sprint-report/ui/tabs"
import { StatsCards } from "./stats-cards"
import { ProjectCard } from "./projects" // Use the one in projects folder
import { WorkDistributionChart } from "./work-distribution-chart"
import { ArrowLeft } from "lucide-react"
import ProjectsView from "./projects"
import MembersView from "./members"
import ActivityView from "./activity"
import { Team } from "@/data/teams-data"

interface TeamDetailsProps {
    team: Team
    onBack: () => void
}

export function TeamDetails({ team, onBack }: TeamDetailsProps) {
    return (
        <div className="flex flex-col bg-white min-h-full">
            {/* Header with Wave Background */}
            <div className="relative h-44 w-full bg-[#f4f7ff] overflow-hidden flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath d='M0 10 Q 25 2, 50 10 T 100 10' fill='none' stroke='%234F46E5' stroke-width='2'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px 40px'
                    }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center space-y-3">
                    <div className="text-center">
                        <p className="text-white text-[11px] font-bold opacity-80 uppercase tracking-wider">Replace Cover Image</p>
                        <h2 className="text-white text-xl font-extrabold tracking-tight">{team.name}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg text-xs font-bold shadow-lg transition-all active:scale-95">
                            Replace Image
                        </button>
                        <button className="px-4 py-1.5 bg-transparent border border-white/40 hover:border-white text-white rounded-lg text-xs font-bold transition-all active:scale-95">
                            Remove
                        </button>
                    </div>
                </div>

                <button
                    onClick={onBack}
                    className="absolute top-6 left-8 p-2 hover:bg-white/50 rounded-full transition-colors z-30"
                >
                    <ArrowLeft className="size-5 text-gray-600" />
                </button>
                <h1 className="text-[20px] font-bold text-gray-800 z-10 tracking-tight group-hover:opacity-0 transition-opacity">{team.name}</h1>
            </div>

            {/* Profile Section */}
            <div className="px-5 md:px-8 -mt-12 relative z-20 space-y-5">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-5">
                    <div className="size-20 md:size-24 rounded-[20px] md:rounded-[24px] bg-[#4F46E5] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-2xl border-[4px] md:border-[6px] border-white">
                        {team.initial}{team.name.charAt(0)}
                    </div>
                    <div className="pb-1 text-center md:text-left">
                        <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#111827]">{team.name}</h2>
                    </div>
                </div>

                <div className="space-y-1.5 max-w-3xl text-center md:text-left">
                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Description</p>
                    <p className="text-[13px] md:text-[14px] text-gray-500 leading-[1.6]">
                        {team.description} Lorem ipsum dolor sit amet consectetur. In in quis ut fringilla mi nibh dui. Euismod ac vitae et neque netus.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-5 md:px-8 mt-6 md:mt-8 flex-1 flex flex-col">
                <Tabs defaultValue="overview" className="flex-1 flex flex-col">
                    <div className="border-b border-gray-100">
                        <div className="overflow-x-auto scrollbar-hide">
                            <TabsList className="bg-transparent rounded-none h-auto p-0 gap-1 md:gap-2 justify-start w-full lg:w-[30%] min-w-max">
                                {["Overview", "Projects", "Members", "Activity"].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab.toLowerCase()}
                                        className="bg-transparent border-none rounded-none px-4 py-3 text-[13px] md:text-sm font-bold text-gray-400 data-[state=active]:text-[#4F46E5] data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:shadow-none shadow-none whitespace-nowrap transition-all"
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="overview" className="py-8 space-y-8">
                        <StatsCards stats={team.stats} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">Active Projects</h3>
                                    <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {team.projects.slice(0, 3).map((project) => (
                                        <ProjectCard key={project.id} {...project} />
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-1 mt-12">
                                <WorkDistributionChart />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects" className="py-8">
                        <ProjectsView projects={team.projects} />
                    </TabsContent>

                    <TabsContent value="members" className="py-8">
                        <MembersView members={team.members} />
                    </TabsContent>

                    <TabsContent value="activity" className="py-8">
                        <ActivityView activities={team.activities} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
