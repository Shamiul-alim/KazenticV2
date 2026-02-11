"use client";

import { format, isSameDay, isWeekend, startOfWeek } from "date-fns";

export function HeaderSecondRow(props: {
  variant: "day" | "week" | "month";
  top: number;
  height: number;
  cellWidth: number;
  buckets: Date[];
  start: number;
  end: number;
  padLeft: number;
  padRight: number;
}) {
  const {
    variant,
    top,
    height,
    cellWidth,
    buckets,
    start,
    end,
    padLeft,
    padRight,
  } = props;

  return (
    <div
      className="sticky z-10 flex border-b border-[#EBEBEB] bg-[#F9FAFB]"
      style={{ top, height }}
    >
      {/* left padding */}
      {padLeft > 0 && <div style={{ width: padLeft }} />}

      {variant === "day" &&
        buckets.slice(start, end).map((day, i) => {
          const realIdx = start + i;
          const weekend = isWeekend(day);
          const today = isSameDay(day, new Date());

          return (
            <div
              key={realIdx}
              className={`flex flex-col items-center justify-center border-r border-[#EBEBEB] text-xs text-[#697588] ${
                weekend ? "bg-[#F3F4F6]" : ""
              }`}
              style={{ minWidth: cellWidth, height: "100%" }}
            >
              <span
                className={`text-[11px] font-medium leading-4 tracking-tight ${today ? "text-[#4157FE]" : ""}`}
              >
                {format(day, "EEE d")}
              </span>
            </div>
          );
        })}

      {variant === "week" &&
        buckets.slice(start, end).map((day, i) => {
          const realIdx = start + i;
          const today = isSameDay(day, new Date());
          const weekend = isWeekend(day);
          const weekStart = format(day, "i") === "1";

          return (
            <div
              key={realIdx}
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

      {variant === "month" &&
        buckets.slice(start, end).map((weekStart, i) => {
          const realIdx = start + i;

          const today = isSameDay(
            startOfWeek(new Date(), { weekStartsOn: 1 }),
            weekStart,
          );

          const isMonthEnd =
            realIdx === buckets.length - 1
              ? true
              : format(weekStart, "yyyy-MM") !==
                format(buckets[realIdx + 1], "yyyy-MM");

          return (
            <div
              key={realIdx}
              className={`flex items-center justify-center text-xs text-[#697588] ${
                isMonthEnd ? "border-r border-r-[#EBEBEB]" : ""
              }`}
              style={{ minWidth: cellWidth, height: "100%" }}
            >
              <span className={today ? "text-[#4157FE] font-bold" : ""}>
                {format(weekStart, "d")}
              </span>
            </div>
          );
        })}

      {/* right padding */}
      {padRight > 0 && <div style={{ width: padRight }} />}
    </div>
  );
}
