"use client";

import { Dispatch, SetStateAction } from "react";
import { GanttTask } from "@/data/gantt/gantt.types";
import { GanttRow } from "@/components/gantt/hooks/useGanttRows";
import { useGanttRowReorder } from "@/components/gantt/hooks/useGanttRowReorder";
import { reorderWithinParent } from "@/components/gantt/utils/tree";

import { GanttTaskRow } from "./GanttTaskRow";
import { Plus } from "lucide-react";

export function GanttTaskList(props: {
  listScrollRef: React.RefObject<HTMLDivElement | null>;

  width: number;
  rowHeight: number;

  rows: GanttRow[];
  expanded: Set<string>;
  setExpanded: Dispatch<SetStateAction<Set<string>>>;

  hoverRowId: string | null;
  setHoverRowId: (id: string | null) => void;

  setTasks: Dispatch<SetStateAction<GanttTask[]>>;

  onOpenCreateFromList: (anchor: { x: number; y: number }) => void;
}) {
  const reorder = useGanttRowReorder({
    listScrollRef: props.listScrollRef,
    rowHeight: props.rowHeight,
    rows: props.rows,
    onCommit: (movingId, targetId, parentId) => {
      props.setTasks((prev) =>
        reorderWithinParent(prev, parentId, movingId, targetId),
      );
    },
  });

  const toggle = (id: string) => {
    props.setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className="border-r border-[#EBEBEB] bg-[#FFFFFF]"
      style={{ width: props.width }}
    >
      <div ref={props.listScrollRef} className="h-full overflow-y-auto">
        {props.rows.map((row) => (
          <div
            key={row.task.id}
            style={reorder.getRowStyle(row.task.id)}
            className="will-change-transform"
          >
            <GanttTaskRow
              row={row}
              rowHeight={props.rowHeight}
              hovered={props.hoverRowId === row.task.id}
              setHoverRowId={props.setHoverRowId}
              expanded={props.expanded.has(row.task.id)}
              onToggle={() => toggle(row.task.id)}
              dragging={reorder.draggingId === row.task.id}
              overTarget={reorder.overId === row.task.id}
              onReorderPointerDown={(e) => reorder.start(e, row)}
            />
          </div>
        ))}
        {/* ✅ ClickUp-like Add Task row */}
        <button
          type="button"
          className={[
            "w-full flex items-center gap-2 border-b border-[#EBEBEB] px-3",
            props.hoverRowId === "__create__" ? "bg-[#F2F9FE]" : "bg-[#FFFFFF]",
          ].join(" ")}
          style={{ height: props.rowHeight }}
          onMouseEnter={() => props.setHoverRowId("__create__")}
          onMouseLeave={() => props.setHoverRowId(null)}
          onClick={(e) => {
            const r = (
              e.currentTarget as HTMLButtonElement
            ).getBoundingClientRect();
            props.onOpenCreateFromList({ x: r.left + 12, y: r.top + 8 });
          }}
        >
          <Plus className="h-4 w-4 text-[#697588]" />
          <span className="text-xs font-medium text-[#697588]">Add Task</span>
        </button>
      </div>
    </div>
  );
}
