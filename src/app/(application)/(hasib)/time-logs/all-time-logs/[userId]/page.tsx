'use client';

import ArrowDownLight from '@/components/icons/arrow-down-light'
import DollarIcon from '@/components/icons/dollar'
import { Button } from '@/components/ui/Button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import React from 'react'
import { PeopleSelect } from '../../components/people-select'
import ArrowLeftBoldIcon from '@/components/icons/arrow-left-bold'
import Calendar2Icon from '@/components/icons/calendar-2'
import ArrowRightBoldIcon from '@/components/icons/arrow-right-bold'
import TaskSquareIcon from '@/components/icons/task-square'
import Grid5Icon from '@/components/icons/grid-5'
import Grid5OutlinedIcon from '@/components/icons/grid-5-outlined';
import TaskSquareBoldIcon from '@/components/icons/task-square-bold';
import { cn } from '@/lib/utils';
import SettingsIcon from '@/components/icons/setting';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { TimeLog, TimeLogTable } from './components/time-log-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ArrowDownIcon from '@/components/sprint-overview/icons/arrow-down';
import HourGlassIcon from '@/components/icons/hour-glass';
import AllTimeLogsTable from '../../components/all-time-logs-table';
import { useRouter } from 'next/navigation';

export default function AllTimeLogsByUserPage() {
    const router = useRouter()

    const [logView, setLogView] = React.useState<"table" | "sheet">("table")
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <div className='flex flex-col w-full h-full overflow-x-auto relative'>
            {/* Filters */}
            <div className='flex items-center justify-between border-b py-2 px-4'>
                <div className='flex items-center gap-2'>
                    {/* Bill Payable Filter */}
                    <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center'>
                        <DollarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Payable</span>
                    </Button>

                    {/* Date Range Filter */}
                    <span className='flex border rounded-md overflow-hidden'>
                        <Button variant="ghost" size="sm" className="px-0 py-1" onClick={undefined}>
                            <ArrowLeftBoldIcon className='h-4 w-4 text-muted-foreground' />
                        </Button>
                        <Button variant="ghost" size="sm" className='w-full flex items-center gap-1 p-1'>
                            <Calendar2Icon className='h-4 w-4 text-muted-foreground' />
                            {/* {getDateRange()} */}
                            Jan 8 - 22
                        </Button>
                        <Button variant="ghost" size="sm" className="px-0 py-1" onClick={undefined}>
                            <ArrowRightBoldIcon className='h-4 w-4 text-muted-foreground' />
                        </Button>
                    </span>

                    {/* This Week */}
                    <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center'>
                        <span className="font-medium text-muted-foreground">This Week</span>
                    </Button>
                </div>

                <div className='inline-flex gap-2'>
                    {/* Send for review */}
                    <Button size="sm" className='rounded-sm inline-flex gap-2 items-center py-1 px-2'>
                        <span className="font-light">Send for Review</span>
                    </Button>

                    {/* Table View */}
                    <div className='inline-flex border rounded-sm'>
                        <Button onClick={() => setLogView("table")} variant="ghost" size="sm" className={
                            cn('border-r border-muted inline-flex gap-2 items-center py-1 px-2',
                                logView === "table" ? "text-primary bg-[#F2F9FE]" : "text-muted-foreground"
                            )
                        }>
                            Time Entries
                            {
                                logView === "table" ?
                                    <TaskSquareBoldIcon className="h-4 w-4 text-primary" /> :
                                    <TaskSquareIcon className="h-4 w-4 text-muted-foreground" />
                            }
                        </Button>
                        <Button onClick={() => setLogView("sheet")} variant="ghost" size="sm" className={
                            cn('inline-flex gap-2 items-center py-1 px-2',
                                logView === "sheet" ? "text-primary bg-[#F2F9FE]" : "text-muted-foreground"
                            )
                        }>
                            Time Sheet
                            {
                                logView === "sheet" ?
                                    <Grid5Icon className="h-4 w-4 text-primary" /> :
                                    <Grid5OutlinedIcon className="h-4 w-4 text-muted-foreground" />
                            }

                        </Button>
                    </div>
                </div>

            </div>

            {/* Width Container */}
            <div className="flex flex-col gap-4 px-4 py-4">
                {/* Row 1 */}
                <div className='flex justify-between'>
                    <div className='inline-flex gap-2'>
                        <Button onClick={() => router.push('/time-logs/all-time-logs')} variant="outline" size="sm" className='flex p-1 gap-1 items-center size-6 bg-[#F4F5F6]'>
                            <ArrowLeft className="h-4 w-4 text-[#191F38]" />
                        </Button>
                        <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center h-6'>
                            <Avatar className="size-4">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/24874201?v=4" />
                                <AvatarFallback className='text-[8px]'>AH</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-muted-foreground">Alif Hassan</span>
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center h-6'>
                        <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Customize</span>
                    </Button>
                </div>

                {/* Row 2 */}
                <div className='w-full flex justify-between items-center'>
                    <Button onClick={() => setCollapsed(!collapsed)} variant="ghost" size="sm" className={
                        cn('flex p-1 gap-1 items-center h-5')
                    }>
                        <ArrowDownIcon className={
                            cn("h-5 w-5 text-muted-foreground transform", !collapsed && "-rotate-90")
                        } />
                        <span className="font-medium text-[11px] text-muted-foreground inline-flex items-center gap-1 border rounded-sm p-2 h-5">
                            <Calendar2Icon className='h-3.5 w-3.5 text-muted-foreground mr-1' />
                            Mon, Jan 8
                        </span>
                    </Button>

                    <Button variant="outline" size="sm" className='flex p-1 gap-1 items-center h-5'>
                        <HourGlassIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground text-[11px]">9h / 8h</span>
                    </Button>
                </div>
                {
                    collapsed && (
                        <TimeLogTable data={data} />
                        // <AllTimeLogsTable />
                    )
                }


            </div>
        </div>
    )
}

const data: TimeLog[] = [
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
    {
        id: "1",
        task: "[kzt-242] Create Pages using new design system.",
        description: "-",
        payable: true,
        tag: "Kazentic",
        signedIn: "11:59 AM",
        signedOut: "02:59 PM",
        duration: "05H : 00M",
    },
]