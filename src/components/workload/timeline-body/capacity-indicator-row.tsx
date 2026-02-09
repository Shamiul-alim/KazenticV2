import dayjs from "dayjs";
import { ColumnType } from "./timeline-body";
import { useWorkload } from "../workload-context";
import { cn } from "@/lib/utils";

export function CapacityIndicatorRow({
    columns,
    capacityByDate,
    dayWidth,
}: {
    columns: ColumnType[]
    capacityByDate: Record<string, { used: number; capacity: number }>
    dayWidth: number
}) {
    const { engine, unit, cellWidth } = useWorkload()
    const zoomLevel = engine.getZoom()
    const isDayView = zoomLevel === 'days'
    const isWeekView = zoomLevel === 'weeks'
    const isMonthView = zoomLevel === 'months'

    const getUnitLabel = () => {
        switch (unit) {
            case 'sprint-points':
                return 'pt'
            case 'tasks':
                return 'Task'
            case 'time-estimates':
                return 'h'
            default:
                return ''
        }
    }

    const formatValue = (value: number) => {
        return unit === 'tasks' ? Math.round(value) : Math.round(value * 10) / 10
    }

    const shouldShowCapacity = (colIndex: number): boolean => {
        if (!isWeekView && !isMonthView) return true
        if (isWeekView) return colIndex % 7 === 0
        if (isMonthView) return columns[colIndex]?.isMonthStart || false
        return false
    }

    const getAggregatedCapacity = (colIndex: number) => {
        const col = columns[colIndex]
        let totalUsed = 0
        let totalCapacity = 0
        let span = 1

        if (isWeekView) {
            span = 7
            for (let i = colIndex; i < Math.min(colIndex + 7, columns.length); i++) {
                const scheduled = capacityByDate[columns[i]?.date] || { used: 0, capacity: columns[i]?.capacityHours || 8 }
                totalUsed += scheduled.used
                totalCapacity += scheduled.capacity
            }
        } else if (isMonthView) {
            const currentMonth = dayjs(col.date).month()
            for (let i = colIndex; i < columns.length; i++) {
                const colDate = columns[i]?.date
                if (dayjs(colDate).month() !== currentMonth) break
                const scheduled = capacityByDate[colDate] || { used: 0, capacity: columns[i]?.capacityHours || 8 }
                totalUsed += scheduled.used
                totalCapacity += scheduled.capacity
                span++
            }
        } else {
            const scheduled = capacityByDate[col.date] || { used: 0, capacity: col.capacityHours || 8 }
            totalUsed = scheduled.used
            totalCapacity = scheduled.capacity
        }

        return { totalUsed, totalCapacity, span }
    }

    return (
        <div className="relative h-8 bg-muted/10">
            <div
                className="absolute inset-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${columns.length}, ${cellWidth}px)`,
                }}
            >
                {columns.map((col, colIndex) => {
                    const showCapacity = shouldShowCapacity(colIndex)
                    if (!showCapacity) return <div key={col.date} />

                    const { totalUsed, totalCapacity, span } = getAggregatedCapacity(colIndex)
                    const percent = (totalUsed / totalCapacity) * 100
                    const left = colIndex * cellWidth
                    const width = span * cellWidth

                    return (
                        <div
                            key={`capacity-${col.date}`}
                            className="absolute pointer-events-none border-r bg-muted/20"
                            style={{
                                left: `${left}px`,
                                width: `${width}px`,
                                top: 0,
                                height: '100%',
                            }}
                        >
                            <div className={cn(
                                "p-2 text-xs",
                                isDayView && "hidden",
                            )}>
                                <span
                                    className={cn(
                                        totalUsed > totalCapacity && "text-red-500"
                                    )}
                                >
                                    {formatValue(totalUsed)} {getUnitLabel()}  {unit === 'time-estimates' && `/ ${formatValue(totalCapacity)}h`}
                                </span>
                            </div>

                            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                                <div
                                    className={cn(
                                        "h-full",
                                        percent <= 100 ? "bg-green-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}