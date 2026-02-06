import FilterToolbar from '@/components/workload/filter-toolbar'
import WorkloadLeftSidebar from '@/components/workload/left-sidebar'
import NavigationBar from '@/components/workload/navigation-bar'
import ViewToolbar from '@/components/workload/view-toolbar'
import WorkloadTimeline from '@/components/workload/workload-timeline'
import { WorkloadProvider } from '@/components/workload/workload-context'

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
                <div className='flex h-full overflow-y-auto overflow-x-hidden'>
                    {/* Left Sidebar */}
                    <WorkloadLeftSidebar />
                    {/* Workload Grid */}
                    <WorkloadTimeline />
                </div>
            </section>
        </WorkloadProvider>

    )
}
