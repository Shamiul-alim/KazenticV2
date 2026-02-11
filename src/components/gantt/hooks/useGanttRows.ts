"use client";

import { useMemo } from "react";
import { GanttTask } from "@/data/gantt/gantt.types";

export type GanttRow = {
    task: GanttTask;
    depth: number;
    parentId: string | null;
    hasChildren: boolean;
    isExpanded: boolean;
};

export function useGanttRows(tasks: GanttTask[], expanded: Set<string>) {
    return useMemo(() => {
        const rows: GanttRow[] = [];

        const walk = (t: GanttTask, depth: number, parentId: string | null) => {
            const hasChildren = !!t.children?.length;
            const isExpanded = expanded.has(t.id);

            rows.push({
                task: t,
                depth,
                parentId,
                hasChildren,
                isExpanded,
            });

            if (hasChildren && isExpanded) {
                for (const c of t.children!) walk(c, depth + 1, t.id);
            }
        };

        for (const t of tasks) walk(t, 0, null);
        return rows;
    }, [tasks, expanded]);
}
