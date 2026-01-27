"use client"

import React from "react"
import { TeamCard } from "./team-card"
import { TEAMS_DATA, Team } from "@/data/teams-data"

interface TeamsGridProps {
    onTeamClick: (team: Team) => void
}

export default function TeamsGrid(props: TeamsGridProps) {
    // Debug log to catch the error in browser console
    console.log('TeamsGrid props:', props);

    const { onTeamClick } = props;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4 md:gap-5">
            {TEAMS_DATA.map((team) => (
                <TeamCard
                    key={team.id}
                    {...team}
                    onClick={() => {
                        if (typeof onTeamClick === 'function') {
                            onTeamClick(team)
                        } else {
                            console.error('onTeamClick is not a function!', onTeamClick);
                        }
                    }}
                />
            ))}
        </div>
    )
}
