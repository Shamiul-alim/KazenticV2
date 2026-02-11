"use client";

import React from "react";
import { addDays, differenceInDays, isSameDay, startOfWeek } from "date-fns";
import { ZoomIn, ZoomOut, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { clamp } from "@/components/timeline/utils/math";
import { getRadixScrollViewport } from "@/components/timeline/utils/dom";

export function GanttTopBar(props: {
  mode: "day" | "week" | "month";
  setMode: (v: "day" | "week" | "month") => void;
  zoom: number;
  setZoom: (v: number) => void;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  buckets: Date[];
  cellWidth: number;
  leftPaneWidth: number;
}) {
  const centerToday = () => {
    const viewport = getRadixScrollViewport(props.scrollRootRef.current);
    if (!viewport || !props.buckets.length) return;

    const today = new Date();

    const idx = props.buckets.findIndex((d) => {
      if (props.mode === "month") {
        const tw = startOfWeek(today, { weekStartsOn: 1 });
        return isSameDay(d, tw);
      }
      return isSameDay(d, today);
    });

    if (idx < 0) return;

    const totalW = props.buckets.length * props.cellWidth;
    const desired =
      idx * props.cellWidth - viewport.clientWidth / 2 + props.cellWidth / 2;

    viewport.scrollLeft = clamp(
      desired,
      0,
      Math.max(0, totalW - viewport.clientWidth),
    );
  };

  const setZoomKeepingCenter = (nextZoom: number) => {
    const viewport = getRadixScrollViewport(props.scrollRootRef.current);
    if (!viewport) return props.setZoom(nextZoom);

    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    const centerIdx = Math.max(0, Math.round(centerX / props.cellWidth));

    props.setZoom(nextZoom);

    requestAnimationFrame(() => {
      const vp = getRadixScrollViewport(props.scrollRootRef.current);
      if (!vp) return;

      const nextCellWidth = Math.max(
        40,
        Math.round((props.cellWidth / props.zoom) * nextZoom),
      );
      const totalW = props.buckets.length * nextCellWidth;

      const desired =
        centerIdx * nextCellWidth - vp.clientWidth / 2 + nextCellWidth / 2;

      vp.scrollLeft = clamp(desired, 0, Math.max(0, totalW - vp.clientWidth));
    });
  };

  return (
    <div className="w-full border-b border-[#EBEBEB] bg-[#FDFDFD]">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 border-[#EBEBEB] text-[#191F38]"
            onClick={centerToday}
          >
            Today
          </Button>

          <Select
            value={props.mode}
            onValueChange={(v) => props.setMode(v as any)}
          >
            <SelectTrigger className="h-8 w-28 border-[#EBEBEB] text-[#191F38]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-8 w-8 px-0 border-[#EBEBEB]"
            onClick={() =>
              setZoomKeepingCenter(Math.max(0.6, props.zoom - 0.1))
            }
          >
            <ZoomOut size={16} className="text-[#697588]" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 px-0 border-[#EBEBEB]"
            onClick={() =>
              setZoomKeepingCenter(Math.min(2.2, props.zoom + 0.1))
            }
          >
            <ZoomIn size={16} className="text-[#697588]" />
          </Button>
        </div>

        <Button className="h-8 bg-[#4157FE] hover:bg-[#2F46F3] text-white">
          <Plus size={16} className="mr-2" />
          Create Task
        </Button>
      </div>
    </div>
  );
}
