"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { bucketIndexFromDate } from "@/components/gantt/utils/bucket";
import { getRadixScrollViewport } from "@/components/timeline/utils/dom";

import { useGanttDependencies } from "@/components/gantt/hooks/useGanttDependencies";
import { useGanttRows } from "@/components/gantt/hooks/useGanttRows";

import { GanttTaskList } from "@/components/gantt/components/GanttTaskList";
import { GanttGrid } from "@/components/gantt/components/GanttGrid";

import Image from "next/image";

import type { GanttTask, GanttDependency } from "@/data/gantt/gantt.types";
import {
  createNewTask,
  updateTaskInTree,
  removeTaskFromTree,
} from "@/components/gantt/utils/tree";

import { GanttCreateTaskPanel } from "@/components/gantt/components/GanttCreateTaskPanel";

type DateRange = { from?: Date; to?: Date };

type CreatePanelState = null | {
  mode: "new" | "edit";
  anchor: { x: number; y: number };
  taskId?: string; // edit mode
  initialTitle?: string;
  initialRange?: DateRange;
  createdTemp?: boolean; // for quick-create cleanup
};

export function GanttCanvas(props: {
  mode: "day" | "week" | "month";
  scrollRootRef: React.RefObject<HTMLDivElement | null>;

  viewportHeight: number;

  leftPaneWidth: number;
  headerMonthHeight: number;
  headerSecondHeight: number;

  rowHeight: number;
  cellWidth: number;

  buckets: Date[];
  monthSegments: {
    startIndex: number;
    length: number;
    label: string;
    year: string;
    key: string;
  }[];
  virtual: { start: number; end: number; padLeft: number; padRight: number };

  tasks: GanttTask[];
  setTasks: React.Dispatch<React.SetStateAction<GanttTask[]>>;

  dependencies: GanttDependency[];
  setDependencies: React.Dispatch<React.SetStateAction<GanttDependency[]>>;

  statusThemes: Record<string, any>;
}) {
  const headerHeight = props.headerMonthHeight + props.headerSecondHeight;

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(props.tasks[0]?.children?.length ? [props.tasks[0].id] : []),
  );

  const rows = useGanttRows(props.tasks, expanded);

  const [hoverRowId, setHoverRowId] = useState<string | null>(null);
  const [hoveredBarId, setHoveredBarId] = useState<string | null>(null);

  const dep = useGanttDependencies({
    deps: props.dependencies,
    setDeps: props.setDependencies,
  });

  const listScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listEl = listScrollRef.current;
    const viewport = getRadixScrollViewport(props.scrollRootRef.current);
    if (!listEl || !viewport) return;

    let lock = false;

    const onViewportScroll = () => {
      if (lock) return;
      lock = true;
      listEl.scrollTop = viewport.scrollTop;
      lock = false;
    };

    const onListScroll = () => {
      if (lock) return;
      lock = true;
      viewport.scrollTop = listEl.scrollTop;
      lock = false;
    };

    viewport.addEventListener("scroll", onViewportScroll, { passive: true });
    listEl.addEventListener("scroll", onListScroll, { passive: true });

    return () => {
      viewport.removeEventListener("scroll", onViewportScroll);
      listEl.removeEventListener("scroll", onListScroll);
    };
  }, [props.scrollRootRef]);

  const bodyHeight = Math.max(520, props.viewportHeight || 520);

  // ✅ Create panel state
  const [createPanel, setCreatePanel] = useState<CreatePanelState>(null);

  const closePanel = () => {
    // If it was quick-created but user closes without saving name -> remove temp
    if (createPanel?.createdTemp && createPanel.taskId) {
      props.setTasks((prev) => removeTaskFromTree(prev, createPanel.taskId!));
    }
    setCreatePanel(null);
  };

  const openCreateFromList = (anchor: { x: number; y: number }) => {
    setHoverRowId("__create__");
    setCreatePanel({
      mode: "new",
      anchor,
      initialTitle: "",
      initialRange: {},
    });
  };

  const quickCreateFromGrid = (payload: {
    clientX: number;
    clientY: number;
    startIdx: number;
  }) => {
    // Create immediately at clicked bucket (span 3 like your ghost)
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? `new-${crypto.randomUUID()}`
        : `new-${Date.now()}`;

    const start = props.buckets[payload.startIdx];
    const endIdx = Math.min(payload.startIdx + 2, props.buckets.length - 1);
    const due = props.buckets[endIdx];

    const startISO = format(start, "yyyy-MM-dd");
    const dueISO = format(due, "yyyy-MM-dd");

    props.setTasks((prev) => [
      ...prev,
      createNewTask({
        id,
        title: "", // temp
        startISO,
        dueISO,
      }),
    ]);

    setCreatePanel({
      mode: "edit",
      anchor: { x: payload.clientX, y: payload.clientY },
      taskId: id,
      createdTemp: true,
      initialTitle: "",
      initialRange: { from: start, to: due },
    });
  };

  const onSubmitPanel = (payload: { title: string; range: DateRange }) => {
    if (!payload.range.from || !payload.range.to) return;

    const startISO = format(payload.range.from, "yyyy-MM-dd");
    const dueISO = format(payload.range.to, "yyyy-MM-dd");

    if (createPanel?.mode === "new") {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? `new-${crypto.randomUUID()}`
          : `new-${Date.now()}`;

      props.setTasks((prev) => [
        ...prev,
        createNewTask({
          id,
          title: payload.title,
          startISO,
          dueISO,
        }),
      ]);
      setCreatePanel(null);
      return;
    }

    // edit mode: update the temp task
    if (createPanel?.taskId) {
      props.setTasks((prev) =>
        updateTaskInTree(prev, createPanel.taskId!, {
          title: payload.title,
          startDate: startISO,
          dueDate: dueISO,
        }),
      );
      setCreatePanel(null);
    }
  };

  // ✅ resizable width state
  const [leftWidth, setLeftWidth] = useState<number>(props.leftPaneWidth);

  // container to clamp max width
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState<number>(0);

  // divider UI state
  const [isResizing, setIsResizing] = useState(false);

  const dragRef = useRef<{ startX: number; startW: number }>({
    startX: 0,
    startW: props.leftPaneWidth,
  });

  // keep wrapWidth updated
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setWrapWidth(el.getBoundingClientRect().width);
    });

    ro.observe(el);
    setWrapWidth(el.getBoundingClientRect().width);

    return () => ro.disconnect();
  }, []);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const MIN_LEFT = 260; // you can tune
  const MAX_LEFT = Math.max(MIN_LEFT, wrapWidth ? wrapWidth - 320 : 900); // keep room for grid

  const onSplitterPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    dragRef.current = { startX: e.clientX, startW: leftWidth };

    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const onSplitterPointerMove = (e: React.PointerEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - dragRef.current.startX;
    const next = clamp(dragRef.current.startW + dx, MIN_LEFT, MAX_LEFT);
    setLeftWidth(next);
  };

  const endResize = () => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const onSplitterPointerUp = () => endResize();
  const onSplitterLostCapture = () => endResize();

  return (
    <div ref={wrapRef} className="w-full h-full">
      <div className="flex w-full h-full min-w-0">
        {/* LEFT SIDE */}
        <div
          className="shrink-0 h-full border-r border-[#EBEBEB] bg-[#FFFFFF] flex flex-col"
          style={{ width: leftWidth }}
        >
          <div
            className="border-b border-[#EBEBEB]"
            style={{ height: headerHeight }}
          >
            <div
              className="border-b border-[#EBEBEB] bg-[#F2F9FE] flex items-center justify-between px-3"
              style={{ height: props.headerMonthHeight }}
            >
              <span className="text-[11px] font-medium leading-5 tracking-tight text-[#4157FE]">
                Name
              </span>

              <Image
                src="/assets/close-circle-black.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>

            <div
              className="bg-[#FFFFFF] border-b border-[#EBEBEB]"
              style={{ height: props.headerSecondHeight }}
            />
          </div>

          <div className="flex-1 min-h-0">
            <GanttTaskList
              listScrollRef={listScrollRef}
              width={leftWidth}
              rowHeight={props.rowHeight}
              rows={rows}
              expanded={expanded}
              setExpanded={setExpanded}
              hoverRowId={hoverRowId}
              setHoverRowId={setHoverRowId}
              setTasks={props.setTasks}
              onOpenCreateFromList={openCreateFromList}
            />
          </div>
        </div>

        <div
          className="relative shrink-0"
          style={{ width: 1 }}
          onPointerDown={onSplitterPointerDown}
          onPointerMove={onSplitterPointerMove}
          onPointerUp={onSplitterPointerUp}
          onLostPointerCapture={onSplitterLostCapture}
        >
          <div className="absolute -left-2 -right-2 top-0 bottom-0 cursor-col-resize" />

          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            style={{
              backgroundColor: isResizing ? "#4157FE" : "#EBEBEB",
            }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 min-w-0 h-full bg-white overflow-hidden">
          <GanttGrid
            mode={props.mode}
            scrollRootRef={props.scrollRootRef}
            height={bodyHeight}
            rowHeight={props.rowHeight}
            cellWidth={props.cellWidth}
            headerMonthHeight={props.headerMonthHeight}
            headerSecondHeight={props.headerSecondHeight}
            headerHeight={headerHeight}
            buckets={props.buckets}
            monthSegments={props.monthSegments}
            virtual={props.virtual}
            rows={rows}
            hoverRowId={hoverRowId}
            setHoverRowId={setHoverRowId}
            tasks={props.tasks}
            setTasks={props.setTasks}
            statusThemes={props.statusThemes}
            hoveredBarId={hoveredBarId}
            setHoveredBarId={setHoveredBarId}
            dep={dep}
            onQuickCreateFromGrid={quickCreateFromGrid} // ✅ NEW
          />
        </div>
      </div>

      {/* ✅ Floating create panel (shared for both approaches) */}
      <GanttCreateTaskPanel
        open={!!createPanel}
        anchor={createPanel?.anchor ?? null}
        mode={createPanel?.mode ?? "new"}
        initialTitle={createPanel?.initialTitle ?? ""}
        initialRange={createPanel?.initialRange ?? {}}
        onClose={closePanel}
        onSubmit={onSubmitPanel}
      />
    </div>
  );
}
