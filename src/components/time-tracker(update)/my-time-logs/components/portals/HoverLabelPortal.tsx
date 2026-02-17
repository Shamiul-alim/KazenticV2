"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function HoverLabelPortal(props: {
  open: boolean;
  targetEl: HTMLElement | null;
  label: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const computePos = () => {
    if (!props.targetEl) return;
    const r = props.targetEl.getBoundingClientRect();
    setPos({ left: r.left + r.width / 2, top: r.top });
  };

  useEffect(() => {
    if (!props.open) return;
    computePos();

    const onScroll = () => computePos();
    const onResize = () => computePos();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [props.open, props.targetEl]);

  if (!props.open || !pos) return null;

  return createPortal(
    <div
      className="fixed z-[80] pointer-events-none"
      style={{
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, -100%) translateY(-14px)",
      }}
    >
      <div className="relative rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap">
        {props.label}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-[#EBEBEB]" />
        <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-1px)] w-0 h-0 border-x-[7px] border-x-transparent border-t-[7px] border-t-[#FDFDFD]" />
      </div>
    </div>,
    document.body,
  );
}
