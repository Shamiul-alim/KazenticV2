import { useEffect, useRef, useState } from "react"
import { Project } from "../types/project"
import { ProjectCard } from "./project-card"
import { ProjectGroupHeader } from "./project-group-header"
import { useProjectContext } from "../context/project-context"
import { TableHead, Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import ProjectTable from "./project-table"

dayjs.extend(relativeTime)

const projectCols = [
    { key: "name", label: "Project Name" },
    { key: "type", label: "Type" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "status", label: "Status" },
    { key: "progress", label: "Progress" },
    { key: "daysLeft", label: "Days Left" },
    { key: "actions", label: "Actions" },
]

type Props = {
    title: string | React.ReactNode
    projects: Project[]
}

export function ProjectGroupSection({ title, projects }: Props) {
    const { viewMode } = useProjectContext()
    const [collapsed, setCollapsed] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const checkScrollability = () => {
        if (!scrollContainerRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }

    useEffect(() => {
        checkScrollability()

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', checkScrollability)
            window.addEventListener('resize', checkScrollability)

            return () => {
                container.removeEventListener('scroll', checkScrollability)
                window.removeEventListener('resize', checkScrollability)
            }
        }
    }, [collapsed, projects])

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return

        const scrollAmount = 400 // Adjust scroll distance as needed
        const newScrollPosition =
            direction === "left"
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount

        scrollContainerRef.current.scrollTo({
            left: newScrollPosition,
            behavior: "smooth"
        })
    }

    if (projects.length === 0) return null

    return (
        <div className="space-y-3 flex flex-col">
            <ProjectGroupHeader
                title={title?.toString().toUpperCase() || ""}
                count={projects.length}
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
                color={projects[0].status.color}
                onScrollLeft={() => handleScroll("left")}
                onScrollRight={() => handleScroll("right")}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                hidden={projects.length <= 4}
            />

            {!collapsed && (
                viewMode === 'grid' ? (
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-scroll"
                        style={{
                            scrollbarWidth: "none",
                        }}
                    >
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                ) : (
                    <ProjectTable projects={projects} columns={projectCols} />
                ))}
        </div>
    )
}
