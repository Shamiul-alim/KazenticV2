"use client";
import React, { useState } from "react";
import Image from "next/image";
import mockData from "@/data/time-tracker/tracker-details.json";
import { Button } from "../ui/Button";
import TaskSection from "../time-tracker/floating-component/TaskSection";
import ThreeDotMenu from "../time-tracker/floating-component/ThreeDotMenu";
import TimeLogDrawer from "../time-tracker/floating-component/TimeLogDrawer";
import RequestForm from "../time-tracker/floating-component/RequestForm";

export default function MyTimeLogs() {
  const [viewMode, setViewMode] = useState<"entries" | "sheet">("sheet");
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
  const handleHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setMenuConfig({
      isOpen: true,
      x: e.clientX,
      y: e.clientY + 10,
    });
  };
  const handleThreeDotClick = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu({
      id,
      x: e.clientX,
      y: e.clientY + 10,
    });
  };
  const days = [
    "Sun, Dec 8",
    "Mon, Dec 9",
    "Tue, Dec 10",
    "Wed, Dec 11",
    "Thu, Dec 13",
    "Fri, Dec 14",
    "Sat, Dec 15",
  ];

  const HourCell = ({
    hour,
    isTotal = false,
    isSubEntry = false,
  }: {
    hour: string;
    isTotal?: boolean;
    isSubEntry?: boolean;
  }) => {
    const maxHours = 9;
    const numericHour =
      hour !== "-" ? parseInt(hour.replace("h", ""), 10) : null;
    const percentage = isTotal
      ? 100
      : numericHour !== null
        ? Math.min((numericHour / maxHours) * 100, 100)
        : 0;
    const barColor =
      (numericHour !== null && numericHour >= 9) || isTotal
        ? "bg-[#22C55E]"
        : "bg-[#F87171]";

    return (
      <td
        className={`relative px-3 py-2 text-center border-l border-[#EBEBEB] ${hour === "-" ? "bg-[#F3F4F6]" : "bg-white"} ${isTotal ? "bg-[#F8FAFC] font-bold" : ""}`}
      >
        {/* TOP PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-1.25 bg-[#E4E4E4]">
          {(numericHour !== null || isTotal) && (
            <div
              className={`h-full ${barColor} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        {/* CONTENT */}
        <span
          className={`text-[11px] leading-4 ${isTotal ? "text-[#1E293B]" : "text-[#191F38] font-medium"}`}
        >
          {hour}
        </span>
      </td>
    );
  };
  const renderTimeEntriesView = () => (
    <div className="space-y-4 mt-5 mx-4 leading-5 tracking-[-0.05em]">
      {mockData.timeEntries.map((group, idx) => (
        <div key={idx} className="">
          {/* Group Header */}
          <div className="  flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/arrow-down.svg"
                alt=""
                width={18}
                height={18}
                className={`transition-transform -rotate-90"`}
              />
              <Button variant="outline" size="md">
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
                <Image src="/assets/timer.svg" alt="" width={12} height={12} />
                <span className="text-[#DC2626] flex items-center gap-1">
                  {group.totalHours}
                </span>
                <span className="text-[#697588]">/ {group.limit}</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#E2E8F0] rounded-md overflow-hidden  mt-3 ">
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
                    <td className="px-3 py-2 text-[11px] leading-4 font-medium text-[#191F38]">
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
                        <Button variant="outline" size="md" className="p-1.5">
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
                      />
                      <Image
                        src="/assets/3dot.svg"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-3 leading-5 tracking-[-0.05em] text-[#191F38] w-full ">
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
          <Button variant="outline">
            <Image src="/assets/dollar.svg" alt="down" width={14} height={14} />{" "}
            Payable
          </Button>

          <Button variant="outline">
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

            <span className=" text-xs font-medium  ">Jan 8 - 22</span>

            <Image
              src="/assets/arrow-down-fill.svg"
              alt="down"
              width={12}
              height={12}
            />
          </Button>

          <Button variant="outline">This Week</Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="success"
            size="md"
          >
            Send for Review
          </Button>

          <Button variant="outline" onClick={() => setIsTimeLogOpen(true)}>
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
              onClick={() => setViewMode("entries")}
              className={`flex items-center gap-1 px-1.5 py-1  border border-[#EBEBEB] rounded-tl-sm rounded-bl-sm text-xs leading-3 tracking-tighter font-medium  cursor-pointer ${viewMode === "entries" ? "bg-[#F2F9FE] text-[#4157FE]" : "bg-[#FDFDFD] text-[#697588]"}`}
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
              className={`flex items-center gap-1 px-1.5 py-1  border border-[#EBEBEB] rounded-tr-sm rounded-br-sm text-xs leading-3 tracking-tighter font-medium  cursor-pointer ${viewMode === "sheet" ? "bg-[#F2F9FE] text-[#4157FE]" : "bg-[#FDFDFD] text-[#697588]"}`}
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
                  className="px-3 py-2 w-100 cursor-pointer"
                  onClick={handleHeaderClick}
                >
                  Task
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="text-center border-l border-[#E2E8F0] font-semibold"
                  >
                    {day}
                  </th>
                ))}
                <th className="text-center border-l border-[#E2E8F0]  font-semibold">
                  Total
                </th>
                <th className="w-20 border-l border-[#E2E8F0]"></th>
              </tr>
            </thead>
            <tbody>
              {mockData.myLogs.map((task) => {
                const rowBg = task.isExpanded ? "bg-[#F2F9FE]" : "bg-white";
                return (
                  <React.Fragment key={task.id}>
                    {/* MAIN TASK ROW */}
                    <tr
                      className={`border-b group hover:opacity-90 transition-all ${rowBg}`}
                    >
                      <td className="px-3 py-2 flex items-center gap-3">
                        <Image
                          src={
                            task.isExpanded
                              ? "/assets/arrow-down.svg"
                              : "/assets/arrow-left-fill.svg"
                          }
                          alt="toggle"
                          width={12}
                          height={12}
                        />
                        <span className="font-medium text-[11px] text-[#191F38]">
                          {task.title}
                        </span>
                      </td>

                      {task.weeklyHours.map((hour, i) => (
                        <HourCell key={i} hour={hour} />
                      ))}

                      <HourCell hour={task.total} isTotal />

                      <td className="px-3 py-2 border-l border-[#E2E8F0] text-center">
                        <div className="flex items-center justify-center gap-2">
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
                            onClick={(e) => handleThreeDotClick(e, task.id)}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* SUB ENTRIES */}
                    {task.isExpanded &&
                      task.subEntries?.map((sub, idx) => (
                        <tr key={idx} className="bg-[#F2F9FE] border-b ">
                          <td className="pl-8">
                            <div className="flex items-center  gap-2">
                              <div className="flex items-center bg-[#DBE9FF] rounded-sm w-34.75 h-6.5 px-2 text-xs font-medium text-[#191F38]">
                                <div className="flex items-center gap-1.5">
                                  <Image
                                    src="/assets/clock-blue.svg"
                                    alt="time"
                                    width={14}
                                    height={14}
                                  />
                                  <span className="text-[10px] font-bold text-[#1E293B]">
                                    {sub.time}
                                  </span>
                                </div>
                              </div>

                              {sub.payable ? (
                                <Button variant="outline" className="p-1">
                                  <Image
                                    src="/assets/dollar-green.svg"
                                    alt="down"
                                    width={15}
                                    height={20}
                                  />
                                </Button>
                              ) : (
                                <Button variant="outline" className="p-1.5">
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

                          {/* Sub-entry daily hours - maintains bar alignment */}
                          {sub.weeklyHours.map((hour, i) => (
                            <HourCell key={i} hour={hour} isSubEntry />
                          ))}

                          <HourCell
                            hour={idx === 0 ? task.total : "-"}
                            isTotal
                          />

                          <td className="px-3 py-2 border-l border-[#E2E8F0] text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Image
                                src={
                                  sub.status === "completed"
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
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
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
