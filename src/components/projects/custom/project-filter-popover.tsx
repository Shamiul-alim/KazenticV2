import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Project, ProjectStatus, ProjectType } from "../types/project"
import { ProjectFilters } from "../types/project-ui"

export function applyFilters(projects: Project[], filters: ProjectFilters) {
    return projects.filter((p) => {
        const statusMatch =
            filters.statusIds.length === 0 ||
            filters.statusIds.includes(p.status.id)

        const typeMatch =
            filters.typeIds.length === 0 ||
            filters.typeIds.includes(p.type.id)

        return statusMatch && typeMatch
    })
}

type Props = {
    statuses: ProjectStatus[]
    types: ProjectType[]
    filters: ProjectFilters
    onChange: (filters: ProjectFilters) => void
}

export function ProjectFilterPopover({
    statuses,
    types,
    filters,
    onChange,
}: Props) {
    function toggle(list: string[], id: string) {
        return list.includes(id)
            ? list.filter((x) => x !== id)
            : [...list, id]
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Filter</Button>
            </PopoverTrigger>

            <PopoverContent className="w-64 space-y-4">
                {/* Status Filter */}
                <div>
                    <p className="text-sm font-medium mb-2">Status</p>
                    <div className="space-y-2">
                        {statuses.map((s) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <Checkbox
                                    checked={filters.statusIds.includes(s.id)}
                                    onCheckedChange={() =>
                                        onChange({
                                            ...filters,
                                            statusIds: toggle(filters.statusIds, s.id),
                                        })
                                    }
                                />
                                <span className="text-sm">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Type Filter */}
                <div>
                    <p className="text-sm font-medium mb-2">Project Type</p>
                    <div className="space-y-2">
                        {types.map((t) => (
                            <div key={t.id} className="flex items-center gap-2">
                                <Checkbox
                                    checked={filters.typeIds.includes(t.id)}
                                    onCheckedChange={() =>
                                        onChange({
                                            ...filters,
                                            typeIds: toggle(filters.typeIds, t.id),
                                        })
                                    }
                                />
                                <span className="text-sm">{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
