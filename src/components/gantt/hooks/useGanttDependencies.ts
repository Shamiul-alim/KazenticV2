"use client";

import { useMemo, useRef, useState } from "react";
import { GanttDependency } from "@/data/gantt/gantt.types";

export type LinkEndpoint = { taskId: string; side: "start" | "end" };

export function useGanttDependencies(args: {
    deps: GanttDependency[];
    setDeps: React.Dispatch<React.SetStateAction<GanttDependency[]>>;
}) {
    const { deps, setDeps } = args;

    const [linkingFrom, setLinkingFrom] = useState<LinkEndpoint | null>(null);
    const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

    const idCounter = useRef(1000);

    const startLink = (from: LinkEndpoint) => {
        // user can start from either dot, but we will normalize on save
        setLinkingFrom(from);
        setMouse(null);
    };

    const updateMouse = (x: number, y: number) => setMouse({ x, y });

    const cancelLink = () => {
        setLinkingFrom(null);
        setMouse(null);
    };

    const finishLink = (to: LinkEndpoint) => {
        if (!linkingFrom) return;

        const fromTaskId = linkingFrom.taskId;
        const toTaskId = to.taskId;


        if (toTaskId === fromTaskId) return cancelLink();

     
        const normalized: GanttDependency = {
            id: `d${idCounter.current++}`,
            fromTaskId,
            toTaskId,
            fromSide: "end",
            toSide: "start",
            color: "#F59E0B",
        };

        setDeps((prev) => {
          
            const existsSame = prev.some(
                (d) =>
                    d.fromTaskId === normalized.fromTaskId &&
                    d.toTaskId === normalized.toTaskId,
            );
            if (existsSame) return prev;

    
            const existsReverse = prev.some(
                (d) =>
                    d.fromTaskId === normalized.toTaskId &&
                    d.toTaskId === normalized.fromTaskId,
            );
            if (existsReverse) return prev;

            return [...prev, normalized];
        });

        cancelLink();
    };

    const remove = (id: string) =>
        setDeps((prev) => prev.filter((d) => d.id !== id));

    const visibleMap = useMemo(() => {
        const out = new Map<string, GanttDependency[]>();
        for (const d of deps) {
            const arr = out.get(d.fromTaskId) ?? [];
            arr.push(d);
            out.set(d.fromTaskId, arr);
        }
        return out;
    }, [deps]);

    return {
        deps,
        visibleMap,
        linkingFrom,
        mouse,
        startLink,
        updateMouse,
        cancelLink,
        finishLink,
        remove,
    };
}
