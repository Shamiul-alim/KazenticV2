import { Button } from '@/components/ui/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, Group } from 'lucide-react'
import React, { useState } from 'react'
import { Project } from '../types/project'
import { GroupByOption, SortOrder } from '../types/project-ui'
import { groupBy } from 'lodash'
import { useProjectContext } from '../context/project-context'

export function groupProjects(projects: Project[], groupByKey: GroupByOption) {
    return groupBy(projects, (p) => {
        switch (groupByKey) {
            case "Status":
                return p.status.name
            case "Task Type":
                return p.type.name
            case "Due Date":
                return p.endDate ? new Date(p.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'No Due Date'
            case "Assignee":
                return p.members.length > 0 ? p.members[0].name : 'Unassigned'
            case "Priority":
                return 'No Priority'
            case "Tags":
                return 'No Tags'
            default:
                return 'Other'
        }
    })
}

export function sortProjects(projects: Project[], sortOrder: SortOrder, groupByKey: GroupByOption): Project[] {
    const sorted = [...projects]
    sorted.sort((a, b) => {
        let valueA: string | number
        let valueB: string | number

        switch (groupByKey) {
            case "Status":
                valueA = a.status.name.toLowerCase()
                valueB = b.status.name.toLowerCase()
                break
            case "Task Type":
                valueA = a.type.name.toLowerCase()
                valueB = b.type.name.toLowerCase()
                break
            case "Due Date":
                valueA = a.endDate ? new Date(a.endDate).getTime() : 0
                valueB = b.endDate ? new Date(b.endDate).getTime() : 0
                break
            case "Assignee":
                valueA = (a.members.length > 0 ? a.members[0].name : 'Unassigned').toLowerCase()
                valueB = (b.members.length > 0 ? b.members[0].name : 'Unassigned').toLowerCase()
                break
            case "Priority":
                valueA = 'no priority'
                valueB = 'no priority'
                break
            case "Tags":
                valueA = 'no tags'
                valueB = 'no tags'
                break
            default:
                valueA = a.name.toLowerCase()
                valueB = b.name.toLowerCase()
        }

        if (sortOrder === 'Ascending') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
        }
    })
    return sorted
}

export default function GroupByPopover() {
    const { groupBy, setGroupBy, sortOrder, setSortOrder } = useProjectContext()
    const [isOpen, setIsOpen] = useState(false)

    const groupByOptions: GroupByOption[] = ['Status', 'Task Type', 'Due Date', 'Assignee']
    const sortOrderOptions: SortOrder[] = ['Ascending', 'Descending']

    const handleClearFilter = () => {
        setGroupBy('Status')
        setSortOrder('Ascending')
        setIsOpen(false)
    }
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Group className='h-4 w-4' />
                    Group By : {groupBy}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {
                                    groupByOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onClick={() => {
                                                setGroupBy(option)
                                                setIsOpen(false)
                                            }}
                                            className={cn(
                                                "w-full flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-muted transition-colors",
                                                groupBy === option && "bg-muted"
                                            )}                                        >
                                            <span>{option}</span>
                                            {groupBy === option && <Check className="h-4 w-4" />}
                                        </DropdownMenuItem>
                                    ))

                                }
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Ascending</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {
                                    sortOrderOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onClick={() => {
                                                setSortOrder(option)
                                                setIsOpen(false)
                                            }}
                                            className={cn(
                                                "w-full flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-muted transition-colors",
                                                sortOrder === option && "bg-muted"
                                            )}                                        >
                                            <span>{option}</span>
                                            {sortOrder === option && <Check className="h-4 w-4" />}
                                        </DropdownMenuItem>
                                    ))

                                }
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <Button variant="ghost" onClick={handleClearFilter} className="w-full mt-2 text-right">
                        Clear Filters
                    </Button>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
