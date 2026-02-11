"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GanttTask } from "@/data/gantt/gantt.types";
import Image from "next/image";

export function GanttBar(props: {
  task: GanttTask;
  rowIndex: number;
  rowHeight: number;
  style: React.CSSProperties;
  theme: { bg: string; border: string; text: string };

  isHovered: boolean;
  setHovered: (v: boolean) => void;

  onMovePointerDown: (e: React.PointerEvent) => void;
  onResizeStart: (e: React.PointerEvent) => void;
  onResizeEnd: (e: React.PointerEvent) => void;

  dep: {
    linkingFrom: any;
    startLink: (from: any) => void;
    finishLink: (to: any) => void;
  };
}) {
  const { task, style, theme, isHovered } = props;
  const barHeight = typeof style.height === "number" ? style.height : 32;
  const cy = barHeight / 2;

  return (
    <div
      className="absolute z-30 "
      style={{
        ...style,
        overflow: "visible",
      }}
      onMouseEnter={() => props.setHovered(true)}
      onMouseLeave={() => props.setHovered(false)}
    >
      <div
        className="relative h-full w-full rounded-md  shadow-sm cursor-grab"
        style={{
          backgroundColor: theme.bg,
        }}
        onPointerDown={props.onMovePointerDown}
      />

      <div
        className="absolute left-0 top-0 h-full w-3 cursor-ew-resize"
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onResizeStart(e);
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-3 cursor-ew-resize"
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onResizeEnd(e);
        }}
      />

      {isHovered && (
        <>
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              props.onResizeStart(e);
            }}
            style={{
              position: "absolute",
              left: 2,
              top: 6,
              width: 3,
              height: barHeight - 12,
              borderRadius: 9999,
              background: theme.border,
              opacity: 0.55,
              cursor: "ew-resize",
            }}
          />
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              props.onResizeEnd(e);
            }}
            style={{
              position: "absolute",
              right: 2,
              top: 6,
              width: 3,
              height: barHeight - 12,
              borderRadius: 9999,
              background: theme.border,
              opacity: 0.55,
              cursor: "ew-resize",
            }}
          />
        </>
      )}

      {/* Dependency dots OUTSIDE the bar */}
      {isHovered && (
        <>
          <Image
            src="/assets/Hexagon.svg"
            alt=""
            width={14}
            height={14}
            className="absolute -left-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ borderColor: theme.border }}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.dep.startLink({ taskId: task.id, side: "start" });
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.dep.finishLink({ taskId: task.id, side: "start" });
            }}
          />
          <Image
            src="/assets/Hexagon.svg"
            alt=""
            width={14}
            height={14}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ borderColor: theme.border }}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.dep.startLink({ taskId: task.id, side: "end" });
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.dep.finishLink({ taskId: task.id, side: "end" });
            }}
          />
        </>
      )}

      <div
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
        style={{
          left: "calc(100% + 20px)",
        }}
      >
        <Avatar
          className="h-6 w-6 shrink-0 border-2 shadow-[0_1px_2px_rgba(16,24,40,0.12)]"
          style={{ borderColor: theme.border }}
        >
          <AvatarImage src={task.assignee} alt={task.title} />
          <AvatarFallback className="text-[10px] bg-[#191F38] text-white">
            {task.assignee ? task.assignee.slice(0, 2).toUpperCase() : "??"}
          </AvatarFallback>
        </Avatar>

        <span className="text-[12px] font-medium leading-4.5 tracking-tight whitespace-nowrap text-[#191F38]">
          {task.title}
        </span>
      </div>
    </div>
  );
}
