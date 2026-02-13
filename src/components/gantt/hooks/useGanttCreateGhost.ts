"use client";

import { useMemo, useState } from "react";
import { clamp } from "@/components/timeline/utils/math";

export function useGanttCreateGhost(args: {
    rowTop: number;
    rowHeight: number;
    cellWidth: number;
    totalCols: number;
    defaultSpan?: number;
}) {
    const { rowTop, rowHeight, cellWidth, totalCols } = args;
    const span = Math.max(1, args.defaultSpan ?? 1);

    const [active, setActive] = useState(false);

    const [hoverX, setHoverX] = useState(0);

    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(0);

    const y = useMemo(() => {
        const dotSize = 34;
        return rowTop + (rowHeight - dotSize) / 2;
    }, [rowTop, rowHeight]);

    const dotX = hoverX;

    const onMove = (x: number, yPos: number) => {
        const top = rowTop;
        const bottom = rowTop + rowHeight;

        if (yPos >= top && yPos <= bottom) {
            setActive(true);

            const maxX = totalCols * cellWidth;
            const nextX = clamp(x, 0, maxX);
            setHoverX(nextX);

            const s = clamp(Math.floor(nextX / cellWidth), 0, totalCols - 1);
            setStartIdx(s);

            const e = clamp(s + span - 1, s, totalCols - 1);
            setEndIdx(e);
        } else {
            setActive(false);
        }
    };

    return {
        active,
        startIdx,
        endIdx,
        y,
        dotX,
        onMove,
        setActive,
        setHoverX,
    };
}
