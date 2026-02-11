"use client";

import * as React from "react";

export function GanttCreateMarker(props: {
  x: number;
  rowTop: number;
  rowHeight: number;

  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

  label?: string;
}) {
  const DOT = 34;
  const dotLeft = props.x - DOT / 2;
  const dotTop = props.rowTop + (props.rowHeight - DOT) / 2;

  return (
    <>
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: props.x,
          top: props.rowTop,
          height: props.rowHeight,
          transform: "translateX(-0.5px)",
        }}
      >
        <div className="h-full w-full" />
      </div>

      <button
        type="button"
        className="group absolute z-40 focus:outline-none"
        style={{ left: dotLeft, top: dotTop, width: DOT, height: DOT }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
        aria-label="Click to create task"
      >
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-11 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="relative rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap z-50">
            {props.label ?? "Click to Create Task"}

            <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[7px] border-x-transparent border-t-[7px] border-t-[#FDFDFD]" />
          </div>
        </div>

        <span className="block w-7 h-7 shadow-md rounded-full bg-[#4157FE] ml-1  transition-transform duration-150 group-hover:scale-[1.06] " />
      </button>
    </>
  );
}
