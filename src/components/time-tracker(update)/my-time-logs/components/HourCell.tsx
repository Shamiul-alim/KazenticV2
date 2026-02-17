"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { EditingCell } from "../types";
import { humanizeMinutes, toMinutes } from "../utils/time";
import { HoverLabelPortal } from "./portals/HoverLabelPortal";
import { EditPreviewPortal } from "./portals/EditPreviewPortal";

function CellHoverIcon(props: {
  show: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconSrc: string;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!props.show) setOpen(false);
  }, [props.show]);

  return (
    <>
      <Button
        ref={btnRef}
        variant="outline"
        size="sm"
        className={`absolute left-2 top-1/2 -translate-y-1/2 h-6 flex items-center justify-center shadow-sm transition-all ${
          props.show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      >
        <Image src={props.iconSrc} alt="" width={14} height={14} />
      </Button>

      <HoverLabelPortal
        open={open && props.show}
        targetEl={btnRef.current}
        label={props.label}
      />
    </>
  );
}

function RunningTimerPill(props: { elapsed: string; onStop: () => void }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="inline-flex items-center gap-2 px-1.5 py-0.5 rounded-md bg-[#FDFDFD] border border-[#EBEBEB] shadow-sm mt-1">
        <button
          type="button"
          className="w-4 h-4 rounded-[6px] bg-[#DC2626] flex items-center justify-center"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            props.onStop();
          }}
        />
        <span className="text-[11px] font-medium text-[#191F38] tabular-nums">
          {props.elapsed}
        </span>
      </div>
    </div>
  );
}

export function HourCell(props: {
  hour: string;
  isTotal?: boolean;
  isSubEntry?: boolean;

  editable?: boolean;
  dayIndex?: number;
  editCell?: EditingCell;
  onEdit?: (cell: EditingCell, current: string) => void;

  onAddEntry?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  runningPill?: { elapsed: string; onStop: () => void } | null;
  activeMarker?: boolean;

  editing: EditingCell;
  draft: string;
  setDraft: (v: string) => void;
  commitEdit: () => void;
  cancelEdit: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const {
    hour,
    isTotal = false,
    isSubEntry = false,
    editable = false,
    dayIndex,
    editCell,
    onEdit,
    onAddEntry,
    runningPill = null,
    activeMarker = false,
    editing,
    draft,
    setDraft,
    commitEdit,
    cancelEdit,
    inputRef,
  } = props;

  const [hovered, setHovered] = useState(false);

  const displayHour = toMinutes(hour) === 0 ? "-" : hour;
  const hasValue = displayHour !== "-";

  const isEditing =
    !!editing &&
    !!editCell &&
    editing.kind === editCell.kind &&
    editing.taskId === editCell.taskId &&
    editing.dayIndex === editCell.dayIndex &&
    (editing.kind !== "sub" ||
      (editCell.kind === "sub" &&
        (editing as any).subKey === (editCell as any).subKey));

  const canEdit =
    !isTotal &&
    editable &&
    (!isSubEntry || hasValue) &&
    !isEditing &&
    !runningPill;

  const tdRef = useRef<HTMLTableCellElement | null>(null);

  const maxHours = 9;
  const mins = toMinutes(displayHour);
  const hoursFloat = mins / 60;

  const percentage = isTotal
    ? 100
    : mins > 0
      ? Math.min((hoursFloat / maxHours) * 100, 100)
      : 0;
  const barColor = hoursFloat >= 9 || isTotal ? "bg-[#22C55E]" : "bg-[#F87171]";

  const previewMins = isEditing ? toMinutes(draft) : 0;
  const showPreview = isEditing && draft.trim().length > 0 && previewMins > 0;
  const previewLabel = humanizeMinutes(previewMins);
  const canShowAddEntryIcon =
    hovered &&
    !isTotal &&
    !isEditing &&
    !!onAddEntry &&
    editable &&
    !runningPill;

  return (
    <td
      ref={tdRef}
      className={`relative border-l border-[#EBEBEB] text-center align-middle
        w-28 min-w-[80px] h-11 p-0
        ${displayHour === "-" ? "bg-[#F3F4F6]" : "bg-white"}
        ${isTotal ? "bg-[#F8FAFC] font-bold" : ""}
        ${!isTotal ? "hover:ring-1 hover:ring-[#E2E8F0] hover:ring-inset" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => {
        if (e.button === 0) e.stopPropagation();
      }}
      onClick={(e) => {
        if (!canEdit) return;
        e.stopPropagation();
        if (typeof dayIndex !== "number") return;
        onEdit?.(editCell ?? null, displayHour);
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1.25 bg-[#E4E4E4]">
        {(mins > 0 || isTotal) && (
          <div
            className={`h-full ${barColor} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>

      <CellHoverIcon
        show={canShowAddEntryIcon}
        label="Add entry"
        iconSrc="/assets/clock-blue.svg"
        onClick={(e) => onAddEntry?.(e)}
      />

      {!isEditing && (
        <>
          {runningPill ? (
            <RunningTimerPill
              elapsed={runningPill.elapsed}
              onStop={runningPill.onStop}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              {activeMarker ? (
                <Clock size={14} className="text-[#697588]" />
              ) : (
                <span
                  className={` text-[11px] text-[#191F38] font-medium leading-4 tracking-[-0.05em]`}
                >
                  {displayHour}
                </span>
              )}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="absolute inset-0 w-full h-full bg-transparent text-[11px] font-medium text-[#191F38] text-center outline-none leading-[32px]"
            placeholder="-"
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            onBlur={commitEdit}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />

          <EditPreviewPortal
            open={showPreview}
            targetEl={tdRef.current}
            label={previewLabel}
          />
        </>
      )}
    </td>
  );
}
