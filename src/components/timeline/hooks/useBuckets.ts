"use client";

import { useMemo } from "react";
import { buildDayBuckets, buildWeekBuckets } from "../utils/date";

export type Mode = "day" | "week" | "month";

export function useBuckets(mode: Mode, start: Date, end: Date) {
    return useMemo(() => {
        if (mode === "month") return buildWeekBuckets(start, end);
        return buildDayBuckets(start, end);
    }, [mode, start, end]);
}
