"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import mockData from "@/data/my-time-log/my-time-logs.json";
import { Button } from "../ui/Button";
import TaskSection from "../time-tracker/floating-component/TaskSection";
import ThreeDotMenu from "../time-tracker/floating-component/ThreeDotMenu";
import TimeLogDrawer from "../time-tracker/floating-component/TimeLogDrawer";
import RequestForm from "../time-tracker/floating-component/RequestForm";
import { Play, Square } from "lucide-react";

type ViewMode = "entries" | "sheet";

type MyLogSubEntry = {
  id?: string | number;
  time?: string;
  startTime?: string;
  endTime?: string;

  payable: boolean;
  status: "completed" | "in_progress" | string;
  weeklyHours: string[];

  source?: "timer" | "manual";
  createdAt?: number;
};

type MyLogTask = {
  id: string | number;
  title: string;
  status: "completed" | "in_progress" | string;
  isExpanded?: boolean;
  weeklyHours: string[];
  total: string;
  subEntries?: MyLogSubEntry[];
};

type TimeEntryRow = {
  id: string | number;
  task: string;
  description: string;
  payable: boolean;
  tag: string;
  signIn: string;
  signOut: string;
  duration: string;
};

type TimeEntryGroup = {
  date: string;
  totalHours: string;
  limit: string;
  isExpanded?: boolean;
  entries: TimeEntryRow[];
};

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

function toMinutes(v: string): number {
  const raw = String(v ?? "")
    .trim()
    .toLowerCase();
  if (!raw || raw === "-" || raw === "—") return 0;

  const colon = raw.match(/^(\d{1,4})\s*:\s*(\d{1,2})$/);
  if (colon) {
    const h = parseInt(colon[1], 10);
    const m = parseInt(colon[2], 10);
    if (!Number.isNaN(h) && !Number.isNaN(m) && m >= 0 && m < 60) {
      return Math.max(0, h * 60 + m);
    }
    return 0;
  }

  const dotAsMinutes = raw.match(/^(\d{1,4})\s*\.\s*(\d{2})$/);
  if (dotAsMinutes) {
    const h = parseInt(dotAsMinutes[1], 10);
    const m = parseInt(dotAsMinutes[2], 10);
    if (!Number.isNaN(h) && !Number.isNaN(m) && m >= 0 && m < 60) {
      return Math.max(0, h * 60 + m);
    }
  }

  const hMatch = raw.match(/(\d+(\.\d+)?)\s*h/);
  const mMatch = raw.match(/(\d+)\s*m/);

  let minutes = 0;
  if (hMatch) minutes += Math.round(parseFloat(hMatch[1]) * 60);
  if (mMatch) minutes += parseInt(mMatch[1], 10);
  if (!hMatch && !mMatch) {
    const num = Number(raw.replace(/[^\d.]/g, ""));
    if (!Number.isNaN(num)) minutes = Math.round(num * 60);
  }

  return Math.max(0, minutes);
}

function formatMinutes(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  if (m === 0) return "-";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem === 0 ? `${h}h` : `${h}h ${rem}m`;
}

function humanizeMinutes(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  const r = m % 60;

  const parts: string[] = [];
  if (h > 0) parts.push(`${h} hour${h === 1 ? "" : "s"}`);
  if (r > 0) parts.push(`${r} minute${r === 1 ? "" : "s"}`);

  if (parts.length === 0) return "0 minutes";
  return parts.join(" ");
}

function safeTimeRange(sub: MyLogSubEntry): { start: string; end: string } {
  if (sub.startTime || sub.endTime) {
    return { start: sub.startTime ?? "—", end: sub.endTime ?? "—" };
  }
  if (sub.time && sub.time.includes("-")) {
    const [a, b] = sub.time.split("-").map((x) => x.trim());
    return { start: a || "—", end: b || "—" };
  }
  return { start: "—", end: "—" };
}

function padWeeklyHours(len: number, fill = "-") {
  return Array.from({ length: len }, () => fill);
}

function computeTaskFromSubs(task: MyLogTask): MyLogTask {
  const daysCount = task.weeklyHours?.length ?? 7;
  const sums = padWeeklyHours(daysCount, "0").map(() => 0);

  (task.subEntries ?? []).forEach((se) => {
    (se.weeklyHours ?? []).forEach((h, i) => {
      sums[i] += toMinutes(h);
    });
  });

  const weekly = sums.map((m) => formatMinutes(m));
  const total = formatMinutes(sums.reduce((a, b) => a + b, 0));

  return { ...task, weeklyHours: weekly, total };
}

function HoverLabelPortal(props: {
  open: boolean;
  targetEl: HTMLElement | null;
  label: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const computePos = () => {
    if (!props.targetEl) return;
    const r = props.targetEl.getBoundingClientRect();

    setPos({
      left: r.left + r.width / 2,
      top: r.top,
    });
  };

  useEffect(() => {
    if (!props.open) return;
    computePos();

    const onScroll = () => computePos();
    const onResize = () => computePos();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [props.open, props.targetEl]);

  if (!props.open || !pos) return null;

  return createPortal(
    <div
      className="fixed z-[80] pointer-events-none"
      style={{
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, -100%) translateY(-14px)",
      }}
    >
      <div className="relative rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap">
        {props.label}

        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-[#EBEBEB]" />
        <span className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-1px)] w-0 h-0 border-x-[7px] border-x-transparent border-t-[7px] border-t-[#FDFDFD]" />
      </div>
    </div>,
    document.body,
  );
}

function EditPreviewPortal(props: {
  open: boolean;
  targetEl: HTMLElement | null;
  label: string;
}) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const computePos = () => {
    if (!props.targetEl) return;
    const r = props.targetEl.getBoundingClientRect();
    setPos({
      left: r.left + r.width / 2,
      top: r.bottom + 10,
    });
  };

  useEffect(() => {
    if (!props.open) return;
    computePos();

    const onScroll = () => computePos();
    const onResize = () => computePos();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [props.open, props.targetEl]);

  if (!props.open || !pos) return null;

  return createPortal(
    <div
      className="fixed z-[90] pointer-events-none"
      style={{
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, 0)",
      }}
    >
      <div className="relative rounded-md bg-[#FDFDFD] text-[#191F38] text-[11px] font-medium px-3 py-1 shadow-md border border-[#EBEBEB] whitespace-nowrap">
        {props.label}
      </div>
    </div>,
    document.body,
  );
}

function CellHoverIcon(props: {
  show: boolean;
  label: string;
  onClick: () => void;
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
          props.onClick();
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

type EditingCell =
  | { kind: "task"; taskId: string | number; dayIndex: number }
  | {
      kind: "sub";
      taskId: string | number;
      subKey: string;
      dayIndex: number;
    }
  | null;

export default function MyTimeLogs() {
  const [viewMode, setViewMode] = useState<ViewMode>("sheet");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeLogOpen, setIsTimeLogOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<{
    id: string | number;
    x: number;
    y: number;
  } | null>(null);

  const [menuConfig, setMenuConfig] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const [myLogs, setMyLogs] = useState<MyLogTask[]>(() => {
    const raw: MyLogTask[] = deepClone((mockData as any).myLogs ?? []);
    return raw.map((t) => {
      const daysCount = t.weeklyHours?.length ?? 7;

      const subs: MyLogSubEntry[] =
        t.subEntries && t.subEntries.length > 0
          ? t.subEntries.map((s) => ({ ...s, payable: false }))
          : (t.weeklyHours ?? []).flatMap((h, i) => {
              if (!h || h === "-" || h === "—") return [];
              const wh = padWeeklyHours(daysCount);
              wh[i] = h;
              return [
                {
                  id: `manual-${t.id}-${i}`,
                  payable: false,
                  status: t.status,
                  weeklyHours: wh,
                  source: "manual",
                  startTime: "—",
                  endTime: "—",
                  createdAt: Date.now() - i * 1000,
                } satisfies MyLogSubEntry,
              ];
            });

      return computeTaskFromSubs({
        ...t,
        isExpanded: t.isExpanded ?? true,
        subEntries: subs,
        weeklyHours: padWeeklyHours(daysCount),
        total: "-",
      });
    });
  });

  const [timeEntries, setTimeEntries] = useState<TimeEntryGroup[]>(() => {
    const raw: TimeEntryGroup[] = deepClone(
      (mockData as any).timeEntries ?? [],
    );
    return raw.map((g) => ({
      ...g,
      entries: (g.entries ?? []).map((e) => ({ ...e, payable: false })),
    }));
  });

  const [expandedEntryGroups, setExpandedEntryGroups] = useState<
    Record<string, boolean>
  >(() => {
    const init: Record<string, boolean> = {};
    const groups: TimeEntryGroup[] = (mockData as any).timeEntries ?? [];
    groups.forEach((g) => {
      init[String(g.date)] = g.isExpanded ?? true;
    });
    return init;
  });

  const [onlyPayable, setOnlyPayable] = useState(false);
  const [editing, setEditing] = useState<EditingCell>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [activeTimer, setActiveTimer] = useState<{
    taskId: string | number;
    startedAt: number;
  } | null>(null);

  const days = [
    "Sun, Dec 8",
    "Mon, Dec 9",
    "Tue, Dec 10",
    "Wed, Dec 11",
    "Thu, Dec 13",
    "Fri, Dec 14",
    "Sat, Dec 15",
  ];

  const closeAllMenus = () => {
    setActiveMenu(null);
    setMenuConfig((p) => ({ ...p, isOpen: false }));
  };

  const openTimeLog = () => {
    closeAllMenus();
    setIsTimeLogOpen(true);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMenu(null);

    setMenuConfig((prev) => ({
      isOpen: !prev.isOpen,
      x: e.clientX,
      y: e.clientY + 10,
    }));
  };

  const handleThreeDotClick = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    e.stopPropagation();

    setMenuConfig((p) => ({ ...p, isOpen: false }));

    setActiveMenu((prev) => {
      if (prev?.id === id) return null;
      return { id, x: e.clientX, y: e.clientY + 10 };
    });
  };

  const handleViewModeChange = (mode: ViewMode) => {
    closeAllMenus();
    setViewMode(mode);
  };

  const toggleTaskExpanded = (taskId: string | number) => {
    setMyLogs((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t,
      ),
    );
  };

  const toggleEntryGroupExpanded = (date: string) => {
    setExpandedEntryGroups((prev) => ({
      ...prev,
      [date]: !(prev[String(date)] ?? true),
    }));
  };

  const visibleMyLogs = useMemo(() => {
    if (!onlyPayable) return myLogs;
    return myLogs.map((t) => ({
      ...t,
      subEntries: t.subEntries
        ? t.subEntries.filter((s) => s.payable)
        : t.subEntries,
    }));
  }, [myLogs, onlyPayable]);

  const visibleTimeEntries = useMemo(() => {
    if (!onlyPayable) return timeEntries;
    return timeEntries.map((g) => ({
      ...g,
      entries: g.entries.filter((e) => e.payable),
    }));
  }, [timeEntries, onlyPayable]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      closeAllMenus();
      setIsModalOpen(false);
      setIsTimeLogOpen(false);

      setEditing(null);
      setDraft("");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!editing) return;
    const t = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
    return () => clearTimeout(t);
  }, [editing]);

  const togglePayable = (taskId: string | number, subKey: string) => {
    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextSubs = (t.subEntries ?? []).map((s, idx) => {
          const key = String(s.id ?? `${t.id}-${idx}`);
          return key === subKey ? { ...s, payable: !s.payable } : s;
        });
        return computeTaskFromSubs({ ...t, subEntries: nextSubs });
      }),
    );
  };

  const startEdit = (cell: EditingCell, current: string) => {
    closeAllMenus();
    setEditing(cell);
    setDraft(current === "-" ? "" : current);
  };

  const commitEdit = () => {
    if (!editing) return;

    const mins = toMinutes(draft);
    const value = formatMinutes(mins);

    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== editing.taskId) return t;

        const daysCount = t.weeklyHours.length;

        if (editing.kind === "task") {
          const dayIndex = editing.dayIndex;

          const existing = (t.subEntries ?? []).find((s) => {
            if (!String(s.id ?? "").startsWith(`manual-${t.id}-`)) return false;
            return s.weeklyHours?.[dayIndex] && s.weeklyHours[dayIndex] !== "-";
          });

          const nextSubs = [...(t.subEntries ?? [])];

          if (mins === 0) {
            for (let i = nextSubs.length - 1; i >= 0; i--) {
              const s = nextSubs[i];
              const key = String(s.id ?? "");
              if (!key.startsWith(`manual-${t.id}-${dayIndex}`)) continue;
              nextSubs.splice(i, 1);
              break;
            }
            return computeTaskFromSubs({ ...t, subEntries: nextSubs });
          }

          if (existing) {
            const idx = nextSubs.indexOf(existing);
            const wh = padWeeklyHours(daysCount);
            wh[dayIndex] = value;
            nextSubs[idx] = {
              ...existing,
              weeklyHours: wh,
              source: "manual",
              startTime: existing.startTime ?? "—",
              endTime: existing.endTime ?? "—",
            };
          } else {
            const wh = padWeeklyHours(daysCount);
            wh[dayIndex] = value;

            nextSubs.unshift({
              id: `manual-${t.id}-${dayIndex}-${Date.now()}`,
              payable: false,
              status: t.status,
              weeklyHours: wh,
              source: "manual",
              startTime: "—",
              endTime: "—",
              createdAt: Date.now(),
            });
          }

          return computeTaskFromSubs({ ...t, subEntries: nextSubs });
        }

        if (editing.kind === "sub") {
          const dayIndex = editing.dayIndex;

          const nextSubs = (t.subEntries ?? [])
            .map((s, idx) => {
              const key = String(s.id ?? `${t.id}-${idx}`);
              if (key !== editing.subKey) return s;

              const wh = [...(s.weeklyHours ?? padWeeklyHours(daysCount))];
              wh[dayIndex] = mins === 0 ? "-" : value;

              return { ...s, weeklyHours: wh };
            })
            .filter((s) => (s.weeklyHours ?? []).some((x) => x && x !== "-"));

          return computeTaskFromSubs({ ...t, subEntries: nextSubs });
        }

        return t;
      }),
    );

    setEditing(null);
    setDraft("");
  };

  const toggleTimer = (taskId: string | number) => {
    if (activeTimer?.taskId === taskId) {
      const startedAt = activeTimer.startedAt;
      const endedAt = Date.now();
      setActiveTimer(null);

      const mins = Math.max(1, Math.round((endedAt - startedAt) / 60000));
      const value = formatMinutes(mins);

      const dayIndex = new Date().getDay();
      setMyLogs((prev) =>
        prev.map((t) => {
          if (t.id !== taskId) return t;

          const daysCount = t.weeklyHours.length;
          const wh = padWeeklyHours(daysCount);
          wh[Math.min(dayIndex, daysCount - 1)] = value;

          const start = new Date(startedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const end = new Date(endedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const nextSubs = [
            {
              id: `timer-${t.id}-${endedAt}`,
              payable: false,
              status: t.status,
              weeklyHours: wh,
              source: "timer",
              startTime: start,
              endTime: end,
              createdAt: endedAt,
            } satisfies MyLogSubEntry,
            ...(t.subEntries ?? []),
          ];

          return computeTaskFromSubs({ ...t, subEntries: nextSubs });
        }),
      );

      return;
    }

    setActiveTimer({ taskId, startedAt: Date.now() });
  };

  const HourCell = (props: {
    hour: string;
    isTotal?: boolean;
    isSubEntry?: boolean;

    editable?: boolean;
    dayIndex?: number;
    editCell?: EditingCell;
    onEdit?: (cell: EditingCell, current: string) => void;

    onHoverIconClick?: () => void;
  }) => {
    const {
      hour,
      isTotal = false,
      isSubEntry = false,
      editable = false,
      dayIndex,
      editCell,
      onEdit,
      onHoverIconClick,
    } = props;

    const [hovered, setHovered] = useState(false);

    const displayHour = toMinutes(hour) === 0 ? "-" : hour;
    const hasValue = displayHour !== "-";

    const canEdit = !isTotal && editable && (!isSubEntry || hasValue);

    const maxHours = 9;
    const mins = toMinutes(displayHour);
    const hoursFloat = mins / 60;

    const percentage = isTotal
      ? 100
      : mins > 0
        ? Math.min((hoursFloat / maxHours) * 100, 100)
        : 0;

    const barColor =
      hoursFloat >= 9 || isTotal ? "bg-[#22C55E]" : "bg-[#F87171]";

    const isEditing =
      !!editing &&
      !!editCell &&
      editing.kind === editCell.kind &&
      editing.taskId === editCell.taskId &&
      editing.dayIndex === editCell.dayIndex &&
      (editing.kind !== "sub" ||
        (editCell.kind === "sub" && editing.subKey === editCell.subKey));

    const tdRef = useRef<HTMLTableCellElement | null>(null);

    // preview bubble while typing
    const previewMins = isEditing ? toMinutes(draft) : 0;
    const showPreview = isEditing && draft.trim().length > 0 && previewMins > 0;
    const previewLabel = humanizeMinutes(previewMins);

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
        {/* TOP PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-1.25 bg-[#E4E4E4]">
          {(mins > 0 || isTotal) && (
            <div
              className={`h-full ${barColor} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>

        <CellHoverIcon
          show={hovered && !isTotal && !isEditing}
          label="Add entry"
          iconSrc="/assets/clock-blue.svg"
          onClick={() => onHoverIconClick?.()}
        />

        {!isEditing && (
          <div className="h-full w-full flex items-center justify-center">
            <span
              className={`text-[11px] leading-4 ${
                isTotal ? "text-[#1E293B]" : "text-[#191F38] font-medium"
              }`}
            >
              {displayHour}
            </span>
          </div>
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
                if (e.key === "Escape") {
                  setEditing(null);
                  setDraft("");
                }
              }}
              onBlur={() => commitEdit()}
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
  };

  const renderTimeEntriesView = () => (
    <div className="space-y-4 mt-5 mx-4 leading-5 tracking-[-0.05em]">
      {visibleTimeEntries.map((group, idx) => {
        const isExpanded = expandedEntryGroups[String(group.date)] ?? true;

        return (
          <div key={idx} className="">
            {/* Group Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={`transition-transform duration-200 cursor-pointer ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                  onClick={() => toggleEntryGroupExpanded(String(group.date))}
                />

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => toggleEntryGroupExpanded(String(group.date))}
                >
                  <Image
                    src="/assets/calendar-normal.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  {group.date}
                </Button>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium leading-4">
                <Button variant="outline" size="md">
                  <Image
                    src="/assets/timer.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  <span className="text-[#DC2626] flex items-center gap-1">
                    {group.totalHours}
                  </span>
                  <span className="text-[#697588]">/ {group.limit}</span>
                </Button>
              </div>
            </div>

            {/* Table */}
            {isExpanded && (
              <div className="border border-[#E2E8F0] rounded-md overflow-hidden mt-3">
                <table className="w-full text-left text-[11px]">
                  <thead className="w-full text-left border-collapse text-[11px]">
                    <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                      <th className="px-3 py-2 w-[35%]">Task</th>
                      <th className="px-3 py-2">Description</th>
                      <th className="px-3 py-2">Payable</th>
                      <th className="px-3 py-2">Tags</th>
                      <th className="px-3 py-2">Signed In</th>
                      <th className="px-3 py-2">Signed Out</th>
                      <th className="px-3 py-2">Duration</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.entries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-[#EBEBEB] hover:bg-slate-50"
                      >
                        <td className="px-3 py-2 text-[11px] leading-4 font-medium tracking-[-0.05em] text-[#191F38]">
                          {entry.task}
                        </td>
                        <td className="px-3 py-2 text-[11px] leading-4 font-medium text-[#191F38]">
                          {entry.description}
                        </td>
                        <td className="px-3 py-2">
                          {entry.payable ? (
                            <Button variant="outline" size="md" className="p-1">
                              <Image
                                src="/assets/dollar-green.svg"
                                alt=""
                                width={16}
                                height={16}
                              />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="md"
                              className="p-1.5"
                            >
                              <Image
                                src="/assets/dollar-cross.svg"
                                alt=""
                                width={11}
                                height={11}
                              />
                            </Button>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span className="bg-[#F0E4FF] text-[#722BCC] px-2 py-0.5 rounded-sm border border-[#B187E5] text-[11px] font-medium leading-4">
                            {entry.tag}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="bg-[#C4FFE2] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                            {entry.signIn}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="bg-[#FFD1CC] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                            {entry.signOut}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                            {entry.duration}
                          </span>
                        </td>
                        <td className="px-3 py-2 gap-2 flex text-start">
                          <Image
                            src="/assets/clock-red.svg"
                            alt=""
                            width={18}
                            height={18}
                            onClick={openTimeLog}
                          />
                          <Image
                            src="/assets/3dot.svg"
                            alt=""
                            width={18}
                            height={18}
                            onClick={(e) => handleThreeDotClick(e, entry.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-3 leading-5 tracking-[-0.05em] text-[#191F38] w-full">
      <TaskSection
        isOpen={menuConfig.isOpen}
        onClose={() => setMenuConfig({ ...menuConfig, isOpen: false })}
        anchorPoint={{ x: menuConfig.x, y: menuConfig.y }}
      />

      <ThreeDotMenu
        isOpen={!!activeMenu}
        onClose={() => setActiveMenu(null)}
        anchorPoint={{ x: activeMenu?.x || 0, y: activeMenu?.y || 0 }}
      />

      {/* Action Toolbar */}
      <div className="flex items-center justify-between border-b border-[#EBEBEB] text-[#697588] px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              closeAllMenus();
              setOnlyPayable((v) => !v);
            }}
          >
            <Image src="/assets/dollar.svg" alt="down" width={14} height={14} />{" "}
            Payable
          </Button>

          <Button variant="outline" onClick={closeAllMenus}>
            <Image
              src="/assets/arrow-down-fill.svg"
              alt="down"
              width={12}
              height={12}
              className="rotate-180"
            />

            <Image
              src="/assets/calendar-normal.svg"
              alt="down"
              width={12}
              height={12}
            />

            <span className="text-xs font-medium">Jan 8 - 22</span>

            <Image
              src="/assets/arrow-down-fill.svg"
              alt="down"
              width={12}
              height={12}
            />
          </Button>

          <Button variant="outline" onClick={closeAllMenus}>
            This Week
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              closeAllMenus();
              setIsModalOpen(true);
            }}
            variant="success"
            size="md"
          >
            Send for Review
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              closeAllMenus();
              setIsTimeLogOpen(true);
            }}
          >
            <Image
              src="/assets/blue-tik.svg"
              alt="down"
              width={14}
              height={14}
            />{" "}
          </Button>

          <TimeLogDrawer
            isOpen={isTimeLogOpen}
            onClose={() => setIsTimeLogOpen(false)}
          />

          <div className="flex py-1.5">
            <button
              onClick={() => handleViewModeChange("entries")}
              className={`flex items-center gap-1 px-1.5 py-1 border border-[#EBEBEB] rounded-tl-sm rounded-bl-sm text-xs leading-3 tracking-tighter font-medium cursor-pointer ${
                viewMode === "entries"
                  ? "bg-[#F2F9FE] text-[#4157FE]"
                  : "bg-[#FDFDFD] text-[#697588]"
              }`}
            >
              Time Entries
              <Image
                src={
                  viewMode === "entries"
                    ? "/assets/task-square-blue.svg"
                    : "/assets/task-square.svg"
                }
                alt="down"
                width={14}
                height={14}
              />
            </button>

            <button
              onClick={() => handleViewModeChange("sheet")}
              className={`flex items-center gap-1 px-1.5 py-1 border border-[#EBEBEB] rounded-tr-sm rounded-br-sm text-xs leading-3 tracking-tighter font-medium cursor-pointer ${
                viewMode === "sheet"
                  ? "bg-[#F2F9FE] text-[#4157FE]"
                  : "bg-[#FDFDFD] text-[#697588]"
              }`}
            >
              Time Sheet
              <Image
                src={
                  viewMode === "sheet"
                    ? "/assets/grid-5-blue.svg"
                    : "/assets/grid-5.svg"
                }
                alt="down"
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      </div>

      <RequestForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {viewMode === "sheet" ? (
        <div className="border border-[#E2E8F0] rounded-md overflow-hidden mx-4">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                <th
                  className="px-3 h-11 py-0 w-100 cursor-pointer"
                  onClick={handleHeaderClick}
                >
                  Task
                </th>

                {days.map((day) => (
                  <th
                    key={day}
                    className="text-center border-l border-[#E2E8F0] font-semibold w-[80px] min-w-[80px] h-11 py-0"
                  >
                    {day}
                  </th>
                ))}

                <th className="text-center border-l border-[#E2E8F0] font-semibold w-[80px] min-w-[80px] h-11 py-0">
                  Total
                </th>

                <th className="w-20 border-l border-[#E2E8F0] h-11 py-0"></th>
              </tr>
            </thead>

            <tbody>
              {visibleMyLogs.map((task) => {
                const rowBg = task.isExpanded ? "bg-[#F2F9FE]" : "bg-white";
                const isRunning = activeTimer?.taskId === task.id;

                return (
                  <React.Fragment key={task.id}>
                    {/* MAIN TASK ROW */}
                    <tr
                      className={`border-b group hover:opacity-90 transition-all ${rowBg}`}
                    >
                      <td className="px-3 h-11 py-0">
                        <div className="flex items-center gap-3 w-full h-11">
                          <Image
                            src="/assets/arrow-down.svg"
                            alt=""
                            width={12}
                            height={12}
                            className={`transition-transform duration-200 cursor-pointer ${
                              task.isExpanded ? "rotate-0" : "-rotate-90"
                            }`}
                            onClick={() => toggleTaskExpanded(task.id)}
                          />

                          <span
                            className="font-medium text-[11px] text-[#191F38] cursor-pointer"
                            onClick={() => toggleTaskExpanded(task.id)}
                          >
                            {task.title}
                          </span>

                          <div className="ml-auto flex items-center gap-2">
                            <TimerButton
                              running={isRunning}
                              onToggle={() => toggleTimer(task.id)}
                            />
                          </div>
                        </div>
                      </td>

                      {task.weeklyHours.map((hour, i) => (
                        <HourCell
                          key={i}
                          hour={hour}
                          editable
                          dayIndex={i}
                          editCell={{
                            kind: "task",
                            taskId: task.id,
                            dayIndex: i,
                          }}
                          onEdit={(cell, current) => startEdit(cell, current)}
                          onHoverIconClick={openTimeLog}
                        />
                      ))}

                      <HourCell hour={task.total} isTotal />

                      <td className="px-3 h-11 py-0 border-l border-[#E2E8F0] text-center">
                        <div className="h-11 flex items-center justify-center gap-2">
                          <Image
                            src={
                              task.status === "completed"
                                ? "/assets/tick-circle-green.svg"
                                : "/assets/clock-red.svg"
                            }
                            alt="status"
                            width={18}
                            height={18}
                            onClick={openTimeLog}
                          />
                          <Image
                            src="/assets/3dot.svg"
                            alt="more"
                            width={24}
                            height={24}
                            onClick={(e) => handleThreeDotClick(e, task.id)}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* "time entries" label row */}
                    {task.isExpanded && (task.subEntries?.length ?? 0) > 0 && (
                      <tr className="bg-[#F2F9FE] border-b">
                        <td
                          colSpan={days.length + 3}
                          className="pl-8 h-11 py-0 text-[11px] text-[#697588] font-medium align-middle"
                        >
                          {task.subEntries!.length} time entries
                        </td>
                      </tr>
                    )}

                    {/* SUB ENTRIES */}
                    {task.isExpanded &&
                      task.subEntries?.map((sub, idx) => {
                        const subKey = String(sub.id ?? `${task.id}-${idx}`);
                        const tr = safeTimeRange(sub);

                        return (
                          <tr key={subKey} className="bg-[#F2F9FE] border-b">
                            <td className="pl-8 h-11 py-0">
                              <div className="h-11 flex items-center gap-2">
                                <div className="flex items-center bg-[#DBE9FF] rounded-sm w-34.75 h-6.5 px-2 text-xs font-medium text-[#191F38]">
                                  <div className="flex items-center gap-1.5">
                                    <Image
                                      src="/assets/clock-blue.svg"
                                      alt="time"
                                      width={14}
                                      height={14}
                                      onClick={openTimeLog}
                                    />
                                    <span className="text-[10px] font-bold text-[#1E293B]">
                                      {tr.start} - {tr.end}
                                    </span>
                                  </div>
                                </div>

                                {sub.payable ? (
                                  <Button
                                    variant="outline"
                                    className="p-1"
                                    onClick={() =>
                                      togglePayable(task.id, subKey)
                                    }
                                  >
                                    <Image
                                      src="/assets/dollar-green.svg"
                                      alt="down"
                                      width={15}
                                      height={20}
                                    />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    className="p-1.5"
                                    onClick={() =>
                                      togglePayable(task.id, subKey)
                                    }
                                  >
                                    <Image
                                      src="/assets/dollar-cross.svg"
                                      alt="down"
                                      width={11}
                                      height={11}
                                    />
                                  </Button>
                                )}
                              </div>
                            </td>

                            {sub.weeklyHours.map((hour, i) => (
                              <HourCell
                                key={i}
                                hour={hour}
                                isSubEntry
                                editable={toMinutes(hour) > 0}
                                dayIndex={i}
                                editCell={{
                                  kind: "sub",
                                  taskId: task.id,
                                  subKey,
                                  dayIndex: i,
                                }}
                                onEdit={(cell, current) =>
                                  startEdit(cell, current)
                                }
                                onHoverIconClick={openTimeLog}
                              />
                            ))}

                            <HourCell hour="-" isTotal />

                            <td className="px-3 h-11 py-0 border-l border-[#E2E8F0] text-center">
                              <div className="h-11 flex items-center justify-center gap-2">
                                <Image
                                  src={
                                    sub.status === "completed"
                                      ? "/assets/tick-circle-green.svg"
                                      : "/assets/clock-red.svg"
                                  }
                                  alt="status"
                                  width={18}
                                  height={18}
                                  onClick={openTimeLog}
                                />
                                <Image
                                  src="/assets/3dot.svg"
                                  alt="more"
                                  width={24}
                                  height={24}
                                  onClick={(e) =>
                                    handleThreeDotClick(
                                      e,
                                      (sub.id as any) ?? subKey,
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        renderTimeEntriesView()
      )}
    </div>
  );
}

function TimerButton(props: { running: boolean; onToggle: () => void }) {
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
          <Square size={14} className="text-[#4157FE]" />
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
