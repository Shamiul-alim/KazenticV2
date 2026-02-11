"use client";
import { useState } from "react";
import { Check, Eye, Globe, XCircle, Lock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import projectsData from "@/data/projectDetails.json";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";

import Card from "@/components/ui/card2";
import ProgressBar from "@/components/ui/progressbar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProjectData {
  id: number;
  name: string;
  projectType: string;
  createdDate: string;
  expectedDelivery: string;
  tasks: { completed: number; total: number; percentage: number };
  estimatedTime: { spent: number; total: number; percentage: number };
  description: string;
  workflow: { name: string; value: number; color: string }[];
  members: { name: string; role: string; avatar: string }[];
  attachments: { name: string; size: string; extension: string }[];
}
export default function ProjectDetails() {
  const [visibility, setVisibility] = useState("private");
  const data: ProjectData = projectsData[0];
  return (
    <div className="h-full bg-[#FFFFFF] text-[#191F38] tracking-tighter flex flex-col min-h-0 ">
      {/* Navbar Section */}
      <header className="flex flex-col shrink-0 md:flex-row justify-between items-start md:items-center mb-3.5 gap-4 border-b border-[#EBEBEB] pl-4.75 pr-4.75 h-10">
        <div className="flex items-center gap-2 ">
          <h1 className="text-xs font-semibold leading-6">{data.name}</h1>
          <Image
            src="/assets/lock.svg"
            alt="group"
            width={12}
            height={12}
            className=""
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 ">
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
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="md" className="p-2">
                  <Image
                    src="/assets/security-user.svg"
                    alt="security"
                    width={16}
                    height={16}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-[183px] bg-[#FFFFFF] rounded-md shadow-[#0000000D] border border-[#EBEBEB] z-100"
              >
                <div className="flex flex-col">
                  {/* Private Option */}
                  <button
                    onClick={() => setVisibility("private")}
                    className={`flex items-center justify-between w-full p-3 transition-colors ${
                      visibility === "private"
                        ? "bg-[#F2F9FE]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${visibility === "private" ? "text-[#4157FE]" : "text-[#697588]"}`}
                      >
                        <Image
                          src={`/assets/${visibility === "private" ? "lock-blue" : "lock"}.svg`}
                          alt="group"
                          width={12}
                          height={12}
                          className=""
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${visibility === "private" ? "text-[#4157FE]" : "text-[#697588]"}`}
                      >
                        Private
                      </span>
                    </div>
                    {visibility === "private" && (
                      <Check size={16} className="text-[#4157FE]" />
                    )}
                  </button>

                  {/* Public Option */}
                  <button
                    onClick={() => setVisibility("public")}
                    className={`flex items-center justify-between w-full p-3 transition-colors ${
                      visibility === "public"
                        ? "bg-[#F2F9FE]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-md ${visibility === "public" ? "text-[#4157FE]" : "text-[#697588]"}`}
                      >
                        <Image
                          src={`/assets/${visibility === "private" ? "global" : "global-blue"}.svg`}
                          alt="group"
                          width={12}
                          height={12}
                          className=""
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${visibility === "public" ? "text-[#4157FE]" : "text-[#697588]"}`}
                      >
                        Public
                      </span>
                    </div>
                    {visibility === "public" && (
                      <Check size={16} className="text-[#4157FE]" />
                    )}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs font-medium text-[#697588] leading-4 ">
              Project Status
            </span>
            <Switch id="airplane-mode" />
          </div>
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
      </header>

      {/* Grid Layout */}
      <div className="flex-1 overflow-auto min-h-0 hide-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 pl-4.75 pr-4.75 overflow-y-auto">
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {/* Progress Card */}
            <Card title="Project Progress">
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  {
                    label: "Project Type",
                    val: data.projectType,
                    icon: "/assets/box.svg",
                  },
                  {
                    label: "Created Date",
                    val: data.createdDate,
                    icon: "/assets/calendar-edit.svg",
                  },
                  {
                    label: "Expected Delivery",
                    val: data.expectedDelivery,
                    icon: "/assets/calendar-normal.svg",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-2xl h-17 p-3"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-[#697588] font-medium leading-5 tracking-tighter mb-1">
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={14}
                        height={14}
                      />{" "}
                      {item.label}
                    </div>
                    <div className="text-xs font-semibold text-[#191F38] leading-6 tracking-tighter">
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3.5">
                <ProgressBar
                  label="Tasks"
                  subLabel={`${data.tasks.completed}/${data.tasks.total}`}
                  percentage={data.tasks.percentage}
                  colorClass="bg-[#2DD4BF]"
                />
                <ProgressBar
                  label="Estimated Time"
                  subLabel={`${data.estimatedTime.spent}/${data.estimatedTime.total} Hours`}
                  percentage={data.estimatedTime.percentage}
                  colorClass="bg-[#FB923C]"
                />
              </div>
            </Card>

            {/* Description Card */}
            <Card title="Description">
              <p className="text-[#697588] text-xs  tracking-[-0.02em]">
                {data.description}
              </p>
            </Card>

            {/* Members Card */}
            <Card
              title="Members"
              extra={
                <Button variant="transparent">
                  <Image
                    src="/assets/plus-blue.svg"
                    alt="group"
                    width={16}
                    height={16}
                    className=""
                  />{" "}
                  Add Member
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.members.map((member, i) => (
                  <div
                    key={i}
                    className="group relative flex items-center justify-between p-3 rounded-2xl border bg-[#FFFFFF] border-[#EBEBEB] hover:border-[#4157FE] hover:bg-[#F2F9FE] transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-[#7EE7D3] flex items-center justify-center overflow-hidden">
                          <span className="text-2xl">{member.avatar}</span>
                        </div>
                        {/* Status Dot */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10B981] border-2 border-white rounded-full"></div>
                      </div>

                      {/* Text Info */}
                      <div className="flex flex-col gap-1.5 text-xs font-medium leading-5 tracking-tighter">
                        <span className=" text-[#191F38] ">{member.name}</span>
                        <span className=" text-[#697588]">{member.role}</span>
                      </div>
                    </div>

                    {/* Close Icon - visible only on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2">
                      <XCircle
                        className="text-[#4157FE] w-6 h-6"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {/* Workflow Card */}
            <Card
              title="Project Workflow"
              extra={
                <div className="flex gap-2">
                  <Button variant="outline" size="md">
                    <Image
                      src="/assets/refresh.svg"
                      alt="group"
                      width={16}
                      height={16}
                      className=""
                    />{" "}
                  </Button>
                  <Button variant="outline" size="md">
                    <Image
                      src="/assets/ci_expand.svg"
                      alt="group"
                      width={16}
                      height={16}
                      className=""
                    />{" "}
                  </Button>
                  <Button variant="outline" size="md">
                    <Image
                      src="/assets/filter.svg"
                      alt="group"
                      width={16}
                      height={16}
                      className=""
                    />{" "}
                  </Button>
                  <Button variant="outline" size="md">
                    <Image
                      src="/assets/setting.svg"
                      alt="group"
                      width={16}
                      height={16}
                      className=""
                    />{" "}
                  </Button>
                  <Button variant="outline" size="md">
                    <Image
                      src="/assets/3dot.svg"
                      alt="group"
                      width={16}
                      height={16}
                      className=""
                    />{" "}
                  </Button>
                </div>
              }
            >
              <div className="h-[300px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.workflow}
                      innerRadius={85}
                      outerRadius={113}
                      paddingAngle={0}
                      startAngle={450}
                      endAngle={90}
                      dataKey="value"
                    >
                      {data.workflow.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[29.17px] font-semibold text-[#191F38] tracking-tighter">
                    {data.workflow.find((item) => item.name === "Completed")
                      ?.value || 0}
                    %
                  </span>
                  <span className="text-sm font-medium text-[#697588] tracking-tighter">
                    Completed
                  </span>
                </div>

                {/* Floating Label: Completed 59% (Top Right) */}
                <div className="absolute top-[15%] right-[15%] flex items-center bg-white px-3 py-1.5 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border border-gray-50">
                  <span className="text-sm font-bold text-[#10B981]">
                    Completed
                  </span>
                  <span className="text-sm font-bold text-[#1E293B] ml-1">
                    59%
                  </span>
                  {/* Pointer Triangle */}
                  <div className="absolute -bottom-1 left-2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-50"></div>
                </div>

                {/* Floating Label: To Do 2% (Middle Left) */}
                <div className="absolute top-[45%] left-[15%] flex items-center bg-white px-3 py-1.5 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border border-gray-50">
                  <span className="text-sm font-bold text-[#F97316]">
                    To Do
                  </span>
                  <span className="text-sm font-bold text-[#1E293B] ml-1">
                    2%
                  </span>
                  {/* Pointer Triangle */}
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-gray-50"></div>
                </div>

                {/* Floating Label: IN REVIEW 9% (Bottom Left) */}
                <div className="absolute bottom-[14%] left-[16%] flex items-center bg-white px-3 py-1.5 rounded-lg shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border border-gray-50">
                  <span className="text-sm font-bold text-[#64748B]">
                    IN REVIEW
                  </span>
                  <span className="text-sm font-bold text-[#1E293B] ml-1">
                    9%
                  </span>
                  {/* Pointer Triangle */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-gray-50"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 space-y-2">
                {data.workflow.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-semibold text-[#697588] w-16">
                      {item.name}
                    </span>
                    <span className="text-xs font-semibold text-[#697588]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Attachments Card */}
            <Card
              title="Attachments"
              extra={
                <Button variant="transparent">
                  <Image
                    src="/assets/plus-blue.svg"
                    alt="group"
                    width={16}
                    height={16}
                    className=""
                  />{" "}
                  Attach
                </Button>
              }
            >
              <div className="space-y-2">
                {data.attachments.map((file, i) => (
                  <div
                    key={i}
                    className=" group flex items-center justify-between p-2.5 border border-[#EBEBEB] rounded-2xl bg-[#FFFFFF] hover:border-[#4157FE] hover:bg-[#F2F9FE] transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src="/assets/document.svg"
                        alt="group"
                        width={34.61}
                        height={34.61}
                        className=""
                      />
                      <div>
                        <div className="text-xs font-medium leading-5 tracking-tighter text-[#191F38]">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-[#697588]">
                          {file.size} • {file.extension}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 text-gray-300">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2">
                        <Image
                          src="/assets/download.svg"
                          alt="group"
                          width={18}
                          height={18}
                          className=""
                        />
                      </div>
                      <Eye
                        size={16}
                        className="cursor-pointer group-hover:text-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
