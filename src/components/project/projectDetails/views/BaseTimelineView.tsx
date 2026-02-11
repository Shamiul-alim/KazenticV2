"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  isValid,
  isWeekend,
  max as dfMax,
  min as dfMin,
  parseISO,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { GitBranch, Plus, ExternalLink, Link2, Flag, Info } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  STATUS_THEMES,
  TimelineTask,
} from "@/data/project/project-details/timeline/timeline.types";

/* ----------------------------- constants ----------------------------- */

const ROW_HEIGHT = 37;
const MONTH_ROW_HEIGHT = 35;
const DAY_ROW_HEIGHT = 40;
const MIN_TASK_META_WIDTH = 60;
const MONTH_LABEL_PLATE_W = 95;

type Mode = "day" | "week" | "month";

type HoverPos = { x: number; y: number; visible: boolean };

type PositionedTask = TimelineTask & { lane: number };

type DragMode = "move" | "resize-start" | "resize-end";

type DragPreview = {
  id: string;
  startIdx: number;
  dueIdx: number;
  row: number;
  mode: DragMode;
};

function toValidDates(dateStrings: string[]) {
  return dateStrings.map((s) => parseISO(s)).filter(isValid);
}

function getRadixScrollViewport(root: HTMLDivElement | null) {
  return root?.querySelector(
    "[data-radix-scroll-area-viewport]",
  ) as HTMLDivElement | null;
}

function clamp(n: number, minV: number, maxV: number) {
  return Math.max(minV, Math.min(maxV, n));
}

function rangesOverlap(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
) {
  return aStart <= bEnd && bStart <= aEnd;
}

function isValidTask(t: TimelineTask) {
  return isValid(parseISO(t.startDate)) && isValid(parseISO(t.dueDate));
}

function findFirstAvailableRow(
  tasks: TimelineTask[],
  movingId: string,
  startIdx: number,
  endIdx: number,
  startDate: Date,
) {
  let row = 0;

  while (true) {
    const conflict = tasks.some((t) => {
      if (t.id === movingId) return false;

      const tRow = t.row ?? 0;
      if (tRow !== row) return false;

      const tStart = differenceInDays(parseISO(t.startDate), startDate);
      const tEnd = differenceInDays(parseISO(t.dueDate), startDate);

      return rangesOverlap(startIdx, endIdx, tStart, tEnd);
    });

    if (!conflict) return row;
    row += 1;
  }
}

function buildLanesByIndex(
  tasks: TimelineTask[],
  getIndex: (t: TimelineTask) => { startIdx: number; endIdx: number },
) {
  const validTasks = tasks.filter(isValidTask);

  const sorted = [...validTasks].sort((a, b) => {
    const aRow = a.row ?? 0;
    const bRow = b.row ?? 0;
    if (aRow !== bRow) return aRow - bRow;

    const ai = getIndex(a);
    const bi = getIndex(b);
    if (ai.startIdx !== bi.startIdx) return ai.startIdx - bi.startIdx;
    return ai.endIdx - bi.endIdx;
  });

  const laneEnds: number[] = [];
  const positioned: (TimelineTask & { lane: number })[] = [];

  for (const task of sorted) {
    const { startIdx, endIdx } = getIndex(task);
    const preferredLane = Math.max(0, task.row ?? 0);

    if (preferredLane >= laneEnds.length) {
      for (let i = laneEnds.length; i <= preferredLane; i++) {
        laneEnds.push(Number.NEGATIVE_INFINITY);
      }
    }

    let assignedLane = -1;
    for (let i = preferredLane; i < laneEnds.length; i++) {
      if (laneEnds[i] < startIdx) {
        assignedLane = i;
        break;
      }
    }

    if (assignedLane === -1) {
      assignedLane = laneEnds.length;
      laneEnds.push(endIdx);
    } else {
      laneEnds[assignedLane] = endIdx;
    }

    positioned.push({ ...task, lane: assignedLane });
  }

  return { positioned, laneCount: laneEnds.length };
}

/* ----------------------------- scale config ----------------------------- */

function getCellWidth(mode: Mode, zoomIndex: number) {
  const day = [50, 60, 70, 80];
  const week = [32, 40, 48, 56];
  const month = [90, 110, 130, 150];

  const idx = clamp(zoomIndex, 0, 3);
  if (mode === "day") return day[idx];
  if (mode === "week") return week[idx];
  return month[idx];
}

/* ----------------------------- bucket builders ----------------------------- */

function getTimelineRange(tasks: TimelineTask[]) {
  const parsedStartDates = toValidDates(tasks.map((t) => t.startDate));
  const parsedEndDates = toValidDates(tasks.map((t) => t.dueDate));

  const today = new Date();
  const minTaskDate = parsedStartDates.length ? dfMin(parsedStartDates) : today;
  const maxTaskDate = parsedEndDates.length ? dfMax(parsedEndDates) : today;

  const BUFFER_BEFORE = 180;
  const BUFFER_AFTER = 180;

  return {
    start: addDays(minTaskDate, -BUFFER_BEFORE),
    end: addDays(maxTaskDate, BUFFER_AFTER),
  };
}

function buildDayBuckets(start: Date, end: Date) {
  const totalDays = differenceInDays(end, start) + 1;
  const days = Array.from({ length: totalDays }, (_, i) => addDays(start, i));
  return days;
}

function buildWeekBuckets(start: Date, end: Date) {
  const startW = startOfWeek(start, { weekStartsOn: 1 });
  const endW = startOfWeek(end, { weekStartsOn: 1 });

  const totalWeeks = Math.floor(differenceInDays(endW, startW) / 7) + 1;
  return Array.from({ length: totalWeeks }, (_, i) => addDays(startW, i * 7));
}

function buildMonthSegmentsFromBuckets(
  buckets: Date[],
  mode: Mode,
  startDate: Date,
) {
  if (!buckets.length) return [];
  const segments: {
    startIndex: number;
    length: number;
    label: string;
    year: string;
  }[] = [];
  let segStartIndex = 0;

  const first = buckets[0];
  let currentMonthKey = format(first, "yyyy-MM");

  for (let i = 1; i < buckets.length; i++) {
    const monthKey = format(buckets[i], "yyyy-MM");
    if (monthKey !== currentMonthKey) {
      const d = buckets[segStartIndex];
      segments.push({
        startIndex: segStartIndex,
        length: i - segStartIndex,
        label: format(d, "MMMM"),
        year: format(d, "yyyy"),
      });
      segStartIndex = i;
      currentMonthKey = monthKey;
    }
  }

  const d = buckets[segStartIndex];
  segments.push({
    startIndex: segStartIndex,
    length: buckets.length - segStartIndex,
    label: format(d, "MMMM"),
    year: format(d, "yyyy"),
  });

  return segments;
}

/* ----------------------------- component ----------------------------- */

export default function BaseTimelineView(props: {
  mode: Mode;
  tasks: TimelineTask[];
  setTasks: React.Dispatch<React.SetStateAction<TimelineTask[]>>;
  zoomIndex: number;
  scrollRootRef?: React.RefObject<HTMLDivElement>;
  onCreateTask: () => void;
  headerVariant: "day" | "week" | "month";
}) {
  const {
    mode,
    tasks,
    setTasks,
    zoomIndex,
    scrollRootRef,
    onCreateTask,
    headerVariant,
  } = props;

  const cellWidth = getCellWidth(mode, zoomIndex);

  const didInitialScrollRef = useRef(false);

  const bucketIndexFromDate = (d: Date) => {
    if (mode === "month") {
      const w = startOfWeek(d, { weekStartsOn: 1 });
      const base = startOfWeek(startDate, { weekStartsOn: 1 });
      return Math.floor(differenceInDays(w, base) / 7);
    }

    return differenceInDays(d, startDate);
  };

  /* -------------------- range & buckets -------------------- */
  const { startDate, endDate } = useMemo(() => {
    const r = getTimelineRange(tasks);
    return { startDate: r.start, endDate: r.end };
  }, [tasks]);

  const buckets = useMemo(() => {
    if (mode === "month") return buildWeekBuckets(startDate, endDate);
    return buildDayBuckets(startDate, endDate);
  }, [mode, startDate, endDate]);

  const monthSegments = useMemo(() => {
    return buildMonthSegmentsFromBuckets(buckets, mode, startDate);
  }, [buckets, mode, startDate]);

  /* -------------------- lanes -------------------- */
  const { positioned: positionedTasks, laneCount } = useMemo(() => {
    return buildLanesByIndex(tasks, (t) => {
      const s = parseISO(t.startDate);
      const e = parseISO(t.dueDate);
      return {
        startIdx: bucketIndexFromDate(s),
        endIdx: bucketIndexFromDate(e),
      };
    });
  }, [tasks, mode, startDate, buckets.length, zoomIndex]);

  /* -------------------- scroll refs -------------------- */
  const internalScrollRootRef = useRef<HTMLDivElement>(null);
  const scrollAreaRootRef = scrollRootRef ?? internalScrollRootRef;

  const gridRef = useRef<HTMLDivElement>(null);

  /* -------------------- viewport height -------------------- */
  const [viewportHeight, setViewportHeight] = useState(0);
  useEffect(() => {
    const viewportEl = getRadixScrollViewport(scrollAreaRootRef.current);
    if (!viewportEl) return;

    const handleResize = () => setViewportHeight(viewportEl.clientHeight);
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(viewportEl);

    return () => resizeObserver.disconnect();
  }, [scrollAreaRootRef]);

  /* -------------------- month label animation (sticky left) -------------------- */
  const [monthLabel, setMonthLabel] = useState(() =>
    buckets.length ? format(buckets[0], "MMMM yyyy") : "",
  );
  const [prevMonthLabel, setPrevMonthLabel] = useState(monthLabel);
  const [monthAnimDir, setMonthAnimDir] = useState<"forward" | "backward">(
    "forward",
  );
  type MonthAnimStep = "idle" | "from" | "to";
  const [monthAnimStep, setMonthAnimStep] = useState<MonthAnimStep>("idle");

  const lastScrollLeftRef = useRef(0);

  useEffect(() => {
    if (!buckets.length) return;
    const first = format(buckets[0], "MMMM yyyy");
    setMonthLabel(first);
    setPrevMonthLabel(first);
  }, [buckets.length]);

  useEffect(() => {
    if (monthAnimStep !== "to") return;
    const t = window.setTimeout(() => setMonthAnimStep("idle"), 220);
    return () => window.clearTimeout(t);
  }, [monthAnimStep]);

  const headerHeight = MONTH_ROW_HEIGHT + DAY_ROW_HEIGHT;

  /* -------------------- hover cell -------------------- */
  const [hoverPos, setHoverPos] = useState<HoverPos>({
    x: 0,
    y: 0,
    visible: false,
  });
  const isOverTaskRef = useRef(false);

  const handleMouseMove = (e: React.PointerEvent) => {
    if (isOverTaskRef.current) {
      if (hoverPos.visible) setHoverPos((p) => ({ ...p, visible: false }));
      return;
    }
    if (!gridRef.current) return;

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

  /* -------------------- helpers: index mapping per mode -------------------- */

  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [hoverCardPos, setHoverCardPos] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const hoverHideTimer = useRef<number | null>(null);

  const clearHoverHideTimer = () => {
    if (hoverHideTimer.current) {
      window.clearTimeout(hoverHideTimer.current);
      hoverHideTimer.current = null;
    }
  };

  const showHoverCard = (taskId: string, el: HTMLElement) => {
    clearHoverHideTimer();
    if (!gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const taskRect = el.getBoundingClientRect();

    setHoverCardPos({
      left: taskRect.left - gridRect.left,
      top: taskRect.top - gridRect.top + taskRect.height + 10,
    });
    setHoveredTaskId(taskId);
  };

  const hideHoverCardSoon = () => {
    clearHoverHideTimer();
    hoverHideTimer.current = window.setTimeout(() => {
      setHoveredTaskId(null);
      setHoverCardPos(null);
    }, 120);
  };

  const priorityLabel = (p?: TimelineTask["priority"]) => {
    if (p === "urgent") return "Urgent priority";
    if (p === "high") return "High priority";
    if (p === "low") return "Low priority";
    return "Normal priority";
  };

  const statusLabel = (s: TimelineTask["status"]) => {
    if (s === "not_started") return "NOT STARTED";
    if (s === "in_progress") return "IN PROGRESS";
    if (s === "to_do") return "TO DO";
    return "COMPLETE";
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

  const getTaskSerial = (taskId: string) => {
    return tasks.findIndex((t) => t.id === taskId) + 1;
  };

  const getStyleWidthPx = (style: React.CSSProperties) => {
    const w = style.width;
    if (typeof w === "number") return w;
    if (typeof w === "string") return Number.parseFloat(w) || 0;
    return 0;
  };

  const [hoveredBarId, setHoveredBarId] = useState<string | null>(null);

  /* -------------------- drag logic -------------------- */
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

  const getViewportScrollLeft = () =>
    getRadixScrollViewport(scrollAreaRootRef.current)?.scrollLeft ?? 0;

  const computePreview = (clientX: number, clientY: number) => {
    const info = dragRef.current;
    if (!info) return null;

    const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
    const currentScrollLeft = viewport
      ? viewport.scrollLeft
      : info.startScrollLeft;

    const dx =
      clientX - info.startClientX + (currentScrollLeft - info.startScrollLeft);
    const dy = clientY - info.startClientY;

    const deltaCols = Math.floor((dx + cellWidth / 2) / cellWidth);
    const deltaRows = Math.round(dy / ROW_HEIGHT);
    const desiredRow = Math.max(0, info.origRow + deltaRows);

    if (info.mode === "move") {
      const duration = info.origDueIdx - info.origStartIdx;

      let newStartIdx = clamp(
        info.origStartIdx + deltaCols,
        0,
        buckets.length - 1,
      );
      newStartIdx = clamp(newStartIdx, 0, buckets.length - 1 - duration);
      const newDueIdx = newStartIdx + duration;

      return {
        id: info.id,
        startIdx: newStartIdx,
        dueIdx: newDueIdx,
        row: desiredRow,
        mode: info.mode,
      };
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
        row: desiredRow,
        mode: info.mode,
      };
    }

    const newDueIdx = clamp(
      info.origDueIdx + deltaCols,
      info.origStartIdx,
      buckets.length - 1,
    );
    return {
      id: info.id,
      startIdx: info.origStartIdx,
      dueIdx: newDueIdx,
      row: desiredRow,
      mode: info.mode,
    };
  };

  const applyPreviewMovement = (clientX: number, clientY: number) => {
    const preview = computePreview(clientX, clientY);
    if (!preview) return;
    setDragPreview(preview);
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
        applyPreviewMovement(
          dragRef.current.lastClientX,
          dragRef.current.lastClientY,
        );
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
      let dueStr = dateStrFromBucketIndex(preview.dueIdx);

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

  const startDrag = (
    e: React.PointerEvent,
    task: PositionedTask,
    modeDrag: DragMode,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const start = parseISO(task.startDate);
    const due = parseISO(task.dueDate);

    const startIdx = bucketIndexFromDate(start);
    const dueIdx = bucketIndexFromDate(due);

    dragRef.current = {
      id: task.id,
      mode: modeDrag,
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
      mode: modeDrag,
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  /* -------------------- scroll handling + today event -------------------- */

  const scrollToToday = (behavior: ScrollBehavior = "smooth") => {
    const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
    if (!viewport) return;

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

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ mode?: Mode }>;
      if (ce.detail?.mode && ce.detail.mode !== mode) return;
      requestAnimationFrame(() => scrollToToday("smooth"));
    };

    window.addEventListener("timeline:scrollToToday", handler);
    return () => window.removeEventListener("timeline:scrollToToday", handler);
  }, [mode, cellWidth, buckets.length, startDate]);

  useEffect(() => {
    if (didInitialScrollRef.current) return;
    if (!buckets.length) return;

    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;

      const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
      if (!viewport) {
        requestAnimationFrame(tryScroll);
        return;
      }
      if (viewport.clientWidth === 0) {
        requestAnimationFrame(tryScroll);
        return;
      }

      didInitialScrollRef.current = true;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToToday("auto");
        });
      });
    };

    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [buckets.length, cellWidth, mode, startDate]);

  const handleScroll = () => {
    const viewport = getRadixScrollViewport(scrollAreaRootRef.current);
    if (!viewport) return;

    const left = viewport.scrollLeft;
    const dir = left > lastScrollLeftRef.current ? "forward" : "backward";
    lastScrollLeftRef.current = left;

    const leftIndex = Math.floor(left / cellWidth);
    const leftBucket = buckets[clamp(leftIndex, 0, buckets.length - 1)];
    if (!leftBucket) return;

    const newLabel = format(leftBucket, "MMMM yyyy");
    if (newLabel !== monthLabel) {
      setMonthAnimDir(dir);
      setPrevMonthLabel(monthLabel);
      setMonthLabel(newLabel);

      setMonthAnimStep("from");
      requestAnimationFrame(() => setMonthAnimStep("to"));
    }
  };

  /* -------------------- layout sizing -------------------- */
  const previewExtraRows = dragPreview ? dragPreview.row + 2 : 0;
  const gridMinHeight =
    headerHeight + Math.max(laneCount, previewExtraRows) * ROW_HEIGHT;
  const gridHeight = Math.max(gridMinHeight, viewportHeight);

  const visibleTasks = useMemo(() => {
    if (!dragPreview) return positionedTasks;
    return positionedTasks.filter((t) => t.id !== dragPreview.id);
  }, [positionedTasks, dragPreview]);

  /* -------------------- render headers -------------------- */

  const renderMonthRow = () => {
    return (
      <div
        className="sticky top-0 z-20 border-b border-[#EBEBEB] bg-[#F2F9FE] relative"
        style={{ height: MONTH_ROW_HEIGHT }}
      >
        {/* month segments across full row */}
        <div className="absolute inset-0">
          {monthSegments.map((seg) => {
            const text = `${seg.label} ${seg.year}`;
            return (
              <div
                key={`${seg.startIndex}-${text}`}
                className="absolute inset-y-0"
                style={{
                  left: seg.startIndex * cellWidth,
                  width: seg.length * cellWidth,
                }}
              >
                <div className="h-full flex items-center pl-2">
                  <span className="text-xs font-medium text-[#4157FE] whitespace-nowrap">
                    {text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSecondHeaderRow = () => {
    if (headerVariant === "day") {
      return (
        <div
          className="sticky z-10 flex border-b border-[#EBEBEB] bg-[#F9FAFB]"
          style={{ top: MONTH_ROW_HEIGHT, height: DAY_ROW_HEIGHT }}
        >
          {buckets.map((day, index) => {
            const weekend = isWeekend(day);
            const today = isSameDay(day, new Date());
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center border-r border-[#EBEBEB] text-xs text-[#697588] ${
                  weekend ? "bg-[#F3F4F6]" : ""
                }`}
                style={{ minWidth: cellWidth, height: "100%" }}
              >
                <span className={today ? "text-[#4157FE] font-bold" : ""}>
                  {format(day, "EEE d")}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    if (headerVariant === "week") {
      return (
        <div
          className="sticky z-10 flex border-b border-[#EBEBEB] bg-[#F9FAFB]"
          style={{ top: MONTH_ROW_HEIGHT, height: DAY_ROW_HEIGHT }}
        >
          {buckets.map((day, index) => {
            const today = isSameDay(day, new Date());
            const weekend = isWeekend(day);
            const weekStart = format(day, "i") === "1";
            return (
              <div
                key={index}
                className={`flex items-center justify-center text-xs text-[#697588] ${
                  weekStart ? "border-l border-r-[#EBEBEB]" : ""
                } ${weekend ? "bg-[#F3F4F6]" : ""}`}
                style={{ minWidth: cellWidth, height: "100%" }}
              >
                <span className={today ? "text-[#4157FE] font-bold" : ""}>
                  {weekStart ? format(day, "d") : ""}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div
        className="sticky z-10 flex border-b border-[#EBEBEB] bg-[#F9FAFB]"
        style={{ top: MONTH_ROW_HEIGHT, height: DAY_ROW_HEIGHT }}
      >
        {buckets.map((weekStart, index) => {
          const today = isSameDay(
            startOfWeek(new Date(), { weekStartsOn: 1 }),
            weekStart,
          );

          const isMonthEnd =
            index === buckets.length - 1
              ? true
              : format(weekStart, "yyyy-MM") !==
                format(buckets[index + 1], "yyyy-MM");
          return (
            <div
              key={index}
              className={`flex items-center justify-center text-xs text-[#697588] ${
                isMonthEnd ? "border-r  border-r-[#EBEBEB]" : ""
              }`}
              style={{ minWidth: cellWidth, height: "100%" }}
            >
              <span className={today ? "text-[#4157FE] font-bold" : ""}>
                {format(weekStart, "d")}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  /* -------------------- background columns -------------------- */

  const renderBackgroundColumns = () => {
    return (
      <div
        className="absolute inset-0 z-0 flex pointer-events-none"
        style={{ top: headerHeight }}
      >
        {buckets.map((d, index) => {
          const weekendBg = mode !== "month" && isWeekend(d);
          const isDayBorder = mode === "day";
          const isWeekStart = mode === "week" && d.getDay() === 1;

          const isMonthStart =
            mode === "month" &&
            (index === 0 ||
              format(d, "yyyy-MM") !== format(buckets[index - 1], "yyyy-MM"));

          return (
            <div
              key={index}
              className={`
              ${isDayBorder ? "border-r border-r-[#EBEBEB]" : ""}
              ${isWeekStart || isMonthStart ? "border-l border-l-[#EBEBEB]" : ""}
              ${weekendBg ? "bg-[#F9FAFB]" : "bg-transparent"}
            `}
              style={{ width: cellWidth, minWidth: cellWidth }}
            />
          );
        })}
      </div>
    );
  };

  /* -------------------- render -------------------- */

  return (
    <div className="w-full h-full relative">
      <div
        className="pointer-events-none absolute left-0 top-0 z-80"
        style={{ width: MONTH_LABEL_PLATE_W, height: MONTH_ROW_HEIGHT }}
      >
        <div className="h-full w-full bg-[#F2F9FE] border-b border-[#EBEBEB] flex items-center pl-2">
          <div className="relative h-4 w-max">
            {/* current label */}
            <div
              className={[
                "absolute  left-0 top-0  text-xs font-medium text-[#4157FE] whitespace-nowrap ",
                "transition-transform transition-opacity duration-100 ease-out will-change-transform",
                monthAnimStep === "idle"
                  ? "opacity-100 translate-x-1"
                  : monthAnimStep === "from"
                    ? monthAnimDir === "forward"
                      ? "opacity-0 -translate-x-10"
                      : "opacity-0 -translate-x-10"
                    : "opacity-0 translate-x-0",
              ].join(" ")}
            >
              {monthLabel}
            </div>
          </div>
        </div>
      </div>

      <ScrollArea
        ref={scrollAreaRootRef}
        className="w-full h-full bg-white"
        onScrollCapture={handleScroll}
      >
        <div
          className="relative"
          style={{ width: buckets.length * cellWidth, minHeight: gridHeight }}
          ref={gridRef}
          onPointerMove={handleMouseMove}
          onPointerLeave={() => setHoverPos((p) => ({ ...p, visible: false }))}
        >
          {/* Month header row */}
          {renderMonthRow()}

          {/* Second header row */}
          {renderSecondHeaderRow()}

          {/* Background columns */}
          {renderBackgroundColumns()}

          {/* Hover cell */}
          {hoverPos.visible && (
            <div
              onClick={onCreateTask}
              className="absolute h-8 bg-[#F2F9FE] rounded-sm border border-[#4157FE] z-10 flex items-center justify-center transition-all duration-75 cursor-pointer"
              style={{
                left: hoverPos.x,
                top: hoverPos.y,
                width: cellWidth,
              }}
            >
              <Plus className="text-[#697588]" size={14} strokeWidth={3} />
            </div>
          )}

          {/* Tasks */}
          <div className="absolute inset-0 z-10">
            {visibleTasks.map((task) => {
              const style = getTaskStyle(
                task.startDate,
                task.dueDate,
                task.lane,
              );
              const colorTheme = STATUS_THEMES[task.status];

              const taskWidth = getStyleWidthPx(style);
              const isTooSmall = taskWidth < MIN_TASK_META_WIDTH;

              return (
                <div
                  key={task.id}
                  className={`absolute z-30 flex items-center justify-between h-8 px-2 rounded-md shadow-sm cursor-pointer transition-all
                    ${colorTheme.bg}
                    opacity-80 hover:opacity-100`}
                  style={style}
                  onMouseEnter={(e) => {
                    isOverTaskRef.current = true;
                    setHoverPos((p) => ({ ...p, visible: false }));
                    setHoveredBarId(task.id);
                    if (isTooSmall) showHoverCard(task.id, e.currentTarget);
                  }}
                  onMouseLeave={() => {
                    isOverTaskRef.current = false;
                    setHoveredBarId((prev) => (prev === task.id ? null : prev));
                    if (isTooSmall) hideHoverCardSoon();
                  }}
                  onPointerDown={(e) => startDrag(e, task, "move")}
                >
                  <div
                    onPointerDown={(e) => startDrag(e, task, "resize-start")}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 8,
                      height: "100%",
                      cursor: "ew-resize",
                    }}
                  />
                  <div
                    onPointerDown={(e) => startDrag(e, task, "resize-end")}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 8,
                      height: "100%",
                      cursor: "ew-resize",
                    }}
                  />

                  <div
                    className={`flex items-center gap-2 overflow-hidden border-l-2 ${colorTheme.border}`}
                  >
                    {!isTooSmall && (
                      <div className="flex items-center gap-1 pl-2">
                        <span
                          className={`text-[10px] font-bold ${colorTheme.text}`}
                        >
                          {getTaskSerial(task.id)}
                        </span>
                        <GitBranch size={12} className={colorTheme.text} />
                      </div>
                    )}
                    <span
                      className={`text-[11px] font-medium truncate ${colorTheme.text} ${isTooSmall ? "pl-2" : ""}`}
                    >
                      {task.title}
                    </span>
                  </div>

                  {!isTooSmall && (
                    <div className="flex items-center gap-2 shrink-0">
                      <Avatar className="w-5 h-5 border border-white shrink-0">
                        <AvatarImage src={task.assignee} alt={task.title} />
                        <AvatarFallback className="text-[8px] bg-[#191F38] text-white">
                          {task.assignee
                            ? task.assignee.slice(0, 2).toUpperCase()
                            : "??"}
                        </AvatarFallback>
                      </Avatar>

                      {hoveredBarId === task.id && (
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onMouseEnter={(e) => {
                            showHoverCard(
                              task.id,
                              e.currentTarget as unknown as HTMLElement,
                            );
                          }}
                          onMouseLeave={() => {
                            hideHoverCardSoon();
                          }}
                        >
                          <Info size={14} className={colorTheme.text} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Drag preview UNDER other tasks */}
            {dragPreview &&
              (() => {
                const task = tasks.find((t) => t.id === dragPreview.id);
                if (!task) return null;

                const colorTheme = STATUS_THEMES[task.status];

                const style = getTaskStyleFromIdx(
                  dragPreview.startIdx,
                  dragPreview.dueIdx,
                  dragPreview.row,
                );

                const previewWidth = getStyleWidthPx(style);
                const isTooSmall = previewWidth < MIN_TASK_META_WIDTH;

                return (
                  <div
                    key={`preview-${dragPreview.id}`}
                    className={`absolute z-10 flex items-center justify-between h-10 px-2 rounded-md shadow-md cursor-grabbing transition-none
                      ${colorTheme.bg} opacity-100`}
                    style={style}
                  >
                    <div
                      className={`flex items-center gap-2 overflow-hidden border-l-2 ${colorTheme.border}`}
                    >
                      {!isTooSmall && (
                        <div className="flex items-center gap-1 pl-2">
                          <span
                            className={`text-[10px] font-bold ${colorTheme.text}`}
                          >
                            {getTaskSerial(task.id)}
                          </span>
                          <GitBranch size={12} className={colorTheme.text} />
                        </div>
                      )}

                      <span
                        className={`text-[11px] font-medium truncate ${colorTheme.text} ${
                          isTooSmall ? "pl-2" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    {!isTooSmall && (
                      <Avatar className="w-5 h-5 border border-white shrink-0">
                        <AvatarImage src={task.assignee} alt={task.title} />
                        <AvatarFallback className="text-[8px] bg-[#191F38] text-white">
                          {task.assignee
                            ? task.assignee.slice(0, 2).toUpperCase()
                            : "??"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })()}
          </div>

          {hoveredTaskId &&
            hoverCardPos &&
            (() => {
              const ht = tasks.find((t) => t.id === hoveredTaskId);
              if (!ht) return null;

              const theme = STATUS_THEMES[ht.status];
              const path =
                ht.path?.join("  /  ") ??
                "Team Space  /  Kazentic  /  Implement";

              return (
                <div
                  className={`absolute z-50 w-100 rounded-lg shadow-md border ${theme.cardBg} ${theme.cardText} ${theme.cardBorder}`}
                  style={{ left: hoverCardPos.left, top: hoverCardPos.top }}
                  onMouseEnter={clearHoverHideTimer}
                  onMouseLeave={hideHoverCardSoon}
                >
                  <div className="p-3">
                    {/* top row */}
                    <div className="flex items-center justify-between">
                      <div className={`text-sm ${theme.cardMuted}`}>{path}</div>
                      <div
                        className={`flex items-center gap-3 ${theme.cardMuted}`}
                      >
                        <ExternalLink
                          size={16}
                          className="cursor-pointer hover:text-white"
                        />
                        <Link2
                          size={16}
                          className="cursor-pointer hover:text-white"
                        />
                      </div>
                    </div>

                    {/* title */}
                    <div className=" text-lg font-semibold">{ht.title}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-md text-[12px] font-bold ${theme.solid}`}
                        >
                          {statusLabel(ht.status)}
                        </span>

                        <div
                          className={`flex items-center gap-2 ${theme.cardMuted}`}
                        >
                          <Flag size={14} className={theme.text} />
                          <span className="text-sm">
                            {priorityLabel(ht.priority)}
                          </span>
                        </div>
                      </div>

                      <Avatar className="w-7 h-7 border border-black/10">
                        <AvatarImage src={ht.assignee} alt={ht.title} />
                        <AvatarFallback className="text-sm bg-black/10 text-black">
                          {ht.assignee ? "SS" : "??"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>

        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
