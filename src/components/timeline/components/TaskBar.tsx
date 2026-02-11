"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitBranch, Info } from "lucide-react";
import { resolveStatusTheme } from "@/components/timeline/utils/theme";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";

export function TaskBar(props: {
  task: TimelineTask & { lane: number };
  style: React.CSSProperties;
  isTooSmall: boolean;
  serial: number;
  hoveredBarId: string | null;
  setHoveredBarId: (id: string | null) => void;
  onMovePointerDown: (e: React.PointerEvent) => void;
  onResizeStart: (e: React.PointerEvent) => void;
  onResizeEnd: (e: React.PointerEvent) => void;
  onShowHoverCard?: (el: HTMLElement) => void;
  onHideHoverCard?: () => void;
  setIsOverTask: (v: boolean) => void;
  statusThemes?: Record<string, any>;
}) {
  const { task, style, isTooSmall, serial } = props;

  const theme = resolveStatusTheme(props.statusThemes, task.status);

  return (
    <div
      className="absolute z-30 pointer-events-auto flex items-center justify-between h-8 px-2 rounded-md shadow-sm cursor-pointer transition-all opacity-80 hover:opacity-100"
      style={{
        ...style,
        backgroundColor: theme.bg,
        color: theme.text,
      }}
      onMouseEnter={(e) => {
        props.setIsOverTask(true);
        props.setHoveredBarId(task.id);
        if (isTooSmall && props.onShowHoverCard)
          props.onShowHoverCard(e.currentTarget);
      }}
      onMouseLeave={() => {
        props.setIsOverTask(false);
        props.setHoveredBarId(null);
        if (isTooSmall && props.onHideHoverCard) props.onHideHoverCard();
      }}
      onPointerDown={props.onMovePointerDown}
    >
      {/* resize handles */}
      <div
        onPointerDown={props.onResizeStart}
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
        onPointerDown={props.onResizeEnd}
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
        className="flex items-center gap-2 overflow-hidden border-l-2"
        style={{ borderLeftColor: theme.border }}
      >
        {!isTooSmall && (
          <div className="flex items-center gap-1 pl-2">
            <span
              className="text-[10px] font-bold"
              style={{ color: theme.text }}
            >
              {serial}
            </span>
            <GitBranch size={12} style={{ color: theme.text }} />
          </div>
        )}

        <span
          className={`text-[11px] font-medium truncate ${isTooSmall ? "pl-2" : ""}`}
          style={{ color: theme.text }}
        >
          {task.title}
        </span>
      </div>

      {!isTooSmall && (
        <div className="flex items-center gap-2 shrink-0">
          <Avatar className="w-5 h-5 border border-white shrink-0">
            <AvatarImage src={task.assignee} alt={task.title} />
            <AvatarFallback className="text-[8px] bg-[#191F38] text-white">
              {task.assignee ? task.assignee.slice(0, 2).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>

          {props.hoveredBarId === task.id && (
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseEnter={(e) => {
                props.onShowHoverCard?.(
                  e.currentTarget as unknown as HTMLElement,
                );
              }}
              onMouseLeave={() => props.onHideHoverCard?.()}
            >
              <Info size={14} style={{ color: theme.text }} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
