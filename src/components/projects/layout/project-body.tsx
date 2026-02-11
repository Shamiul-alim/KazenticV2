import React, { useEffect, useMemo, useState } from 'react'
import { ProjectSummaryCard } from '../custom/project-summary-card'
import Folder2Icon from '@/components/icons/folder-2'
import { CheckCircle2 } from 'lucide-react'
import { ProjectGroupSection } from '../custom/project-group-section'
import { groupProjects, sortProjects } from '../custom/group-by-dropdown'
import { PROJECTS_DB } from '../data/projects-data'
import { applyFilters } from '../custom/project-filter-popover'
import { ProjectFilters } from '../types/project-ui'
import { useProjectContext } from '../context/project-context'
import { Separator } from '@/components/ui/separator'

export default function ProjectBody() {
    const { groupBy, sortOrder } = useProjectContext()
    const [projects, setProjects] = useState(PROJECTS_DB)
    const [filters, setFilters] = useState<ProjectFilters>({
        statusIds: [],
        typeIds: [],
    })

    const filtered = useMemo(() => applyFilters(projects, filters), [projects, filters])
    const sorted = useMemo(() => sortProjects(filtered, sortOrder, groupBy), [filtered, sortOrder, groupBy])
    const grouped = useMemo(() => groupProjects(sorted, groupBy), [sorted, groupBy])

    return (
        <div className="space-y-6 flex flex-col mt-2 p-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <ProjectSummaryCard
                    label="Active Projects"
                    count={filtered.filter((p) => p.status.name !== "Completed").length}
                    icon={<Folder2Icon className="h-4 w-4 text-[#4157FE]" />}
                />

                <ProjectSummaryCard
                    label="Projects Completed"
                    count={filtered.filter((p) => p.status.name === "Completed").length}
                    icon={<CheckCircle2 className="h-4 w-4 text-[#4157FE]" />}
                />
            </div>

            {/* Groups */}
            {Object.entries(grouped).map(([key, list], index) => (
                <React.Fragment key={key}>
                    <ProjectGroupSection
                        key={key}
                        title={key}
                        projects={list}
                    />
                    {index < Object.entries(grouped).length - 1 && <Separator className="self-stretch" />}
                </React.Fragment>
            ))}
        </div>
    )
}
