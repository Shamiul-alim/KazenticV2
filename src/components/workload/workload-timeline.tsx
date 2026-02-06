'use client'

import TimelineHeader from './timeline-header'
import TimelineBody from './timeline-body'
import { WorkloadItem } from './workload-engine'
import { useWorkload } from './workload-context'
import { useContainerWidth } from './hooks/useContainerWidth'
import { useEffect } from 'react'

export default function WorkloadTimeline() {
    const { engine } = useWorkload();
    const { ref, width } = useContainerWidth<HTMLDivElement>();

    // Update engine layout when container width changes
    useEffect(() => {
        if (width > 0) engine.setContainerWidth(width)
    }, [width, engine])

    const columns = engine.getColumns().map((col, _) => ({
        ...col,
        capacityHours: 9, // For demo purposes, every day has 9 hours of capacity
        workloadHours: Math.floor(Math.random() * 12), // Random workload for demo
    }))

    return (
        <div ref={ref} className='flex-1 overflow-x-auto overflow-y-visible relative text-[11px]'>
            <TimelineHeader columns={columns} />
            <TimelineBody columns={columns} workloadItems={workloadItems} />
        </div>
    )
}

const workloadItems: Record<string, WorkloadItem[]> = {
    '1': [
        {
            id: '1',
            title: 'UI Design',
            startDate: new Date(Date.now()).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'purple' as const,
            hoursPerDay: 6,
        },
        {
            id: '2',
            title: 'Dashboard Layout',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'green' as const,
            hoursPerDay: 4,
        },
    ],
    '2': [
        {
            id: '3',
            title: 'Sprint Planning',
            startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'purple' as const,
            hoursPerDay: 5,
        },
    ],
    '3': [],
    '1-1': [
        {
            id: '1-1-1',
            title: 'Wireframes',
            startDate: new Date(Date.now()).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'green' as const,
            hoursPerDay: 4,
        },
    ],
    '1-2': [
        {
            id: '1-2-1',
            title: 'Mobile UI',
            startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'purple' as const,
            hoursPerDay: 5,
        },
    ],
    '2-1': [
        {
            id: '2-1-1',
            title: 'Meeting Prep',
            startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            color: 'green' as const,
            hoursPerDay: 3,
        },
    ],
}