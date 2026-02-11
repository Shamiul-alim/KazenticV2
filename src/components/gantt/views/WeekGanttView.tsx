"use client";

import React, { useEffect, useRef } from "react";
import { addDays, differenceInDays, startOfWeek } from "date-fns";

import { GanttTask, GanttDependency } from "@/data/gantt/gantt.types";

import { useTimelineRange } from "@/components/timeline/hooks/useTimelineRange";
import { useBuckets } from "@/components/timeline/hooks/useBuckets";
import { useMonthSegments } from "@/components/timeline/hooks/useMonthSegments";
import { useRafScroll } from "@/components/timeline/hooks/useRafScroll";
import { useViewportSize } from "@/components/timeline/hooks/useViewportSize";
import { useVirtualColumns } from "@/components/timeline/hooks/useVirtualColumns";
import { getRadixScrollViewport } from "@/components/timeline/utils/dom";

import { GanttCanvas } from "@/components/gantt/GanttCanvas";

export default function WeekGanttView(props: {
  tasks: GanttTask[];
  setTasks: React.Dispatch<React.SetStateAction<GanttTask[]>>;
  dependencies: GanttDependency[];
  setDependencies: React.Dispatch<React.SetStateAction<GanttDependency[]>>;
  statusThemes: Record<string, any>;
  zoom: number;
  onCreateTask: () => void;
}) {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  // buffered range based on all tasks (including children)
  const flatForRange = props.tasks.flatMap((t) => [t, ...(t.children ?? [])]);
  const range = useTimelineRange(flatForRange as any);

  const buckets = useBuckets("week", range.start, range.end);
  const segments = useMonthSegments(buckets);

  const scrollLeft = useRafScroll(
    scrollRootRef as React.RefObject<HTMLDivElement>,
  );
  const { width: viewportWidth, height: viewportHeight } = useViewportSize(
    scrollRootRef as React.RefObject<HTMLDivElement>,
  );

  // Week mode: smaller cells (match Timeline-like feel)
  const baseCell = 48;
  const cellWidth = Math.max(28, Math.round(baseCell * props.zoom));

  const leftPaneWidth = 420;

  const virtual = useVirtualColumns({
    scrollLeft,
    viewportWidth: Math.max(0, viewportWidth - leftPaneWidth),
    cellWidth,
    total: buckets.length,
    overscan: 10,
  });

  // ✅ scroll to today for week mode (bucket = week starting Monday)
  useEffect(() => {
    const scrollToToday = (behavior: ScrollBehavior = "smooth") => {
      const viewport = getRadixScrollViewport(scrollRootRef.current);
      if (!viewport || !buckets.length) return;

      const base = startOfWeek(range.start, { weekStartsOn: 1 });
      const today = new Date();
      const w = startOfWeek(today, { weekStartsOn: 1 });

      const idx = Math.floor(differenceInDays(w, base) / 7);

      const todayCenterX = idx * cellWidth + cellWidth / 2;
      const targetLeft = todayCenterX - viewport.clientWidth / 2;

      const maxLeft = viewport.scrollWidth - viewport.clientWidth;
      const nextLeft = Math.max(0, Math.min(targetLeft, maxLeft));

      viewport.scrollTo({ left: nextLeft, behavior });
    };

    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ mode?: string }>;
      if (ce.detail?.mode && ce.detail.mode !== "week") return;
      requestAnimationFrame(() => scrollToToday("smooth"));
    };

    window.addEventListener("gantt:scrollToToday", handler);
    return () => window.removeEventListener("gantt:scrollToToday", handler);
  }, [buckets.length, cellWidth, range.start]);

  return (
    <GanttCanvas
      mode="week"
      scrollRootRef={scrollRootRef}
      viewportHeight={viewportHeight}
      leftPaneWidth={leftPaneWidth}
      headerMonthHeight={36}
      headerSecondHeight={40}
      rowHeight={40}
      cellWidth={cellWidth}
      buckets={buckets}
      monthSegments={segments}
      virtual={virtual}
      tasks={props.tasks}
      setTasks={props.setTasks}
      dependencies={props.dependencies}
      setDependencies={props.setDependencies}
      statusThemes={props.statusThemes}
    />
  );
}
