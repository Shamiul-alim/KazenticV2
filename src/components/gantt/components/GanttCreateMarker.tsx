"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export function GanttCreateMarker(props: {
  x: number;
  rowTop: number;
  rowHeight: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  viewportEl: HTMLElement | null;
}) {
  const DOT = 24;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<{ left: number; top: number } | null>(
    null,
  );

  const computePos = React.useCallback(() => {
    const viewport = props.viewportEl;
    if (!viewport) return;

    const vRect = viewport.getBoundingClientRect();

    const leftInViewport = props.x - viewport.scrollLeft;

    const dotLeft = vRect.left + leftInViewport - DOT / 2;
    const dotTop = vRect.top + props.rowTop + (props.rowHeight - DOT) / 2;

    setPos({ left: dotLeft + DOT / 2, top: dotTop - 10 });
  }, [props.viewportEl, props.x, props.rowTop, props.rowHeight]);

  React.useEffect(() => {
    if (!open) return;
    computePos();

    const viewport = props.viewportEl;
    if (!viewport) return;

    const onScroll = () => computePos();
    const onResize = () => computePos();

    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [open, computePos, props.viewportEl]);

  const dotLeft = props.x - DOT / 2;
  const dotTop = props.rowTop + (props.rowHeight - DOT) / 2;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="group absolute focus:outline-none"
        style={{ left: dotLeft, top: dotTop, width: DOT, height: DOT }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      >
        {/* Smaller Dot */}
        <span className="block w-[24px] h-[24px] rounded-full bg-[#4157FE] shadow-md transition-transform duration-150 group-hover:scale-105" />
      </button>

      {open && pos
        ? createPortal(
            <div
              className="fixed z-[80]  pointer-events-none"
              style={{
                left: pos.left,
                top: pos.top,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="relative  rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap">
                {props.label ?? "Click to Create Task"}

                <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-[#EBEBEB]" />
                <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-1px)] w-0 h-0 border-x-[7px] border-x-transparent border-t-[7px] border-t-[#FDFDFD]" />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
