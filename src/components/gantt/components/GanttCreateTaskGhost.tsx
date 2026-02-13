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
      className={[
        "absolute left-0 right-0 transition-colors pointer-events-none",
        props.hovered ? "bg-[#F2F9FE]" : "",
      ].join(" ")}
      style={{
        top: props.rowTop,
        height: props.rowHeight,
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
}
