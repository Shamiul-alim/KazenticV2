'use client'

import { useMemo } from 'react'
import TimelineHeader from './timeline-header'
import TimelineBody from './timeline-body'

const DAY_WIDTH = 100 // px
export const ROW_HEIGHT = 70

export default function WorkloadTimeline() {
    const days = useMemo(() => {
        return Array.from({ length: 100 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
                date: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                capacityHours: 9,
            }
        });
    }, [])

    return (
        <div className='flex-1 overflow-x-auto overflow-y-visible relative text-[11px]'>
            <TimelineHeader days={days} dayWidth={DAY_WIDTH} rowHeight={ROW_HEIGHT} />
            <TimelineBody days={days} dayWidth={DAY_WIDTH} rowHeight={ROW_HEIGHT} />
        </div>
    )
}
