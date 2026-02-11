"use client";

import { Plus } from "lucide-react";

export function HoverCell(props: {
  visible: boolean;
  x: number;
  y: number;
  cellWidth: number;
  onCreate: () => void;
}) {
  if (!props.visible) return null;

  return (
    <div
      onClick={props.onCreate}
      className="absolute h-8 bg-[#F2F9FE] rounded-sm border border-[#4157FE] z-20 flex items-center justify-center transition-all duration-75 cursor-pointer"
      style={{
        left: props.x,
        top: props.y,
        width: props.cellWidth,
      }}
    >
      <Plus className="text-[#697588]" size={14} strokeWidth={3} />
    </div>
  );
}
