import { useState } from "react";
import { useWorkload } from "./workload-context";
import { TimelineColumn } from "./workload-engine";

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

    return (
        <div className="sticky top-0 z-20 bg-background"
            style={{ height: cellHeight }}
        >
            <div className="grid sticky top-0 z-20 h-8.25"
                style={{ gridTemplateColumns: `repeat(${columns.length}, ${cellWidth}px)` }}
            >
                {columns.map((col, i) =>
                    col.isMonthStart ? (
                        <div
                            key={i}
                            style={{
                                gridColumn: `span ${engine.getMonthSpan(columns, i)}`,
                            }}
                            className="px-3 py-2 font-semibold border-r bg-primary/10 border-b"
                        >
                            {col.monthLabel}
                        </div>
                    ) : null
                )}
            </div>
            <div
                className="grid sticky top-10 z-20 h-9"
                style={{
                    gridTemplateColumns: `repeat(${columns.length}, ${cellWidth}px)`,
                }}
            >
                {columns.map(col => (
                    <div
                        key={col.index}
                        className="px-2 py-2 border-r text-primary text-center border-b"
                    >
                        <span className="flex gap-2 justify-center items-center">
                            {col.dayLabel} {col.dayNumber}
                        </span>
                    </div>
                ))}
            </div>
        </div >
    )
}
