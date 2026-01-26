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
    "rounded-sm h-6 text-xs"

export default function FilterViewToolkit({ viewMode, setViewMode }: FilterViewToolkitProps) {
    return (
        <div className='flex flex-row gap-3'>
            {/* Filter */}
            <Button variant="outline" className={toolbarButton}>
                <Filter className="mr-2" size={6} />
                Filter
            </Button>

            {/* View toggle */}
            <ToggleGroup variant="outline" type="single" value={viewMode} onValueChange={(status) => setViewMode(status as "grid" | "list")} className="gap-0">
                <ToggleGroupItem value="grid" className="rounded-r-none border-r-0 data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard p-0 h-6">
                    {/* <LayoutGrid size={6} /> */}
                    <GridIcon className='size-4' />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" className="rounded-l-none data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard p-0 h-6">
                    <List size={4} />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
