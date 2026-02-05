'use client'

import { Button } from '../ui/Button'
import { Plus, ZoomIn, ZoomOut } from 'lucide-react'
import ArrowDownLight from './icons/arrow-down-light'
import FilterOutlineIcon from './icons/filter-outline'
import UserAddIcon from './icons/user-add'
import SettingsIcon from './icons/setting'
import GroupByPopover from './filter-toolbar/group-by-dropdown'
import WorkloadUnitDropdown from './filter-toolbar/workload-unit-dropdown'
import WorkloadPreferenceDropdown from './filter-toolbar/workload-preference.dropdown'


export default function FilterToolbar() {

    return (
        <div className='flex items-center justify-between w-full border-b border-muted py-2 px-4'>
            <div className='flex gap-2'>
                {/* Group By Filter */}
                <GroupByPopover />
                <Button variant="outline">
                    Today
                </Button>

                {/* Workload Unit */}
                <WorkloadUnitDropdown />

                <Button variant="outline">
                    14 Days
                </Button>

                {/* Workload Preference */}
                <WorkloadPreferenceDropdown />

                <Button variant="outline">
                    <ZoomIn className='h-4 w-4' />
                </Button>
                <Button variant="outline">
                    <ZoomOut className='h-4 w-4' />
                </Button>
            </div>
            <div className='flex gap-2'>
                <Button variant="outline">
                    <FilterOutlineIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                </Button>
                {/* Assignees Button */}
                <Button variant="outline">
                    <UserAddIcon className="h-4 w-4" />
                    Assignees
                </Button>
                {/* Customize View */}
                <Button variant="outline">
                    <SettingsIcon className="h-4 w-4" />
                    Customize View
                </Button>
                {/* Create Task */}
                <Button className='flex items-center px-2'>
                    <Plus className="h-4 w-4" />
                    Create Task
                </Button>
            </div>
        </div>
    )
}
