"use client";

import { format, isWeekend } from "date-fns";

export function GridBackground(props: {
  mode: "day" | "week" | "month";
  headerHeight: number;
  cellWidth: number;
  buckets: Date[];
  start: number;
  end: number;
  padLeft: number;
  padRight: number;
}) {
  const {
    mode,
    headerHeight,
    cellWidth,
    buckets,
    start,
    end,
    padLeft,
    padRight,
  } = props;

  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 z-0 flex pointer-events-none"
      style={{ top: headerHeight, minHeight: "calc(100vh - 120px)" }}
    >
      {padLeft > 0 && <div style={{ width: padLeft }} />}

      {buckets.slice(start, end).map((d, i) => {
        const realIdx = start + i;
        const weekendBg = mode !== "month" && isWeekend(d);
        const isDayBorder = mode === "day";
        const isWeekStart = mode === "week" && d.getDay() === 1;

        const isMonthStart =
          mode === "month" &&
          (realIdx === 0 ||
            format(d, "yyyy-MM") !== format(buckets[realIdx - 1], "yyyy-MM"));

        return (
          <div
            key={realIdx}
            className={`
              ${isDayBorder ? "border-r border-r-[#EBEBEB]" : ""}
              ${isWeekStart || isMonthStart ? "border-l border-l-[#EBEBEB]" : ""}
              ${weekendBg ? "bg-[#F9FAFB]" : "bg-transparent"}
            `}
            style={{ width: cellWidth, minWidth: cellWidth }}
          />
        );
      })}

      {padRight > 0 && <div style={{ width: padRight }} />}
    </div>
  );
}
