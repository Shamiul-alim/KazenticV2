"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function EditPreviewPortal(props: {
  open: boolean;
  targetEl: HTMLElement | null;
  label: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const computePos = () => {
    if (!props.targetEl) return;
    const r = props.targetEl.getBoundingClientRect();
    setPos({ left: r.left + r.width / 2, top: r.top + r.height / 2 + 30 });
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
      className="fixed z-[90] pointer-events-none"
      style={{
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap">
        {props.label}
      </div>
    </div>,
    document.body,
  );
}
