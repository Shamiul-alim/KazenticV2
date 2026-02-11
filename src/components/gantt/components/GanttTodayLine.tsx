"use client";

import { bucketIndexFromDate } from "@/components/gantt/utils/bucket";

export function GanttTodayLine(props: {
  mode: "day" | "week" | "month";
  startDate: Date;
  cellWidth: number;
  headerHeight: number;
  contentHeight: number;
}) {
  const today = new Date();
  const idx = bucketIndexFromDate(props.mode, props.startDate, today);
  if (idx < 0) return null;

  const x = idx * props.cellWidth + props.cellWidth / 2;

  const lineHeight = Math.max(0, props.contentHeight - props.headerHeight);

  return (
    <div className="absolute z-50 pointer-events-none" style={{ left: x }}>
      {/* dot */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: 9999,
          background: "#4157FE",
          boxShadow: "0 0 0 2px #ffffff",
        }}
      />

      {/* line */}
      <div
        style={{
          position: "absolute",
          top: 1,
          left: -1,
          width: 2,
          background: "#4157FE",
          opacity: 0.9,
          borderRadius: 9999,
          minHeight: "calc(100vh - 120px)",
        }}
      />
    </div>
  );
}
