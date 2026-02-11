"use client";

import { parseISO } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GridBackground } from "@/components/timeline/components/GridBackground";
import { resolveStatusTheme } from "@/components/timeline/utils/theme";
import { getRadixScrollViewport } from "@/components/timeline/utils/dom";
import { bucketIndexFromDate } from "@/components/gantt/utils/bucket";
import {
  updateTaskDatesInTree,
  createNewTask,
} from "@/components/gantt/utils/tree";

import { GanttTask } from "@/data/gantt/gantt.types";
import { GanttRow } from "@/components/gantt/hooks/useGanttRows";
import { useGanttBarDrag } from "@/components/gantt/hooks/useGanttBarDrag";
import { useGanttCreateGhost } from "@/components/gantt/hooks/useGanttCreateGhost";

import { GanttTodayLine } from "./GanttTodayLine";
import { GanttBar } from "./GanttBar";
import { GanttDependencyLayer } from "./GanttDependencyLayer";
import { GanttCreateTaskGhost } from "./GanttCreateTaskGhost";
import { HeaderMonthRow } from "@/components/timeline/components/HeaderMonthRow";
import { HeaderSecondRow } from "@/components/timeline/components/HeaderSecondRow";
import { useRef } from "react";

export function GanttGrid(props: {
  mode: "day" | "week" | "month";
  scrollRootRef: React.RefObject<HTMLDivElement | null>;

  height: number;

  rowHeight: number;
  cellWidth: number;

  headerMonthHeight: number;
  headerSecondHeight: number;
  headerHeight: number;

  buckets: Date[];
  monthSegments: {
    startIndex: number;
    length: number;
    label: string;
    year: string;
    key: string;
  }[];
  virtual: { start: number; end: number; padLeft: number; padRight: number };

  rows: GanttRow[];

  hoverRowId: string | null;
  setHoverRowId: (id: string | null) => void;

  tasks: GanttTask[];
  setTasks: React.Dispatch<React.SetStateAction<GanttTask[]>>;

  statusThemes: Record<string, any>;

  hoveredBarId: string | null;
  setHoveredBarId: (id: string | null) => void;
  onQuickCreateFromGrid: (payload: {
    clientX: number;
    clientY: number;
    startIdx: number;
  }) => void;

  dep: {
    deps: any[];
    linkingFrom: any;
    mouse: any;
    startLink: (from: any) => void;
    updateMouse: (x: number, y: number) => void;
    cancelLink: () => void;
    finishLink: (to: any) => void;
    remove: (id: string) => void;
  };
}) {
  const totalCols = props.buckets.length;
  const totalWidth = totalCols * props.cellWidth;

  const createRowIndex = props.rows.length;
  const bodyRowsHeight = (props.rows.length + 1) * props.rowHeight;
  const contentHeight = props.headerHeight + bodyRowsHeight;
  const onPointerLeave = () => setHoverSafe(null);

  const startDate = props.buckets[0];

  const drag = useGanttBarDrag({
    mode: props.mode,
    startDate,
    bucketsLen: totalCols,
    cellWidth: props.cellWidth,
    scrollRootRef: props.scrollRootRef,
    onCommit: (id, startStr, dueStr) => {
      props.setTasks((prev) =>
        updateTaskDatesInTree(prev, id, startStr, dueStr),
      );
    },
  });

  const ghost = useGanttCreateGhost({
    rowIndex: createRowIndex,
    rowHeight: props.rowHeight,
    cellWidth: props.cellWidth,
    totalCols,
  });

  const onPointerMove = (e: React.PointerEvent) => {
    const viewport = getRadixScrollViewport(props.scrollRootRef.current);
    if (!viewport) return;

    const vpRect = viewport.getBoundingClientRect();
    const x = e.clientX - vpRect.left + viewport.scrollLeft;
    const y = e.clientY - vpRect.top + viewport.scrollTop;

    updateHoverFromY(y);

    if (props.dep.linkingFrom) props.dep.updateMouse(x, y);

    ghost.onMove(x, y);
  };

  const onPointerUp = () => {
    if (props.dep.linkingFrom) props.dep.cancelLink();
  };

  const lastHoverIdRef = useRef<string | null>(null);

  const setHoverSafe = (id: string | null) => {
    if (lastHoverIdRef.current === id) return;
    lastHoverIdRef.current = id;
    props.setHoverRowId(id);
  };

  const updateHoverFromY = (y: number) => {
    // y is already content-space (includes scrollTop)
    const bodyTop = props.headerHeight;
    const bodyBottom = bodyTop + props.rows.length * props.rowHeight;

    // create row sits right after rows
    const createTop = bodyBottom;
    const createBottom = createTop + props.rowHeight;

    if (y >= bodyTop && y < bodyBottom) {
      const idx = Math.floor((y - bodyTop) / props.rowHeight);
      const row = props.rows[idx];
      setHoverSafe(row ? row.task.id : null);
      return;
    }

    if (y >= createTop && y < createBottom) {
      setHoverSafe("__create__");
      return;
    }

    setHoverSafe(null);
  };

  return (
    <div className="flex-1 h-full bg-[#FFFFFF]">
      <ScrollArea
        ref={props.scrollRootRef as any}
        className="h-full w-full cursor-pointer  bg-white"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <div
          className="relative"
          style={{ width: totalWidth, height: contentHeight }}
        >
          <div
            className="sticky top-0 z-40 bg-white"
            style={{ height: props.headerHeight }}
          >
            <div className="relative" style={{ height: props.headerHeight }}>
              <HeaderMonthRow
                height={props.headerMonthHeight}
                cellWidth={props.cellWidth}
                segments={props.monthSegments}
              />

              <HeaderSecondRow
                variant={props.mode}
                top={props.headerMonthHeight}
                height={props.headerSecondHeight}
                cellWidth={props.cellWidth}
                buckets={props.buckets}
                start={props.virtual.start}
                end={props.virtual.end}
                padLeft={props.virtual.padLeft}
                padRight={props.virtual.padRight}
              />
            </div>

            {/* bottom border like ClickUp */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-[#EBEBEB]" />
          </div>

          <GridBackground
            mode={props.mode}
            headerHeight={props.headerHeight}
            cellWidth={props.cellWidth}
            buckets={props.buckets}
            start={props.virtual.start}
            end={props.virtual.end}
            padLeft={props.virtual.padLeft}
            padRight={props.virtual.padRight}
          />

          {/* Today line */}
          <GanttTodayLine
            mode={props.mode}
            startDate={startDate}
            cellWidth={props.cellWidth}
            headerHeight={props.headerHeight}
            contentHeight={contentHeight}
          />

          {/* Row hover overlay */}
          {props.rows.map((r, i) => {
            const isHover = props.hoverRowId === r.task.id;
            return (
              <div
                key={r.task.id}
                className={isHover ? "bg-[#F2F9FE] " : ""}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: props.headerHeight + i * props.rowHeight,

                  height: props.rowHeight,

                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* Bars */}
          {props.rows.map((row, i) => {
            const sIdx = bucketIndexFromDate(
              props.mode,
              startDate,
              parseISO(row.task.startDate),
            );
            const dIdx = bucketIndexFromDate(
              props.mode,
              startDate,
              parseISO(row.task.dueDate),
            );
            if (!row.task.startDate || !row.task.dueDate) return null;

            const preview =
              drag.dragPreview && drag.dragPreview.id === row.task.id
                ? drag.dragPreview
                : null;

            const startIdx = preview ? preview.startIdx : sIdx;
            const dueIdx = preview ? preview.dueIdx : dIdx;

            // skip if outside virtual window (simple perf)
            const vStart = props.virtual.start;
            const vEnd = props.virtual.end;
            if (dueIdx < vStart - 20 || startIdx > vEnd + 20) return null;

            const left = startIdx * props.cellWidth;
            const width = (dueIdx - startIdx + 1) * props.cellWidth;

            const theme = resolveStatusTheme(
              props.statusThemes,
              row.task.status,
            );

            return (
              <GanttBar
                key={row.task.id}
                task={row.task}
                rowIndex={i}
                rowHeight={props.rowHeight}
                style={{
                  left,
                  top:
                    props.headerHeight +
                    i * props.rowHeight +
                    (props.rowHeight - 32) / 2,

                  width,
                  height: 32,
                  backgroundColor: theme.bg,
                  borderColor: theme.border,
                  color: theme.text,
                }}
                theme={theme}
                isHovered={props.hoveredBarId === row.task.id}
                setHovered={(v) =>
                  props.setHoveredBarId(v ? row.task.id : null)
                }
                onMovePointerDown={(e) => drag.startDrag(e, row.task, "move")}
                onResizeStart={(e) =>
                  drag.startDrag(e, row.task, "resize-start")
                }
                onResizeEnd={(e) => drag.startDrag(e, row.task, "resize-end")}
                dep={props.dep}
              />
            );
          })}

          {/* Dependencies layer */}
          <GanttDependencyLayer
            mode={props.mode}
            startDate={startDate}
            cellWidth={props.cellWidth}
            rowHeight={props.rowHeight}
            rows={props.rows}
            headerHeight={props.headerHeight}
            deps={props.dep.deps}
            linkingFrom={props.dep.linkingFrom}
            mouse={props.dep.mouse}
            onRemove={props.dep.remove}
          />

          {/* Add Task row (ghost) */}
          <GanttCreateTaskGhost
            rowTop={props.headerHeight + createRowIndex * props.rowHeight}
            rowHeight={props.rowHeight}
            hovered={props.hoverRowId === "__create__"}
            onMouseEnter={() => props.setHoverRowId("__create__")}
            onMouseLeave={() => props.setHoverRowId(null)}
          />

          {/* ✅ Create-row ghost (follows mouse) */}
          {ghost.active && props.hoverRowId === "__create__" && (
            <>
              {/* full row hover — same exact color as left */}
              <div
                className="absolute"
                style={{
                  left: 0,
                  right: 0,
                  top: props.headerHeight + createRowIndex * props.rowHeight,
                  height: props.rowHeight,
                  backgroundColor: "#F2F9FE",
                  zIndex: 15, // ✅ ensure above GridBackground lines
                  pointerEvents: "none",
                }}
              />

              {/* “Click to Create Task” pill */}
              <div
                className="absolute z-40 px-3 py-1 rounded-md text-xs bg-black/70 text-white"
                style={{
                  left:
                    ghost.startIdx * props.cellWidth + props.cellWidth * 1.5,
                  top: ghost.y - 28,
                  transform: "translateX(-50%)",
                }}
              >
                Click to Create Task
              </div>

              {/* clickable ghost bar */}
              <button
                type="button"
                className="absolute z-40 rounded-md border border-[#4157FE] bg-[#EEF2FF]"
                style={{
                  left: ghost.startIdx * props.cellWidth,
                  top: ghost.y,
                  width: props.cellWidth * 3,
                  height: 28,
                }}
                onClick={(e) => {
                  props.onQuickCreateFromGrid({
                    clientX: e.clientX,
                    clientY: e.clientY,
                    startIdx: ghost.startIdx,
                  });
                }}
              />
            </>
          )}
        </div>

        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
