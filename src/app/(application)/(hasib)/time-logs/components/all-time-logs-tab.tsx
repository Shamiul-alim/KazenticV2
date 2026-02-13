'use client';

import ArrowDownLight from '@/components/icons/arrow-down-light'
import DollarIcon from '@/components/icons/dollar'
import { Button } from '@/components/ui/Button'
import React from 'react'
import AllTimeLogsTable from './all-time-logs-table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PeopleSelect } from './people-select';

export default function AllTimeLogsTab() {
    const [showMembers, setShowMembers] = React.useState(false)
    const [period, setPeriod] = React.useState("")
    const [hours, setHours] = React.useState(0)

    return (
        <div className='flex flex-col w-full h-full overflow-x-auto relative'>
            {/* Filters */}
            <div className='flex items-center justify-between border-b py-2 px-4'>
                <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center'>
                    <DollarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Payable</span>
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button onClick={() => setShowMembers(!showMembers)} variant="outline" size="sm" className='flex p-1 gap-1.5 items-center ml-2'>
                            <span className="font-medium text-muted-foreground">All members</span>
                            <ArrowDownLight className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                        <PeopleSelect />
                    </PopoverContent>
                </Popover>

            </div>

            {/* Width Container */}
            <div className="flex">
                <AllTimeLogsTable />
            </div>
        </div>
    )
}
