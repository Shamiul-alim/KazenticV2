"use client";

import { useMemo, useState } from "react";
import { clamp } from "@/components/timeline/utils/math";

export function useGanttCreateGhost(args: {
    rowTop: number;
    rowHeight: number;
    cellWidth: number;
    totalCols: number;
    defaultSpan?: number; // keep, but we’ll default to 1
}) {
    const { rowTop, rowHeight, cellWidth, totalCols } = args;
    const span = Math.max(1, args.defaultSpan ?? 1);

    const [active, setActive] = useState(false);
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(0);

    const y = useMemo(() => {
        const dotSize = 34;
        return rowTop + (rowHeight - dotSize) / 2;
    }, [rowTop, rowHeight]);

    const dotX = useMemo(() => {
        return startIdx * cellWidth + cellWidth / 2;
    }, [startIdx, cellWidth]);

    const onMove = (x: number, yPos: number) => {
        const top = rowTop;
        const bottom = rowTop + rowHeight;

        if (yPos >= top && yPos <= bottom) {
            setActive(true);

            const s = clamp(
                Math.floor((x + cellWidth / 2) / cellWidth),
                0,
                totalCols - 1,
            );
            setStartIdx(s);

            // ✅ always 1 day (or span if you ever want >1)
            const e = clamp(s + span - 1, s, totalCols - 1);
            setEndIdx(e);
        } else {
            setActive(false);
        }
    };

    return { active, startIdx, endIdx, y, dotX, onMove, setActive };
}
