import ArrowUpRightIcon from '@/components/icons/arrow-up-right'
import ClockIcon from '@/components/icons/clock'
import PauseFilledIcon from '@/components/icons/pause-filled'
import TaskSquareIcon from '@/components/icons/task-square'
import { Button } from '@/components/ui/Button'
import NavigationBar from '@/components/workload/navigation-bar'
import React from 'react'
import TimeLogsTabsShell from '@/app/(application)/(hasib)/time-logs/components/time-logs-tabs-shell'

export default function TimeLogLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className='bg-background h-full text-xs'>
            {/* Navigation Bar */}
            <NavigationBar className='border-b'>
                <div className='flex items-center justify-between w-full'>
                    <Button variant="ghost" size="sm" className='flex p-1 gap-1.5 items-center'>
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Time Tracker</span>
                    </Button>
                    <div className='flex items-center gap-2'>
                        <Button variant="outline" size="sm" className='flex p-1 gap-1.5 items-center'>
                            <span className="font-medium text-muted-foreground">Time Tracker</span>
                            <TaskSquareIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="outline" size="sm" className='flex p-1 gap-1.5 items-center'>
                            <span className="font-medium text-muted-foreground">Time Tracker</span>
                            <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="outline" size="sm" className='flex p-1 gap-1.5 items-center'>
                            <span className="font-medium text-muted-foreground">Time Tracker</span>
                            <PauseFilledIcon className="h-4 w-4 p-0.5 text-white bg-[#F0483E] rounded-full" />
                        </Button>
                    </div>
                </div>
            </NavigationBar>

            {/* Tabs */}
            <TimeLogsTabsShell>{children}</TimeLogsTabsShell>
        </section>
    )
}
