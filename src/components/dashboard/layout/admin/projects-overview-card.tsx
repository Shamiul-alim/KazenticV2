import React from 'react'
import CardContainer from '../../card-container'
import { TaskCompletionChart } from '../../admin/task-completion-chart'
import { ProjectCard } from '../../admin/project-card'

export default function ProjectsOverviewCard() {
    return (
        <CardContainer className="mt-4" title="Projects Overview">
            <div className="p-4">

                <TaskCompletionChart />

                {/* Active Projects */}
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Active Projects</h2>

                    <div className="overflow-x-scroll flex gap-4">
                        <ProjectCard name="Krown DEX" progress={70} />
                        <ProjectCard name="Project Name" progress={70} />
                        <ProjectCard name="Project Name" progress={70} />
                        <ProjectCard name="Project Name" progress={70} />
                    </div>
                </div>
            </div>

        </CardContainer>
    )
}
