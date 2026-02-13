"use client";

import * as React from "react";
import Image from "next/image";
import type { DateRange } from "react-day-picker";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isValid,
  parseISO,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Preset = {
  id: string;
  label: string;
  getDate: (now: Date) => Date;
  rightText: (now: Date) => string;
};

function asValidDate(v: unknown): Date | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return isValid(v) ? v : undefined;

  const s = String(v);
  const d = /^\d{4}-\d{2}-\d{2}/.test(s) ? parseISO(s) : new Date(s);
  return isValid(d) ? d : undefined;
}

function nextSaturdayDate(now: Date) {
  const day = now.getDay(); // 0..6
  const add = (6 - day + 7) % 7;
  return addDays(now, add);
}

function nextMondayDate(now: Date) {
  const day = now.getDay(); // 0..6
  const add = (1 - day + 7) % 7;
  return addDays(now, add === 0 ? 7 : add);
}

const PRESETS: Preset[] = [
  {
    id: "today",
    label: "Today",
    getDate: (now) => now,
    rightText: (now) => format(now, "EEE"),
  },
  {
    id: "tomorrow",
    label: "Tomorrow",
    getDate: (now) => addDays(now, 1),
    rightText: (now) => format(addDays(now, 1), "EEE"),
  },
  {
    id: "later",
    label: "Later",
    getDate: (now) => now,
    rightText: (now) => format(now, "p"),
  },
  {
    id: "thisWeekend",
    label: "This weekend",
    getDate: (now) => nextSaturdayDate(now),
    rightText: () => "Sat",
  },
  {
    id: "nextWeek",
    label: "Next Week",
    getDate: (now) => nextMondayDate(now),
    rightText: () => "Mon",
  },
  {
    id: "twoWeeks",
    label: "2 Weeks",
    getDate: (now) => addDays(now, 14),
    rightText: (now) => format(addDays(now, 14), "d MMM"),
  },
];

function formatChip(d?: Date) {
  if (!d) return "";
  const now = startOfToday();
  if (isSameDay(d, now)) return "Today";
  if (isSameDay(d, addDays(now, 1))) return "Tomorrow";
  return format(d, "MMM d");
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function buildYears(centerYear: number, span = 20) {
  const start = centerYear - span;
  const end = centerYear + span;
  const out: number[] = [];
  for (let y = start; y <= end; y++) out.push(y);
  return out;
}

export function ClickUpLightRangePicker(props: {
  startDate?: unknown;
  dueDate?: unknown;

  iconSrc?: string;
  align?: "start" | "end";
  closeOnComplete?: boolean;

  onComplete: (from: Date, to: Date) => void;
}) {
  const iconSrc = props.iconSrc ?? "/assets/calendar-normal.svg";
  const closeOnComplete = props.closeOnComplete ?? false;

  const start = asValidDate(props.startDate);
  const due = asValidDate(props.dueDate);
  const hasDates = !!start && !!due;

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<"from" | "to">("from");

  const [range, setRange] = React.useState<DateRange | undefined>(
    hasDates ? { from: start!, to: due! } : undefined,
  );

  const [month, setMonth] = React.useState<Date>(
    startOfMonth(start ?? new Date()),
  );

  React.useEffect(() => {
    const s = asValidDate(props.startDate);
    const d = asValidDate(props.dueDate);
    setRange(s && d ? { from: s, to: d } : undefined);
    setMonth(startOfMonth(s ?? new Date()));
  }, [props.startDate, props.dueDate]);

  const years = React.useMemo(
    () => buildYears(month.getFullYear(), 30),
    [month],
  );

  function clearFrom() {
    setRange(undefined);
    setActive("from");
  }

  function clearTo() {
    setRange((prev) =>
      prev?.from ? { from: prev.from, to: undefined } : prev,
    );
    setActive("to");
  }

  function commit(from: Date, to: Date) {
    props.onComplete(from, to);
    if (closeOnComplete) setOpen(false);
  }

  function handlePick(day: Date) {
    setMonth(startOfMonth(day));

    if (active === "from") {
      setRange({ from: day, to: undefined });
      setActive("to");
      return;
    }

    setRange((prev) => {
      const from = prev?.from;
      if (!from) return { from: day, to: undefined };

      const a = from;
      const b = day;
      const nextFrom = b < a ? b : a;
      const nextTo = b < a ? a : b;

      queueMicrotask(() => commit(nextFrom, nextTo));
      return { from: nextFrom, to: nextTo };
    });
  }

  function applyPreset(date: Date) {
    handlePick(date);
  }

  const startLabel = range?.from ? formatChip(range.from) : "Start date";
  const dueLabel = range?.to ? formatChip(range.to) : "Due date";
  const triggerText =
    start && due ? `${format(start, "MMM d")} → ${format(due, "MMM d")}` : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            " bg-transparent",
            "flex items-center justify-center gap-2",
            hasDates ? "px-2" : "w-7 p-0",
          )}
          title="Set dates"
        >
          <Image src={iconSrc} alt="Calendar" width={16} height={16} />
          {hasDates && (
            <span className="text-[11px] font-medium text-[#64748B] whitespace-nowrap">
              {triggerText}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align={props.align ?? "end"}
        className="p-0 w-[560px] rounded-md border border-[#E5E7EB] bg-white shadow-xl overflow-hidden"
      >
        {/* ✅ Smaller top pills */}
        <div className="grid grid-cols-2 gap-2 p-2.5 border-b border-[#EEF2F7]">
          <button
            type="button"
            onClick={() => setActive("from")}
            className={cn(
              "h-9 rounded-xl border flex items-center gap-2 px-3",
              active === "from"
                ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/15"
                : "border-[#E5E7EB]",
              "bg-white hover:bg-[#F8FAFC]",
            )}
          >
            <Image src={iconSrc} alt="" width={14} height={14} />
            <span
              className={cn(
                "text-[13px] font-medium",
                range?.from ? "text-[#0F172A]" : "text-[#94A3B8]",
              )}
            >
              {startLabel}
            </span>

            {range?.from && (
              <span
                className="ml-auto w-7 h-7 rounded-lg hover:bg-[#EEF2FF] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFrom();
                }}
                role="button"
                aria-label="Clear start"
              >
                <X className="w-4 h-4 text-[#64748B]" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActive("to")}
            className={cn(
              "h-9 rounded-xl border flex items-center gap-2 px-3",
              active === "to"
                ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/15"
                : "border-[#E5E7EB]",
              "bg-white hover:bg-[#F8FAFC]",
            )}
          >
            <Image src={iconSrc} alt="" width={14} height={14} />
            <span
              className={cn(
                "text-[13px] font-medium",
                range?.to ? "text-[#0F172A]" : "text-[#94A3B8]",
              )}
            >
              {dueLabel}
            </span>

            {range?.to && (
              <span
                className="ml-auto w-7 h-7 rounded-lg hover:bg-[#EEF2FF] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  clearTo();
                }}
                role="button"
                aria-label="Clear due"
              >
                <X className="w-4 h-4 text-[#64748B]" />
              </span>
            )}
          </button>
        </div>

        {/* ✅ Equal widths left/right */}
        <div className="grid grid-cols-2 min-h-[320px]">
          {/* LEFT (50%) */}
          <div className="border-r border-[#EEF2F7] p-2.5">
            <div className="space-y-1">
              {PRESETS.map((p) => {
                const now = startOfToday();
                const d = p.getDate(now);
                const activeDate = active === "from" ? range?.from : range?.to;
                const selected = !!activeDate && isSameDay(activeDate, d);

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(d)}
                    className={cn(
                      "w-full h-9 px-2.5 rounded-xl flex items-center justify-between",
                      selected
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "hover:bg-[#F8FAFC] text-[#334155]",
                    )}
                  >
                    <span className="text-[13px] font-medium">{p.label}</span>
                    <span
                      className={cn(
                        "text-[13px]",
                        selected ? "text-[#2563EB]" : "text-[#94A3B8]",
                      )}
                    >
                      {p.rightText(now)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT (50%) */}
          <div className="p-2.5">
            {/* Header compact */}
            <div className="flex items-center justify-center gap-3 mb-2">
              {/* Month */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg hover:bg-[#F1F5F9] flex items-center justify-center"
                  onClick={() => setMonth((m) => addMonths(m, -1))}
                  aria-label="Prev month"
                >
                  <ChevronLeft className="w-4 h-4 text-[#64748B]" />
                </button>

                <Select
                  value={String(month.getMonth())}
                  onValueChange={(v) => {
                    const m = Number(v);
                    const next = new Date(month);
                    next.setMonth(m);
                    setMonth(startOfMonth(next));
                  }}
                >
                  <SelectTrigger className="h-7 w-[84px] px-2 border-0 shadow-none bg-transparent hover:bg-[#F8FAFC] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m, idx) => (
                      <SelectItem key={m} value={String(idx)}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  type="button"
                  className="w-7 h-7 rounded-lg hover:bg-[#F1F5F9] flex items-center justify-center"
                  onClick={() => setMonth((m) => addMonths(m, 1))}
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </button>
              </div>

              {/* Year */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg hover:bg-[#F1F5F9] flex items-center justify-center"
                  onClick={() => {
                    const next = new Date(month);
                    next.setFullYear(month.getFullYear() - 1);
                    setMonth(startOfMonth(next));
                  }}
                  aria-label="Prev year"
                >
                  <ChevronLeft className="w-4 h-4 text-[#64748B]" />
                </button>

                <Select
                  value={String(month.getFullYear())}
                  onValueChange={(v) => {
                    const y = Number(v);
                    const next = new Date(month);
                    next.setFullYear(y);
                    setMonth(startOfMonth(next));
                  }}
                >
                  <SelectTrigger className="h-7 w-[92px] px-2 border-0 shadow-none bg-transparent hover:bg-[#F8FAFC] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[220px]">
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  type="button"
                  className="w-7 h-7 rounded-lg hover:bg-[#F1F5F9] flex items-center justify-center"
                  onClick={() => {
                    const next = new Date(month);
                    next.setFullYear(month.getFullYear() + 1);
                    setMonth(startOfMonth(next));
                  }}
                  aria-label="Next year"
                >
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </button>
              </div>
            </div>

            <Calendar
              mode="range"
              month={month}
              onMonthChange={setMonth}
              selected={range}
              onDayClick={(day) => handlePick(day)}
              numberOfMonths={1}
              className="p-0"
              classNames={{
                caption: "hidden",
                months: "space-y-0",
                month: "space-y-1",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                  "w-8 text-center text-[11px] font-medium text-[#64748B]",
                row: "flex w-full mt-1",

                // ✅ even smaller day grid (32px)
                cell: cn(
                  "relative h-8 w-8 p-0 text-center",
                  "focus-within:relative focus-within:z-20",
                  "[&:has([aria-selected])]:bg-[#EFF6FF]",
                  "[&:has([aria-selected])]:rounded-none",
                  "[&:has(.cu-range-start)]:rounded-l-full",
                  "[&:has(.cu-range-end)]:rounded-r-full",
                ),

                day: cn(
                  "h-8 w-8 p-0 text-[12px] font-medium",
                  "text-[#0F172A] hover:bg-[#F1F5F9] rounded-full",
                  "focus:outline-none",
                ),
                day_today: "text-[#2563EB]",
                day_outside: "text-[#94A3B8] opacity-60",
                day_disabled: "text-[#CBD5E1] opacity-50",

                day_selected: "text-[#0F172A]",

                day_range_middle:
                  "bg-transparent text-[#0F172A] rounded-none hover:bg-transparent",

                day_range_start:
                  "cu-range-start bg-[#2563EB] text-white rounded-full hover:bg-[#2563EB] focus:bg-[#2563EB] relative z-10",

                day_range_end:
                  "cu-range-end bg-[#2563EB] text-white rounded-full hover:bg-[#2563EB] focus:bg-[#2563EB] relative z-10",
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
