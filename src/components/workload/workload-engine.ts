import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import { useEffect, useRef } from "react"
import { useWorkload } from "./workload-context"

dayjs.extend(weekOfYear)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

// export const DAY_WIDTH = 100 // px
// export const ROW_HEIGHT = 70
export type Task = {
    id: string;
    title: string;
    assignees: string[];        // userIds
    priority: "low" | "medium" | "high" | "urgent";
    status: "todo" | "in_progress" | "review" | "done";
    tags: string[];
    startDate: string;
    dueDate: string;
    taskType: "sprint_point" | "task_group" | "time_estimate";
    estimate?: number;          // hours or points
    color?: string;
    parentId?: string;          // for hierarchy
};

export interface WorkloadItem extends Task {
    endDate: string;
    color: "purple" | "green";
    hoursPerDay: number;
    timeEstimate: number | null;
    sprintPoints: number | null;
}

export type TimelineWindow = {
    startDate: string // YYYY-MM-DD
    endDate: string   // YYYY-MM-DD
}

export type ShiftDirection = "prev" | "next"

export type TimelineMode = "daily" | "weekly" | "monthly"

export type ZoomLevel = "7_days" | "14_days" | "30_days" | "days" | "weeks" | "months"

export const ZOOM_CONFIG: Record<ZoomLevel, {
    unit: "day" | "week" | "month"
    visibleUnits: number
}> = {
    "7_days": {
        unit: "day",
        visibleUnits: 7,
    },
    "14_days": {
        unit: "day",
        visibleUnits: 14,
    },
    "30_days": {
        unit: "day",
        visibleUnits: 30,
    },
    "days": {
        unit: "day",
        visibleUnits: 25,
    },
    "weeks": {
        unit: "week",
        visibleUnits: 8,
    },
    "months": {
        unit: "month",
        visibleUnits: 6,
    },
}


export type TimelineLayoutConfig = {
    containerWidth: number
    cellWidth: number
    rowHeight: number
}

export type TimelineColumn = {
    index: number
    date: string            // YYYY-MM-DD
    dayLabel: string        // Mon
    dayNumber: string       // 08
    monthLabel: string      // January 2025
    weekLabel?: string      // W06, W07, etc.
    isMonthStart: boolean
}

export type BarLayout = {
    id: string
    start: number
    end: number
    level: number
}

export class TimelineEngine {
    private window: TimelineWindow
    private layout: TimelineLayoutConfig
    private zoom: ZoomLevel

    constructor(
        initialWindow: TimelineWindow,
        zoom: ZoomLevel = "7_days"
    ) {
        this.window = initialWindow
        this.zoom = zoom

        const visibleUnits = ZOOM_CONFIG[zoom].visibleUnits
        this.layout = {
            containerWidth: visibleUnits * 120, // default to 120px per day/week/month can be adjusted by zoom level or user settings
            cellWidth: 120,
            rowHeight: 64, // default row height
        }
    }

    /* ---------------- Window API ---------------- */
    // Read-only access
    getWindow(): TimelineWindow {
        return { ...this.window }
    }

    // Replace window entirely (useful for filters, jumps)
    setWindow(window: TimelineWindow) {
        this.window = window
    }

    // Shift window forward or backward by N units (days/weeks/months based on zoom)
    shift(direction: "prev" | "next") {
        const start = dayjs(this.window.startDate)
        const end = dayjs(this.window.endDate)
        const unit = ZOOM_CONFIG[this.zoom].unit
        const visibleUnits = ZOOM_CONFIG[this.zoom].visibleUnits

        if (direction === "prev") {
            this.window = {
                startDate: start.subtract(visibleUnits, unit).format("YYYY-MM-DD"),
                endDate: end.subtract(visibleUnits, unit).format("YYYY-MM-DD"),
            }
        } else {
            this.window = {
                startDate: start.add(visibleUnits, unit).format("YYYY-MM-DD"),
                endDate: end.add(visibleUnits, unit).format("YYYY-MM-DD"),
            }
        }
    }

    // Extend only future (infinite scroll right)
    extendFuture(sizeInDays: number) {
        this.window = {
            ...this.window,
            endDate: dayjs(this.window.endDate)
                .add(sizeInDays, "day")
                .format("YYYY-MM-DD"),
        }
    }

    // Extend only past (infinite scroll left)
    extendPast(sizeInDays: number) {
        this.window = {
            ...this.window,
            startDate: dayjs(this.window.startDate)
                .subtract(sizeInDays, "day")
                .format("YYYY-MM-DD"),
        }
    }

    // Jump to a specific date while preserving window size
    jumpTo(date: string) {
        const start = dayjs(this.window.startDate)
        const end = dayjs(this.window.endDate)
        const target = dayjs(date)

        const windowSize = end.diff(start, "day")

        this.window = {
            startDate: target.format("YYYY-MM-DD"),
            endDate: target.add(windowSize, "day").format("YYYY-MM-DD"),
        }
    }

    /* ---------------- Layout API ---------------- */

    // Set total container width (useful for responsive layouts or user resizing)
    setContainerWidth(px: number) {
        this.layout.containerWidth = px
    }

    // Set zoom level which internally adjusts cell width and window size
    setZoom(zoom: ZoomLevel) {
        const cfg = ZOOM_CONFIG[zoom]
        const currentCenter = dayjs(this.window.startDate).add(
            Math.floor(this.getColumnCount() / 2),
            "day"
        )

        // Calculate days needed for the new zoom level
        let totalDays: number
        if (cfg.unit === "day") {
            totalDays = cfg.visibleUnits
        } else if (cfg.unit === "week") {
            totalDays = cfg.visibleUnits * 7
        } else {
            totalDays = cfg.visibleUnits * 30 // Approximate
        }

        // Update zoom and recalculate window around center
        this.zoom = zoom
        this.window = {
            startDate: currentCenter.subtract(Math.floor(totalDays / 2), "day").format("YYYY-MM-DD"),
            endDate: currentCenter.add(Math.floor(totalDays / 2), "day").format("YYYY-MM-DD"),
        }

        // Cell width is based on container width divided by total days
        this.layout.cellWidth = this.layout.containerWidth / totalDays
    }

    // Allow setting zoom level directly (e.g. from dropdown) while recalculating window to keep center date consistent
    getZoom() {
        return this.zoom
    }

    // Allow dynamic cell width adjustment (could be used for user resizing columns or changing zoom level)
    setCellWidth(px: number) {
        this.layout.cellWidth = px
    }

    // Set window to show a specific number of days centered around the current middle (useful for zooming to specific day counts like 7 or 14)
    setWindowByDays(days: number) {
        const center = dayjs(this.window.startDate)
            .add(this.getColumnCount() / 2, "day")

        this.window = {
            startDate: center.subtract(days / 2, "day").format("YYYY-MM-DD"),
            endDate: center.add(days / 2, "day").format("YYYY-MM-DD"),
        }
    }

    // Zoom in to a more detailed view (e.g. from months to weeks, or weeks to days)
    zoomIn() {
        if (this.zoom === "months") this.setZoom("weeks")
        if (this.zoom === "weeks") this.setZoom("days")
        if (this.zoom === "days") this.setZoom("14_days")
        if (this.zoom === "14_days") this.setZoom("7_days")
    }

    // Zoom out to a broader view (e.g. from days to weeks, or weeks to months)
    zoomOut() {
        if (this.zoom === "7_days") this.setZoom("14_days")
        if (this.zoom === "14_days") this.setZoom("days")
        if (this.zoom === "days") this.setZoom("weeks")
        if (this.zoom === "weeks") this.setZoom("months")
    }

    // Get cell width based on current zoom level (could be dynamic or user-configurable)
    getCellWidth() {
        return this.layout.cellWidth
    }

    // Get row height (could be dynamic based on content or user preference)
    getRowHeight() {
        return this.layout.rowHeight
    }

    // Calculate how many columns are visible in the current window based on zoom level
    // Always returns number of DAYS, regardless of zoom level
    getColumnCount(): number {
        const start = dayjs(this.window.startDate)
        const end = dayjs(this.window.endDate)
        return end.diff(start, "day") + 1
    }

    // Calculate total timeline width in pixels for the current window and zoom level (for horizontal scrolling)
    getTimelineWidth(): number {
        return this.getColumnCount() * this.getCellWidth()
    }

    // Calculate the top offset for a given row index (for vertical positioning)
    getRowTop(rowIndex: number): number {
        return rowIndex * this.getRowHeight()
    }

    // Generate column metadata for timeline rendering
    // Always generates columns as DAYS, regardless of zoom level
    getColumns(): TimelineColumn[] {
        const columns: TimelineColumn[] = []

        const start = dayjs(this.window.startDate)
        const count = this.getColumnCount()

        for (let i = 0; i < count; i++) {
            const currentDate = start.add(i, "day")
            const prev = start.add(i - 1, "day")

            columns.push({
                index: i,
                date: currentDate.format("YYYY-MM-DD"),
                dayLabel: currentDate.format("ddd"),
                dayNumber: currentDate.format("DD"),
                monthLabel: currentDate.format("MMMM YYYY"),
                weekLabel: `W${currentDate.week()}`,
                isMonthStart:
                    i === 0 || currentDate.month() !== prev.month(),
            })
        }

        return columns
    }

    // Add or subtract days from a date (always uses days, regardless of zoom)
    addColumns(date: string, delta: number): string {
        return dayjs(date).add(delta, "day").format("YYYY-MM-DD")
    }

    /* ---------------- Mapping helpers ---------------- */

    // Convert date to column index for rendering (always in days)
    dateToColumnIndex(date: string): number {
        const start = dayjs(this.window.startDate)
        return dayjs(date).diff(start, "day")
    }

    // Convert date to column position (always in days)
    dateToColumnPosition(date: string): number {
        const start = dayjs(this.window.startDate)
        return dayjs(date).diff(start, "day")
    }

    // Convert column index to pixel left offset for rendering
    columnIndexToLeft(index: number): number {
        return index * this.getCellWidth()
    }

    // Convert fractional column position to pixel offset
    columnPositionToLeft(position: number): number {
        return position * this.getCellWidth()
    }

    // Convert pixel offset back to column delta in days (useful for drag/resize)
    pixelToColumnDelta(px: number): number {
        return Math.round(px / this.getCellWidth())
    }

    // Get how many columns a month spans starting from a given index (for header rendering)
    getMonthSpan(
        columns: TimelineColumn[],
        startIndex: number
    ): number {
        const startMonth = dayjs(columns[startIndex].date).month()
        let span = 0

        for (let i = startIndex; i < columns.length; i++) {
            const currentMonth = dayjs(columns[i].date).month()

            if (currentMonth !== startMonth) break
            span++
        }

        return span
    }

    // For demo purposes, assume 1 day = 8 hours of capacity
    getWeeklyCapacity(dailyCapacity: number): number {
        return dailyCapacity * 5 // or configurable
    }

    // Clamp workload items to the current window for rendering (returns null if completely out of bounds)
    clampDates(item: WorkloadItem): WorkloadItem | null {
        if (item.endDate < this.window.startDate || item.startDate > this.window.endDate) {
            return null
        }

        return {
            ...item,
            startDate: dayjs.max(
                dayjs(item.startDate),
                dayjs(this.window.startDate)
            ).format("YYYY-MM-DD"),
            endDate: dayjs.min(
                dayjs(item.endDate),
                dayjs(this.window.endDate)
            ).format("YYYY-MM-DD"),
        }
    }

    // Get week label groupings for header
    getWeekGroups(columns: TimelineColumn[]): { startIndex: number; endIndex: number; label: string }[] {
        const groups: { startIndex: number; endIndex: number; label: string }[] = []
        let currentWeek = -1
        let startIndex = 0

        columns.forEach((col, i) => {
            const weekNum = dayjs(col.date).week()
            if (weekNum !== currentWeek) {
                if (currentWeek !== -1) {
                    groups.push({
                        startIndex,
                        endIndex: i - 1,
                        label: `W${currentWeek}`
                    })
                }
                currentWeek = weekNum
                startIndex = i
            }
        })

        // Add last group
        if (currentWeek !== -1) {
            groups.push({
                startIndex,
                endIndex: columns.length - 1,
                label: `W${currentWeek}`
            })
        }

        return groups
    }
}

// Custom hook to use the TimelineEngine in React components
export function useTimelineEngine(
    initialWindow: TimelineWindow,
    zoomLevel: ZoomLevel = "7_days"
): TimelineEngine {
    const engineRef = useRef<TimelineEngine | null>(null)

    if (engineRef.current === null) {
        engineRef.current = new TimelineEngine(initialWindow, zoomLevel)
    }

    useEffect(() => {
        engineRef.current!.setZoom(zoomLevel)
    }, [zoomLevel])

    return engineRef.current
}

// Utility to stack overlapping bars into levels for rendering
export function stackOverlappingBars<T extends { start: number; end: number }>(
    items: (T & { id: string; item: WorkloadItem })[]
) {
    const levels: number[] = []
    const result: (T & { level: number; item: WorkloadItem })[] = []

    items
        .sort((a, b) => a.start - b.start)
        .forEach(item => {
            let level = 0
            while (levels[level] >= item.start) level++
            levels[level] = item.end
            result.push({ ...item, level })
        })

    return result
}

