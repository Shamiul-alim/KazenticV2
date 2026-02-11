"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  differenceInDays,
  format,
  isSameDay,
  isValid,
  parseISO,
  startOfWeek,
  addDays,
} from "date-fns";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useTimelineRange } from "./hooks/useTimelineRange";
import { useBuckets, Mode } from "./hooks/useBuckets";
import { useMonthSegments } from "./hooks/useMonthSegments";
import { useLanes } from "./hooks/useLanes";
import { useViewportSize } from "./hooks/useViewportSize";
import { useRafScroll } from "./hooks/useRafScroll";
import { useVirtualColumns } from "./hooks/useVirtualColumns";
import { useMonthPlateLabel } from "./hooks/useMonthPlateLabel";
import { useTaskHoverCard } from "./hooks/useTaskHoverCard";
import { useDrag } from "./hooks/useDrag";
import { useHoverCell } from "./hooks/useHoverCell";

import { HeaderMonthRow } from "./components/HeaderMonthRow";
import { HeaderSecondRow } from "./components/HeaderSecondRow";
import { GridBackground } from "./components/GridBackground";
import { HoverCell } from "./components/HoverCell";
import { MonthPlate } from "./components/MonthPlate";
import { TaskBar } from "./components/TaskBar";
import { TaskHoverCard } from "./components/TaskHoverCard";

import { clamp } from "./utils/math";
import { getRadixScrollViewport } from "./utils/dom";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";
import { resolveStatusTheme } from "./utils/theme";

const ROW_HEIGHT = 37;
const MONTH_ROW_HEIGHT = 35;
const DAY_ROW_HEIGHT = 40;
const MIN_TASK_META_WIDTH = 60;
const MONTH_LABEL_PLATE_W = 95;

function getCellWidth(mode: Mode, zoomIndex: number) {
  const day = [50, 60, 70, 80];
  const week = [32, 40, 48, 56];
  const month = [90, 110, 130, 150];

  const idx = clamp(zoomIndex, 0, 3);
  if (mode === "day") return day[idx];
  if (mode === "week") return week[idx];
  return month[idx];
}

export default function TimelineCanvas(props: {
  mode: Mode;
  headerVariant: "day" | "week" | "month";
  tasks: TimelineTask[];
  setTasks: React.Dispatch<React.SetStateAction<TimelineTask[]>>;
  zoomIndex: number;
  onCreateTask: () => void;
  projectSettings: { statusThemes?: Record<string, any> };
}) {
  const themes = props.projectSettings?.statusThemes;
  const { mode, headerVariant, tasks, setTasks, zoomIndex, onCreateTask } =
    props;

  const cellWidth = getCellWidth(mode, zoomIndex);
  const headerHeight = MONTH_ROW_HEIGHT + DAY_ROW_HEIGHT;

  // Scroll root
  const scrollAreaRootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Range + buckets (memoized)
  const range = useTimelineRange(tasks);
  const startDate = range.start;
  const endDate = range.end;

  const buckets = useBuckets(mode, startDate, endDate);
  const monthSegments = useMonthSegments(buckets);

  // viewport size + raf scroll
  const viewportSize = useViewportSize(
    scrollAreaRootRef as React.RefObject<HTMLDivElement>,
  );
  const scrollLeft = useRafScroll(
    scrollAreaRootRef as React.RefObject<HTMLDivElement>,
  );

  // virtualization for buckets rendering
  const vcols = useVirtualColumns({
    scrollLeft,
    viewportWidth: viewportSize.width,
    cellWidth,
    total: buckets.length,
    overscan: 10,
  });

  // plate label (never overlaps)
  const labelAtIndex = (idx: number) => format(buckets[idx], "MMMM yyyy");
  const plate = useMonthPlateLabel({
    scrollLeft,
    cellWidth,
    bucketsLen: buckets.length,
    plateWidth: MONTH_LABEL_PLATE_W,
    labelAtIndex,
  });

  // lanes (depends on tasks only, not zoom)
  const { positioned, laneCount } = useLanes({ tasks, mode, startDate });

  // hover cell
  const { hoverPos, setHoverPos } = useHoverCell();
  const [isOverTask, setIsOverTask] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!gridRef.current) return;
    if (isOverTask) {
      if (hoverPos.visible) setHoverPos((p) => ({ ...p, visible: false }));
      return;
    }

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (y < headerHeight) {
      if (hoverPos.visible) setHoverPos((p) => ({ ...p, visible: false }));
      return;
    }

    const colIndex = Math.floor(x / cellWidth);
    const rowIndex = Math.floor((y - headerHeight) / ROW_HEIGHT);

    setHoverPos({
      x: colIndex * cellWidth,
      y: headerHeight + rowIndex * ROW_HEIGHT,
      visible: true,
    });
  };

  // hover card
  const hoverCard = useTaskHoverCard();
  const [hoveredBarId, setHoveredBarId] = useState<string | null>(null);

  // date helpers
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

  // drag system
  const drag = useDrag({
    mode,
    tasks,
    setTasks,
    startDate,
    bucketsLen: buckets.length,
    cellWidth,
    rowHeight: ROW_HEIGHT,
    scrollRootRef: scrollAreaRootRef as React.RefObject<HTMLDivElement>,
  });

  // initial scroll to today
  const didInitialScrollRef = useRef(false);

  useEffect(() => {
    const scrollToToday = (behavior: ScrollBehavior = "auto") => {
      const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
      if (!viewport) return;
      if (!buckets.length) return;
      if (viewport.clientWidth === 0) return;

      const today = new Date();
      const idx =
        mode === "month"
          ? bucketIndexFromDate(today)
          : differenceInDays(today, startDate);

      const todayCenterX = idx * cellWidth + cellWidth / 2;
      const targetLeft = todayCenterX - viewport.clientWidth / 2;

      const maxLeft = viewport.scrollWidth - viewport.clientWidth;
      const nextLeft = Math.max(0, Math.min(targetLeft, maxLeft));

      viewport.scrollTo({ left: nextLeft, behavior });
    };

    // 1) Auto-scroll once on first load (after layout is ready)
    if (!didInitialScrollRef.current && buckets.length && cellWidth > 0) {
      let cancelled = false;

      const run = () => {
        if (cancelled) return;

        const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
        if (!viewport || viewport.clientWidth === 0) {
          requestAnimationFrame(run);
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) return;
            scrollToToday("auto");
            didInitialScrollRef.current = true;
          });
        });
      };

      run();

      return () => {
        cancelled = true;
      };
    }

    // 2) Event scroll (Today button)
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ mode?: Mode }>;
      if (ce.detail?.mode && ce.detail.mode !== mode) return;
      requestAnimationFrame(() => scrollToToday("smooth"));
    };

    window.addEventListener("timeline:scrollToToday", handler);
    return () => window.removeEventListener("timeline:scrollToToday", handler);
  }, [mode, cellWidth, startDate, buckets.length]);

  // layout sizing
  const previewExtraRows = drag.dragPreview ? drag.dragPreview.row + 2 : 0;
  const gridMinHeight =
    headerHeight + Math.max(laneCount, previewExtraRows) * ROW_HEIGHT;
  const gridHeight = Math.max(gridMinHeight, viewportSize.height);

  // hide hovered cell when leaving
  const onLeave = () => setHoverPos((p) => ({ ...p, visible: false }));

  // style helpers
  const getTaskStyleFromIdx = (
    startIdx: number,
    dueIdx: number,
    lane: number,
  ) => {
    const duration = dueIdx - startIdx + 1;
    return {
      left: `${startIdx * cellWidth}px`,
      width: `${Math.max(cellWidth, duration * cellWidth)}px`,
      top: `${headerHeight + lane * ROW_HEIGHT}px`,
    } as React.CSSProperties;
  };

  const getTaskStyle = (startStr: string, dueStr: string, lane: number) => {
    const start = parseISO(startStr);
    const due = parseISO(dueStr);
    if (!isValid(start) || !isValid(due)) return { display: "none" as const };

    const sIdx = bucketIndexFromDate(start);
    const dIdx = bucketIndexFromDate(due);

    return getTaskStyleFromIdx(sIdx, dIdx, lane);
  };

  const getStyleWidthPx = (style: React.CSSProperties) => {
    const w = style.width;
    if (typeof w === "number") return w;
    if (typeof w === "string") return Number.parseFloat(w) || 0;
    return 0;
  };

  const getTaskSerial = (taskId: string) =>
    tasks.findIndex((t) => t.id === taskId) + 1;

  // tasks list w/out preview
  const visibleTasks = useMemo(() => {
    if (!drag.dragPreview) return positioned;
    return positioned.filter((t) => t.id !== drag.dragPreview!.id);
  }, [positioned, drag.dragPreview]);

  return (
    <div className="w-full h-full relative">
      {/* This is the cover plate (no overlap ever) */}
      <MonthPlate
        width={MONTH_LABEL_PLATE_W}
        height={MONTH_ROW_HEIGHT}
        label={plate.label}
        prevLabel={plate.prevLabel}
        dir={plate.dir}
        step={plate.step}
      />

      <ScrollArea ref={scrollAreaRootRef} className="w-full h-full bg-white">
        <div
          className="relative"
          style={{ width: buckets.length * cellWidth, minHeight: gridHeight }}
          ref={gridRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={onLeave}
        >
          {/* Month header row */}
          <HeaderMonthRow
            height={MONTH_ROW_HEIGHT}
            cellWidth={cellWidth}
            segments={monthSegments}
          />

          {/* Second header row (virtualized) */}
          <HeaderSecondRow
            variant={headerVariant}
            top={MONTH_ROW_HEIGHT}
            height={DAY_ROW_HEIGHT}
            cellWidth={cellWidth}
            buckets={buckets}
            start={vcols.start}
            end={vcols.end}
            padLeft={vcols.padLeft}
            padRight={vcols.padRight}
          />

          {/* Background columns (virtualized) */}
          <GridBackground
            mode={mode}
            headerHeight={headerHeight}
            cellWidth={cellWidth}
            buckets={buckets}
            start={vcols.start}
            end={vcols.end}
            padLeft={vcols.padLeft}
            padRight={vcols.padRight}
          />

          {/* Hover cell */}
          <HoverCell
            visible={hoverPos.visible}
            x={hoverPos.x}
            y={hoverPos.y}
            cellWidth={cellWidth}
            onCreate={onCreateTask}
          />

          {/* Tasks */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {visibleTasks.map((task) => {
              const style = getTaskStyle(
                task.startDate,
                task.dueDate,
                task.lane,
              );
              const taskWidth = getStyleWidthPx(style);
              const isTooSmall = taskWidth < MIN_TASK_META_WIDTH;

              return (
                <TaskBar
                  key={task.id}
                  task={task}
                  style={style}
                  isTooSmall={isTooSmall}
                  serial={getTaskSerial(task.id)}
                  hoveredBarId={hoveredBarId}
                  setHoveredBarId={setHoveredBarId}
                  setIsOverTask={setIsOverTask}
                  onMovePointerDown={(e) => drag.startDrag(e, task, "move")}
                  onResizeStart={(e) => drag.startDrag(e, task, "resize-start")}
                  onResizeEnd={(e) => drag.startDrag(e, task, "resize-end")}
                  onShowHoverCard={(el) => {
                    if (!gridRef.current) return;
                    hoverCard.show(task.id, gridRef.current, el);
                  }}
                  onHideHoverCard={hoverCard.hideSoon}
                  statusThemes={themes}
                />
              );
            })}

            {/* Drag preview */}
            {drag.dragPreview &&
              (() => {
                const t = tasks.find((x) => x.id === drag.dragPreview!.id);
                if (!t) return null;

                const style = getTaskStyleFromIdx(
                  drag.dragPreview!.startIdx,
                  drag.dragPreview!.dueIdx,
                  drag.dragPreview!.row,
                );

                const theme = resolveStatusTheme(themes, t.status);
                return (
                  <div
                    className="absolute z-40 flex items-center justify-between h-10 px-2 rounded-md shadow-md cursor-grabbing transition-none opacity-100 pointer-events-none"
                    style={{
                      ...style,
                      backgroundColor: theme.bg,
                      color: theme.text,
                    }}
                  >
                    <span
                      className={`text-[11px] font-medium truncate ${theme.text}`}
                    >
                      {t.title}
                    </span>
                  </div>
                );
              })()}
          </div>

          {/* Hover card */}
          {hoverCard.hoveredTaskId &&
            hoverCard.hoverCardPos &&
            (() => {
              const ht = tasks.find((x) => x.id === hoverCard.hoveredTaskId);
              if (!ht) return null;

              return (
                <TaskHoverCard
                  task={ht}
                  statusThemes={themes}
                  pos={hoverCard.hoverCardPos}
                  onMouseEnter={hoverCard.clearTimer}
                  onMouseLeave={hoverCard.hideSoon}
                />
              );
            })()}
        </div>

        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
