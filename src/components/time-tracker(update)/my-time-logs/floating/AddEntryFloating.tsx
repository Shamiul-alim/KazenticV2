"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  Play,
  Square,
  Clock,
  AlignLeft,
  DollarSign,
  Slash,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

import { AddEntryTagSection } from "./AddEntryTagSection";
import type { TagDef } from "../utils/tags";
import { pickColor, uid } from "../utils/tags";
import { clamp } from "./internal/clamp";
import { formatClock, formatHMS, toMinutes } from "../utils/time";

export type AddEntryPayload = {
  durationMins: number;
  payable: boolean;
  startTime: string;
  endTime: string;
  notes: string;
  tags: string[];
  source: "manual" | "timer";
};

export type AddEntryAnchor = { x: number; y: number };

function getInitial(name: string) {
  const t = String(name || "").trim();
  return t ? t[0].toUpperCase() : "U";
}

function PayableToggle(props: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const { value, onChange } = props;

  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={() => onChange(!value)}
      className={[
        "h-6 w-12 rounded-full border transition flex items-center px-1",
        value
          ? "bg-[#4157FE] border-[#4157FE]"
          : "bg-[#FFFFFF] border-[#EBEBEB]",
      ].join(" ")}
    >
      <span
        className={[
          "h-4 w-4 rounded-full shadow-sm transition transform flex items-center justify-center",
          "bg-[#FFFFFF] border border-[#EBEBEB]",
          value ? "translate-x-6" : "translate-x-0",
        ].join(" ")}
      >
        <div className="relative">
          <DollarSign size={10} className="text-[#191F38]" />
          {!value && (
            <Slash
              size={10}
              className="text-[#191F38] absolute -right-[1px] -top-[1px]"
            />
          )}
        </div>
      </span>
    </button>
  );
}

/** small internal helper file (optional) */
export default function AddEntryFloating(props: {
  open: boolean;
  onClose: () => void;
  anchor: AddEntryAnchor | null;

  userName: string;
  dayLabel: string;

  onSave: (payload: AddEntryPayload) => void;

  availableTags?: string[];
}) {
  const {
    open,
    onClose,
    anchor,
    userName,
    dayLabel,
    onSave,
    availableTags = [],
  } = props;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const [duration, setDuration] = useState("");
  const [payable, setPayable] = useState(false);

  const [startTime, setStartTime] = useState<string>(() =>
    formatClock(Date.now()),
  );
  const [endTime, setEndTime] = useState<string>(() => formatClock(Date.now()));

  const [notes, setNotes] = useState("");
  const [notesActive, setNotesActive] = useState(false);
  const notesRef = useRef<HTMLInputElement | null>(null);

  const [tagDefs, setTagDefs] = useState<TagDef[]>(() =>
    availableTags.map((t, i) => ({
      id: uid("tag"),
      label: t,
      color: i === 0 ? "#4C2FB8" : pickColor(i),
    })),
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [myColors, setMyColors] = useState<string[]>(() => ["#111827"]);

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    if (!open) return;

    const now = Date.now();
    setDuration("");
    setPayable(false);

    setStartTime(formatClock(now));
    setEndTime(formatClock(now));

    setNotes("");
    setNotesActive(false);

    setSelectedIds([]);
    setAddOpen(false);
    setTagQuery("");
    setEditId(null);

    setTimerRunning(false);
    setTimerStartedAt(null);
    setTick(now);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editId) {
          setEditId(null);
          return;
        }
        if (addOpen) {
          setAddOpen(false);
          setTagQuery("");
          return;
        }
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, addOpen, editId]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const elapsedSecs = useMemo(() => {
    if (!timerRunning || !timerStartedAt) return 0;
    return Math.max(0, Math.floor((tick - timerStartedAt) / 1000));
  }, [timerRunning, timerStartedAt, tick]);

  const durationMinsFromInput = useMemo(() => {
    if (timerRunning && timerStartedAt)
      return Math.max(1, Math.round((tick - timerStartedAt) / 60000));
    return toMinutes(duration);
  }, [duration, timerRunning, timerStartedAt, tick]);

  const canSave = durationMinsFromInput > 0;
  const initial = getInitial(userName);

  useLayoutEffect(() => {
    if (!open || !anchor) return;

    const baseLeft = anchor.x + 12;
    const baseTop = anchor.y - 12;

    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) {
        setPos({ left: baseLeft, top: baseTop });
        return;
      }

      const pr = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const left = clamp(baseLeft, 10, vw - pr.width - 10);
      const top = clamp(baseTop, 10, vh - pr.height - 10);

      setPos({ left, top });
    });
  }, [open, anchor]);

  const toggleTimer = () => {
    const now = Date.now();
    if (timerRunning) {
      setTimerRunning(false);
      setTimerStartedAt(null);
      setEndTime(formatClock(now));
      setDuration(`${durationMinsFromInput}m`);
      return;
    }

    setTimerStartedAt(now);
    setTick(now);
    setTimerRunning(true);
    setStartTime(formatClock(now));
    setEndTime("now");
    setDuration("");
  };

  const tagById = useMemo(() => {
    const m = new Map<string, TagDef>();
    for (const t of tagDefs) m.set(t.id, t);
    return m;
  }, [tagDefs]);

  const selectedTags = useMemo(() => {
    return selectedIds.map((id) => tagById.get(id)).filter(Boolean) as TagDef[];
  }, [selectedIds, tagById]);

  const selectTag = (id: string) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const removeSelected = (id: string) =>
    setSelectedIds((prev) => prev.filter((x) => x !== id));

  const createAndSelect = (label: string) => {
    const clean = label.trim();
    if (!clean) return;

    const next: TagDef = { id: uid("tag"), label: clean, color: "#4C2FB8" };
    setTagDefs((prev) => [next, ...prev]);
    setSelectedIds((prev) => [next.id, ...prev]);
  };

  const updateTag = (id: string, patch: Partial<TagDef>) => {
    setTagDefs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  };

  const deleteTag = (id: string) => {
    setTagDefs((prev) => prev.filter((t) => t.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const addMyColor = (hex: string) => {
    const c = String(hex || "").toUpperCase();
    setMyColors((prev) =>
      prev.some((x) => x.toUpperCase() === c) ? prev : [...prev, c],
    );
  };

  const handleSave = () => {
    if (!canSave) return;

    const now = Date.now();
    const finalEnd = timerRunning ? formatClock(now) : endTime;

    onSave({
      durationMins: durationMinsFromInput,
      payable,
      startTime,
      endTime: finalEnd,
      notes,
      tags: selectedTags.map((t) => t.label),
      source: timerRunning ? "timer" : "manual",
    });

    onClose();
  };

  useEffect(() => {
    if (!open) return;
    if (!notesActive) return;
    const t = setTimeout(() => notesRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open, notesActive]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/10" onMouseDown={onClose} />

      <div
        ref={panelRef}
        className="absolute"
        style={{ left: pos?.left ?? 0, top: pos?.top ?? 0 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="w-[450px] max-w-[calc(100vw-24px)] rounded-lg border border-[#EBEBEB] bg-[#FFFFFF] text-[#191F38] shadow-xl overflow-hidden">
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#F2F6FF] border border-[#EBEBEB] flex items-center justify-center text-sm font-semibold text-[#4157FE]">
                {initial}
              </div>
              <div className="text-sm font-medium text-[#191F38]">
                {userName}
              </div>

              <button
                type="button"
                className="ml-auto h-6 w-6 rounded-full hover:bg-[#F2F6FF] flex items-center justify-center"
                onClick={onClose}
              >
                <X size={16} className="text-[#697588]" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Input
                value={timerRunning ? formatHMS(elapsedSecs) : duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter time (ex: 3h 20m) or start timer"
                disabled={timerRunning}
                className={[
                  "h-10 flex-1 border-0 bg-transparent px-0",
                  "text-sm text-[#191F38] placeholder:text-[#697588]",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "disabled:opacity-60",
                ].join(" ")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") onClose();
                }}
              />

              <button
                type="button"
                className="h-9 w-9 rounded-full bg-[#FDFDFD] border border-[#EBEBEB] flex items-center justify-center"
                onClick={toggleTimer}
              >
                {timerRunning ? (
                  <Square size={16} className="text-[#DC2626]" />
                ) : (
                  <Play size={16} className="text-[#4157FE]" />
                )}
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-[#EBEBEB]" />

          <div className="px-5 py-3 flex items-center gap-3 text-left">
            <Clock size={16} className="text-[#697588]" />
            <div className="flex items-center gap-3 text-xs text-[#191F38]">
              <span className="text-[#697588] text-[11px]">{dayLabel}</span>
              <span className="text-[#697588] text-[11px]">•</span>
              <span className="tabular-nums">{startTime}</span>
              <span className="text-[#697588] text-[11px]">—</span>
              <span className="tabular-nums">{endTime}</span>
            </div>
          </div>

          <div className="px-5 py-3">
            {!notesActive && !notes.trim() ? (
              <button
                type="button"
                className="w-full flex items-center gap-3 text-left hover:bg-[#F6F7FB] transition rounded-md -mx-2 px-2 py-2"
                onClick={() => setNotesActive(true)}
              >
                <AlignLeft size={16} className="text-[#697588]" />
                <span className="text-xs text-[#697588]">Notes</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <AlignLeft size={16} className="text-[#697588]" />
                <Input
                  ref={notesRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes"
                  className={[
                    "h-10 flex-1 rounded-lg",
                    "bg-[#FFFFFF] border border-[#EBEBEB]",
                    "text-sm text-[#191F38] placeholder:text-[#697588]",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  ].join(" ")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") {
                      setNotesActive(false);
                      if (!notes.trim()) setNotes("");
                    }
                  }}
                  onBlur={() => {
                    if (!notes.trim()) setNotesActive(false);
                  }}
                />
              </div>
            )}
          </div>

          <AddEntryTagSection
            tagDefs={tagDefs}
            selectedIds={selectedIds}
            addOpen={addOpen}
            setAddOpen={setAddOpen}
            tagQuery={tagQuery}
            setTagQuery={setTagQuery}
            editId={editId}
            setEditId={setEditId}
            myColors={myColors}
            addMyColor={addMyColor}
            selectTag={selectTag}
            removeSelected={removeSelected}
            createAndSelect={createAndSelect}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />

          <div className="h-px w-full bg-[#EBEBEB]" />
          <div className="px-5 py-4 flex items-center justify-between">
            <PayableToggle value={payable} onChange={setPayable} />

            <Button
              variant="success"
              size="md"
              disabled={!canSave}
              onClick={handleSave}
              className="disabled:opacity-40 disabled:pointer-events-none"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
