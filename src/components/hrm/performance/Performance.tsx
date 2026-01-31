"use client";

import { useState } from "react";
import Image from "next/image";
import performanceData from "@/data/hrm/perfomance/performance-data.json";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/Button";
import {
  CheckCheck,
  ChevronsUp,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import TaskSection from "@/components/time-tracker/floating-component/TaskSection";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import Link from "next/link";
import { GroupActionMenu } from "./component/GroupActionMenu";
import { DropdownMenuItem } from "@/components/sprint-overview/ui/dropdown-menu";

type Tab = "health" | "tasks";

export default function Performance() {
  const [activeTab, setActiveTab] = useState<Tab>("health");
  const { user, metrics, charts } = performanceData;

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

  const BAR_COLORS = ["#9BA6FA", "#E0C6FD"];

  return (
    <div className="min-h-screen bg-[#FFFFFF] space-y-4  border-t border-[#EBEBEB]">
      {/* 1. Header Section */}
      <header className="flex items-center justify-between text-[#697588] px-4 py-1.5 border-b border-[#EBEBEB]">
        <div className="flex gap-2">
          <Link href="/hrm/performance/user-activity">
            <Button variant="outline" size="md">
              <Image
                src="/assets/user-activity.svg"
                width={14}
                height={14}
                alt=""
              />
              User Activity
            </Button>
          </Link>
          <Link href="/hrm/performance/user-attendance">
            <Button variant="outline" size="md">
              <Image
                src="/assets/task-square.svg"
                width={14}
                height={14}
                alt=""
              />
              Attendance
            </Button>
          </Link>
        </div>
        <FilterPopover />
      </header>

      <div className="bg-white border border-[#EBEBEB] rounded-md p-3 flex flex-wrap gap-8 items-center mx-4">
        <div className="flex items-center gap-4 border-r border-[#E2E8F0] pr-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100">
            <Image
              src="/assets/profile.svg"
              fill
              alt="John"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm  ">{user.name}</h2>
            <p className="text-xs text-[#697588] leading-3.5">{user.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="type"
            className="p-2.5 rounded-lg border-[#4157FE33]"
          >
            <Image
              src="/assets/briefcase.svg"
              width={16}
              height={16}
              alt="Role"
            />
          </Button>
          <div>
            <p className=" font-semibold mb-0.5">Position</p>
            <p className="text-[11px] leading-3.5 text-[#697588]">
              {user.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="type"
            className="p-2.5 rounded-lg border-[#4157FE33]"
          >
            <Image src="/assets/people.svg" width={16} height={16} alt="Role" />
          </Button>
          <div>
            <p className="font-semibold mb-0.5">Email</p>
            <p className="text-[11px] leading-3.5 text-[#697588]">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="type"
            className="p-2.5 rounded-lg border-[#4157FE33]"
          >
            <Image src="/assets/people.svg" width={16} height={16} alt="Role" />
          </Button>
          <div>
            <p className="font-semibold mb-0.5">Phone</p>
            <p className="text-[11px] leading-3.5 text-[#697588]">
              {user.phone}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
        <div className=" bg-white border border-[#EBEBEB] rounded-md px-4 py-4 flex flex-col h-full min-h-[350px]">
          <h3 className="text-sm font-semibold text-[#191F38]">
            Task Competition
          </h3>

          <div className="flex-1 relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: 100 }]}
                  cx="45%"
                  cy="58%"
                  outerRadius={88}
                  fill="#B4BBFF"
                  stroke="none"
                  dataKey="value"
                />

                <Pie
                  data={[{ value: 100 }]}
                  cx="73%"
                  cy="30%"
                  outerRadius={65}
                  fill="#FFF1D6"
                  stroke="none"
                  dataKey="value"
                  style={{
                    filter: "drop-shadow(0px 8px 6px rgba(0, 0, 0, 0.1))",
                  }}
                />

                <text
                  x="45%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl font-bold"
                  fill="#4157FE"
                >
                  70%
                </text>
                <text
                  x="74%"
                  y="30%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-3xl font-bold"
                  fill="#FF9F00"
                >
                  20%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Section */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />

              <span className="leading-6 text-[#191F38]">Completed Task</span>
            </div>
            <div className="flex items-center gap-2">
              <span className=" inline-block w-3 h-3 rounded-full bg-yellow-100" />
              <span className="leading-6 text-[#191F38]">Total Task</span>
            </div>
          </div>
        </div>

        {/* Middle: Workload (Bar Chart) */}
        <div className=" bg-white border border-[#EBEBEB] rounded-md px-4 py-4">
          <h3 className="text-sm font-semibold text-[#191F38] mb-2">
            Estimated Time VS Total Worked
          </h3>

          <div className="min-h-[250px]">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={charts.workload}
                barGap={8}
                margin={{ top: 0, right: 0, left: -37, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#EBEBEB"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#191F38] text-white text-[10px]  rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#9BA6FA]"></span>
                            <span>Est Time : {payload[0].value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E0C6FD]"></span>
                            <span>Total Worked : {payload[1].value}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="est"
                  fill={BAR_COLORS[0]}
                  radius={[4, 4, 4, 4]}
                  barSize={12}
                />
                <Bar
                  dataKey="worked"
                  fill={BAR_COLORS[1]}
                  radius={[4, 4, 4, 4]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Summary Cards */}
        <div className="space-y-4">
          <div className="flex items-center bg-[#FDFDFD] gap-3 border  border-[#EBEBEB] p-2 rounded-md">
            <Button
              variant="type"
              className="p-2.5 rounded-lg border-[#4157FE33]"
            >
              <Image
                src="/assets/clock-blue.svg"
                width={20}
                height={20}
                alt="Role"
              />
            </Button>
            <div className="pb-1">
              <p className=" font-semibold mb-0.5">Hours Assigned</p>
              <p className="text-[11px] leading-3.5 text-[#697588]">
                {metrics.hoursAssigned}H
              </p>
            </div>
          </div>
          <div className="flex items-center bg-[#FDFDFD] gap-3 border  border-[#EBEBEB] p-2 rounded-md">
            <Button
              variant="type"
              className="p-2.5 rounded-lg border-[#4157FE33]"
            >
              <Image
                src="/assets/timer-blue.svg"
                width={20}
                height={20}
                alt="Role"
              />
            </Button>
            <div className="pb-1">
              <p className=" font-semibold mb-0.5">Hour Logged</p>
              <p className="text-[11px] leading-3.5 text-[#697588]">
                {metrics.hoursLogged}H
              </p>
            </div>
          </div>
          <div className="flex items-center bg-[#FDFDFD] gap-3 border  border-[#EBEBEB] p-2 rounded-md">
            <Button
              variant="type"
              className="p-2.5 rounded-lg border-[#4157FE33]"
            >
              <Image
                src="/assets/clipboard-import.svg"
                width={20}
                height={20}
                alt="Role"
              />
            </Button>
            <div className="pb-1">
              <p className=" font-semibold mb-0.5">Backlog Tasks</p>
              <p className="text-[11px] leading-3.5 text-[#697588]">
                {metrics.backlogTasks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation */}
      <div className="flex gap-8 border-b border-[#E2E8F0] pt-4 px-5">
        <button
          onClick={() => setActiveTab("health")}
          className={`pb-3 font-medium text-sm leading-4 transition-all relative ${
            activeTab === "health"
              ? "text-[#4157FE]"
              : "text-[#697588] hover:text-[#191F38]"
          }`}
        >
          Task Health Monitor
          {activeTab === "health" && (
            <span className="absolute bottom-0 left-0  w-full h-0.5 w-5 bg-[#4157FE] rounded-t-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`pb-3 text-sm font-medium transition-all relative ${
            activeTab === "tasks"
              ? "text-[#4157FE]"
              : "text-[#64748B] hover:text-[#191F38]"
          }`}
        >
          Tasks
          {activeTab === "tasks" && (
            <span className="absolute bottom-0 left-0  w-full h-0.5 w-5 bg-[#4157FE] rounded-t-full" />
          )}
        </button>
      </div>

      {/* 5. Tab Content Area */}
      <div className="bg-[#FFFFFF] min-h-[400px]">
        {activeTab === "health" ? (
          <div className="px-5 space-y-4">
            {/* ================= OVER DUE ================= */}
            <div className="space-y-2">
              {/* Header */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />

                <Button variant="alert" size="sm">
                  <Image
                    src="/assets/information-red.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  OVER DUE
                </Button>

                <Button variant="alert" size="sm">
                  {performanceData.healthMonitor.overdue.length}
                </Button>
                <GroupActionMenu
                  trigger={
                    <Image
                      src="/assets/3dot.svg"
                      alt="Menu"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  }
                >
                  {/* Basic Items */}
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg  outline-none">
                    <Image
                      src="/assets/charm_tick-double.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />
                    <span className="text-sm font-medium">Select All</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg h outline-none">
                    <Image
                      src="/assets/arrow-circle-up-gray.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">Collapse group</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg  outline-none">
                    <Image
                      src="/assets/Chevrons.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">
                      Collapse all group
                    </span>
                  </DropdownMenuItem>
                </GroupActionMenu>
              </div>

              {/* Cards */}
              {performanceData.healthMonitor.overdue.map((task) => (
                <div
                  key={task.id}
                  className="relative bg-[#FFFFFF] border border-[#EBEBEB] rounded-md p-3 flex items-center justify-between"
                >
                  {/* Left Accent */}
                  <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-[#C81C57]" />

                  {/* Content */}
                  <div className="pl-3 space-y-1">
                    <p className="text-sms font-medium text-[#191F38]">
                      [<span className="text-[#4157FE]">{task.id}]</span>
                      {task.title}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#697588]">
                      <Button variant="type" size="sm">
                        {task.type}
                      </Button>
                      <div className="flex flex-row justify-center items-center gap-1">
                        <div className="bg-[#4157FE] rounded-full w-4 h-4 flex justify-center items-center">
                          <span className="text-[#FFFFFF] text-xs pb-1">p</span>
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <Image
                          src="/assets/calendar-normal.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-right space-y-1 flex flex-col items-end">
                    <Button variant="alert">{task.status}</Button>
                    <p className="text-[11px] text-[#DC2626]">{task.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DELAYED ================= */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />

                <Button variant="type" size="sm">
                  <Image
                    src="/assets/timer-blue.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  DELAYED
                </Button>

                <Button variant="type" size="sm">
                  {performanceData.healthMonitor.delayed.length}
                </Button>
                <GroupActionMenu
                  trigger={
                    <Image
                      src="/assets/3dot.svg"
                      alt="Menu"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  }
                >
                  {/* Basic Items */}
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/charm_tick-double.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />
                    <span className="text-sm font-medium">Select All</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/arrow-circle-up-gray.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">Collapse group</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/Chevrons.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">
                      Collapse all group
                    </span>
                  </DropdownMenuItem>
                </GroupActionMenu>
              </div>

              {performanceData.healthMonitor.delayed.map((task) => (
                <div
                  key={task.id}
                  className="relative bg-[#FFFFFF] border border-[#EBEBEB] rounded-md p-3 flex items-center justify-between"
                >
                  {/* Left Accent */}
                  <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-[#C81C57]" />

                  {/* Content */}
                  <div className="pl-3 space-y-1">
                    <p className="text-sms font-medium text-[#191F38]">
                      [<span className="text-[#4157FE]">{task.id}]</span>
                      {task.title}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#697588]">
                      <Button variant="type" size="sm">
                        {task.type}
                      </Button>
                      <div className="flex flex-row justify-center items-center gap-1">
                        <div className="bg-[#4157FE] rounded-full w-4 h-4 flex justify-center items-center">
                          <span className="text-[#FFFFFF] text-xs pb-1">p</span>
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <Image
                          src="/assets/calendar-normal.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-right space-y-1 flex flex-col items-end">
                    <Button variant="pending">{task.status}</Button>
                    <p className="text-[11px] text-[#DC2626]">{task.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= PENDING ================= */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />

                <Button variant="pending" size="sm">
                  <Image
                    src="/assets/clock-red.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  PENDING
                </Button>

                <Button variant="pending" size="sm">
                  {performanceData.healthMonitor.pending.length}
                </Button>
                <GroupActionMenu
                  trigger={
                    <Image
                      src="/assets/3dot.svg"
                      alt="Menu"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                    />
                  }
                >
                  {/* Basic Items */}
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/charm_tick-double.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />
                    <span className="text-sm font-medium">Select All</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/arrow-circle-up-gray.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">Collapse group</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                    <Image
                      src="/assets/Chevrons.svg"
                      alt="Menu"
                      width={16}
                      height={16}
                      className="cursor-pointer"
                    />

                    <span className="text-sm font-medium">
                      Collapse all group
                    </span>
                  </DropdownMenuItem>
                </GroupActionMenu>
              </div>

              {performanceData.healthMonitor.pending.map((task) => (
                <div
                  key={task.id}
                  className="relative bg-[#FFFFFF] border border-[#EBEBEB] rounded-md p-3 flex items-center justify-between"
                >
                  {/* Left Accent */}
                  <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-[#C81C57]" />

                  {/* Content */}
                  <div className="pl-3 space-y-1">
                    <p className="text-sms font-medium text-[#191F38]">
                      [<span className="text-[#4157FE]">{task.id}]</span>
                      {task.title}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#697588]">
                      <Button variant="type" size="sm">
                        {task.type}
                      </Button>
                      <div className="flex flex-row justify-center items-center gap-1">
                        <div className="bg-[#4157FE] rounded-full w-4 h-4 flex justify-center items-center">
                          <span className="text-[#FFFFFF] text-xs pb-1">p</span>
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <Image
                          src="/assets/calendar-normal.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-right space-y-1 flex flex-col items-end">
                    <Button variant="pending">{task.status}</Button>
                    <p className="text-[11px] text-[#DC2626]">{task.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2 flex gap-2">
              <Image
                src="/assets/arrow-down-fill.svg"
                alt=""
                width={16}
                height={16}
                className="rotate-90"
              />
              <Button variant="active" size="md" className="flex gap-1">
                <Image
                  src="/assets/charm_tick.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                ACTIVE
              </Button>
              <GroupActionMenu
                trigger={
                  <Image
                    src="/assets/3dot.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                }
              >
                {/* Basic Items */}
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                  <Image
                    src="/assets/edit.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                  <span className="text-sm font-medium">Rename</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                  <Image
                    src="/assets/plus-gray.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />

                  <span className="text-sm font-medium">New Status</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                  <Image
                    src="/assets/link.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />

                  <span className="text-sm font-medium">Edit Status</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                  <Image
                    src="/assets/arrow-circle-down.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />

                  <span className="text-sm font-medium">Collapse Group</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
                  <Image
                    src="/assets/ci_expand.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />

                  <span className="text-sm font-medium">
                    Collapse All Group
                  </span>
                </DropdownMenuItem>
              </GroupActionMenu>
            </div>
            <div className="w-[1245px] rounded-md border border-[#EBEBEB] bg-[#FFFFFF] mx-4">
              <TaskSection
                isOpen={menuConfig.isOpen}
                onClose={() => setMenuConfig({ ...menuConfig, isOpen: false })}
                anchorPoint={{ x: menuConfig.x, y: menuConfig.y }}
              />
              <div className="overflow-x-auto hide-scrollbar rounded-md">
                <table className="w-full border-collapse text-[#191F38] font-medium text-[11px] leading-3.5 rouned-md border border-[#EBEBEB]">
                  <thead className="">
                    <tr className=" border-b border-[#EBEBEB]  bg-[#F2F9FE] ">
                      <th className="p-3 text-left w-10">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#EBEBEB] accent-[#4A3AFF]"
                        />
                      </th>
                      <th
                        className="p-3 text-left font-semibold min-w-[500px] whitespace-nowrap "
                        onClick={handleHeaderClick}
                      >
                        <div className="flex items-center gap-1">
                          Task Name{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1">
                          Status{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1 justify-center">
                          Assignee{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Start Date{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Due Date{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Estimated Time{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Tracked Time{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Type{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1 justify-center">
                          Priority{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1 justify-center">
                          Reporter{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1 justify-center">
                          Dependency{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold">
                        <div className="flex items-center gap-1 justify-center whitespace-nowrap">
                          Log Time{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-center  w-12">
                        <span className="invisible">.......</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.tasksList.map((task, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#EBEBEB] last:border-0 text-[11px] font-medium text-[#191F38]"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#D1D5DB] accent-[#4A3AFF]"
                          />
                        </td>

                        {/* Task Name */}
                        <td className="p-3 min-w-[300px]">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/assets/arrow-down-fill.svg"
                              alt=""
                              width={12}
                              height={12}
                            />

                            <span className="whitespace-nowrap">
                              [{task.id}] {task.name}
                            </span>

                            <Image
                              src="/assets/add-1.svg"
                              alt=""
                              width={30}
                              height={24}
                            />

                            <div className="flex items-center gap-2 ml-auto shrink-0">
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/plus-gray.svg"
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/edit.svg"
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              </Button>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-3 min-w-[140px]">
                          <Button
                            variant="active"
                            size="md"
                            className="flex gap-1"
                          >
                            <Image
                              src="/assets/charm_tick.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                            ACTIVE
                          </Button>
                        </td>

                        {/* Assignee */}
                        <td className="p-3 text-center relative cursor-pointer">
                          {task.assignee ? (
                            <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold relative">
                              {task.assignee}
                            </div>
                          ) : (
                            <Image
                              src="/assets/profile-add.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Start Date */}
                        <td className="p-3 text-center whitespace-nowrap text-[#697588]">
                          {task.startDate ? (
                            <span>{task.startDate}</span>
                          ) : (
                            <Image
                              src="/assets/calendar-normal.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Due Date */}
                        <td className="p-3 text-center whitespace-nowrap text-[#697588]">
                          {task.dueDate ? (
                            <span>{task.dueDate}</span>
                          ) : (
                            <Image
                              src="/assets/calendar-normal.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Estimated Time */}
                        <td className="p-3 text-center whitespace-nowrap text-[#697588]">
                          {task.estTime ? (
                            <span>{task.estTime}</span>
                          ) : (
                            <Image
                              src="/assets/timer.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Tracked Time */}
                        <td className="p-3 text-center whitespace-nowrap text-[#697588]">
                          {task.trackedTime ? (
                            <span>{task.trackedTime}</span>
                          ) : (
                            <Image
                              src="/assets/clock.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Type */}
                        <td className="p-3 text-center">
                          <Button variant="type" size="sm">
                            Type
                          </Button>
                        </td>

                        {/* Priority */}
                        <td className="p-3 text-center">
                          {task.priority ? (
                            <div className="flex items-center justify-center gap-1 text-[#DC2626]">
                              <Image
                                src="/assets/red-flag.svg"
                                alt=""
                                width={14}
                                height={14}
                              />
                              {task.priority}
                            </div>
                          ) : (
                            <Image
                              src="/assets/red-flag.svg"
                              alt=""
                              width={14}
                              height={14}
                            />
                          )}
                        </td>
                        {/* Reporter */}
                        <td className="p-3 text-center relative cursor-pointer">
                          {task.assignee ? (
                            <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold relative">
                              {task.assignee}
                            </div>
                          ) : (
                            <Image
                              src="/assets/profile-add.svg"
                              width={14}
                              height={14}
                              className="mx-auto opacity-40 cursor-pointer"
                              alt=""
                            />
                          )}
                        </td>

                        {/* Dependency */}
                        <td className="p-3 text-center text-[#4A3AFF]">
                          {task.dependency ? (
                            <span>{task.dependency}</span>
                          ) : (
                            <span className="text-[#4A3AFF]">-</span>
                          )}
                        </td>

                        {/* Log Time */}
                        <td className="p-3 text-center whitespace-nowrap text-[#697588]">
                          <span>{task.Loged}</span>
                        </td>
                        <td className="p-3 text-center  w-12 cursor-pointer ">
                          <Image
                            src="/assets/3dot.svg"
                            alt=""
                            width={18}
                            height={16}
                            className="shrink-0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
