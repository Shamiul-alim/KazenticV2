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


type GroupByOption = 'Status' | 'Assignee' | 'Priority' | 'Tags' | 'Due Date' | 'Task Type'
type SortOrder = 'Ascending' | 'Descending'

export default function GroupByPopover() {
    const [groupBy, setGroupBy] = useState<GroupByOption>('Assignee')
    const [sortOrder, setSortOrder] = useState<SortOrder>('Ascending')
    const [isOpen, setIsOpen] = useState(false)

    const groupByOptions: GroupByOption[] = ['Status', 'Assignee', 'Priority', 'Tags', 'Due Date', 'Task Type']
    const sortOrderOptions: SortOrder[] = ['Ascending', 'Descending']

    const handleClearFilter = () => {
        setGroupBy('Assignee')
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
