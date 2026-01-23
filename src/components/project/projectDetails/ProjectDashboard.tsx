"use client";

import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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
} from "lucide-react";

import dashboardData from "@/data/projectDashboard.json";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/card";

const WidgetActions = () => (
  <div className="flex items-center gap-2">
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
        src="/assets/refresh.svg"
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
        src="/assets/refresh.svg"
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
  </div>
);

export default function ProjectDashboard() {
  const data = dashboardData;

  return (
    <div className="min-h-screen bg-[#FFFFFF]  text-[#191F38] tracking-tighter p-2 px-5">
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
          <Button variant="sucess">
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
        <Card title="Task List" extra={<WidgetActions />}>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <ChevronDown className="w-4 h-4 text-[#697588]" />
              <div className="flex items-center gap-1.5 bg-[#E7FBF3] px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                <span className="text-[#10B981] text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
              <span className="bg-[#E7FBF3] text-[#10B981] text-[11px] font-bold px-2 rounded-md">
                4
              </span>
            </div>

            <div className="border border-[#EBEBEB] rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-[#F8F9FA] p-3 border-b border-[#EBEBEB] text-[11px] font-bold text-[#191F38]">
                <div className="col-span-8 flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#EBEBEB]"
                  />
                  <span>Task Name</span>
                  <Image
                    src="/assets/sort.svg"
                    alt="sort"
                    width={12}
                    height={12}
                    className="inline ml-1"
                  />
                </div>
                <div className="col-span-4 text-right flex justify-end items-center gap-1">
                  Status{" "}
                  <Image
                    src="/assets/sort.svg"
                    alt="sort"
                    width={12}
                    height={12}
                  />
                </div>
              </div>

              {data.activeTasks.map((task, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 p-3 border-b border-[#EBEBEB] last:border-0 items-center text-[12px] bg-white"
                >
                  <div
                    className={`col-span-8 flex items-center gap-3 text-[#191F38] font-medium ${task.isChild ? "ml-8" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#EBEBEB]"
                    />
                    {task.hasChildren ? (
                      <ChevronDown className="w-4 h-4 text-[#697588]" />
                    ) : task.isChild ? (
                      <ChevronRight className="w-3 h-3 text-[#697588]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#697588]" />
                    )}
                    <span className="truncate">{`[${task.id}] ${task.name}`}</span>
                    <span className="flex items-center gap-1 text-[10px] bg-[#F1F2F4] px-1.5 py-0.5 rounded text-[#697588]">
                      {task.subtasks} <RotateCcw className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="col-span-4 flex justify-end gap-2 items-center">
                    <Plus className="w-4 h-4 text-[#697588] cursor-pointer" />
                    <Pencil className="w-4 h-4 text-[#697588] cursor-pointer" />
                    <span className="text-[9px] font-bold text-[#10B981] border border-[#10B981] px-2 py-1 rounded-md bg-white">
                      ACTIVE
                    </span>
                  </div>
                </div>
              ))}
              <div className="p-3 bg-white flex justify-between items-center text-[11px] text-[#697588]">
                <span className="flex items-center gap-1 ml-8">
                  <Plus className="w-3 h-3" /> Create Task
                </span>
                <span className="flex items-center gap-1">
                  Calculate <ChevronDown className="w-3 h-3" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 opacity-60">
              <ChevronRight className="w-4 h-4 text-[#697588]" />
              <div className="flex items-center gap-1.5 bg-[#F2F1FF] px-3 py-1 rounded-full">
                <Image
                  src="/assets/flash.svg"
                  alt="flash"
                  width={10}
                  height={10}
                />
                <span className="text-[#4157FE] text-[10px] font-bold">
                  IN PROGRESS
                </span>
              </div>
              <span className="bg-[#F2F1FF] text-[#4157FE] text-[11px] font-bold px-2 rounded-md">
                4
              </span>
            </div>
          </div>
        </Card>

        {/* --- WORKLOAD BY STATUS --- */}
        <Card title="Workload By Status" extra={<WidgetActions />}>
          <div className="h-[320px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.workload}
                  innerRadius={85}
                  outerRadius={115}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
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
            <div className="absolute top-[18%] left-[22%] bg-white shadow-xl px-3 py-1 rounded-lg text-[10px] font-bold flex gap-2">
              <span className="text-[#4157FE]">IN PROGRESS</span>{" "}
              <span className="text-black">3</span>
            </div>
            <div className="absolute top-[18%] right-[10%] bg-white shadow-xl px-3 py-1 rounded-lg text-[10px] font-bold flex gap-2">
              <span className="text-[#10B981]">ACTIVE</span>{" "}
              <span className="text-black">4</span>
            </div>
            <div className="absolute bottom-[28%] left-[25%] bg-white shadow-xl px-3 py-1 rounded-lg text-[10px] font-bold flex gap-2">
              <span className="text-[#6366F1]">IN REVIEW</span>{" "}
              <span className="text-black">6</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {data.workload.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-bold text-[#697588]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* --- CALCULATION --- */}
        <Card title="Calculation" extra={<WidgetActions />}>
          <div className="bg-[#F2F9FE] rounded-[32px] h-[400px] flex flex-col items-center justify-center border border-[#E1F0FF]">
            <span className="text-[140px] font-bold text-[#4157FE] leading-none tracking-tighter">
              {data.totalTaskCount}
            </span>
            <p className="text-[#697588] text-[16px] font-medium mt-6">
              Total Task Count
            </p>
          </div>
        </Card>

        {/* --- TASKS BY ASSIGNEE --- */}
        <Card title="Tasks By Assignee" extra={<WidgetActions />}>
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
            <div className="absolute top-[20%] right-[12%] bg-white shadow-lg px-2 py-1 rounded-md text-[10px] font-bold">
              <span className="text-[#4157FE]">Alif Hassan</span>{" "}
              <span className="text-[#191F38] ml-1">45%</span>
            </div>
            <div className="absolute top-[8%] left-[35%] bg-white shadow-lg px-2 py-1 rounded-md text-[10px] font-bold">
              <span className="text-[#38BDF8]">John Doe</span>{" "}
              <span className="text-[#191F38] ml-1">12.5%</span>
            </div>
            <div className="absolute top-[45%] left-[18%] bg-white shadow-lg px-2 py-1 rounded-md text-[10px] font-bold">
              <span className="text-[#FB923C]">Ababa</span>{" "}
              <span className="text-[#191F38] ml-1">11%</span>
            </div>
            <div className="absolute bottom-[35%] left-[22%] bg-white shadow-lg px-2 py-1 rounded-md text-[10px] font-bold">
              <span className="text-[#A855F7]">Tonmoy Asif</span>{" "}
              <span className="text-[#191F38] ml-1">20%</span>
            </div>
          </div>
          <div className="flex justify-center gap-5 mt-2 flex-wrap px-4">
            {data.assignees.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: a.color }}
                />
                <span className="text-[11px] font-bold text-[#697588]">
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
