"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function AnchoredPopover(props: {
  open: boolean;
  anchorEl: HTMLElement | null;
  offset?: number;
  children: React.ReactNode;
  zIndex?: number;
  width?: number;
}) {
  const { open, anchorEl, offset = 8, zIndex = 120, width = 300 } = props;

  const [pos, setPos] = useState<{
    left: number;
    top: number;
    placement: "bottom" | "top";
  } | null>(null);

  const computePos = () => {
    if (!anchorEl) return;

    const r = anchorEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const estH = 190;

    const canBottom = r.bottom + offset + estH <= vh - 8;
    const placement: "bottom" | "top" = canBottom ? "bottom" : "top";
    const top = placement === "bottom" ? r.bottom + offset : r.top - offset;
    const left = Math.min(Math.max(r.left, 8), vw - width - 8);

    setPos({ left, top, placement });
  };

  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    computePos();

    const onScroll = () => computePos();
    const onResize = () => computePos();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, anchorEl, offset, width]);

  if (!open || !pos) return null;

  const style =
    pos.placement === "bottom"
      ? { left: pos.left, top: pos.top }
      : { left: pos.left, top: pos.top, transform: "translateY(-100%)" };

  return createPortal(
    <div className="fixed" style={{ zIndex, ...style, width }}>
      {props.children}
    </div>,
    document.body,
  );
}
