"use client";

import * as React from "react";
import { format } from "date-fns";
import { X, Calendar as CalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

type DateRange = { from?: Date; to?: Date };

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function GanttCreateTaskPanel(props: {
  open: boolean;
  anchor: { x: number; y: number } | null;

  mode: "new" | "edit";
  initialTitle?: string;
  initialRange?: DateRange;

  onClose: () => void;

  onSubmit: (payload: { title: string; range: DateRange }) => void;
}) {
  const [title, setTitle] = React.useState(props.initialTitle ?? "");
  const [range, setRange] = React.useState<DateRange>(props.initialRange ?? {});
  const [showCalendar, setShowCalendar] = React.useState(false);

  const [vp, setVp] = React.useState({ w: 1200, h: 800 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    if (props.open) {
      setTitle(props.initialTitle ?? "");
      setRange(props.initialRange ?? {});
      setShowCalendar(false);
    }
  }, [props.open, props.initialTitle, props.initialRange]);

  // close on Escape
  React.useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  if (!props.open || !props.anchor) return null;

  // Panel size (used for clamping)
  const PANEL_W = 360;
  const PANEL_H = showCalendar ? 520 : 170;

  const left = clamp(props.anchor.x, 12, vp.w - PANEL_W - 12);
  const top = clamp(props.anchor.y, 12, vp.h - PANEL_H - 12);

  const canSubmit = title.trim().length > 0 && !!range.from && !!range.to;

  const prettyFrom = range.from ? format(range.from, "M/d/yy") : "";
  const prettyTo = range.to ? format(range.to, "M/d/yy") : "";

  return (
    <>
      {/* backdrop (click outside to close) */}
      <div
        className="fixed inset-0 z-[90]"
        onMouseDown={props.onClose}
        style={{ background: "transparent" }}
      />

      {/* floating panel */}
      <div
        className="fixed z-[100] rounded-xl border border-[#2B2F36] bg-[#0B0F14] text-white shadow-2xl"
        style={{ left, top, width: PANEL_W }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="text-sm font-semibold">
            {props.mode === "new" ? "Create Task" : "Edit Task"}
          </div>
          <button
            type="button"
            className="h-8 w-8 rounded-md hover:bg-white/10 flex items-center justify-center"
            onClick={props.onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* input row */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name"
              className="h-10 bg-[#11151C] border-[#2B2F36] text-white placeholder:text-white/40"
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSubmit) {
                  props.onSubmit({ title: title.trim(), range });
                }
              }}
            />

            <Button
              className="h-10"
              disabled={!canSubmit}
              onClick={() => props.onSubmit({ title: title.trim(), range })}
            >
              {props.mode === "new" ? "Create" : "Save"}
            </Button>
          </div>
        </div>

        {/* date pill */}
        <div className="px-4 pt-3 pb-3">
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-lg border border-[#2B2F36] bg-[#11151C] px-3 py-2 hover:bg-[#151B24]"
            onClick={() => setShowCalendar((v) => !v)}
          >
            <div className="flex items-center gap-2 text-xs text-white/80">
              <CalIcon className="h-4 w-4" />
              {range.from && range.to ? (
                <span>
                  {prettyFrom} → {prettyTo}
                </span>
              ) : (
                <span>No dates set for this task</span>
              )}
            </div>
            <span className="text-xs text-white/50">
              {showCalendar ? "Hide" : "Pick dates"}
            </span>
          </button>
        </div>

        {/* calendar section */}
        {showCalendar && (
          <div className="border-t border-[#2B2F36]">
            <div className="p-3">
              <div className="text-xs text-white/60 mb-2">
                Select Start & Due
              </div>

              {/* Shadcn Calendar (range) */}
              <div className="rounded-xl border border-[#2B2F36] bg-[#0F131A] p-2">
                <Calendar
                  mode="range"
                  selected={range as any}
                  onSelect={(r: any) => setRange(r ?? {})}
                  numberOfMonths={1}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  variant="outline"
                  className="border-[#2B2F36] text-white hover:bg-white/10"
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!canSubmit}
                  onClick={() => props.onSubmit({ title: title.trim(), range })}
                >
                  {props.mode === "new" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
