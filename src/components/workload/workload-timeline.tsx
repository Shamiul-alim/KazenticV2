'use client'

import TimelineHeader from './timeline-header'
import TimelineBody from './timeline-body/timeline-body'
import { WorkloadItem } from './workload-engine'
import { useWorkload, WorkloadUnit, GroupByOption } from './workload-context'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { TASK_DB, Task } from './data'
import { cn } from '@/lib/utils'

// Transform TASK_DB to workloadItems format based on groupBy
function transformTasksToWorkloadItems(tasks: Task[], groupBy: GroupByOption): Record<string, WorkloadItem[]> {
    const workloadMap: Record<string, WorkloadItem[]> = {}

    tasks.forEach(task => {
        let groupKeys: string[] = []

        // Determine which groups this task belongs to
        if (groupBy === 'Assignee') {
            groupKeys = task.assignees.length > 0 ? task.assignees : ['unassigned']
        } else if (groupBy === 'Status') {
            groupKeys = [task.status]
        } else if (groupBy === 'Priority') {
            groupKeys = [task.priority]
        } else if (groupBy === 'Task Type') {
            groupKeys = [task.taskType]
        } else if (groupBy === 'Tags') {
            groupKeys = task.tags.length > 0 ? task.tags : ['untagged']
        } else if (groupBy === 'Due Date') {
            groupKeys = [task.dueDate]
        }

        groupKeys.forEach(groupKey => {
            if (!workloadMap[groupKey]) {
                workloadMap[groupKey] = []
            }

            // Map task to WorkloadItem
            const workloadItem: WorkloadItem = {
                ...task,
                endDate: task.dueDate,
                color: (task.color as "purple" | "green") || "purple",
                hoursPerDay: task.estimate || 0,
                sprintPoints: task.taskType === 'sprint_point' ? task.estimate || null : null,
                timeEstimate: task.taskType === 'time_estimate' ? task.estimate || null : null,
            }

            workloadMap[groupKey].push(workloadItem)
        })
    })

    return workloadMap
}

export default function WorkloadTimeline({ className }: { className?: string }) {
    const { engine, refreshKey, unit, groupBy } = useWorkload();
    const [localRefresh, setLocalRefresh] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);

    // Transform TASK_DB to workloadItems based on current groupBy
    const workloadItems = useMemo(() => transformTasksToWorkloadItems(TASK_DB, groupBy), [groupBy])

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container || isLoadingRef.current) return;

        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollRight = scrollWidth - scrollLeft - clientWidth;

        const THRESHOLD = 300; // Load more when within 300px of edge

        // Near left edge - load past dates
        if (scrollLeft < THRESHOLD) {
            isLoadingRef.current = true;
            const previousScrollWidth = container.scrollWidth;

            engine.extendPast(7); // Add 7 more days to the past
            setLocalRefresh(prev => prev + 1);

            // Maintain scroll position after adding content to the left
            setTimeout(() => {
                const newScrollWidth = container.scrollWidth;
                const addedWidth = newScrollWidth - previousScrollWidth;
                container.scrollLeft = scrollLeft + addedWidth;
                isLoadingRef.current = false;
            }, 0);
        }
        // Near right edge - load future dates
        else if (scrollRight < THRESHOLD) {
            isLoadingRef.current = true;

            engine.extendFuture(7); // Add 7 more days to the future
            setLocalRefresh(prev => prev + 1);

            setTimeout(() => {
                isLoadingRef.current = false;
            }, 0);
        }
    }, [engine]);

    // Attach scroll listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Update engine container width on mount/resize
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const updateWidth = () => {
            const width = container.clientWidth;
            if (width > 0) engine.setContainerWidth(width);
        };

        updateWidth();
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    }, [engine]);

    // Scroll to show current date when refreshKey changes (e.g., when "Today" is clicked)
    useEffect(() => {
        if (refreshKey === 0) return; // Skip initial render

        const container = scrollContainerRef.current;
        if (!container) return;

        // Small delay to ensure DOM is updated
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0];
            const todayColumnIndex = engine.dateToColumnIndex(today);

            if (todayColumnIndex >= 0) {
                const cellWidth = engine.getCellWidth();
                const scrollPosition = todayColumnIndex * cellWidth;
                const containerWidth = container.clientWidth;

                // Center today's date in the viewport
                const centeredScroll = scrollPosition - (containerWidth / 2) + (cellWidth / 2);

                container.scrollTo({
                    left: Math.max(0, centeredScroll),
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, [refreshKey, engine]);

    const columns = engine.getColumns().map((col, _) => ({
        ...col,
        capacityHours: 8, // Each column is a day, so 8 hours capacity
        workloadHours: Math.floor(Math.random() * 12), // Random workload for demo
    }))

    return (
        <div className={className}>
            <div ref={scrollContainerRef} className="flex w-full overflow-x-scroll relative text-[11px]">
                {/* <TimelineHeader columns={columns} />
                <TimelineBody columns={columns} workloadItems={workloadItems} /> */}
                {
                    Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="inline-block w-60 h-20 border m-1">
                            Column {i + 1}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
