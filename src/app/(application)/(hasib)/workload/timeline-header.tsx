'use client';

import { Button } from '@/components/ui/Button'
import ArrowLeftBoldIcon from '@/components/workload/icons/arrow-left-bold'
import Calendar2Icon from '@/components/workload/icons/calendar-2'
import ArrowRightBoldIcon from '@/components/icons/arrow-right-bold'
import { cn } from '@/lib/utils'
import { ArrowLeftToLine } from 'lucide-react'
import { useWorkload } from '@/components/workload/workload-context'

export default function TimelineHeader() {
    const { isCollapsed, groupBy, shiftPrev, shiftNext, getDateRange, toggleCollapsed } = useWorkload()

    return (
        <div className='bg-accent h-16 flex'>
            {/* Sticky Sidebar */}
            <div className={cn(
                "max-w-80 sticky top-0 left-0 flex flex-col text-sm font-medium border-b border-r bg-background",
                isCollapsed ? "w-20" : "w-80"
            )}>
                <div className="w-full flex flex-col">
                    <div className='flex justify-between items-start px-4 pt-2'>
                        {!isCollapsed && (
                            <span className='flex border rounded-md overflow-hidden'>
                                <Button variant="ghost" size="sm" className="px-0 py-1" onClick={shiftPrev}>
                                    <ArrowLeftBoldIcon className='h-4 w-4 text-muted-foreground' />
                                </Button>
                                <Button variant="ghost" size="sm" className='w-full flex items-center gap-1 p-1'>
                                    <Calendar2Icon className='h-4 w-4 text-muted-foreground' />
                                    {getDateRange()}
                                </Button>
                                <Button variant="ghost" size="sm" className="px-0 py-1" onClick={shiftNext}>
                                    <ArrowRightBoldIcon className='h-4 w-4 text-muted-foreground' />
                                </Button>
                            </span>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            className={cn('p-1 px-2', isCollapsed && 'w-full')}
                            onClick={toggleCollapsed}
                        >
                            <ArrowLeftToLine className={cn(
                                'h-4 w-4 text-muted-foreground transition-transform',
                                isCollapsed && 'rotate-180'
                            )} />
                        </Button>
                    </div>
                    <span className="w-full px-4 py-2">{groupBy}</span>
                </div>
            </div>

            {/* Scrollable Header Row */}
            <div className="flex items-center">
                {
                    Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="w-60 h-full border-r shrink-0">
                            Header {i + 1}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
