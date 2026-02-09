import { useState } from "react";
import { ColumnType } from "./timeline-body";
import { TimelineEngine } from "../workload-engine";
import { useWorkload } from "../workload-context";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/sprint-report/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/sprint-overview/ui/dialog";
import { Button } from "@/components/sprint-overview/ui/button";
import { TaskDetailsDialog } from "./task-update-dialog";

export type ItemType = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    color: "purple" | "green";
    hoursPerDay: number;
    timeEstimate: number | null;
    sprintPoints: number | null;
}

type TimelineBodyRowProps = {
    engine: TimelineEngine;
    columns: ColumnType[]
    dayWidth: number

    capacityByDate: Record<string, { used: number; capacity: number }>

    bars: {
        id: string
        left: number
        width: number
        top: number
        level: number

        item: ItemType

        onMoveStart: () => void
        onMove: (dx: number) => void

        onResizeStartBegin: () => void
        onResizeStart: (dx: number) => void

        onResizeEndBegin: () => void
        onResizeEnd: (dx: number) => void
    }[]
    isSubtask?: boolean
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

export function TimelineBodyRow({
    columns,
    dayWidth,
    bars,
    isSubtask = false,
}: TimelineBodyRowProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
    const { engine, unit } = useWorkload()
    const zoomLevel = engine.getZoom()
    const isWeekView = zoomLevel === 'weeks'
    const isMonthView = zoomLevel === 'months'
    const today = dayjs().format('YYYY-MM-DD')


    // Determine which columns should show right border
    const shouldShowBorder = (colIndex: number): boolean => {
        if (!isWeekView && !isMonthView) return true // Day views: show all borders

        if (isWeekView) {
            // Week view: show border after every 7 days
            return (colIndex + 1) % 7 === 0 || colIndex === columns.length - 1
        }

        if (isMonthView) {
            // Month view: show border at end of each month
            const currentMonth = dayjs(columns[colIndex]?.date).month()
            const nextMonth = colIndex < columns.length - 1 ? dayjs(columns[colIndex + 1]?.date).month() : -1
            return currentMonth !== nextMonth || colIndex === columns.length - 1
        }

        return true
    }

    const handleTaskClick = (item: ItemType) => {
        setSelectedItem(item)
        setDialogOpen(true)
    }

    return (
        <div className="relative" style={{ height: 32 }}>
            <div className="absolute inset-y-0 left-0 w-1 cursor-ew-resize" />
            <div className="absolute inset-y-0 right-0 w-1 cursor-ew-resize" />

            {/* grid - always individual day columns */}
            <div
                className="absolute inset-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${columns.length}, ${dayWidth}px)`,
                }}
            >
                {columns.map((col, colIndex) => {
                    const isToday = col.date === today

                    return (
                        <div
                            key={col.date}
                            className={cn(
                                "hover:bg-muted/70 hover:shadow-md relative timeline-cell",
                                shouldShowBorder(colIndex) && "border-r",
                                isToday ? "bg-blue-100/50" : "bg-muted/20"
                            )}
                            onClick={() => !isSubtask && setDialogOpen(true)}
                        />
                    )
                })}
            </div>

            {/* bars */}
            {bars.map(bar => (
                <div
                    key={bar.id}
                    className={cn(
                        "absolute h-7 rounded-md px-1.5 flex items-center gap-2 cursor-pointer",
                        bar.item.color === "purple" && "bg-purple-100 text-purple-800",
                        bar.item.color === "green" && "bg-green-100 text-green-800"
                    )}
                    style={{
                        left: bar.left,
                        width: bar.width,
                    }}
                    onPointerDown={usePointerDrag(
                        bar.onMove,
                        bar.onMoveStart,
                    )}
                    onDoubleClick={() => handleTaskClick(bar.item)}
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
                    <span className="opacity-70">
                        {unit === 'sprint-points' && bar.item.sprintPoints && `${bar.item.sprintPoints} SP`}
                        {unit === 'tasks' && '1 task'}
                        {unit === 'time-estimates' && `${bar.item.timeEstimate ?? bar.item.hoursPerDay}h`}
                    </span>
                </div>
            ))}

            {/* Task Creation/Update Dialog */}
            <Dialog open={false} onOpenChange={setDialogOpen}>
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
            {selectedItem && (
                <TaskDetailsDialog
                    item={selectedItem}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    setEditedTitle={(title) => {
                        setSelectedItem(prev => prev ? { ...prev, title } : prev)
                    }}
                />
            )}
        </div >
    )
}