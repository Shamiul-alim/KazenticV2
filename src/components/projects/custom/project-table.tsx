import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Project } from '../types/project'
import { Button } from '@/components/sprint-report/ui/button'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import ProjectBadge from './project-badge'
import dayjs from 'dayjs'
import { ProgressRing } from '@/components/dashboard/progress-ring'
import { ProjectHeaderDropdown } from './project-header-dropdown'

type ProjectTableProps = {
    projects: Project[]
    columns: { key: string; label: string }[]
}

export default function ProjectTable({ projects, columns }: ProjectTableProps) {
    return (
        <div className="flex flex-col gap-2 rounded-md overflow-hidden border">
            <Table>
                <colgroup>
                    <col style={{ width: "3%" }} />
                    <col style={{ width: "30%", minWidth: "200px" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "3%" }} />
                </colgroup>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-2.5">
                            <Checkbox size="sm" className="translate-y-0!" />
                        </TableHead>
                        {columns.map((col) => (
                            <TableHead key={col.key} className="px-2.5">
                                <ProjectHeaderDropdown>
                                    <Button variant="ghost" className="h-10 flex items-center justify-start gap-1 w-full px-0!">
                                        <span className="text-[#191F38] text-[11px] font-semibold h-full flex items-center">
                                            {col.label}
                                        </span>
                                        <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                </ProjectHeaderDropdown>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        projects.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="px-2.5">
                                    <Checkbox size="sm" className="translate-y-0!" />
                                </TableCell>
                                <TableCell className="font-medium px-2.5">
                                    <span>
                                        <span
                                            className="inline-flex items-center justify-center rounded-sm text-white h-5 w-5 text-xs mr-2"
                                            style={{
                                                backgroundColor: p.status.color
                                            }}
                                        >
                                            {p.name.charAt(0).toUpperCase()}
                                        </span>
                                        {p.name}
                                    </span>
                                </TableCell>
                                <TableCell className="px-2.5 font-medium">
                                    <ProjectBadge title={p.type.name} color={p.type.color} />
                                </TableCell>
                                <TableCell className="px-2.5">
                                    {dayjs(p.startDate).format("D MMM YYYY")}
                                </TableCell>
                                <TableCell className="px-2.5">
                                    {dayjs(p.endDate).format("D MMM YYYY")}
                                </TableCell>
                                <TableCell className="px-2.5">
                                    <ProjectBadge title={p.status.name} color={p.status.color} />
                                </TableCell>
                                <TableCell className="px-2.5">
                                    <div className="flex gap-1 items-center">
                                        <ProgressRing strokeWidth={3.5} value={p.progress} className="w-8 h-8" />
                                        {p.progress}%
                                    </div>
                                </TableCell>
                                <TableCell className="px-2.5">{dayjs(p.endDate).fromNow()}</TableCell>
                                <TableCell className="px-2.5">
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
    )
}
