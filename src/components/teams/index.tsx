"use client"

import React, { useState } from "react"
import { TeamsHeader } from "./teams-header"
import TeamsGrid from "./teams-grid"
import { TeamDetails } from "./details/team-details"
import { AddTeamSidebar } from "./add-team-sidebar"
import { Team } from "@/data/teams-data"

export default function Teams() {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [isAddTeamSidebarOpen, setIsAddTeamSidebarOpen] = useState(false)

    const handleTeamClick = (team: Team) => {
        setSelectedTeam(team)
    }

    if (selectedTeam) {
        return (
            <div className="min-h-screen w-full bg-[#F9FAFB] p-3 md:p-5 lg:p-4">
                <div className="mx-auto w-full max-w-[1600px] flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[90vh]">
                    <TeamDetails team={selectedTeam} onBack={() => setSelectedTeam(null)} />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#F9FAFB] p-3 md:p-5 lg:p-6">
            <div className="mx-auto w-full max-w-[1600px] flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <TeamsHeader onAddNew={() => setIsAddTeamSidebarOpen(true)} />
                <div className="p-4 md:p-6 overflow-y-auto">
                    <TeamsGrid onTeamClick={handleTeamClick} />
                </div>
            </div>
            <AddTeamSidebar
                isOpen={isAddTeamSidebarOpen}
                onClose={() => setIsAddTeamSidebarOpen(false)}
            />
        </div>
    )
}
