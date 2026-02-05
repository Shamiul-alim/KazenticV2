import WarningIcon from '@/components/access-control/icon/warning'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FilterToolbar from '@/components/workload/filter-toolbar'
import BriefcaseIcon from '@/components/workload/icons/briefcase'
import WorkloadLeftSidebar from '@/components/workload/left-sidebar'
import NavigationBar from '@/components/workload/navigation-bar'
import ViewToolbar from '@/components/workload/view-toolbar'
import WorkloadTimeline from '@/components/workload/workload-timeline'
import { WorkloadProvider } from '@/components/workload/workload-context'
import { ArrowDown, ChevronDown, Clipboard, Plus } from 'lucide-react'
import React from 'react'

export default function Workload() {
    return (
        <section className='bg-background h-full text-xs'>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* View toolbar */}
            <ViewToolbar />

            {/* Filter toolbar */}
            <FilterToolbar />

            {/* Workload content */}
            <WorkloadProvider>
                <div className='flex h-full overflow-y-auto overflow-x-hidden'>
                    {/* Left Sidebar */}
                    <WorkloadLeftSidebar />
                    {/* Workload Grid */}
                    <WorkloadTimeline />
                </div>
            </WorkloadProvider>
        </section>
    )
}
