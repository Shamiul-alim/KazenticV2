'use client'

import { v4 as uuid } from "uuid";
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import SettingsIcon from '@/components/icons/setting'
import { useState } from 'react'
import GroupByPopover from './group-by-dropdown'
import Grid1Icon from '@/components/icons/grid-1'
import ListRoundedIcon from '@/components/icons/list-rounded'
import { cn } from '@/lib/utils'
import { FilterPopover } from '@/components/sprint-overview/custom/filters/filter-popover'
import { useProjectContext } from '../context/project-context'
import { CreateProjectDialog } from './create-project/create-project-dialog'
import { FilterRule } from '@/components/sprint-overview/custom/filters/filter.types'


export default function FilterToolbar() {
    const { groupBy, setGroupBy, viewMode, setViewMode } = useProjectContext()
    const [open, setOpen] = useState(false)
    const [filterRules, setFilterRules] = useState<FilterRule[]>([
        { id: uuid() },
    ])

    return (
        <div className='flex items-center justify-between w-full border-b border-muted py-2 px-4'>
            <div className='flex gap-2'>
                {/* Group By Filter */}
                <GroupByPopover />
            </div>
            <div className='flex gap-2'>
                {/* Customize View */}
                <Button variant="outline">
                    <SettingsIcon className="h-4 w-4" />
                    Customize View
                </Button>

                {/* Filter */}
                <FilterPopover rules={filterRules} setRules={setFilterRules} onChange={rules => console.log(rules)} />

                {/* Assignees Button */}
                <span className='hidden sm:flex border rounded-sm items-center bg-[#FDFDFD]'>
                    <Button variant="ghost" className={

                        cn("border-r", viewMode === 'grid' ? "text-[#4157FE] bg-[#F2F9FE]" : "text-[#697588]")
                    } onClick={() => setViewMode('grid')}>
                        <Grid1Icon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className={
                        cn(viewMode === 'list' ? "text-[#4157FE] bg-[#F2F9FE]" : "")
                    } onClick={() => setViewMode('list')}>
                        <ListRoundedIcon className="h-4 w-4" />
                    </Button>
                </span>

                {/* Create Task */}
                <Button
                    className='flex items-center px-2'
                    onClick={() => setOpen(true)}
                >
                    <Plus className="h-4 w-4" />
                    Create Project
                </Button>
            </div>

            <CreateProjectDialog open={open} onOpenChange={setOpen} />
        </div>
    )
}
