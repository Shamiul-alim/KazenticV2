"use client";

import { useMemo, useState } from "react";
import { clamp } from "@/components/timeline/utils/math";

export function useGanttCreateGhost(args: {
    rowIndex: number; // create row index
    rowHeight: number;
    cellWidth: number;
    totalCols: number;
}) {
    const { rowIndex, rowHeight, cellWidth, totalCols } = args;

    const [active, setActive] = useState(false);
    const [startIdx, setStartIdx] = useState(0);

    const y = useMemo(() => rowIndex * rowHeight + (rowHeight - 28) / 2, [rowIndex, rowHeight]);

    const onMove = (x: number, yPos: number) => {
        const top = rowIndex * rowHeight;
        const bottom = top + rowHeight;

        if (yPos >= top && yPos <= bottom) {
            setActive(true);
            const idx = clamp(Math.floor((x + cellWidth / 2) / cellWidth), 0, totalCols - 1);
            setStartIdx(idx);
        } else {
            setActive(false);
        }
    };

    return { active, startIdx, y, onMove, setActive };
}
