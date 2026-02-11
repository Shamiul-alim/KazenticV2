"use client";

import { useRef, useState } from "react";
import {
    addDays,
    differenceInDays,
    format,
    parseISO,
    startOfWeek,
} from "date-fns";
import { clamp } from "@/components/timeline/utils/math";
import { getRadixScrollViewport } from "@/components/timeline/utils/dom";

export type Mode = "day" | "week" | "month";
export type DragMode = "move" | "resize-start" | "resize-end";

export type DragPreview = {
    id: string;
    startIdx: number;
    dueIdx: number;
    mode: DragMode;
};

export function useGanttBarDrag(args: {
    mode: Mode;
    startDate: Date;
    bucketsLen: number;
    cellWidth: number;
    scrollRootRef: React.RefObject<HTMLDivElement | null>;
    onCommit: (id: string, startStr: string, dueStr: string) => void;
}) {
    const { mode, startDate, bucketsLen, cellWidth, scrollRootRef, onCommit } =
        args;

    const [activeId, setActiveId] = useState<string | null>(null);
    const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);

    const dragRef = useRef<{
        id: string;
        mode: DragMode;
        pointerId: number;
        startClientX: number;
        startScrollLeft: number;
        origStartIdx: number;
        origDueIdx: number;
        raf: number | null;
        lastClientX: number;
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

    const dateStrFromBucketIndex = (idx: number) =>
        format(dateFromBucketIndex(idx), "yyyy-MM-dd");

    const getViewportScrollLeft = () =>
        getRadixScrollViewport(scrollRootRef.current)?.scrollLeft ?? 0;

    const computePreview = (clientX: number) => {
        const info = dragRef.current;
        if (!info) return null;

        const viewport = getRadixScrollViewport(scrollRootRef.current);
        const currentScrollLeft = viewport ? viewport.scrollLeft : info.startScrollLeft;

        const dx =
            clientX - info.startClientX + (currentScrollLeft - info.startScrollLeft);
        const deltaCols = Math.floor((dx + cellWidth / 2) / cellWidth);

        if (info.mode === "move") {
            const duration = info.origDueIdx - info.origStartIdx;

            let newStartIdx = clamp(info.origStartIdx + deltaCols, 0, bucketsLen - 1);
            newStartIdx = clamp(newStartIdx, 0, bucketsLen - 1 - duration);

            return {
                id: info.id,
                startIdx: newStartIdx,
                dueIdx: newStartIdx + duration,
                mode: info.mode,
            } satisfies DragPreview;
        }

        if (info.mode === "resize-start") {
            const newStartIdx = clamp(
                info.origStartIdx + deltaCols,
                0,
                info.origDueIdx,
            );
            return {
                id: info.id,
                startIdx: newStartIdx,
                dueIdx: info.origDueIdx,
                mode: info.mode,
            } satisfies DragPreview;
        }

        const newDueIdx = clamp(
            info.origDueIdx + deltaCols,
            info.origStartIdx,
            bucketsLen - 1,
        );
        return {
            id: info.id,
            startIdx: info.origStartIdx,
            dueIdx: newDueIdx,
            mode: info.mode,
        } satisfies DragPreview;
    };

    const onPointerMove = (e: PointerEvent) => {
        const info = dragRef.current;
        if (!info || e.pointerId !== info.pointerId) return;

        info.lastClientX = e.clientX;

        if (!info.raf) {
            info.raf = window.requestAnimationFrame(() => {
                if (!dragRef.current) return;
                dragRef.current.raf = null;

                const preview = computePreview(dragRef.current.lastClientX);
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

        const preview = computePreview(info.lastClientX);
        if (preview) {
            onCommit(
                preview.id,
                dateStrFromBucketIndex(preview.startIdx),
                dateStrFromBucketIndex(preview.dueIdx),
            );
        }

        dragRef.current = null;
        setActiveId(null);
        setDragPreview(null);
    };

    const startDrag = (
        e: React.PointerEvent,
        task: { id: string; startDate: string; dueDate: string },
        dragMode: DragMode,
    ) => {
        e.preventDefault();
        e.stopPropagation();

        const s = parseISO(task.startDate);
        const d = parseISO(task.dueDate);

        const startIdx = bucketIndexFromDate(s);
        const dueIdx = bucketIndexFromDate(d);

        dragRef.current = {
            id: task.id,
            mode: dragMode,
            pointerId: e.pointerId,
            startClientX: e.clientX,
            startScrollLeft: getViewportScrollLeft(),
            origStartIdx: startIdx,
            origDueIdx: dueIdx,
            raf: null,
            lastClientX: e.clientX,
        };

        setActiveId(task.id);
        setDragPreview({ id: task.id, startIdx, dueIdx, mode: dragMode });

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp, { passive: true });
        window.addEventListener("pointercancel", onPointerUp, { passive: true });

        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    return { activeId, dragPreview, startDrag };
}
