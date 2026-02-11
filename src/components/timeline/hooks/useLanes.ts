"use client";

import { useMemo } from "react";
import { differenceInDays, parseISO, startOfWeek } from "date-fns";
import { buildLanesByIndex } from "../utils/lanes";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";

export type Mode = "day" | "week" | "month";

export function useLanes(args: {
    tasks: TimelineTask[];
    mode: Mode;
    startDate: Date;
}) {
    const { tasks, mode, startDate } = args;

    const bucketIndexFromDate = (d: Date) => {
        if (mode === "month") {
            const w = startOfWeek(d, { weekStartsOn: 1 });
            const base = startOfWeek(startDate, { weekStartsOn: 1 });
            return Math.floor(differenceInDays(w, base) / 7);
        }
        return differenceInDays(d, startDate);
    };

    return useMemo(() => {
        return buildLanesByIndex(tasks, (t) => {
            const s = parseISO(t.startDate);
            const e = parseISO(t.dueDate);
            return {
                startIdx: bucketIndexFromDate(s),
                endIdx: bucketIndexFromDate(e),
            };
        });
    }, [tasks, mode, startDate]);
}
