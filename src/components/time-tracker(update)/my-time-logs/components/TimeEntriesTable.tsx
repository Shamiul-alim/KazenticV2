"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";

import type { TimeEntryGroup, TimeEntryRow } from "../types";
import type { TagDef } from "../utils/tags";
import { AnchoredPopover } from "./portals/AnchoredPopover";
import { EditPreviewPortal } from "./portals/EditPreviewPortal";
import { EntryTagCell } from "./EntryTagCell";
import { TimePickerCell } from "../floating/TimePickerCell";

import {
  buildTimeOptions,
  computeDurationFromTimes,
  formatMinutes,
  formatMinutesToClock,
  humanizeMinutes,
  minutesDiffWrap,
  parseClockToMinutes,
  toMinutes,
} from "../utils/time";

type EntryEdit = {
  kind: "task" | "description" | "tag" | "signIn" | "signOut" | "duration";
  date: string;
  entryId: string | number;
} | null;

export function TimeEntriesTable(props: {
  visibleTimeEntries: TimeEntryGroup[];
  onlyPayable: boolean;

  tagDefs: TagDef[];
  setTagDefs: React.Dispatch<React.SetStateAction<TagDef[]>>;

  setTimeEntries: React.Dispatch<React.SetStateAction<TimeEntryGroup[]>>;

  myColors: string[];
  addMyColor: (hex: string) => void;

  openTimeLog: () => void;
  handleThreeDotClick: (e: React.MouseEvent, id: string | number) => void;
  closeAllMenus: () => void;
  closeAddEntry: () => void;
}) {
  const {
    visibleTimeEntries,
    onlyPayable,
    tagDefs,
    setTagDefs,
    setTimeEntries,
    myColors,
    addMyColor,
    openTimeLog,
    handleThreeDotClick,
    closeAllMenus,
    closeAddEntry,
  } = props;

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      visibleTimeEntries.forEach((g) => {
        init[String(g.date)] = g.isExpanded ?? true;
      });
      return init;
    },
  );

  const toggleEntryGroupExpanded = (date: string) => {
    setExpandedGroups((prev) => ({ ...prev, [date]: !(prev[date] ?? true) }));
  };

  const timeOptions = useMemo(() => buildTimeOptions(15), []);

  const [entryEdit, setEntryEdit] = useState<EntryEdit>(null);
  const [entryDraft, setEntryDraft] = useState("");
  const [entryAnchorEl, setEntryAnchorEl] = useState<HTMLElement | null>(null);
  const entryPopoverRef = useRef<HTMLDivElement | null>(null);
  const entryInputRef = useRef<HTMLInputElement | null>(null);
  const entryTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const entryOriginalRef = useRef<string>("");

  const isEditingEntry = (
    kind: NonNullable<EntryEdit>["kind"],
    date: string,
    id: string | number,
  ) =>
    !!entryEdit &&
    entryEdit.kind === kind &&
    entryEdit.date === date &&
    entryEdit.entryId === id;

  const computeGroupTotalHours = (entries: TimeEntryRow[]) => {
    const totalMins = (entries ?? []).reduce((sum, e) => {
      const dur = toMinutes(e.duration);
      if (dur > 0) return sum + dur;

      const derived = toMinutes(computeDurationFromTimes(e.signIn, e.signOut));
      return sum + derived;
    }, 0);

    return formatMinutes(totalMins);
  };

  const patchTimeEntry = (
    date: string,
    entryId: string | number,
    updater: (e: TimeEntryRow) => TimeEntryRow,
  ) => {
    setTimeEntries((prev) =>
      prev.map((g) => {
        if (String(g.date) !== String(date)) return g;
        const nextEntries = (g.entries ?? []).map((e) =>
          e.id === entryId ? updater(e) : e,
        );
        return {
          ...g,
          entries: nextEntries,
          totalHours: computeGroupTotalHours(nextEntries),
        };
      }),
    );
  };

  const closeEntryEdit = () => {
    setEntryEdit(null);
    setEntryDraft("");
    setEntryAnchorEl(null);
    entryOriginalRef.current = "";
  };

  const startEntryEdit = (
    kind: NonNullable<EntryEdit>["kind"],
    date: string,
    entryId: string | number,
    current: string,
    anchor: HTMLElement,
  ) => {
    closeAllMenus();
    closeAddEntry();

    entryOriginalRef.current = current ?? "";
    setEntryEdit({ kind, date, entryId });
    setEntryDraft(
      current === "-" || current === "—" ? "" : String(current ?? ""),
    );
    setEntryAnchorEl(anchor);

    setTimeout(() => {
      if (kind === "description") {
        const el = entryTextareaRef.current;
        el?.focus();
        if (el) {
          const len = el.value.length;
          el.setSelectionRange(len, len);
        }
      } else {
        entryInputRef.current?.focus();
        entryInputRef.current?.select();
      }
    }, 0);
  };

  const commitEntryEdit = () => {
    if (!entryEdit) return;
    const { kind, date, entryId } = entryEdit;
    const v = entryDraft;

    if (kind === "task") {
      patchTimeEntry(date, entryId, (e) => ({
        ...e,
        task: v.trim() || e.task,
      }));
      closeEntryEdit();
      return;
    }

    if (kind === "description") {
      patchTimeEntry(date, entryId, (e) => ({
        ...e,
        description: v.trim() || "-",
      }));
      closeEntryEdit();
      return;
    }

    if (kind === "tag") {
      patchTimeEntry(date, entryId, (e) => ({ ...e, tag: v.trim() || e.tag }));
      closeEntryEdit();
      return;
    }

    if (kind === "duration") {
      const mins = toMinutes(v);
      patchTimeEntry(date, entryId, (e) => {
        const nextDuration = mins > 0 ? formatMinutes(mins) : "-";
        const startM = parseClockToMinutes(e.signIn);
        if (startM != null && mins > 0) {
          const endM = (startM + mins) % (24 * 60);
          return {
            ...e,
            duration: nextDuration,
            signOut: formatMinutesToClock(endM),
          };
        }
        return { ...e, duration: nextDuration };
      });
      closeEntryEdit();
      return;
    }

    if (kind === "signIn") {
      const m =
        parseClockToMinutes(v) ?? parseClockToMinutes(entryOriginalRef.current);
      patchTimeEntry(date, entryId, (e) => {
        const nextStart = m == null ? e.signIn : formatMinutesToClock(m);
        const nextDuration = computeDurationFromTimes(nextStart, e.signOut);
        return { ...e, signIn: nextStart, duration: nextDuration };
      });
      closeEntryEdit();
      return;
    }

    if (kind === "signOut") {
      const m =
        parseClockToMinutes(v) ?? parseClockToMinutes(entryOriginalRef.current);
      patchTimeEntry(date, entryId, (e) => {
        const nextEnd = m == null ? e.signOut : formatMinutesToClock(m);
        const nextDuration = computeDurationFromTimes(e.signIn, nextEnd);
        return { ...e, signOut: nextEnd, duration: nextDuration };
      });
      closeEntryEdit();
      return;
    }

    closeEntryEdit();
  };

  // auto-commit on outside click
  useEffect(() => {
    if (!entryEdit) return;

    const onDown = (ev: MouseEvent) => {
      const t = ev.target as Node;
      if (entryAnchorEl && entryAnchorEl.contains(t)) return;
      if (entryPopoverRef.current && entryPopoverRef.current.contains(t))
        return;
      commitEntryEdit();
    };

    window.addEventListener("mousedown", onDown, true);
    return () => window.removeEventListener("mousedown", onDown, true);
  }, [entryEdit, entryDraft, entryAnchorEl]);

  return (
    <div className="space-y-4 mt-5 mx-4 leading-5 tracking-[-0.05em]">
      {visibleTimeEntries.map((group, idx) => {
        const isExpanded = expandedGroups[String(group.date)] ?? true;

        return (
          <div key={idx}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={`transition-transform duration-200 cursor-pointer ${isExpanded ? "rotate-0" : "-rotate-90"}`}
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

            {isExpanded && (
              <div className="border border-[#E2E8F0] rounded-md overflow-hidden mt-3">
                <table className="w-full text-left text-[11px] table-fixed">
                  <thead>
                    <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                      <th className="px-3 py-2 w-[28%]">Task</th>
                      <th className="px-3 py-2 w-[15%]">Description</th>
                      <th className="px-3 py-2">Payable</th>
                      <th className="px-3 py-2">Tags</th>
                      <th className="px-3 py-2">Signed In</th>
                      <th className="px-3 py-2">Signed Out</th>
                      <th className="px-3 py-2">Duration</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.entries.map((entry) => {
                      const dateKey = String(group.date);

                      const editingTask = isEditingEntry(
                        "task",
                        dateKey,
                        entry.id,
                      );
                      const editingDesc = isEditingEntry(
                        "description",
                        dateKey,
                        entry.id,
                      );
                      const editingDur = isEditingEntry(
                        "duration",
                        dateKey,
                        entry.id,
                      );

                      const showDurPreview =
                        editingDur &&
                        entryDraft.trim().length > 0 &&
                        toMinutes(entryDraft) > 0;
                      const startMForRow = parseClockToMinutes(entry.signIn);

                      return (
                        <tr
                          key={entry.id}
                          className="border-b border-[#EBEBEB] hover:bg-slate-50"
                        >
                          <td
                            data-entry-edit-anchor={`${dateKey}::${String(entry.id)}::task`}
                            className="px-3 py-2 text-[11px] leading-4 font-medium tracking-[-0.05em] text-[#191F38]"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              if (editingTask) return;
                              startEntryEdit(
                                "task",
                                dateKey,
                                entry.id,
                                entry.task,
                                e.currentTarget as HTMLElement,
                              );
                            }}
                          >
                            {!editingTask ? (
                              entry.task
                            ) : (
                              <input
                                ref={entryInputRef}
                                value={entryDraft}
                                onChange={(e) => setEntryDraft(e.target.value)}
                                className="w-full bg-transparent outline-none text-[11px] leading-4 font-medium text-[#191F38]"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitEntryEdit();
                                  if (e.key === "Escape") closeEntryEdit();
                                }}
                              />
                            )}
                          </td>

                          <td
                            className="px-3 py-2 text-[11px] leading-4 font-medium text-[#191F38] cursor-pointer"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              if (editingDesc) return;
                              startEntryEdit(
                                "description",
                                dateKey,
                                entry.id,
                                entry.description,
                                e.currentTarget as HTMLElement,
                              );
                            }}
                          >
                            <div
                              className="break-words overflow-hidden whitespace-pre-wrap"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                              title={
                                entry.description?.trim()
                                  ? entry.description
                                  : "-"
                              }
                            >
                              {entry.description?.trim()
                                ? entry.description
                                : "-"}
                            </div>
                          </td>

                          <td className="px-3 py-2">
                            {entry.payable ? (
                              <Button
                                variant="outline"
                                size="md"
                                className="p-1"
                                onClick={() =>
                                  patchTimeEntry(dateKey, entry.id, (e) => ({
                                    ...e,
                                    payable: !e.payable,
                                  }))
                                }
                              >
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
                                onClick={() =>
                                  patchTimeEntry(dateKey, entry.id, (e) => ({
                                    ...e,
                                    payable: !e.payable,
                                  }))
                                }
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
                            <EntryTagCell
                              dateKey={dateKey}
                              entry={entry}
                              tagDefs={tagDefs}
                              setTagDefs={setTagDefs}
                              patchTimeEntry={patchTimeEntry}
                              myColors={myColors}
                              addMyColor={addMyColor}
                            />
                          </td>

                          <td className="px-3 py-2">
                            <TimePickerCell
                              value={entry.signIn}
                              pillClassName="bg-[#C4FFE2] w-[103px] h-[26px] rounded-sm"
                              options={timeOptions}
                              onOpen={() => {
                                closeAllMenus();
                                closeEntryEdit();
                                closeAddEntry();
                              }}
                              onSelectLabel={(label) => {
                                patchTimeEntry(dateKey, entry.id, (x) => {
                                  const nextDuration = computeDurationFromTimes(
                                    label,
                                    x.signOut,
                                  );
                                  return {
                                    ...x,
                                    signIn: label,
                                    duration: nextDuration,
                                  };
                                });
                              }}
                            />
                          </td>

                          <td className="px-3 py-2">
                            <TimePickerCell
                              value={entry.signOut}
                              pillClassName="bg-[#FFD1CC] w-[103px] h-[26px] rounded-sm"
                              options={timeOptions}
                              onOpen={() => {
                                closeAllMenus();
                                closeEntryEdit();
                                closeAddEntry();
                              }}
                              renderRight={(t) => {
                                if (startMForRow == null) return "-";
                                return formatMinutes(
                                  minutesDiffWrap(startMForRow, t.mins),
                                );
                              }}
                              onSelectLabel={(label) => {
                                patchTimeEntry(dateKey, entry.id, (x) => {
                                  const nextDuration = computeDurationFromTimes(
                                    x.signIn,
                                    label,
                                  );
                                  return {
                                    ...x,
                                    signOut: label,
                                    duration: nextDuration,
                                  };
                                });
                              }}
                            />
                          </td>

                          <td className="px-3 py-2">
                            <span
                              className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs cursor-pointer"
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                if (editingDur) return;
                                startEntryEdit(
                                  "duration",
                                  dateKey,
                                  entry.id,
                                  entry.duration,
                                  e.currentTarget as HTMLElement,
                                );
                              }}
                            >
                              {!editingDur ? (
                                entry.duration
                              ) : (
                                <input
                                  ref={entryInputRef}
                                  value={entryDraft}
                                  onChange={(e) =>
                                    setEntryDraft(e.target.value)
                                  }
                                  className="w-full h-full bg-transparent outline-none text-center text-xs font-medium text-[#191F38]"
                                  placeholder="-"
                                  onKeyDown={(e) => {
                                    if (e.key === "Escape") closeEntryEdit();
                                    if (e.key === "Enter") commitEntryEdit();
                                  }}
                                />
                              )}
                            </span>

                            <EditPreviewPortal
                              open={showDurPreview}
                              targetEl={entryAnchorEl}
                              label={humanizeMinutes(toMinutes(entryDraft))}
                            />
                          </td>

                          <td className="px-3 py-2 gap-2 flex text-start">
                            <Image
                              src="/assets/clock-red.svg"
                              alt=""
                              width={18}
                              height={18}
                              onClick={openTimeLog}
                              className="cursor-pointer"
                            />
                            <Image
                              src="/assets/3dot.svg"
                              alt=""
                              width={18}
                              height={18}
                              onClick={(e) => handleThreeDotClick(e, entry.id)}
                              className="cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })}

                    <tr className="hover:bg-slate-50">
                      <td
                        colSpan={8}
                        className="px-3 py-2 text-[11px] font-medium text-[#697588] cursor-pointer flex gap-1"
                        onClick={() => {
                          const newId = `new-${Date.now()}`;
                          const dateKey = String(group.date);

                          setTimeEntries((prev) =>
                            prev.map((g) => {
                              if (String(g.date) !== dateKey) return g;
                              const nextEntries = [
                                ...(g.entries ?? []),
                                {
                                  id: newId,
                                  task: "New task",
                                  description: "-",
                                  payable: onlyPayable ? true : false,
                                  tag: "",
                                  tagIds: [],
                                  signIn: "—",
                                  signOut: "—",
                                  duration: "-",
                                } satisfies TimeEntryRow,
                              ];
                              return {
                                ...g,
                                entries: nextEntries,
                                totalHours: computeGroupTotalHours(nextEntries),
                              };
                            }),
                          );

                          setTimeout(() => {
                            const el = document.querySelector(
                              `[data-entry-edit-anchor="${dateKey}::${newId}::task"]`,
                            ) as HTMLElement | null;
                            if (el)
                              startEntryEdit(
                                "task",
                                dateKey,
                                newId,
                                "New task",
                                el,
                              );
                          }, 0);
                        }}
                      >
                        <Image
                          src="/assets/plus-gray.svg"
                          width={12}
                          height={12}
                          alt=""
                        />
                        Add entry
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      <AnchoredPopover
        open={entryEdit?.kind === "description"}
        anchorEl={entryAnchorEl}
        offset={8}
        zIndex={140}
        width={300}
      >
        <div
          ref={entryPopoverRef}
          className="w-[300px] rounded-md border border-[#EBEBEB] bg-[#FDFDFD] shadow-md p-3"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Textarea
            ref={entryTextareaRef}
            value={entryDraft}
            onChange={(e) => setEntryDraft(e.target.value)}
            placeholder="Write a description..."
            className="overflow-auto whitespace-pre-wrap break-words text-[11px] leading-4"
          />

          <div className="flex justify-end mt-2">
            <Button
              variant="success"
              size="md"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                commitEntryEdit();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </AnchoredPopover>
    </div>
  );
}
