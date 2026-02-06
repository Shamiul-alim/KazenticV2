'use client'

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { cn } from "@/lib/utils";

dayjs.extend(minMax);
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWorkload } from './workload-context'
import { Separator } from '../ui/separator';
import { stackOverlappingBars, TimelineColumn, TimelineEngine, WorkloadItem } from './workload-engine';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/Button';

type Subtask = {
    id: string;
    name: string;
}

type User = {
    id: string;
    name: string;
    subtasks?: Subtask[];
}

interface ColumnType extends TimelineColumn {
    capacityHours: number;
    workloadHours: number;
}

type TimelineBodyProps = {
    columns: ColumnType[];
    workloadItems: Record<string, WorkloadItem[]>;
}

export default function TimelineBody({ columns, workloadItems }: TimelineBodyProps) {
    const { expandedUsers, engine } = useWorkload()

    // Memoize users data
    const users = useMemo<User[]>(() => [
        {
            id: '1',
            name: 'Alif Hassan',
            subtasks: [
                { id: '1-1', name: 'Dashboard Design' },
                { id: '1-2', name: 'Mobile Prototype' },
            ]
        },
        {
            id: '2',
            name: 'Tonmoy Asif',
            subtasks: [
                { id: '2-1', name: 'Sprint Planning' },
            ]
        },
        { id: '3', name: 'John Doe' },
    ], [])

    // Memoize workload data
    // const mockWorkloads = useMemo<Record<string, WorkloadItem[]>>(() => ({

    // }), [])

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <TimelineRowContainer
                        workloadItems={workloadItems[user.id] || []}
                        columns={columns}
                    />

                    {expandedUsers.has(user.id) &&
                        user.subtasks?.map(sub => (
                            <TimelineRowContainer
                                key={sub.id}
                                workloadItems={workloadItems[sub.id] || []}
                                columns={columns}
                            />
                        ))}
                </div>
            ))}
        </div>
    )

}

function TimelineRowContainer({
    workloadItems,
    columns,
}: {
    workloadItems: WorkloadItem[]
    columns: ColumnType[]
}) {
    const { engine, cellWidth, cellHeight } = useWorkload()
    const [items, setItems] = useState(workloadItems)
    const dragBaseRef = useRef<WorkloadItem | null>(null)
    const resizeBaseRef = useRef<WorkloadItem | null>(null)

    useEffect(() => {
        setItems(workloadItems)
    }, [workloadItems])

    /* ---------- capacity ---------- */
    const capacityByDate = useMemo(() => {
        const map: Record<string, { used: number; capacity: number }> = {}

        items.forEach(item => {
            const s = engine.dateToColumnIndex(item.startDate)
            const e = engine.dateToColumnIndex(item.endDate)

            for (let i = s; i <= e; i++) {
                const col = columns[i]
                if (!col) continue
                map[col.date] = {
                    used: (map[col.date]?.used || 0) + item.hoursPerDay,
                    capacity: col.capacityHours
                }
            }
        })

        return map
    }, [items, columns, engine])

    /* ---------- bar layouts + stacking ---------- */
    const bars = useMemo(() => {
        const stackedBars = stackOverlappingBars(
            items.map(item => {
                const clamped = engine.clampDates(item)
                if (!clamped) return null

                const start = engine.dateToColumnIndex(clamped.startDate)
                const end = engine.dateToColumnIndex(clamped.endDate)

                return {
                    id: item.id,
                    start,
                    end,
                    item: clamped,
                }
            }).filter(Boolean) as {
                id: string
                start: number
                end: number
                item: WorkloadItem
            }[]
        )

        return stackedBars
            .map(({ id, start, end, level, item }) => {
                if (end < 0 || start >= columns.length) return null

                const clampedStart = Math.max(start, 0)
                const clampedEnd = Math.min(end, columns.length - 1)

                const left = engine.columnIndexToLeft(clampedStart)
                const right = engine.columnIndexToLeft(clampedEnd + 1)

                return {
                    id,
                    left,
                    width: right - left,
                    top: 6 + level * 28,
                    item,
                    onMoveStart: () => { dragBaseRef.current = item },
                    onMove: (dx: number) => handleMove(id, dx),
                    onResizeStartBegin: () => { resizeBaseRef.current = item },
                    onResizeStart: (dx: number) => handleResize(id, "start", dx),
                    onResizeEndBegin: () => { resizeBaseRef.current = item },
                    onResizeEnd: (dx: number) => handleResize(id, "end", dx),
                }
            })
            .filter((bar): bar is NonNullable<typeof bar> => bar !== null)
    }, [items, engine, columns])


    /* ---------- event handlers ---------- */
    function handleMove(itemId: string, deltaX: number) {
        const base = dragBaseRef.current
        if (!base) return

        const deltaCols = engine.pixelToColumnDelta(deltaX)

        setItems(prev =>
            prev.map(item => {
                if (item.id !== itemId) return item
                const clamped = engine.clampDates({
                    ...item,
                    startDate: engine.addColumns(base.startDate, deltaCols),
                    endDate: engine.addColumns(base.endDate, deltaCols),
                })
                return clamped || item
            })
        )
    }

    function handleResize(
        itemId: string,
        edge: "start" | "end",
        deltaX: number
    ) {
        const base = resizeBaseRef.current
        if (!base) return

        const deltaCols = engine.pixelToColumnDelta(deltaX)

        setItems(prev =>
            prev.map(item => {
                if (item.id !== itemId) return item
                const clamped = engine.clampDates(
                    edge === "start"
                        ? {
                            ...item,
                            startDate: engine.addColumns(base.startDate, deltaCols),
                        }
                        : {
                            ...item,
                            endDate: engine.addColumns(base.endDate, deltaCols),
                        }
                )
                return clamped || item
            })
        )
    }


    return (
        <TimelineBodyRow
            engine={engine}
            columns={columns}
            rowHeight={cellHeight}
            dayWidth={cellWidth}
            capacityByDate={capacityByDate}
            bars={bars}
        />
    )
}

type ItemType = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    color: "purple" | "green";
    hoursPerDay: number;
}

type TimelineBodyRowProps = {
    engine: TimelineEngine;
    columns: ColumnType[]
    rowHeight: number
    dayWidth: number

    capacityByDate: Record<string, { used: number; capacity: number }>

    bars: {
        id: string
        left: number
        width: number
        top: number

        item: ItemType

        onMoveStart: () => void
        onMove: (dx: number) => void

        onResizeStartBegin: () => void
        onResizeStart: (dx: number) => void

        onResizeEndBegin: () => void
        onResizeEnd: (dx: number) => void
    }[]
}

function usePointerDrag(
    onMove: (dx: number) => void,
    onStart?: () => void,
    onEnd?: () => void
) {
    return (e: React.PointerEvent) => {
        e.preventDefault()
        e.stopPropagation()

        onStart?.()

        const startX = e.clientX
        const target = e.target as HTMLElement
        target.setPointerCapture(e.pointerId)

        function onPointerMove(ev: PointerEvent) {
            onMove(ev.clientX - startX)
        }

        function onPointerUp() {
            target.releasePointerCapture(e.pointerId)
            window.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerup", onPointerUp)
            onEnd?.()
        }

        window.addEventListener("pointermove", onPointerMove)
        window.addEventListener("pointerup", onPointerUp)
    }
}

function TimelineBodyRow({
    columns,
    rowHeight,
    dayWidth,
    capacityByDate,
    bars,
}: TimelineBodyRowProps) {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div className="relative border-b" style={{ height: rowHeight }}>
            <div className="absolute inset-y-0 left-0 w-1 cursor-ew-resize" />
            <div className="absolute inset-y-0 right-0 w-1 cursor-ew-resize" />

            {/* grid */}
            <div
                className="absolute inset-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${columns.length}, ${dayWidth}px)`,
                }}
            >
                {columns.map(col => {
                    const scheduled = capacityByDate[col.date] || { used: 0, capacity: col.capacityHours }
                    const percent = (scheduled.used / scheduled.capacity) * 100

                    // Grid cell with capacity indicator
                    return (
                        <div
                            key={col.date}
                            className="border-r bg-muted/20 hover:bg-muted/70 hover:shadow-md relative timeline-cell"
                            onClick={() => setDialogOpen(true)}
                        >
                            <div className="p-2 text-xs">
                                <span
                                    className={cn(
                                        scheduled.used > scheduled.capacity && "text-red-500"
                                    )}
                                >
                                    {scheduled.used}h / {scheduled.capacity}h
                                </span>
                            </div>

                            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                                <div
                                    className={cn(
                                        "h-full",
                                        percent <= 100 ? "bg-green-500" : "bg-muted"
                                    )}
                                    style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* bars */}
            {bars.map(bar => (
                <div
                    key={bar.id}
                    className={cn(
                        "absolute h-7 rounded-md px-1.5 flex items-center gap-2",
                        bar.item.color === "purple" && "bg-purple-100 text-purple-800",
                        bar.item.color === "green" && "bg-green-100 text-green-800"
                    )}
                    style={{
                        left: bar.left,
                        width: bar.width,
                        top: bar.top + 25,
                    }}
                    onPointerDown={usePointerDrag(
                        bar.onMove,
                        bar.onMoveStart,
                    )}
                >
                    {/* left resize */}
                    <div
                        className="absolute left-0 inset-y-0 w-1 cursor-ew-resize"
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            usePointerDrag(
                                bar.onResizeStart,
                                bar.onResizeStartBegin
                            )(e)
                        }}
                    />

                    {/* right resize */}
                    <div
                        className="absolute right-0 inset-y-0 w-1 cursor-ew-resize"
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            usePointerDrag(
                                bar.onResizeEnd,
                                bar.onResizeEndBegin
                            )(e)
                        }}
                    />

                    {/* Content */}
                    <Separator orientation="vertical" />
                    <span className="truncate">{bar.item.title}</span>
                    <span className="opacity-70">{bar.item.hoursPerDay}h/day</span>
                </div>
            ))}

            {/* Task Creation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new task you want to create.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}