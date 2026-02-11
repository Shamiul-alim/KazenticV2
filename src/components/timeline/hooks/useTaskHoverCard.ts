"use client";

import { useRef, useState } from "react";

export function useTaskHoverCard() {
    const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
    const [hoverCardPos, setHoverCardPos] = useState<{ left: number; top: number } | null>(null);
    const hideTimer = useRef<number | null>(null);

    const clearTimer = () => {
        if (hideTimer.current) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    };

    const show = (taskId: string, gridEl: HTMLElement, targetEl: HTMLElement) => {
        clearTimer();
        const gridRect = gridEl.getBoundingClientRect();
        const taskRect = targetEl.getBoundingClientRect();

        setHoverCardPos({
            left: taskRect.left - gridRect.left,
            top: taskRect.top - gridRect.top + taskRect.height + 10,
        });
        setHoveredTaskId(taskId);
    };

    const hideSoon = () => {
        clearTimer();
        hideTimer.current = window.setTimeout(() => {
            setHoveredTaskId(null);
            setHoverCardPos(null);
        }, 120);
    };

    return { hoveredTaskId, hoverCardPos, show, hideSoon, clearTimer };
}
