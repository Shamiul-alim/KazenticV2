import FilterToolbar from '@/components/workload/filter-toolbar'
import WorkloadLeftSidebar from '@/components/workload/sidebar/left-sidebar'
import NavigationBar from '@/components/workload/navigation-bar'
import ViewToolbar from '@/components/workload/view-toolbar'
import WorkloadTimeline from '@/components/workload/workload-timeline'
import { useWorkload, WorkloadProvider } from '@/components/workload/workload-context'
import { Button } from '@/components/ui/Button'
import ArrowLeftBoldIcon from '@/components/workload/icons/arrow-left-bold'
import Calendar2Icon from '@/components/workload/icons/calendar-2'
import ArrowRightBoldIcon from '@/components/icons/arrow-right-bold'
import { cn } from '@/lib/utils'
import { ArrowLeftToLine } from 'lucide-react'
import TimelineHeader from './timeline-header'
import TimelineBody from './timeline-body'

export default function Workload() {
    return (
        <WorkloadProvider>
            <section className='bg-background h-full text-xs'>
                {/* Navigation Bar */}
                <NavigationBar />

                {/* View toolbar */}
                <ViewToolbar />

                {/* Filter toolbar */}
                <FilterToolbar />

                {/* Workload content */}
                <div className='flex flex-col w-full h-full overflow-x-auto relative'>
                    {/* Width Container */}
                    <div className="min-w-max flex flex-col">
                        {/* Header */}
                        <TimelineHeader />

                        {/* Body */}
                        <TimelineBody />
                        {/* <WorkloadLeftSidebar className='max-w-80' /> */}
                        {/* <WorkloadTimeline className='grow overflow-hidden' /> */}
                    </div>
                </div>
            </section>
        </WorkloadProvider>

    )
}
