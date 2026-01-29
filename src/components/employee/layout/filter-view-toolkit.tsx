import React from 'react'
import { Button } from '../ui/button'
import { Filter, LayoutGrid, List } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import GridIcon from '../icons/grid'

type FilterViewToolkitProps = {
    viewMode: "grid" | "list",
    setViewMode: (mode: "grid" | "list") => void,
}

const toolbarButton =
    "rounded-sm text-xs"

export default function FilterViewToolkit({ viewMode, setViewMode }: FilterViewToolkitProps) {
    return (
        <div className='flex flex-row gap-2 sm:gap-3 shadow-none'>
            {/* Filter */}
            <Button variant="outline" className={toolbarButton + " h-7 sm:h-8 px-2 sm:px-3 text-[10px] sm:text-xs"}>
                <Filter className="mr-1 sm:mr-2" size={14} />
                <span className="hidden xs:inline">Filter</span>
            </Button>

            {/* View toggle */}
            <ToggleGroup variant="outline" type="single" value={viewMode} onValueChange={(status) => setViewMode(status as "grid" | "list")} className="gap-0">
                <ToggleGroupItem value="grid" className="rounded-r-none border-r-0 data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard p-0 h-7 sm:h-8 w-7 sm:w-8 shadow-none">
                    {/* <LayoutGrid size={6} /> */}
                    <GridIcon className='size-3.5 sm:size-4' />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" className="rounded-l-none data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard p-0 h-7 sm:h-8 w-7 sm:w-8 shadow-none">
                    <List size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
