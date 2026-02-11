"use client";

import { useMemo } from "react";
import { getTimelineRange } from "../utils/date";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";

export function useTimelineRange(tasks: TimelineTask[]) {
    return useMemo(() => getTimelineRange(tasks), [tasks]);
}
