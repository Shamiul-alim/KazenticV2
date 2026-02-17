"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";

import { HourCell } from "./HourCell";
import { TimerButton } from "./TimerButton";

import type { ActiveTimer, EditingCell, MyLogTask } from "../types";

import { safeTimeRange } from "../utils/logs";
import {
  toMinutes,
  parseClockToMinutes,
  minutesDiffWrap,
  formatMinutes,
} from "../utils/time";
import { TimePickerCell } from "../floating/TimePickerCell";

type TimeOption = { label: string; mins: number };

type Props = {
  days: string[];
  tasks: MyLogTask[];

  activeTimer: ActiveTimer | null;
  elapsedLabel: string;

  editing: EditingCell;
  draft: string;
  setDraft: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;

  onHeaderClick: (e: React.MouseEvent) => void;
  onThreeDotClick: (e: React.MouseEvent, id: string | number) => void;

  onToggleTaskExpanded: (taskId: string | number) => void;
  onToggleTimer: (taskId: string | number) => void;

  onOpenTimeLog: () => void;
  onOpenAddEntry: (
    taskId: string | number,
    dayIndex: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;

  onStartEdit: (cell: EditingCell, current: string) => void;
  onCommitEdit: () => void;
  onCancelEdit: () => void;

  onToggleSubPayable: (taskId: string | number, subKey: string) => void;

  timeOptions: TimeOption[];
  onOpenTimePicker: () => void;
  onSetSubStartTime: (
    taskId: string | number,
    subKey: string,
    label: string,
  ) => void;
  onSetSubEndTime: (
    taskId: string | number,
    subKey: string,
    label: string,
  ) => void;
};

export function TimeSheetView({
  days,
  tasks,
  activeTimer,
  elapsedLabel,
  editing,
  draft,
  setDraft,
  inputRef,
  onHeaderClick,
  onThreeDotClick,
  onToggleTaskExpanded,
  onToggleTimer,
  onOpenTimeLog,
  onOpenAddEntry,
  onStartEdit,
  onCommitEdit,
  onCancelEdit,
  onToggleSubPayable,

  timeOptions,
  onOpenTimePicker,
  onSetSubStartTime,
  onSetSubEndTime,
}: Props) {
  return (
    <div className="border border-[#E2E8F0] rounded-md mx-4">
      <table className="w-full text-left rounded-md border-collapse text-[11px]">
        <thead>
          <tr className="bg-[#F2F9FE] border-b border-[#EBEBEB] text-[#191F38] leading-3.5 tracking-[-0.05em] font-semibold rounded-tl-md rounded-tr-md">
            <th
              className="px-3 h-11 py-0 w-100 cursor-pointer rounded-tl-md"
              onClick={onHeaderClick}
            >
              Task
            </th>

            {days.map((day) => (
              <th
                key={day}
                className="text-center border-l border-[#E2E8F0] w-[80px] min-w-[80px] h-11 py-0 bg-[#F2F9FE]"
              >
                {day}
              </th>
            ))}

            <th className="text-center border-l border-[#E2E8F0]  w-[80px] min-w-[80px] h-11 py-0 bg-[#F2F9FE]">
              Total
            </th>
            <th className="w-20 border-l border-[#E2E8F0] h-11 py-0 bg-[#F2F9FE]  rounded-tr-md" />
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const rowBg = task.isExpanded ? "bg-[#F2F9FE]" : "bg-white";
            const isRunning = activeTimer?.taskId === task.id;

            return (
              <React.Fragment key={task.id}>
                {/* Task Row */}
                <tr
                  className={`border-t border-[#EBEBEB] group hover:opacity-90 transition-all ${rowBg}`}
                >
                  <td className="px-3 h-11 py-0 rounded-bl-md rounded-br-md">
                    <div className="flex items-center gap-3 w-full h-11">
                      <Image
                        src="/assets/arrow-down.svg"
                        alt=""
                        width={12}
                        height={12}
                        className={`transition-transform duration-200 cursor-pointer ${
                          task.isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                        onClick={() => onToggleTaskExpanded(task.id)}
                      />

                      <span
                        className="font-medium text-[11px] text-[#191F38] font-medium leading-4 tracking-[-0.05em] cursor-pointer"
                        onClick={() => onToggleTaskExpanded(task.id)}
                      >
                        {task.title}
                      </span>

                      <div className="ml-auto flex items-center gap-2">
                        <TimerButton
                          running={isRunning}
                          onToggle={() => onToggleTimer(task.id)}
                        />
                      </div>
                    </div>
                  </td>

                  {task.weeklyHours.map((hour, i) => {
                    const isActiveDay =
                      !!activeTimer &&
                      activeTimer.taskId === task.id &&
                      activeTimer.dayIndex === i;

                    return (
                      <HourCell
                        key={`task-${task.id}-day-${i}`}
                        hour={hour}
                        editable={!isActiveDay}
                        activeMarker={isActiveDay}
                        dayIndex={i}
                        editCell={{
                          kind: "task",
                          taskId: task.id,
                          dayIndex: i,
                        }}
                        onEdit={(cell, current) => onStartEdit(cell, current)}
                        onAddEntry={(e) => onOpenAddEntry(task.id, i, e)}
                        editing={editing}
                        draft={draft}
                        setDraft={setDraft}
                        commitEdit={onCommitEdit}
                        cancelEdit={onCancelEdit}
                        inputRef={inputRef}
                      />
                    );
                  })}

                  <HourCell
                    hour={task.total}
                    isTotal
                    editing={editing}
                    draft={draft}
                    setDraft={setDraft}
                    commitEdit={onCommitEdit}
                    cancelEdit={onCancelEdit}
                    inputRef={inputRef}
                  />

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
                      />
                      <Image
                        src="/assets/3dot.svg"
                        alt="more"
                        width={24}
                        height={24}
                        onClick={(e) => onThreeDotClick(e, task.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>

                {/* Sub header */}
                {task.isExpanded && (task.subEntries?.length ?? 0) > 0 && (
                  <tr className="bg-[#F2F9FE] border-t border-[#EBEBEB">
                    <td
                      colSpan={days.length + 3}
                      className="pl-8 h-11 py-0 text-[11px] text-[#697588] font-medium align-middle"
                    >
                      {task.subEntries!.length} time entries
                    </td>
                  </tr>
                )}

                {/* Sub rows */}
                {task.isExpanded &&
                  task.subEntries?.map((sub, idx) => {
                    const subKey = String(sub.id ?? `${task.id}-${idx}`);
                    const tr = safeTimeRange(sub);

                    const isRunningRow =
                      !!activeTimer &&
                      activeTimer.taskId === task.id &&
                      activeTimer.subId === subKey;

                    return (
                      <tr
                        key={subKey}
                        className="bg-[#F2F9FE] border-t border-[#EBEBEB]"
                      >
                        <td className="pl-8 h-11 py-0">
                          <div className="h-11 flex items-center gap-2">
                            <div className="flex items-center bg-[#DBE9FF] rounded-sm px-2 h-[26px]">
                              <Image
                                src="/assets/clock-blue.svg"
                                alt="time"
                                width={14}
                                height={14}
                                onClick={onOpenTimeLog}
                                className="cursor-pointer"
                              />

                              <div className="ml-1.5 flex items-center gap-1">
                                {isRunningRow ? (
                                  <span className="text-[10px] font-bold text-[#1E293B]">
                                    {tr.start} - {tr.end}
                                  </span>
                                ) : (
                                  <>
                                    <TimePickerCell
                                      value={tr.start}
                                      options={timeOptions}
                                      pillClassName="bg-transparent h-[26px] px-1 text-[10px] font-bold text-[#1E293B]"
                                      onOpen={onOpenTimePicker}
                                      onSelectLabel={(label) =>
                                        onSetSubStartTime(
                                          task.id,
                                          subKey,
                                          label,
                                        )
                                      }
                                    />

                                    <span className="text-[10px] font-bold text-[#1E293B]">
                                      -
                                    </span>

                                    <TimePickerCell
                                      value={tr.end}
                                      options={timeOptions}
                                      pillClassName="bg-transparent h-[26px] px-1 text-[10px] font-bold text-[#1E293B]"
                                      onOpen={onOpenTimePicker}
                                      renderRight={(t) => {
                                        const startM = parseClockToMinutes(
                                          tr.start,
                                        );
                                        if (startM == null) return "-";
                                        return formatMinutes(
                                          minutesDiffWrap(startM, t.mins),
                                        );
                                      }}
                                      onSelectLabel={(label) =>
                                        onSetSubEndTime(task.id, subKey, label)
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className={sub.payable ? "p-1" : "p-1.5"}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onToggleSubPayable(task.id, subKey);
                              }}
                            >
                              <Image
                                src={
                                  sub.payable
                                    ? "/assets/dollar-green.svg"
                                    : "/assets/dollar-cross.svg"
                                }
                                alt=""
                                width={sub.payable ? 15 : 11}
                                height={sub.payable ? 20 : 11}
                              />
                            </Button>
                          </div>
                        </td>

                        {sub.weeklyHours.map((hour, i) => {
                          const showPill =
                            isRunningRow && activeTimer?.dayIndex === i;

                          const subCellEditable =
                            !showPill && toMinutes(hour) > 0;

                          return (
                            <HourCell
                              key={`sub-${subKey}-day-${i}`}
                              hour={hour}
                              isSubEntry
                              editable={subCellEditable}
                              dayIndex={i}
                              editCell={{
                                kind: "sub",
                                taskId: task.id,
                                subKey,
                                dayIndex: i,
                              }}
                              onEdit={(cell, current) =>
                                onStartEdit(cell, current)
                              }
                              onAddEntry={
                                subCellEditable
                                  ? (e) => onOpenAddEntry(task.id, i, e)
                                  : undefined
                              }
                              runningPill={
                                showPill
                                  ? {
                                      elapsed: elapsedLabel,
                                      onStop: () => onToggleTimer(task.id),
                                    }
                                  : null
                              }
                              editing={editing}
                              draft={draft}
                              setDraft={setDraft}
                              commitEdit={onCommitEdit}
                              cancelEdit={onCancelEdit}
                              inputRef={inputRef}
                            />
                          );
                        })}

                        <HourCell
                          hour="-"
                          isTotal
                          editing={editing}
                          draft={draft}
                          setDraft={setDraft}
                          commitEdit={onCommitEdit}
                          cancelEdit={onCancelEdit}
                          inputRef={inputRef}
                        />

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
                              onClick={onOpenTimeLog}
                            />
                            <Image
                              src="/assets/3dot.svg"
                              alt="more"
                              width={24}
                              height={24}
                              onClick={(e) =>
                                onThreeDotClick(e, (sub.id as any) ?? subKey)
                              }
                              className="cursor-pointer"
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
  );
}
