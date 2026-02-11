"use client";

export function GanttCreateTaskGhost(props: {
  rowTop: number;
  rowHeight: number;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={props.hovered ? "bg-[#F2F9FE]" : ""}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: props.rowTop,
        height: props.rowHeight,
        opacity: props.hovered ? 0.4 : 0,
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
}
