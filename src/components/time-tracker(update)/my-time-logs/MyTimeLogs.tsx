"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import mockData from "@/data/my-time-log/my-time-logs.json";
import { Button } from "@/components/ui/Button";

import TaskSection from "@/components/time-tracker/floating-component/TaskSection";
import ThreeDotMenu from "@/components/time-tracker/floating-component/ThreeDotMenu";
import TimeLogDrawer from "@/components/time-tracker/floating-component/TimeLogDrawer";
import RequestForm from "@/components/time-tracker/floating-component/RequestForm";

import AddEntryFloating, {
  AddEntryAnchor,
  AddEntryPayload,
} from "./floating/AddEntryFloating";
import { TimeEntriesTable } from "./components/TimeEntriesTable";

import type {
  ActiveTimer,
  EditingCell,
  MyLogSubEntry,
  MyLogTask,
  TimeEntryGroup,
  ViewMode,
} from "./types";
import type { TagDef } from "./utils/tags";

import { deepClone } from "./utils/clone";
import { computeTaskFromSubs, padWeeklyHours } from "./utils/logs";
import {
  buildTimeOptions,
  formatClock,
  formatHMS,
  formatMinutes,
  toMinutes,
} from "./utils/time";
import { makeTimerSubId, norm, pickColor, uid } from "./utils/tags";

import { TimeSheetView } from "./components/TimeSheetView";

type AddEntryCtx = {
  taskId: string | number;
  dayIndex: number;
  anchor: AddEntryAnchor;
};

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
  }>({ isOpen: false, x: 0, y: 0 });

  const [addEntryOpen, setAddEntryOpen] = useState(false);
  const [addEntryCtx, setAddEntryCtx] = useState<AddEntryCtx | null>(null);

  const [onlyPayable, setOnlyPayable] = useState(false);

  const [editing, setEditing] = useState<EditingCell>(null);
  const [draft, setDraft] = useState("");

  // ✅ FIX: keep it nullable everywhere
  const inputRef = useRef<HTMLInputElement | null>(null);

  const originalMinsRef = useRef<number>(0);
  const commitLockRef = useRef(false);

  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [nowTs, setNowTs] = useState<number>(() => Date.now());
  const timeOptions = useMemo(() => buildTimeOptions(), []);

  useEffect(() => {
    if (!activeTimer) return;
    setNowTs(Date.now());
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [activeTimer]);

  const days = [
    "Sun, Dec 8",
    "Mon, Dec 9",
    "Tue, Dec 10",
    "Wed, Dec 11",
    "Thu, Dec 13",
    "Fri, Dec 14",
    "Sat, Dec 15",
  ];

  // ---- Tag catalog from mock timeEntries ----
  const initialTagDefsRef = useRef<TagDef[] | null>(null);
  if (!initialTagDefsRef.current) {
    const raw: any[] = (mockData as any).timeEntries ?? [];
    const labels = new Set<string>();
    raw.forEach((g) =>
      (g.entries ?? []).forEach((e: any) => e.tag && labels.add(String(e.tag))),
    );

    initialTagDefsRef.current = Array.from(labels).map((label, i) => ({
      id: uid("tag"),
      label,
      color: pickColor(i),
    }));
  }

  const tagIdByLabel = (defs: TagDef[]) =>
    new Map(defs.map((t) => [norm(t.label), t.id]));

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

  const [tagDefs, setTagDefs] = useState<TagDef[]>(() =>
    deepClone(initialTagDefsRef.current ?? []),
  );

  const [timeEntries, setTimeEntries] = useState<TimeEntryGroup[]>(() => {
    const raw: TimeEntryGroup[] = deepClone(
      (mockData as any).timeEntries ?? [],
    );
    const map = tagIdByLabel(initialTagDefsRef.current ?? []);
    return raw.map((g) => ({
      ...g,
      entries: (g.entries ?? []).map((e) => ({
        ...e,
        payable: false,
        tagIds: e.tag
          ? ([map.get(norm(e.tag))].filter(Boolean) as string[])
          : [],
      })),
    }));
  });

  const closeAllMenus = () => {
    setActiveMenu(null);
    setMenuConfig((p) => ({ ...p, isOpen: false }));
  };

  const openTimeLog = () => {
    closeAllMenus();
    setIsTimeLogOpen(true);
  };

  const openAddEntry = (
    taskId: string | number,
    dayIndex: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    closeAllMenus();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setAddEntryCtx({ taskId, dayIndex, anchor: { x: r.right, y: r.top } });
    setAddEntryOpen(true);
  };

  const closeAddEntry = () => {
    setAddEntryOpen(false);
    setAddEntryCtx(null);
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
    setActiveMenu((prev) =>
      prev?.id === id ? null : { id, x: e.clientX, y: e.clientY + 10 },
    );
  };

  const toggleTaskExpanded = (taskId: string | number) => {
    setMyLogs((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t,
      ),
    );
  };

  // ✅ NEW: Toggle sub-entry payable (by subKey)
  const toggleSubPayable = (taskId: string | number, subKey: string) => {
    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;

        const nextSubs = (t.subEntries ?? []).map((s, idx) => {
          const key = String(s.id ?? `${t.id}-${idx}`);
          if (key !== subKey) return s;
          return { ...s, payable: !s.payable };
        });

        return computeTaskFromSubs({ ...t, subEntries: nextSubs });
      }),
    );
  };

  const patchSubEntry = (
    taskId: string | number,
    subKey: string,
    patcher: (s: MyLogSubEntry) => MyLogSubEntry,
  ) => {
    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;

        const nextSubs = (t.subEntries ?? []).map((s, idx) => {
          const key = String(s.id ?? `${t.id}-${idx}`);
          if (key !== subKey) return s;
          return patcher(s);
        });

        return computeTaskFromSubs({ ...t, subEntries: nextSubs });
      }),
    );
  };

  const setSubStartTime = (
    taskId: string | number,
    subKey: string,
    label: string,
  ) => patchSubEntry(taskId, subKey, (s) => ({ ...s, startTime: label }));

  const setSubEndTime = (
    taskId: string | number,
    subKey: string,
    label: string,
  ) => patchSubEntry(taskId, subKey, (s) => ({ ...s, endTime: label }));

  const onOpenTimePicker = () => {
    closeAllMenus();
    closeAddEntry();
  };

  const visibleMyLogs = useMemo(() => {
    if (!onlyPayable) return myLogs;

    return myLogs.map((t) => {
      const keepRunning =
        activeTimer && t.id === activeTimer.taskId ? activeTimer.subId : null;

      return {
        ...t,
        subEntries: t.subEntries
          ? t.subEntries.filter(
              (s) => s.payable || (keepRunning && String(s.id) === keepRunning),
            )
          : t.subEntries,
      };
    });
  }, [myLogs, onlyPayable, activeTimer]);

  const visibleTimeEntries = useMemo(() => {
    if (!onlyPayable) return timeEntries;
    return timeEntries.map((g) => ({
      ...g,
      entries: g.entries.filter((e) => e.payable),
    }));
  }, [timeEntries, onlyPayable]);

  // ---- Sheet edit ----
  const startEdit = (cell: EditingCell, current: string) => {
    closeAllMenus();
    originalMinsRef.current = toMinutes(current);
    commitLockRef.current = false;
    setEditing(cell);
    setDraft(current === "-" ? "" : current);
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft("");
    commitLockRef.current = false;
  };

  const commitEdit = () => {
    if (!editing) return;
    if (commitLockRef.current) return;
    commitLockRef.current = true;

    const releaseLock = () =>
      setTimeout(() => (commitLockRef.current = false), 0);

    const nextMins = toMinutes(draft);
    const originalMins = originalMinsRef.current;

    if (nextMins === originalMins) {
      setEditing(null);
      setDraft("");
      releaseLock();
      return;
    }

    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== editing.taskId) return t;
        const daysCount = t.weeklyHours.length;

        if (editing.kind === "task") {
          const dayIndex = editing.dayIndex;
          const nextSubs = [...(t.subEntries ?? [])];

          const isManual = (s: MyLogSubEntry) =>
            String(s.id ?? "").startsWith(`manual-${t.id}-`);
          const minsAtDay = (s: MyLogSubEntry) =>
            toMinutes((s.weeklyHours ?? [])[dayIndex] ?? "-");

          const othersMins = nextSubs.reduce(
            (sum, s) => (isManual(s) ? sum : sum + minsAtDay(s)),
            0,
          );

          const desiredManualMins = Math.max(0, nextMins - othersMins);

          const existingManual = nextSubs.find(
            (s) => isManual(s) && minsAtDay(s) > 0,
          );

          if (desiredManualMins === 0) {
            if (existingManual)
              nextSubs.splice(nextSubs.indexOf(existingManual), 1);
            return computeTaskFromSubs({ ...t, subEntries: nextSubs });
          }

          const wh = padWeeklyHours(daysCount);
          wh[dayIndex] = formatMinutes(desiredManualMins);

          if (existingManual) {
            const idx = nextSubs.indexOf(existingManual);
            nextSubs[idx] = {
              ...existingManual,
              weeklyHours: wh,
              source: "manual",
              startTime: existingManual.startTime ?? "—",
              endTime: existingManual.endTime ?? "—",
            };
          } else {
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
          const value = formatMinutes(nextMins);

          const nextSubs = (t.subEntries ?? [])
            .map((s, idx) => {
              const key = String(s.id ?? `${t.id}-${idx}`);
              if (key !== editing.subKey) return s;

              const wh = [...(s.weeklyHours ?? padWeeklyHours(daysCount))];
              wh[dayIndex] = nextMins === 0 ? "-" : value;
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
    releaseLock();
  };

  // ---- Timer ----
  const stopTimer = (timer: ActiveTimer) => {
    const endedAt = Date.now();
    const mins = Math.max(1, Math.round((endedAt - timer.startedAt) / 60000));
    const value = formatMinutes(mins);

    setActiveTimer(null);

    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== timer.taskId) return t;

        const daysCount = t.weeklyHours.length;
        const end = formatClock(endedAt);

        const nextSubs = (t.subEntries ?? []).map((s) => {
          if (String(s.id) !== timer.subId) return s;
          const wh = [...(s.weeklyHours ?? padWeeklyHours(daysCount))];
          wh[Math.min(timer.dayIndex, daysCount - 1)] = value;
          return { ...s, weeklyHours: wh, endTime: end, isRunning: false };
        });

        return computeTaskFromSubs({ ...t, subEntries: nextSubs });
      }),
    );
  };

  const startTimer = (taskId: string | number) => {
    const startedAt = Date.now();
    const dayIndex = new Date(startedAt).getDay();
    const subId = makeTimerSubId(taskId);

    setActiveTimer({ taskId, subId, startedAt, dayIndex });

    setMyLogs((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;

        const daysCount = t.weeklyHours.length;
        const wh = padWeeklyHours(daysCount);
        const start = formatClock(startedAt);

        const runningSub: MyLogSubEntry = {
          id: subId,
          payable: false,
          status: t.status,
          weeklyHours: wh,
          source: "timer",
          startTime: start,
          endTime: "Now",
          createdAt: startedAt,
          isRunning: true,
        };

        const rest = (t.subEntries ?? []).filter(
          (s) =>
            !s.isRunning && String(s.endTime ?? "").toLowerCase() !== "now",
        );

        return computeTaskFromSubs({
          ...t,
          isExpanded: true,
          subEntries: [runningSub, ...rest],
        });
      }),
    );
  };

  const toggleTimer = (taskId: string | number) => {
    if (activeTimer?.taskId === taskId) {
      stopTimer(activeTimer);
      return;
    }
    if (activeTimer) stopTimer(activeTimer);
    startTimer(taskId);
  };

  const elapsedLabel = useMemo(() => {
    if (!activeTimer) return "";
    const secs = Math.floor((nowTs - activeTimer.startedAt) / 1000);
    return formatHMS(secs);
  }, [activeTimer, nowTs]);

  // Global escape
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      closeAllMenus();
      setIsModalOpen(false);
      setIsTimeLogOpen(false);
      closeAddEntry();
      setEditing(null);
      setDraft("");
      commitLockRef.current = false;
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

      <AddEntryFloating
        open={addEntryOpen}
        onClose={closeAddEntry}
        anchor={addEntryCtx?.anchor ?? null}
        userName="Shamiul Alim Shihab"
        dayLabel={
          addEntryCtx
            ? days[Math.min(addEntryCtx.dayIndex, days.length - 1)]
            : ""
        }
        onSave={(payload: AddEntryPayload) => {
          if (!addEntryCtx) return;
          const { taskId, dayIndex } = addEntryCtx;
          const createdAt = Date.now();

          setMyLogs((prev) =>
            prev.map((t) => {
              if (t.id !== taskId) return t;

              const daysCount = t.weeklyHours.length;
              const wh = padWeeklyHours(daysCount);
              wh[Math.min(dayIndex, daysCount - 1)] = formatMinutes(
                payload.durationMins,
              );

              const newSub: MyLogSubEntry = {
                id: `manual-${t.id}-${dayIndex}-${createdAt}`,
                payable: payload.payable,
                status: t.status,
                weeklyHours: wh,
                source: payload.source,
                startTime: payload.startTime,
                endTime: payload.endTime,
                createdAt,
                notes: payload.notes,
                tags: payload.tags,
                isRunning: false,
              };

              return computeTaskFromSubs({
                ...t,
                isExpanded: true,
                subEntries: [newSub, ...(t.subEntries ?? [])],
              });
            }),
          );

          closeAddEntry();
        }}
      />

      <div className="flex items-center justify-between border-b border-[#EBEBEB] text-[#697588] px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              closeAllMenus();
              setOnlyPayable((v) => !v);
            }}
          >
            <Image src="/assets/dollar.svg" alt="down" width={14} height={14} />
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
            />
          </Button>

          <TimeLogDrawer
            isOpen={isTimeLogOpen}
            onClose={() => setIsTimeLogOpen(false)}
          />

          <div className="flex py-1.5">
            <button
              onClick={() => setViewMode("entries")}
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
              onClick={() => setViewMode("sheet")}
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
        <TimeSheetView
          days={days}
          tasks={visibleMyLogs}
          activeTimer={activeTimer}
          elapsedLabel={elapsedLabel}
          editing={editing}
          draft={draft}
          setDraft={setDraft}
          inputRef={inputRef}
          onHeaderClick={handleHeaderClick}
          onThreeDotClick={handleThreeDotClick}
          onToggleTaskExpanded={toggleTaskExpanded}
          onToggleTimer={toggleTimer}
          onOpenTimeLog={openTimeLog}
          onOpenAddEntry={openAddEntry}
          onStartEdit={startEdit}
          onCommitEdit={commitEdit}
          onCancelEdit={cancelEdit}
          onToggleSubPayable={toggleSubPayable}
          timeOptions={timeOptions}
          onOpenTimePicker={onOpenTimePicker}
          onSetSubStartTime={setSubStartTime}
          onSetSubEndTime={setSubEndTime}
        />
      ) : (
        <TimeEntriesTable
          visibleTimeEntries={visibleTimeEntries}
          onlyPayable={onlyPayable}
          tagDefs={tagDefs}
          setTagDefs={setTagDefs}
          setTimeEntries={setTimeEntries}
          myColors={["#111827"]}
          addMyColor={() => {}}
          openTimeLog={openTimeLog}
          handleThreeDotClick={handleThreeDotClick}
          closeAllMenus={closeAllMenus}
          closeAddEntry={closeAddEntry}
        />
      )}
    </div>
  );
}
