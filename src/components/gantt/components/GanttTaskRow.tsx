"use client";

import React from "react";
import { GanttRow } from "@/components/gantt/hooks/useGanttRows";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function GanttTaskRow(props: {
  row: GanttRow;
  rowHeight: number;

  hovered: boolean;
  setHoverRowId: (id: string | null) => void;

  expanded: boolean;
  onToggle: () => void;

  dragging: boolean;
  overTarget: boolean;

  onReorderPointerDown: (e: React.PointerEvent) => void;
}) {
  const { row } = props;
  const showHoverUI = props.hovered || props.dragging;

  const stop = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={[
        "relative flex items-center border-b border-[#EBEBEB] px-2 select-none",
        props.hovered ? "bg-[#F2F9FE]" : "bg-[#FFFFFF]",
        props.dragging ? "opacity-70" : "",
        props.overTarget ? "ring-1 ring-[#4157FE]" : "",
      ].join(" ")}
      style={{ height: props.rowHeight }}
      onMouseEnter={() => props.setHoverRowId(row.task.id)}
      onMouseLeave={() => props.setHoverRowId(null)}
    >
      <div className="flex items-center gap-1 w-[52px] shrink-0">
        <button
          type="button"
          onPointerDown={(e) => {
            stop(e);
            props.onReorderPointerDown(e);
          }}
          className={[
            "h-7 w-7 rounded-md flex items-center justify-center",
            "transition-opacity",
            showHoverUI
              ? "opacity-100 cursor-grab active:cursor-grabbing"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
          aria-label="Reorder"
        >
          <GripVertical className="h-4 w-4 text-[#64748B]" />
        </button>

        {/* Checkbox */}
        <div
          className={[
            "transition-opacity",
            showHoverUI ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          onPointerDown={stop}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox className="h-4 w-4" />
        </div>
      </div>

      <div style={{ width: row.depth * 14 }} className="shrink-0" />

      <div className="relative w-80 min-w-0">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 min-w-0">
                {row.hasChildren ? (
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onToggle();
                    }}
                    className="shrink-0"
                  >
                    <Image
                      src="/assets/arrow-left-fill.svg"
                      alt=""
                      width={16}
                      height={16}
                      className={[
                        "transition-transform",
                        props.expanded ? "rotate-90" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>
                ) : (
                  <div className="w-6 shrink-0" />
                )}

                <span className="block text-xs text-[#191F38] font-medium leading-5 tracking-tight truncate">
                  {row.task.title}
                </span>
              </div>
            </TooltipTrigger>

            <TooltipContent side="top" align="start" className="max-w-[360px]">
              <div className="text-xs text-[#191F38] font-medium leading-5 tracking-tight truncate">
                {row.task.title}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {showHoverUI && (
          <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10 bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/95 to-transparent" />
        )}

        <div
          className={[
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1",
            "transition-opacity",
            showHoverUI ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          onPointerDown={stop}
          onClick={(e) => e.stopPropagation()}
        >
          {row.hasChildren && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                props.onToggle();
              }}
              title={props.expanded ? "Collapse" : "Expand"}
            >
              {props.expanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button
            variant="outline"
            className=""
            title="Add subtask"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="/assets/plus-gray.svg" alt="" width={16} height={16} />
          </Button>

          <Button
            variant="outline"
            title="Rename"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="/assets/edit.svg" alt="" width={16} height={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
