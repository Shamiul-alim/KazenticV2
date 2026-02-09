import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { useWorkload } from "./workload-context";
import { TimelineColumn } from "./workload-engine";
import { cn } from "@/lib/utils";

export type Day = {
    date: string;
    label: string;
    capacityHours: number;
}

type TimelineHeaderProps = {
    columns: TimelineColumn[];
}

export default function TimelineHeader({
    columns,
}: TimelineHeaderProps) {
    const { engine, cellWidth, cellHeight } = useWorkload();
    const zoomLevel = engine.getZoom();
    const isMonthView = zoomLevel === 'months';
    const headerRef = useRef<HTMLDivElement>(null);
    const [currentMonth, setCurrentMonth] = useState(columns[0]?.monthLabel || '');
    const [scrollLeft, setScrollLeft] = useState(0);
    const today = dayjs().format('YYYY-MM-DD');

    // Track scroll position to update floating month label
    useEffect(() => {
        const scrollContainer = headerRef.current?.parentElement;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollPosition = scrollContainer.scrollLeft;
            setScrollLeft(scrollPosition);

            // Calculate which column is at the left edge
            const columnIndex = Math.floor(scrollPosition / cellWidth);
            const visibleColumn = columns[columnIndex];

            if (visibleColumn) {
                setCurrentMonth(visibleColumn.monthLabel);
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        // Set initial month
        handleScroll();

        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [columns, cellWidth]);

    // For month view, show only specific days to reduce overlapping (1, 8, 15, 22, 29)
    const shouldShowDay = (col: TimelineColumn, index: number): { show: boolean; span: number } => {
        if (!isMonthView) {
            return { show: true, span: 1 }
        }

        const dayNum = parseInt(col.dayNumber)

        // Show days: 1, 8, 15, 22, 29
        if ([1, 8, 15, 22, 29].includes(dayNum)) {
            // Calculate span until next shown day or end of month
            let span = 1
            const currentMonth = dayjs(col.date).month()

            for (let i = index + 1; i < columns.length; i++) {
                const nextCol = columns[i]
                const nextDayNum = parseInt(nextCol.dayNumber)
                const nextMonth = dayjs(nextCol.date).month()

                // Stop if we hit next shown day or different month
                if (nextMonth !== currentMonth || [1, 8, 15, 22, 29].includes(nextDayNum)) {
                    break
                }
                span++
            }

            return { show: true, span }
        }

        return { show: false, span: 1 }
    }

    return (
        <div ref={headerRef} className="sticky top-0 z-20"
            style={{ height: cellHeight }}
        >
            {/* Month row with floating sticky label */}
            <div className="relative h-8.25 border-b">
                {/* Floating month label that follows scroll - hidden in month view */}
                {!isMonthView && (
                    <div
                        className="absolute z-30 px-3 py-2 font-semibold bg-[#F2F9FE]"
                        style={{
                            minWidth: '150px',
                            left: `${scrollLeft}px`,
                            top: 0
                        }}
                    >
                        {currentMonth}
                    </div>
                )}

                {/* Month row - scrolls horizontally */}
                <div className="grid h-8.25"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, ${cellWidth}px)` }}
                >
                    {columns.map((col, i) =>
                        col.isMonthStart ? (
                            <div
                                key={i}
                                style={{
                                    gridColumn: `span ${engine.getMonthSpan(columns, i)}`,
                                }}
                                className="px-3 py-2 font-semibold border-r bg-[#F2F9FE] border-b"
                            >
                                {col.monthLabel}
                            </div>
                        ) : null
                    )}
                </div>
            </div>

            {/* Day row - always shown below month */}
            <div
                className="grid h-9"
                style={{
                    gridTemplateColumns: `repeat(${columns.length}, ${cellWidth}px)`,
                }}
            >
                {columns.map((col, index) => {
                    const { show, span } = shouldShowDay(col, index)
                    const isToday = col.date === today

                    if (!show) return null

                    return (
                        <div
                            key={col.index}
                            className={cn(
                                "px-2 py-2 border-r text-center border-b",
                                isToday ? "bg-blue-100 text-blue-800 font-bold" : "text-primary"
                            )}
                            style={{
                                gridColumn: isMonthView && span > 1 ? `span ${span}` : undefined
                            }}
                        >
                            <span className="flex gap-2 justify-center items-center">
                                {cellWidth > 50 && col.dayLabel} {col.dayNumber}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
