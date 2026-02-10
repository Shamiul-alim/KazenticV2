import { useEffect, useRef, useState } from "react"
import { Project } from "../types/project"
import { ProjectCard } from "./project-card"
import { ProjectGroupHeader } from "./project-group-header"
import { useProjectContext } from "../context/project-context"
import { TableHead, Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/Button"
import { ChevronsUpDown, MoreHorizontal } from "lucide-react"
import ProjectBadge from "./project-badge"
import { ProgressRing } from "@/components/dashboard/progress-ring"

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
    const [canScrollRight, setCanScrollRight] = useState(false)
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
                    <div className="flex flex-col gap-2">
                        <Table>
                            <colgroup>
                                <col style={{ width: "40px" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "40px" }} />
                            </colgroup>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Checkbox className="size-4" />
                                    </TableHead>
                                    {projectCols.map((col) => (
                                        <TableHead key={col.key}>
                                            <Button variant="ghost" className="flex items-center">
                                                <span className="text-[#191F38] text-[11px] font-semibold">
                                                    {col.label}
                                                </span>
                                                <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                                            </Button>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    projects.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>
                                                <Checkbox className="translate-y-0" />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <span>
                                                    <span
                                                        className="inline-flex items-center justify-center rounded-sm text-  h-5 w-5 text-xs mr-2"
                                                        style={{
                                                            backgroundColor: p.status.color
                                                        }}
                                                    >
                                                        {p.name.charAt(0).toUpperCase()}
                                                    </span>
                                                    {p.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <ProjectBadge title={p.type.name} color={p.type.color} />
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(p.startDate).format("D MMM YYYY")}
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(p.endDate).format("D MMM YYYY")}
                                            </TableCell>
                                            <TableCell>
                                                <ProjectBadge title={p.status.name} color={p.status.color} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 items-center">
                                                    <ProgressRing value={p.progress} className="w-8 h-8" />
                                                    {p.progress}%
                                                </div>
                                            </TableCell>
                                            <TableCell>{dayjs(p.endDate).fromNow()}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                ))}
        </div>
    )
}
