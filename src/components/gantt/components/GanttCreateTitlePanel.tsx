"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

type Anchor = { x: number; y: number };

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function GanttCreateTitlePanel(props: {
  open: boolean;
  anchor: Anchor | null;
  initialTitle?: string;

  onClose: () => void;
  onCreate: (title: string) => void;
}) {
  const [title, setTitle] = React.useState(props.initialTitle ?? "");
  const [vp, setVp] = React.useState({ w: 1200, h: 800 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    if (!props.open) return;
    setTitle(props.initialTitle ?? "");
  }, [props.open, props.initialTitle]);

  React.useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  if (!props.open || !props.anchor) return null;

  const PANEL_W = 360;
  const PANEL_H = 108;

  const left = clamp(props.anchor.x, 12, vp.w - PANEL_W - 12);
  const top = clamp(props.anchor.y, 12, vp.h - PANEL_H - 12);

  const canCreate = title.trim().length > 0;

  const createNow = () => {
    if (!canCreate) return;
    props.onCreate(title.trim());
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[90]"
        onMouseDown={props.onClose}
        style={{ background: "transparent" }}
      />

      {/* panel */}
      <div
        className="fixed z-[100] rounded-lg border border-[#EBEBEB] bg-white shadow-md"
        style={{ left, top, width: PANEL_W }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 pt-3">
          <div className="text-xs font-medium text-[#191F38]">Create task</div>
          <button
            type="button"
            className="h-8 w-8 rounded-md hover:bg-black/5 flex items-center justify-center"
            onClick={props.onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4 text-[#64748B]" />
          </button>
        </div>

        <div className="px-3 py-3 flex items-center gap-2">
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task name"
            className=""
            onKeyDown={(e) => {
              if (e.key === "Enter") createNow();
            }}
          />
          <Button
            variant="success"
            size="lg"
            disabled={!canCreate}
            onClick={createNow}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
