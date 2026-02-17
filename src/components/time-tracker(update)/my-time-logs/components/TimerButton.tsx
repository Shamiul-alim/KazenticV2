"use client";

import React, { useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { HoverLabelPortal } from "./portals/HoverLabelPortal";

export function TimerButton(props: { running: boolean; onToggle: () => void }) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="w-8 h-8 rounded-full border border-[#EBEBEB] bg-[#FDFDFD] flex items-center justify-center hover:bg-[#F2F9FE] transition"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          props.onToggle();
        }}
      >
        {props.running ? (
          <Square size={14} className="text-[#DC2626]" />
        ) : (
          <Play size={14} className="text-[#4157FE]" />
        )}
      </button>

      <HoverLabelPortal
        open={open}
        targetEl={btnRef.current}
        label={props.running ? "Stop timer" : "Start timer"}
      />
    </>
  );
}
