"use client";

import { useRef, useState } from "react";
import { addDays, differenceInDays, format, parseISO, startOfWeek } from "date-fns";
import { clamp } from "../utils/math";
import { findFirstAvailableRow } from "../utils/lanes";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";
import { getRadixScrollViewport } from "../utils/dom";

export type Mode = "day" | "week" | "month";
export type DragMode = "move" | "resize-start" | "resize-end";

export type DragPreview = {
    id: string;
    startIdx: number;
    dueIdx: number;
    row: number;
    mode: DragMode;
};

export function useDrag(args: {
    mode: Mode;
    tasks: TimelineTask[];
    setTasks: React.Dispatch<React.SetStateAction<TimelineTask[]>>;
    startDate: Date;
    bucketsLen: number;
    cellWidth: number;
    rowHeight: number;
    scrollRootRef: React.RefObject<HTMLDivElement>;
}) {
    const { mode, tasks, setTasks, startDate, bucketsLen, cellWidth, rowHeight, scrollRootRef } = args;

    const [activeId, setActiveId] = useState<string | null>(null);
    const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);

    const dragRef = useRef<{
        id: string;
        mode: DragMode;
        pointerId: number;
        startClientX: number;
        startClientY: number;
        startScrollLeft: number;
        origStartIdx: number;
        origDueIdx: number;
        origRow: number;
        raf: number | null;
        lastClientX: number;
        lastClientY: number;
    } | null>(null);

    const bucketIndexFromDate = (d: Date) => {
        if (mode === "month") {
            const w = startOfWeek(d, { weekStartsOn: 1 });
            const base = startOfWeek(startDate, { weekStartsOn: 1 });
            return Math.floor(differenceInDays(w, base) / 7);
        }
        return differenceInDays(d, startDate);
    };

    const dateFromBucketIndex = (idx: number) => {
        if (mode === "month") {
            const base = startOfWeek(startDate, { weekStartsOn: 1 });
            return addDays(base, idx * 7);
        }
        return addDays(startDate, idx);
    };

    const dateStrFromBucketIndex = (idx: number) => format(dateFromBucketIndex(idx), "yyyy-MM-dd");

    const getViewportScrollLeft = () =>
        getRadixScrollViewport(scrollRootRef.current)?.scrollLeft ?? 0;

    const computePreview = (clientX: number, clientY: number) => {
        const info = dragRef.current;
        if (!info) return null;

        const viewport = getRadixScrollViewport(scrollRootRef.current);
        const currentScrollLeft = viewport ? viewport.scrollLeft : info.startScrollLeft;

        const dx = clientX - info.startClientX + (currentScrollLeft - info.startScrollLeft);
        const dy = clientY - info.startClientY;

        const deltaCols = Math.floor((dx + cellWidth / 2) / cellWidth);
        const deltaRows = Math.round(dy / rowHeight);
        const desiredRow = Math.max(0, info.origRow + deltaRows);

        if (info.mode === "move") {
            const duration = info.origDueIdx - info.origStartIdx;

            let newStartIdx = clamp(info.origStartIdx + deltaCols, 0, bucketsLen - 1);
            newStartIdx = clamp(newStartIdx, 0, bucketsLen - 1 - duration);

            return {
                id: info.id,
                startIdx: newStartIdx,
                dueIdx: newStartIdx + duration,
                row: desiredRow,
                mode: info.mode,
            } satisfies DragPreview;
        }

        if (info.mode === "resize-start") {
            const newStartIdx = clamp(info.origStartIdx + deltaCols, 0, info.origDueIdx);
            return {
                id: info.id,
                startIdx: newStartIdx,
                dueIdx: info.origDueIdx,
                row: desiredRow,
                mode: info.mode,
            } satisfies DragPreview;
        }

        const newDueIdx = clamp(info.origDueIdx + deltaCols, info.origStartIdx, bucketsLen - 1);
        return {
            id: info.id,
            startIdx: info.origStartIdx,
            dueIdx: newDueIdx,
            row: desiredRow,
            mode: info.mode,
        } satisfies DragPreview;
    };

    const onPointerMove = (e: PointerEvent) => {
        const info = dragRef.current;
        if (!info || e.pointerId !== info.pointerId) return;

        info.lastClientX = e.clientX;
        info.lastClientY = e.clientY;

        if (!info.raf) {
            info.raf = window.requestAnimationFrame(() => {
                if (!dragRef.current) return;
                dragRef.current.raf = null;

                const preview = computePreview(dragRef.current.lastClientX, dragRef.current.lastClientY);
                if (preview) setDragPreview(preview);
            });
        }
    };

    const onPointerUp = (e: PointerEvent) => {
        const info = dragRef.current;
        if (!info || e.pointerId !== info.pointerId) return;

        if (info.raf) cancelAnimationFrame(info.raf);

        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);

        setTasks((prevTasks) => {
            const preview = computePreview(info.lastClientX, info.lastClientY);
            if (!preview) return prevTasks;

            const startStr = dateStrFromBucketIndex(preview.startIdx);
            const dueStr = dateStrFromBucketIndex(preview.dueIdx);

            const resolvedRow = findFirstAvailableRow(
                prevTasks,
                preview.id,
                bucketIndexFromDate(parseISO(startStr)),
                bucketIndexFromDate(parseISO(dueStr)),
                startDate,
            );

            return prevTasks.map((t) => {
                if (t.id !== preview.id) return t;
                return {
                    ...t,
                    startDate: startStr,
                    dueDate: dueStr,
                    row: resolvedRow,
                };
            });
        });

        dragRef.current = null;
        setActiveId(null);
        setDragPreview(null);
    };

    const startDrag = (e: React.PointerEvent, task: { id: string; lane: number; startDate: string; dueDate: string }, dragMode: DragMode) => {
        e.preventDefault();
        e.stopPropagation();

        const start = parseISO(task.startDate);
        const due = parseISO(task.dueDate);

        const startIdx = bucketIndexFromDate(start);
        const dueIdx = bucketIndexFromDate(due);

        dragRef.current = {
            id: task.id,
            mode: dragMode,
            pointerId: e.pointerId,
            startClientX: e.clientX,
            startClientY: e.clientY,
            startScrollLeft: getViewportScrollLeft(),
            origStartIdx: startIdx,
            origDueIdx: dueIdx,
            origRow: task.lane ?? 0,
            raf: null,
            lastClientX: e.clientX,
            lastClientY: e.clientY,
        };

        setActiveId(task.id);
        setDragPreview({
            id: task.id,
            startIdx,
            dueIdx,
            row: task.lane ?? 0,
            mode: dragMode,
        });

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp, { passive: true });
        window.addEventListener("pointercancel", onPointerUp, { passive: true });

        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    return { activeId, dragPreview, setDragPreview, startDrag };
}
