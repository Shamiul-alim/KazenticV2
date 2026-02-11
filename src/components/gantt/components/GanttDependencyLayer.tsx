"use client";

import React, { useMemo, useRef, useState } from "react";
import { parseISO } from "date-fns";
import { X } from "lucide-react";
import { bucketIndexFromDate } from "@/components/gantt/utils/bucket";
import { GanttRow } from "@/components/gantt/hooks/useGanttRows";

type Dep = {
  id: string;
  fromTaskId: string;
  toTaskId: string;
  fromSide: "start" | "end";
  toSide: "start" | "end";
  color?: string;
};

type Pt = { x: number; y: number };

// Define the shape of our rendered dependency object
interface RenderedDep {
  dep: Dep;
  d: string;
  color: string;
  a: Pt;
  b: Pt;
}

export function GanttDependencyLayer(props: {
  mode: "day" | "week" | "month";
  startDate: Date;
  cellWidth: number;
  rowHeight: number;
  headerHeight: number;
  rows: GanttRow[];
  deps: Dep[];
  linkingFrom: { taskId: string; side: "start" | "end" } | null;
  mouse: { x: number; y: number } | null;
  onRemove: (id: string) => void;
}) {
  const rowIndex = useMemo(
    () => new Map(props.rows.map((r, i) => [r.task.id, i])),
    [props.rows],
  );

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<{
    depId: string;
    x: number;
    y: number;
  } | null>(null);
  const [crossHovering, setCrossHovering] = useState(false);

  const barCenterY = (ri: number) =>
    props.headerHeight + ri * props.rowHeight + props.rowHeight / 2;

  const endpointFor = (taskId: string, side: "start" | "end"): Pt | null => {
    const r = props.rows.find((x) => x.task.id === taskId);
    const ri = rowIndex.get(taskId);
    if (!r || ri == null) return null;

    const sIdx = bucketIndexFromDate(
      props.mode,
      props.startDate,
      parseISO(r.task.startDate),
    );
    const dIdx = bucketIndexFromDate(
      props.mode,
      props.startDate,
      parseISO(r.task.dueDate),
    );

    const x =
      side === "start" ? sIdx * props.cellWidth : (dIdx + 1) * props.cellWidth;
    return { x, y: barCenterY(ri) };
  };

  const getSmartPath = (a: Pt, b: Pt, aTaskId: string, bTaskId: string) => {
    const buffer = 24;
    const radius = 8;
    const riA = rowIndex.get(aTaskId) ?? 0;
    const riB = rowIndex.get(bTaskId) ?? 0;
    const isDirect = b.x >= a.x + buffer * 2;
    const isBelow = riB > riA;

    if (isDirect) {
      const turnX = b.x - buffer;
      return [
        `M ${a.x} ${a.y}`,
        `L ${turnX - radius} ${a.y}`,
        `Q ${turnX} ${a.y} ${turnX} ${a.y + (isBelow ? radius : -radius)}`,
        `L ${turnX} ${b.y + (isBelow ? -radius : radius)}`,
        `Q ${turnX} ${b.y} ${turnX + radius} ${b.y}`,
        `L ${b.x} ${b.y}`,
      ].join(" ");
    } else {
      const outX = a.x + buffer;
      const inX = b.x - buffer;
      const laneY = isBelow
        ? props.headerHeight + (riA + 1) * props.rowHeight
        : props.headerHeight + riA * props.rowHeight;

      return [
        `M ${a.x} ${a.y}`,
        `L ${outX - radius} ${a.y}`,
        `Q ${outX} ${a.y} ${outX} ${a.y + (isBelow ? radius : -radius)}`,
        `L ${outX} ${laneY + (isBelow ? -radius : radius)}`,
        `Q ${outX} ${laneY} ${outX - radius} ${laneY}`,
        `L ${inX + radius} ${laneY}`,
        `Q ${inX} ${laneY} ${inX} ${laneY + (isBelow ? radius : -radius)}`,
        `L ${inX} ${b.y + (isBelow ? -radius : radius)}`,
        `Q ${inX} ${b.y} ${inX + radius} ${b.y}`,
        `L ${b.x} ${b.y}`,
      ].join(" ");
    }
  };

  const rendered = useMemo((): RenderedDep[] => {
    return props.deps
      .map((dep) => {
        const a = endpointFor(dep.fromTaskId, dep.fromSide);
        const b = endpointFor(dep.toTaskId, dep.toSide);
        if (!a || !b) return null;
        return {
          dep,
          d: getSmartPath(a, b, dep.fromTaskId, dep.toTaskId),
          color: dep.color ?? "#ef4444",
          a,
          b,
        };
      })
      .filter((item): item is RenderedDep => item !== null);
  }, [props.deps, props.rows, props.mode, props.cellWidth, props.rowHeight]);

  const handleMouseMove = (e: React.MouseEvent, depId: string) => {
    const svg = svgRef.current;
    if (!svg) return;

    const pathElement = svg.querySelector(
      `[data-dep-id="${depId}"]`,
    ) as SVGPathElement;
    if (!pathElement) return;

    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pathLength = pathElement.getTotalLength();
    let closestPt = { x: 0, y: 0 };
    let minDistance = Infinity;

    for (let i = 0; i <= 100; i++) {
      const p = pathElement.getPointAtLength((i / 100) * pathLength);
      const dist = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
      if (dist < minDistance) {
        minDistance = dist;
        closestPt = { x: p.x, y: p.y };
      }
    }
    setHover({ depId, x: closestPt.x, y: closestPt.y });
  };

  const preview = useMemo(() => {
    if (!props.linkingFrom || !props.mouse) return null;
    const a = endpointFor(props.linkingFrom.taskId, props.linkingFrom.side);
    if (!a) return null;
    const b = props.mouse;
    const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;

    return { a, b, d };
  }, [
    props.linkingFrom,
    props.mouse,
    props.rows,
    props.mode,
    props.cellWidth,
    props.rowHeight,
    props.headerHeight,
  ]);

  return (
    <div className="absolute inset-0 z-20">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ shapeRendering: "geometricPrecision", pointerEvents: "auto" }}
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="transparent"
          onMouseMove={() => {
            if (!crossHovering) setHover(null);
          }}
        />
        {rendered.map((r) => {
          const isHovered = hover?.depId === r.dep.id;
          return (
            <g key={r.dep.id}>
              <path
                data-dep-id={r.dep.id}
                d={r.d}
                fill="none"
                stroke="transparent"
                strokeWidth={32}
                className="cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, r.dep.id)}
              />
              <path
                d={r.d}
                fill="none"
                stroke={r.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-opacity duration-200"
                style={{ opacity: hover && !isHovered ? 0.2 : 1 }}
              />
              <circle
                cx={r.a.x}
                cy={r.a.y}
                r={3.5}
                fill="white"
                stroke={r.color}
                strokeWidth={2}
              />
              <circle cx={r.b.x} cy={r.b.y} r={3.5} fill={r.color} />
            </g>
          );
        })}

        {preview && (
          <g>
            {/* dashed line */}
            <path
              d={preview.d}
              fill="none"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeDasharray="4 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />

            {/* start dot */}
            <circle
              cx={preview.a.x}
              cy={preview.a.y}
              r={5}
              fill="#FFFFFF"
              stroke="#9CA3AF"
              strokeWidth={2}
            />

            {/* cursor dot */}
            <circle
              cx={preview.b.x}
              cy={preview.b.y}
              r={5}
              fill="#FFFFFF"
              stroke="#9CA3AF"
              strokeWidth={2}
            />
          </g>
        )}
      </svg>

      {hover && (
        <div
          className="absolute z-50 pointer-events-auto"
          style={{
            left: hover.x,
            top: hover.y,
            transform: "translate(-50%, -50%)",
            transition: "left 0.04s linear, top 0.04s linear",
          }}
          onMouseEnter={() => setCrossHovering(true)}
          onMouseLeave={() => setCrossHovering(false)}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* bigger invisible hitbox */}
          <button
            type="button"
            onClick={() => {
              props.onRemove(hover.depId);
              setHover(null);
            }}
            className="relative"
            style={{ width: 5, height: 5 }}
          >
            {/* visible button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-5 h-5 bg-red-600 rounded-full border-[3px] border-white shadow-xl hover:scale-110 active:scale-95 transition-transform">
                <X size={14} strokeWidth={4} className="text-white" />
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
