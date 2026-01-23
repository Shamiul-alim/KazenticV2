"use client";

import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  LineChart,
  Line,
} from "recharts";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Maximize2,
  RotateCcw,
  Filter,
  Plus,
  Pencil,
  Paperclip,
  Send,
  Clock,
  Hourglass,
  Calendar,
  Lock,
  PencilLine,
  Layers,
  ChevronsUpDown,
  Flag,
  Star,
} from "lucide-react";

import dashboardData from "@/data/projectDashboard.json";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/card";

const WidgetActions = () => (
  <div className="flex items-center">
    <Button variant="transparent" size="md">
      <Image
        src="/assets/tabler-subtask.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
    <Button variant="transparent" size="md">
      <Image
        src="/assets/refresh.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
    <Button variant="transparent" size="md">
      <Image
        src="/assets/ci-expand.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
    <Button variant="transparent" size="md">
      <Image
        src="/assets/filter.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
    <Button variant="transparent" size="md">
      <Image
        src="/assets/setting.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
    <Button variant="transparent" size="md">
      <Image
        src="/assets/3dot.svg"
        alt="group"
        width={16}
        height={16}
        className=""
      />{" "}
    </Button>
  </div>
);

export default function ProjectDashboard() {
  const data = dashboardData;

  return (
    <div className="min-h-screen bg-[#FFFFFF]  text-[#191F38] tracking-tighter p-2 px-5 pb-5">
      {/* Top Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center  mb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="md">
            <Image
              src="/assets/refresh.svg"
              alt="group"
              width={16}
              height={16}
              className=""
            />{" "}
            Refresh
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="md">
            <Image
              src="/assets/filter.svg"
              alt="group"
              width={16}
              height={16}
              className=""
            />{" "}
            Filter
          </Button>
          <Button variant="outline" size="md" className="">
            <Image
              src="/assets/customize.svg"
              alt="group"
              width={16}
              height={16}
              className=""
            />
            Customize view
          </Button>
          <Button variant="success">
            <Image
              src="/assets/plus.svg"
              alt="group"
              width={16}
              height={16}
              className=""
            />{" "}
            Add Widget
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <Card variant="dashboard" title="Task List" extra={<WidgetActions />}>
          <div className="overflow-hidden h-[430px] overflow-y-auto hide-scrollbar">
            <div className="space-y-4 ">
              {/* Today Group Header */}
              <div className="flex items-center gap-2 px-1">
                <Image
                  src="/assets/arrow-down.svg"
                  alt="down"
                  width={20}
                  height={20}
                  className="rotate-0"
                />
                <Button variant="active">
                  <Image
                    src="/assets/charm_tick.svg"
                    alt="group"
                    width={14}
                    height={14}
                    className=""
                  />{" "}
                  ACTIVE
                </Button>
                <Button variant="active">4</Button>
              </div>

              <div className="border border-[#EBEBEB] rounded-tl-xl rounded-bl-xl bg-[#FFFFFF] overflow-hidden ">
                <div className="overflow-y-auto hide-scrollbar">
                  <table className="w-full min-w-[1000px] border-collapse text-[#191F38] font-medium text-[11px] leading-3.5 -tracking-normal">
                    <thead>
                      <tr className="border-b border-[#EBEBEB]  bg-[#F4F5F6]">
                        <th className="p-3 text-left w-10">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#EBEBEB]"
                          />
                        </th>
                        <th className="p-3 text-left font-semibold  whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            Task Name{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold  whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            Status{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Due Date{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Priority{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Assignee{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activeTasks.map((task, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#EBEBEB] last:border-0 text-xs text-start  font-medium"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[#D1D5DB] accent-[#4A3AFF]"
                            />
                          </td>
                          <td className="">
                            <div className="flex items-center gap-3">
                              <Image
                                src="/assets/arrow-down-fill.svg"
                                alt="down"
                                width={12}
                                height={12}
                                className="rotate-0"
                              />
                              <span className="text-[#191F38] font-medium">
                                [{task.id}] {task.name}
                              </span>
                              <Image
                                src="/assets/add-1.svg"
                                alt="down"
                                width={30}
                                height={24}
                                className="ml-3"
                              />
                              <div className="flex items-center gap-2 ml-auto ">
                                <Button variant="outline" size="sm">
                                  <Image
                                    src="/assets/plus-light-gray.svg"
                                    alt="down"
                                    width={16}
                                    height={16}
                                  />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Image
                                    src="/assets/edit.svg"
                                    alt="down"
                                    width={16}
                                    height={16}
                                  />
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="p-3  text-xs text-start text-[#DC2626] font-medium">
                            <Button variant="active">
                              <Image
                                src="/assets/charm_tick.svg"
                                alt="group"
                                width={14}
                                height={14}
                                className=""
                              />{" "}
                              ACTIVE
                            </Button>
                          </td>
                          <td className="p-3 pl-15 text-xs text-start text-[#DC2626] font-medium">
                            {task.dueDate}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2 font-medium">
                              <Flag className="w-3.5 h-3.5 text-[#FF4D4F] fill-current" />{" "}
                              {task.priority}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold">
                              {task.assignee}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className=" border-t border-[#EBEBEB] text-[#A3AED0]">
                      <tr>
                        <td className="p-3" colSpan={2}>
                          <button className="flex items-center gap-2 hover:text-[#4A3AFF]">
                            <Plus className="w-4 h-4" /> Create Task
                          </button>
                        </td>
                        <td className="p-3 text-center pl-15">
                          <button className="flex items-center gap-1 justify-center">
                            Calculate <ChevronDown className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="p-3 text-center">1</td>
                        <td className="p-3 ">
                          <button className="flex items-center gap-1 justify-center">
                            Calculate <ChevronDown className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-2 px-1">
                <Image
                  src="/assets/arrow-down-fill.svg"
                  alt="down"
                  width={20}
                  height={20}
                  className="rotate-0"
                />
                <Button variant="progress" size="md">
                  <Image
                    src="/assets/flash.svg"
                    alt="down"
                    width={16}
                    height={16}
                    className="rotate-0"
                  />
                  IN PROGRESS
                </Button>
                <Button variant="progress" size="md">
                  4
                </Button>
              </div>
              <div className="border border-[#EBEBEB] rounded-tl-xl rounded-bl-xl bg-[#FFFFFF] overflow-hidden ">
                <div className="overflow-y-auto hide-scrollbar">
                  <table className="w-full min-w-[1000px] border-collapse text-[#191F38] font-medium text-[11px] leading-3.5 -tracking-normal">
                    <thead>
                      <tr className="border-b border-[#EBEBEB]  bg-[#F4F5F6]">
                        <th className="p-3 text-left w-10">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#EBEBEB]"
                          />
                        </th>
                        <th className="p-3 text-left font-semibold  whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            Task Name{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold  whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            Status
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>

                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Due Date{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Priority{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                        <th className="p-3 text-left font-semibold">
                          <div className="flex items-center gap-1 justify-center">
                            Assignee{" "}
                            <Image
                              src="/assets/up-down.svg"
                              alt="group"
                              width={7}
                              height={5}
                              className=""
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activeTasks.map((task, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#EBEBEB] last:border-0 text-xs text-start  font-medium"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-[#D1D5DB] accent-[#4A3AFF]"
                            />
                          </td>
                          <td className="">
                            <div className="flex items-center gap-3">
                              <Image
                                src="/assets/arrow-down-fill.svg"
                                alt="down"
                                width={12}
                                height={12}
                                className="rotate-0"
                              />
                              <span className="text-[#191F38] font-medium">
                                [{task.id}] {task.name}
                              </span>
                              <Image
                                src="/assets/add-1.svg"
                                alt="down"
                                width={30}
                                height={24}
                                className="ml-3"
                              />
                              <div className="flex items-center gap-2 ml-auto ">
                                <Button variant="outline" size="sm">
                                  <Image
                                    src="/assets/plus-light-gray.svg"
                                    alt="down"
                                    width={16}
                                    height={16}
                                  />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Image
                                    src="/assets/edit.svg"
                                    alt="down"
                                    width={16}
                                    height={16}
                                  />
                                </Button>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-xs text-start text-[#DC2626] font-medium">
                            <Button variant="progress" size="md">
                              <Image
                                src="/assets/flash.svg"
                                alt="down"
                                width={16}
                                height={16}
                                className="rotate-0"
                              />
                              IN PROGRESS
                            </Button>
                          </td>

                          <td className="p-3 text-xs text-start text-[#DC2626] font-medium">
                            {task.dueDate}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2 font-medium">
                              <Flag className="w-3.5 h-3.5 text-[#FF4D4F] fill-current" />{" "}
                              {task.priority}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold">
                              {task.assignee}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className=" border-t border-[#EBEBEB] text-[#A3AED0]">
                      <tr>
                        <td className="p-3" colSpan={2}>
                          <button className="flex items-center gap-2 hover:text-[#4A3AFF]">
                            <Plus className="w-4 h-4" /> Create Task
                          </button>
                        </td>
                        <td className="p-3 text-center pl-15">
                          <button className="flex items-center gap-1 justify-center">
                            Calculate <ChevronDown className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="p-3 text-center">1</td>
                        <td className="p-3 ">
                          <button className="flex items-center gap-1 justify-center">
                            Calculate <ChevronDown className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* --- WORKLOAD BY STATUS --- */}
        <Card
          variant="dashboard"
          title="Workload By Status"
          extra={<WidgetActions />}
        >
          <div className="h-[400px] w-full relative ">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="outline-0"
            >
              <PieChart className="outline-none">
                <Pie
                  data={data.workload}
                  innerRadius={85}
                  outerRadius={113}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={450}
                  endAngle={90}
                  className="outline-none"
                >
                  {data.workload.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Floating Status Labels */}
            <div className="absolute top-[18%] left-[22%] bg-white shadow-xl px-3 py-1 rounded-tl-sm rounded-tr-sm rounded-bl-sm text-[10px] font-bold flex gap-1">
              <span className="text-[#722BCC]">IN PROGRESS</span>{" "}
              <span className="text-black">3</span>
            </div>
            <div className="absolute top-[18%] right-[26%] bg-white shadow-xl px-3 py-1 rounded-tl-sm rounded-tr-sm rounded-br-sm text-[10px] font-bold flex gap-1">
              <span className="text-[#059669]">ACTIVE</span>{" "}
              <span className="text-black">4</span>
            </div>
            <div className="absolute bottom-[28%] left-[20%] bg-white shadow-xl px-3 py-1 rounded-tl-sm  rounded-bl-sm rounded-br-sm  text-[10px] font-bold flex gap-2">
              <span className="text-[#4A3AFF]">IN REVIEW</span>{" "}
              <span className="text-black">6</span>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            {data.workload.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium -tracking-normal text-[#697588]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* --- CALCULATION --- */}
        <Card variant="dashboard" title="Calculation" extra={<WidgetActions />}>
          <div className="bg-[#F2F9FE] rounded-xl h-[425px] relative  border border-[#E1F0FF]">
            <span className="absolute inset-0 flex items-center justify-center text-[88px] font-semibold text-[#4157FE] leading-none tracking-tighter">
              {data.totalTaskCount}
            </span>
            <p className="absolute bottom-6 w-full text-center text-[#697588] text-[14px] font-medium -tracking-normal">
              Total Task Count
            </p>
          </div>
        </Card>

        {/* --- TASKS BY ASSIGNEE --- */}
        <Card
          variant="dashboard"
          title="Tasks By Assignee"
          extra={<WidgetActions />}
        >
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.assignees}
                  outerRadius={130}
                  dataKey="value"
                  stroke="none"
                >
                  {data.assignees.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Assignee Labels */}
            <div className="absolute top-[20%] right-[19%] bg-white shadow-lg px-2 py-1 rounded-tl-sm rounded-tr-sm rounded-br-sm  text-xs font-semibold">
              <span className="text-[#4A3AFF]">Alif Hassan</span>{" "}
              <span className="text-[#191F38] ml-1">45%</span>
            </div>
            <div className="absolute top-[80%] left-[55%] bg-white shadow-lg px-2 py-1 rounded-tr-sm rounded-br-sm rounded-bl-sm text-[10px] font-bold">
              <span className="text-[#0E97DE]">John Doe</span>{" "}
              <span className="text-[#191F38] ml-1">12.5%</span>
            </div>
            <div className="absolute top-[60%] left-[70%] bg-white shadow-lg px-2 py-1 rounded-tr-sm rounded-br-sm rounded-bl-sm  text-[10px] font-bold">
              <span className="text-[#FB923C]">Ababa</span>{" "}
              <span className="text-[#191F38] ml-1">11%</span>
            </div>
            <div className="absolute bottom-[35%] left-[14%] bg-white shadow-lg px-2 py-1 rounded-tl-sm rounded-br-sm rounded-bl-sm  text-[10px] font-bold">
              <span className="text-[#A855F7]">Tonmoy Asif</span>{" "}
              <span className="text-[#191F38] ml-1">20%</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 flex-wrap ">
            {data.assignees.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: a.color }}
                />
                <span className="text-xs font-medium -tracking-normal text-[#697588]">
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* --- OVERDUE TASKS --- */}
        <Card
          variant="dashboard"
          title="Overdue Tasks"
          extra={<WidgetActions />}
        >
          <div className="space-y-4">
            {/* Today Group Header */}
            <div className="flex items-center gap-2 px-1">
              <Image
                src="/assets/arrow-down.svg"
                alt="down"
                width={20}
                height={20}
                className="rotate-0"
              />
              <Button variant="alert" size="md">
                <Image
                  src="/assets/red-flag.svg"
                  alt="down"
                  width={16}
                  height={16}
                  className="rotate-0"
                />
                Urgent
              </Button>
              <Button variant="alert" size="md">
                4
              </Button>
            </div>

            <div className="border border-[#EBEBEB] rounded-tl-xl rounded-bl-xl bg-[#FFFFFF] overflow-hidden ">
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full min-w-[1100px] border-collapse text-[#191F38] font-medium text-[11px] leading-3.5 -tracking-normal">
                  <thead>
                    <tr className="border-b border-[#EBEBEB]  bg-[#F4F5F6]">
                      <th className="p-3 text-left w-10">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#EBEBEB]"
                        />
                      </th>
                      <th className="p-3 text-left font-semibold min-w-[300px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          Task Name{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Due Date{" "}
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
                          Assignee{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.activeTasks.map((task, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#EBEBEB] last:border-0 text-xs text-start  font-medium"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#D1D5DB] accent-[#4A3AFF]"
                          />
                        </td>
                        <td className="">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/assets/arrow-down-fill.svg"
                              alt="down"
                              width={12}
                              height={12}
                              className="rotate-0"
                            />
                            <span className="text-[#191F38] font-medium">
                              [{task.id}] {task.name}
                            </span>
                            <Image
                              src="/assets/add-1.svg"
                              alt="down"
                              width={30}
                              height={24}
                              className="ml-3"
                            />
                            <div className="flex items-center gap-2 ml-auto ">
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/plus-light-gray.svg"
                                  alt="down"
                                  width={16}
                                  height={16}
                                />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/edit.svg"
                                  alt="down"
                                  width={16}
                                  height={16}
                                />
                              </Button>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-xs text-start text-[#DC2626] font-medium">
                          {task.dueDate}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2 font-medium">
                            <Flag className="w-3.5 h-3.5 text-[#FF4D4F] fill-current" />{" "}
                            {task.priority}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold">
                            {task.assignee}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className=" border-t border-[#EBEBEB] text-[#A3AED0]">
                    <tr>
                      <td className="p-3" colSpan={2}>
                        <button className="flex items-center gap-2 hover:text-[#4A3AFF]">
                          <Plus className="w-4 h-4" /> Create Task
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <button className="flex items-center gap-1 justify-center">
                          Calculate <ChevronDown className="w-3 h-3" />
                        </button>
                      </td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 ">
                        <button className="flex items-center gap-1 justify-center">
                          Calculate <ChevronDown className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Image
                src="/assets/arrow-down-fill.svg"
                alt="down"
                width={20}
                height={20}
                className="rotate-0"
              />
              <Button variant="pending" size="md">
                <Image
                  src="/assets/pending-flag.svg"
                  alt="down"
                  width={16}
                  height={16}
                  className="rotate-0"
                />
                Urgent
              </Button>
              <Button variant="alert" size="md">
                4
              </Button>
            </div>
          </div>
        </Card>

        <Card
          variant="dashboard"
          title="Tasks Due Soon"
          extra={<WidgetActions />}
        >
          <div className="space-y-4">
            {/* Today Group Header */}
            <div className="flex items-center gap-2 px-1">
              <Image
                src="/assets/arrow-down.svg"
                alt="down"
                width={20}
                height={20}
                className="rotate-0"
              />
              <span className="text-[14px] font-semibold text-[#191F38]">
                Today <span className="text-[#697588]">(4)</span>
              </span>
            </div>

            <div className="border border-[#EBEBEB] rounded-tl-xl rounded-bl-xl bg-[#FFFFFF] overflow-hidden ">
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full min-w-[1100px] border-collapse text-[#191F38] font-medium text-[11px] leading-3.5 -tracking-normal">
                  <thead>
                    <tr className="border-b border-[#EBEBEB]  bg-[#F4F5F6]">
                      <th className="p-3 text-left w-10">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#EBEBEB]"
                        />
                      </th>
                      <th className="p-3 text-left font-semibold min-w-[300px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          Task Name{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                      <th className="p-3 text-left font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-center">
                          Due Date{" "}
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
                          Assignee{" "}
                          <ChevronsUpDown className="w-3 h-3 text-[#A3AED0]" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.activeTasks.map((task, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#EBEBEB] last:border-0 text-xs text-start  font-medium"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#D1D5DB] accent-[#4A3AFF]"
                          />
                        </td>
                        <td className="">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/assets/arrow-down-fill.svg"
                              alt="down"
                              width={12}
                              height={12}
                              className="rotate-0"
                            />
                            <span className="text-[#191F38] font-medium">
                              [{task.id}] {task.name}
                            </span>
                            <Image
                              src="/assets/add-1.svg"
                              alt="down"
                              width={30}
                              height={24}
                              className="ml-3"
                            />
                            <div className="flex items-center gap-2 ml-auto ">
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/plus-light-gray.svg"
                                  alt="down"
                                  width={16}
                                  height={16}
                                />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Image
                                  src="/assets/edit.svg"
                                  alt="down"
                                  width={16}
                                  height={16}
                                />
                              </Button>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-xs text-start text-[#DC2626] font-medium">
                          {task.dueDate}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2 font-medium">
                            <Image
                              src="/assets/red-flag.svg"
                              alt="down"
                              width={20}
                              height={20}
                              className="rotate-0"
                            />{" "}
                            {task.priority}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="mx-auto w-6 h-6 rounded-full bg-[#4A3AFF] text-white text-[9px] flex items-center justify-center font-bold">
                            {task.assignee}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className=" border-t border-[#EBEBEB] text-[#A3AED0]">
                    <tr>
                      <td className="p-3" colSpan={2}>
                        <button className="flex items-center gap-2 hover:text-[#4A3AFF]">
                          <Plus className="w-4 h-4" /> Create Task
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <button className="flex items-center gap-1 justify-center">
                          Calculate <ChevronDown className="w-3 h-3" />
                        </button>
                      </td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 ">
                        <button className="flex items-center gap-1 justify-center">
                          Calculate <ChevronDown className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Image
                src="/assets/arrow-down-fill.svg"
                alt="down"
                width={20}
                height={20}
                className="rotate-0"
              />
              <span className="text-[14px] font-semibold text-[#191F38]">
                Tuesday <span className="text-[#697588]">(4)</span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Image
                src="/assets/arrow-down-fill.svg"
                alt="down"
                width={20}
                height={20}
                className="rotate-0"
              />
              <span className="text-[14px] font-semibold text-[#191F38]">
                Wednesday <span className="text-[#697588]">(4)</span>
              </span>
            </div>
          </div>
        </Card>

        {/* --- TOTAL TIME IN STATUS --- */}
        <Card
          variant="dashboard"
          title="Total Time In Status"
          extra={<WidgetActions />}
        >
          <div className="h-[400px] w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.timeInStatus}
                margin={{ top: 30, right: 10, left: -15, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#00000033"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#697588", fontSize: 12, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 200]}
                  ticks={[0, 100, 200]}
                  tick={{ fill: "#697588", fontSize: 12 }}
                  tickFormatter={(v) => `${v}h`}
                />
                <Bar dataKey="value" radius={[15, 15, 0, 0]} barSize={32}>
                  {data.timeInStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList
                    dataKey="display"
                    position="top"
                    offset={10}
                    style={{
                      fill: "#697588",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend matching the image bottom */}
          <div className="flex justify-center flex-wrap gap-10 mt-2">
            {data.timeInStatus.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium -tracking-normal text-[#697588]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* --- PRIORITY BREAKDOWN --- */}
        <Card
          variant="dashboard"
          title="Priority Breakdown"
          extra={<WidgetActions />}
        >
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.priorityBreakdown}
                margin={{ top: 30, right: 10, left: -20, bottom: 20 }}
              >
                {/* strokeDasharray="8 8" creates the loose dashes seen in the image */}
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#00000033"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#697588", fontSize: 12, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fill: "#697588", fontSize: 12 }}
                />
                <Bar
                  dataKey="value"
                  radius={[
                    18, 18, 0, 0,
                  ]} /* Match the high roundness of the image */
                  barSize={32}
                >
                  {data.priorityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    offset={10}
                    style={{
                      fill: "#697588",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend at the bottom as per image_da0a56 */}
          <div className="flex justify-center flex-wrap gap-5 mt-2">
            {data.priorityBreakdown.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium -tracking-normal text-[#697588]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card
          variant="dashboard"
          title="Priority Breakdown"
          extra={<WidgetActions />}
        >
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.priorityOverview}
                  innerRadius={85}
                  outerRadius={113}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  {data.priorityOverview.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Labels positioned as per image_d9a137.png */}
            <div className="absolute top-[18%] left-[22%] bg-white shadow-xl px-3 py-1 rounded-tl-sm rounded-tr-sm rounded-bl-sm text-[12px] font-semibold flex gap-1 leading-relaxed">
              <span className="text-[#92400E]">High</span>{" "}
              <span className="text-black">3</span>
            </div>
            <div className="absolute top-[18%] right-[26%] bg-white shadow-xl px-3 py-1 rounded-tl-sm rounded-tr-sm rounded-br-sm text-[12px] font-bold flex gap-1 leading-relaxed">
              <span className="text-[#7F899C]">low</span>{" "}
              <span className="text-black">4</span>
            </div>
            <div className="absolute bottom-[28%] left-[20%] bg-white shadow-xl px-3 py-1 rounded-tl-sm  rounded-bl-sm rounded-br-sm  text-[12px] font-bold flex gap-2 leading-relaxed">
              <span className="text-[#2B4DED]">Normal</span>{" "}
              <span className="text-black">6</span>
            </div>
            <div className="absolute bottom-[28%] left-[80%] bg-white shadow-xl px-3 py-1 rounded-tl-sm  rounded-bl-sm rounded-br-sm  text-[12px] font-bold flex gap-2 leading-relaxed">
              <span className="text-[#C3242A]">Urgent</span>{" "}
              <span className="text-black">6</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 pb-">
            {data.priorityOverview.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-xs font-medium -tracking-normal text-[#697588]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* --- SEGMENTED PRIORITY BAR --- */}
        <Card
          variant="dashboard"
          title="Priority Breakdown"
          extra={<WidgetActions />}
        >
          <div className="space-y-12 pt-4 px-6">
            {data.prioritySegments.map((row, idx) => (
              <div
                key={idx}
                className="h-12 w-full flex rounded-xl overflow-hidden shadow-sm"
              >
                {row.data.map((seg, sIdx) => (
                  <div
                    key={sIdx}
                    style={{ width: `${seg.val}%`, backgroundColor: seg.col }}
                    className="flex items-center justify-center text-[12px] font-medium text-[#191F38]"
                  >
                    {seg.val}%
                  </div>
                ))}
              </div>
            ))}

            {/* X-Axis with Tick Marks */}
            <div className="relative  border-t border-[#EBEBEB]">
              <div className="flex justify-between items-start px-2">
                {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
                  <div key={n} className="flex flex-col items-center gap-2">
                    {/* The vertical tick mark line seen in the picture */}
                    <div className="w-[1px] h-3 bg-[#D1D5DB]" />
                    <span className="text-[12px] text-[#697588] font-medium">
                      {n}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Legend perfectly matching image_d7bcfc */}
            <div className="flex justify-center flex-wrap gap-5 mt-4">
              {[
                { name: "Normal", color: "#B4BBFE" },
                { name: "High", color: "#CDBEAB" },
                { name: "Urgent", color: "#FFB2B2" },
                { name: "Low", color: "#697588" },
                { name: "Low", color: "#B7FFE9" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[13px] text-[#697588] font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* --- PRIORITY TREND LINE CHART --- */}
        <Card
          variant="dashboard"
          title="Priority Breakdown"
          extra={<WidgetActions />}
        >
          <div className="h-[350px] w-full pb-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trendData}>
                <CartesianGrid vertical={false} stroke="#F1F2F4" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#697588", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#697588", fontSize: 12 }}
                  tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
                />
                <Line
                  type="monotone"
                  dataKey="inReview"
                  stroke="#4A3AFF"
                  strokeWidth={2}
                  dot={{ r: 6, fill: "white", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#E0C8FF"
                  strokeWidth={2}
                  dot={{ r: 6, fill: "white", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 ">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#4A3AFF]" />
                <span className="text-xs text-[#697588]">IN REVIEW</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#E0C8FF]" />
                <span className="text-xs text-[#697588]">IN PROGRESS</span>
              </div>
            </div>
          </div>
        </Card>

        {/* --- TIME REPORTING TABLE --- */}
        <Card
          variant="dashboard"
          title="Time Reporting"
          extra={<WidgetActions />}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="md">
                <Image
                  src="/assets/calendar-normal.svg"
                  alt="cal"
                  width={14}
                  height={14}
                  className=""
                />{" "}
                This Week
              </Button>
              <div className="flex gap-1">
                <Button variant="transparent" size="md">
                  <Image
                    src="/assets/tag.svg"
                    alt="tag"
                    width={16}
                    height={16}
                  />
                </Button>
                <Button variant="transparent" size="md">
                  <Image
                    src="/assets/expand-table.svg"
                    alt="exp"
                    width={16}
                    height={16}
                  />
                </Button>
                <Button variant="transparent" size="md">
                  <Image
                    src="/assets/user-add.svg"
                    alt="user"
                    width={16}
                    height={16}
                  />
                </Button>
              </div>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl overflow-hidden">
              <div className="grid grid-cols-[432px_165px_10px_120px_100px_100px_100px_80px] bg-[#F4F5F6] p-3 border-b border-[#EBEBEB] text-[11px] font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="col-span-6">Name</div>
                  <Image
                    src="/assets/up-down.svg"
                    alt="group"
                    width={7}
                    height={5}
                    className=""
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="col-span-3 text-right">Estimated</div>
                  <Image
                    src="/assets/up-down.svg"
                    alt="group"
                    width={7}
                    height={5}
                    className=""
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="col-span-3 text-right">Tracked</div>
                  <Image
                    src="/assets/up-down.svg"
                    alt="group"
                    width={7}
                    height={5}
                    className=""
                  />
                </div>
              </div>
              {data.timeReporting.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 p-2 border-b border-[#EBEBEB] last:border-0 items-center text-[12px] text-[#191F38] font-medium leading-5 -tracking-normal bg-[#FFFFFF]"
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <Image
                      src={item.avatar}
                      alt="av"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="font-medium">{item.user}</span>
                  </div>
                  <div className="col-span-3 text-right text-[#191F38]">
                    {item.estimated}
                  </div>
                  <div className="col-span-3 text-right text-[#191F38]">
                    {item.tracked}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card variant="dashboard" title="Discussion" extra={<WidgetActions />}>
          <div className="flex flex-col h-[400px]">
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto mt-15 space-y-6  custom-scrollbar">
              {data.discussions.map((chat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {/* User Info Header */}
                  <div className="flex items-center gap-2">
                    <Image
                      src={chat.avatar}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="rounded-full h-6 w-6 object-cover"
                    />
                    <span className="text-[13px] font-bold text-[#191F38]">
                      {chat.user}
                    </span>
                    <span className="text-[11px] text-[#697588]">
                      {chat.time}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-md text-[13px] leading-relaxed w-full ${
                      chat.isMe
                        ? "bg-[#4A3AFF] text-white"
                        : "bg-[#F0F5FF] text-[#191F38]"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area matching image_cce78f.png */}
            <div className="mt-4">
              <div className="flex items-center gap-3 border border-[#EBEBEB] rounded-md p-3 bg-[#F9F9F9] shadow-sm">
                <Image
                  src="/assets/attach-square.svg"
                  alt="group"
                  width={18}
                  height={18}
                  className=""
                />
                <input
                  type="text"
                  placeholder="Type here.."
                  className="flex-1 text-[14px] outline-none placeholder:text-[#697588]"
                />
                <Image
                  src="/assets/send.svg"
                  alt="group"
                  width={18}
                  height={18}
                  className=""
                />
              </div>
            </div>
          </div>
        </Card>

        {/* --- DISCUSSION (EMPTY/EDITOR STATE) --- */}
        <Card variant="dashboard" title="Discussion" extra={<WidgetActions />}>
          <div className="h-[400px] bg-white rounded-xl p-4 text-[13px] text-[#191F38] leading-relaxed">
            {data.discussions
              .filter((chat) => !chat.isMe)
              .map((chat, index) => (
                <div key={index} className="mb-4">
                  <p>{chat.message}</p>
                </div>
              ))}
            <span className="text-[#697588] animate-pulse">/</span>
          </div>
        </Card>

        {/* --- ACTIVITY TIMELINE --- */}
        <Card variant="dashboard" title="Activity" extra={<WidgetActions />}>
          <div className="space-y-4 h-[400px] overflow-y-auto pr-2 hide-scrollbar">
            {data.activities.map((item) => (
              <div
                key={item.id}
                className="rounded-md  border border-[#EBEBEB] shadow-sm"
              >
                <div className="flex justify-between p-3.5 items-center mb-1 bg-[#F2F9FE] rounded-tl-md rounded-tr-md">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full border-1 border-[#178D6C85] bg-[#C4FFE2]" />
                    <h4 className="text-[12px] font-medium text-[#191F38] leading-5 -tracking-normal">
                      {item.title}
                    </h4>
                    <Image
                      src="/assets/lock.svg"
                      alt="icon"
                      width={14}
                      height={14}
                    />
                  </div>

                  {/* Metadata Icons */}
                  <div className="flex items-center gap-4 font-medium test-[11px] leading-5 -tracking-norma text-[#9BA2AD]">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/assets/calendar-normal.svg"
                        alt="icon"
                        width={14}
                        height={14}
                      />
                      <span className="font-medium test-[11px] leading-5 -tracking-normal ">
                        {item.dateRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/assets/timer.svg"
                        alt="icon"
                        width={14}
                        height={14}
                      />
                      <span>{item.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/assets/timer2.svg"
                        alt="icon"
                        width={14}
                        height={14}
                      />
                      <span>{item.total}</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Logs Section */}
                <div className="space-y-3.5 relative p-4 pb-7">
                  {item.logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-4">
                      <Image
                        src={log.avatar}
                        alt="user"
                        width={24}
                        height={24}
                        className=""
                      />
                      <div className="flex w-full justify-between ">
                        <p className="font-medium text-[11px] leading-5 -tracking-normal text-[#191F38]">
                          {log.action}
                        </p>
                        <p className="text-[11px] font-medium leading-5 text-[#7F899C]">
                          {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
