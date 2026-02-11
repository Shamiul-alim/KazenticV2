"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GanttRow } from "./useGanttRows";

type DragInfo = {
    pointerId: number;
    startClientY: number;
    startScrollTop: number;

    movingId: string;
    parentId: string | null;
    depth: number;

    // eligible siblings (same parent+depth)
    eligibleIds: string[];
    posById: Map<string, number>;
    movingPos: number;

    // live target (kept in ref to avoid stale state on pointerup)
    overId: string | null;
};

export function useGanttRowReorder(args: {
    listScrollRef: React.RefObject<HTMLDivElement | null>;
    rowHeight: number;
    rows: GanttRow[];
    onCommit: (movingId: string, targetId: string, parentId: string | null) => void;
}) {
    const { listScrollRef, rowHeight, rows, onCommit } = args;

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    const [dragOffsetY, setDragOffsetY] = useState(0);

    const ref = useRef<DragInfo | null>(null);

    const cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);

        ref.current = null;
        setDraggingId(null);
        setOverId(null);
        setDragOffsetY(0);

        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    };

    const onMove = (e: PointerEvent) => {
        const info = ref.current;
        const listEl = listScrollRef.current;
        if (!info || !listEl || e.pointerId !== info.pointerId) return;

        // auto-scroll near top/bottom (ClickUp feel)
        const rect = listEl.getBoundingClientRect();
        const edge = 28;
        if (e.clientY < rect.top + edge) listEl.scrollTop -= 12;
        else if (e.clientY > rect.bottom - edge) listEl.scrollTop += 12;

        // drag offset so row follows cursor even when list scrolls
        const dy =
            (e.clientY - info.startClientY) + (listEl.scrollTop - info.startScrollTop);
        setDragOffsetY(dy);

        // figure out which row index cursor is over (in list space)
        const y = e.clientY - rect.top + listEl.scrollTop;
        const idx = Math.floor(y / rowHeight);
        const candidate = rows[idx];

        let nextOverId: string | null = null;

        if (
            candidate &&
            candidate.task.id !== info.movingId &&
            candidate.parentId === info.parentId &&
            candidate.depth === info.depth
        ) {
            nextOverId = candidate.task.id;
        }

        info.overId = nextOverId;
        setOverId(nextOverId);
    };

    const onUp = (e: PointerEvent) => {
        const info = ref.current;
        if (!info || e.pointerId !== info.pointerId) return;

        // use ref value (NOT state) to avoid stale overId
        if (info.overId) {
            onCommit(info.movingId, info.overId, info.parentId);
        }

        cleanup();
    };

    const start = (e: React.PointerEvent, row: GanttRow) => {
        const listEl = listScrollRef.current;
        if (!listEl) return;

        e.preventDefault();
        e.stopPropagation();

        // capture so you don’t “lose” the drag
        try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch { }

        // build eligible siblings list (same parent + same depth)
        const eligible = rows
            .filter((r) => r.parentId === row.parentId && r.depth === row.depth)
            .map((r) => r.task.id);

        const posById = new Map<string, number>();
        eligible.forEach((id, i) => posById.set(id, i));

        const movingPos = posById.get(row.task.id) ?? 0;

        ref.current = {
            pointerId: e.pointerId,
            startClientY: e.clientY,
            startScrollTop: listEl.scrollTop,

            movingId: row.task.id,
            parentId: row.parentId,
            depth: row.depth,

            eligibleIds: eligible,
            posById,
            movingPos,

            overId: null,
        };

        setDraggingId(row.task.id);
        setOverId(null);
        setDragOffsetY(0);

        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        window.addEventListener("pointercancel", onUp, { passive: true });
    };

    // ✅ styles to make rows “shift”
    const getRowStyle = useMemo(() => {
        return (id: string): React.CSSProperties => {
            const info = ref.current;
            if (!info || !draggingId) return {};

            const isDraggingRow = id === draggingId;

            // only siblings shift
            const pos = info.posById.get(id);
            const overPos = info.overId ? info.posById.get(info.overId) : undefined;

            // dragged row follows cursor
            if (isDraggingRow) {
                return {
                    transform: `translateY(${dragOffsetY}px)`,
                    zIndex: 50,
                    position: "relative",
                    pointerEvents: "none",
                    transition: "none",
                };
            }

            if (pos == null || overPos == null) {
                return { transition: "transform 140ms ease" };
            }

            const movingPos = info.movingPos;

            // shift siblings in-between
            if (overPos > movingPos && pos > movingPos && pos <= overPos) {
                return { transform: `translateY(${-rowHeight}px)`, transition: "transform 140ms ease" };
            }
            if (overPos < movingPos && pos >= overPos && pos < movingPos) {
                return { transform: `translateY(${rowHeight}px)`, transition: "transform 140ms ease" };
            }

            return { transition: "transform 140ms ease" };
        };
    }, [draggingId, dragOffsetY, rowHeight]);

    // cleanup
    useEffect(() => cleanup, []);

    return { draggingId, overId, start, getRowStyle };
}
