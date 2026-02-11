"use client";

import { useMemo } from "react";
import { clamp } from "../utils/math";

export function useVirtualColumns(args: {
    scrollLeft: number;
    viewportWidth: number;
    cellWidth: number;
    total: number;
    overscan?: number;
}) {
    const { scrollLeft, viewportWidth, cellWidth, total, overscan = 8 } = args;

    return useMemo(() => {
        if (!total || cellWidth <= 0) {
            return { start: 0, end: 0, padLeft: 0, padRight: 0 };
        }

        const visibleCount = Math.ceil(viewportWidth / cellWidth);
        const start = clamp(
            Math.floor(scrollLeft / cellWidth) - overscan,
            0,
            total - 1,
        );
        const end = clamp(start + visibleCount + overscan * 2, 0, total);

        const padLeft = start * cellWidth;
        const padRight = Math.max(0, (total - end) * cellWidth);

        return { start, end, padLeft, padRight };
    }, [scrollLeft, viewportWidth, cellWidth, total, overscan]);
}
