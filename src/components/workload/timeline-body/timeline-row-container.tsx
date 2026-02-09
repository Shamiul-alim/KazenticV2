import { useEffect, useMemo, useRef, useState } from "react"
import { ColumnType } from "./timeline-body"
import { useWorkload } from "../workload-context"
import { WorkloadItem } from "../workload-engine"
import dayjs from "dayjs"
import { TimelineBodyRow } from "./timeline-body-row"

export function TimelineRowContainer({
    workloadItems,
    columns,
    isSubtask = false,
}: {
    workloadItems: WorkloadItem[]
    columns: ColumnType[]
    isSubtask?: boolean
}) {
    const { engine, cellWidth, unit } = useWorkload()
    const [items, setItems] = useState(workloadItems)
    const dragBaseRef = useRef<WorkloadItem | null>(null)
    const resizeBaseRef = useRef<WorkloadItem | null>(null)

    useEffect(() => {
        setItems(workloadItems)
    }, [workloadItems])

    const capacityByDate = useMemo(() => {
        const map: Record<string, { used: number; capacity: number }> = {}

        items.forEach(item => {
            const s = engine.dateToColumnIndex(item.startDate)
            const e = engine.dateToColumnIndex(item.endDate)

            for (let i = s; i <= e; i++) {
                const col = columns[i]
                if (!col) continue

                map[col.date] = {
                    used: (map[col.date]?.used || 0),
                    capacity: col.capacityHours,
                }
            }
        })

        return map
    }, [items, columns, engine, unit])

    // ---------- bar layouts (no stacking - single bar per row) ----------
    const bars = useMemo(() => {
        return items
            .map(item => {
                const clamped = engine.clampDates(item)
                if (!clamped) return null

                const start = engine.dateToColumnIndex(clamped.startDate)
                const end = engine.dateToColumnIndex(clamped.endDate)

                if (end < 0 || start >= columns.length) return null

                // Use fractional positioning for accurate bar placement in weekly/monthly views
                const startPos = engine.dateToColumnPosition(item.startDate)
                // Add 1 day to end date to ensure the bar covers the full end date cell
                const endDatePlusOne = dayjs(item.endDate).add(1, 'day').format('YYYY-MM-DD')
                const endPos = engine.dateToColumnPosition(endDatePlusOne)

                const left = engine.columnPositionToLeft(Math.max(startPos, 0))
                const right = engine.columnPositionToLeft(Math.min(endPos, columns.length))

                return {
                    id: item.id,
                    left,
                    width: right - left,
                    top: 6,
                    level: 0,
                    item: clamped,
                    onMoveStart: () => { dragBaseRef.current = item },
                    onMove: (dx: number) => handleMove(item.id, dx),
                    onResizeStartBegin: () => { resizeBaseRef.current = item },
                    onResizeStart: (dx: number) => handleResize(item.id, "start", dx),
                    onResizeEndBegin: () => { resizeBaseRef.current = item },
                    onResizeEnd: (dx: number) => handleResize(item.id, "end", dx),
                }
            })
            .filter((bar): bar is NonNullable<typeof bar> => bar !== null)
    }, [items, engine, columns])


    // ---------- event handlers ----------
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
            dayWidth={cellWidth}
            capacityByDate={capacityByDate}
            bars={bars}
            isSubtask={isSubtask}
        />
    )
}