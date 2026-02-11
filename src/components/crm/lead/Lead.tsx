"use client";
import React, { useState } from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  MoreHorizontal,
  Plus,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Filter,
  ListFilter,
  LayoutGrid,
  List,
  GitFork,
  ChevronDown,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import Link from "next/link";
import ListView from "./component/ListView";
import AddLead from "./component/AddLead";
import LeadsPipeline from "./component/LeadsPipeline";

// --- Custom Style Helper ---
const getBadgeStyles = (theme: string) => {
  switch (theme) {
    case "green":
      return "bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5] border-[#05966980]";
    case "orange":
      return "bg-[#FFF7ED] text-[#F97316] hover:bg-[#FFEDD5] border-[#FF781680]";
    case "pink":
      return "bg-[#FDF2F8] text-[#DB2777] hover:bg-[#FCE7F3] border-[#C81C5780]";
    case "gray":
      return "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-[#69758880]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Lead = () => {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  return (
    <div className="w-full bg-[#FFFFFF] border-t border-[#EBEBEB">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 border-b border-[#EBEBEB] px-4 py-1">
        <Button onClick={() => setIsPipelineOpen(true)} variant="outline">
          <Image
            src="/assets/connection-point.svg"
            alt=""
            width={12}
            height={12}
          />
          Leads Pipeline
        </Button>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <ListFilter size={14} /> Sort
          </Button>
          <FilterPopover />

          <div className="flex items-center  bg-[#FDFDFD] border border-[#EBEBEB] rounded-md text-xs leading-3 tracking-tighter font-medium text-[#697588]">
            <button
              className={`cursor-pointer px-2 py-1.5 border-r rounded-tl-md rounded-bl-md border-[#EBEBEB] transition-colors ${viewMode === "grid" ? "bg-[#F2F9FE]" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Image
                src={`/assets/${viewMode === "grid" ? "grid-blue" : "grid"}.svg`}
                alt="group"
                width={12}
                height={12}
                className=""
              />
            </button>
            <button
              className={`cursor-pointer px-1.5 py-1.5 rounded-tr-md rounded-br-md transition-colors ${viewMode === "list" ? "bg-[#F2F9FE]" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <Image
                src={`/assets/${viewMode === "list" ? "list-blue" : "list"}.svg`}
                alt="group"
                width={12}
                height={12}
                className=""
              />
            </button>
          </div>

          <Button onClick={() => setIsAddLeadOpen(true)} variant="success">
            <Plus size={16} /> Add Lead
          </Button>
        </div>
      </div>

      {/* --- Pipeline Grid --- */}
      {viewMode == "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start px-4">
          {leadsData.pipeline.map((column) => (
            <div
              key={column.id}
              className="flex flex-col min-h-[500px] rounded-lg bg-[#F2F9FE] border border-[#4157FE1A] px-2 py-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`rounded-sm text-[10px] font-semibold uppercase tracking-wide border ${getBadgeStyles(column.theme)}`}
                  >
                    {column.title}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`rounded-sm text-[10px] px-1.5  font-semibold uppercase tracking-wide border ${getBadgeStyles(column.theme)}`}
                  >
                    {column.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  <ChevronDown
                    size={14}
                    className="cursor-pointer hover:text-[#191F38]"
                  />
                  <MoreHorizontal
                    size={14}
                    className="cursor-pointer hover:text-[#191F38]"
                  />
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex flex-col gap-3">
                {column.items.map((lead) => (
                  <Link key={lead.id} href={`/crm/lead/${lead.id}`}>
                    <Card className="">
                      <CardContent className="">
                        {/* Card Header: Avatar & Name */}
                        <div className="flex items-start justify-between mb-3 px-3 mt-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <Image
                                src={lead.avatar}
                                alt={lead.name}
                                width={32}
                                height={32}
                              />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-[#191F38] text-[12px] font-semibold">
                                {lead.name}
                              </h4>
                              <p className="text-[#697588] text-[11px]">
                                {lead.email}
                              </p>
                            </div>
                          </div>
                          <MoreHorizontal
                            size={16}
                            className="text-[#9CA3AF] cursor-pointer"
                          />
                        </div>

                        {/* Card Details */}
                        <div className="space-y-2 mb-3 px-3 ">
                          <div className="flex items-center gap-2 text-[#697588]">
                            <div className="p-1 border border-[#EBEBEB] rounded-full bg-[#FDFDFD]">
                              <Phone size={12} className="shrink-0" />
                            </div>
                            <span className="text-[11px] font-medium">
                              {lead.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#697588]">
                            <div className="p-1 border border-[#EBEBEB] rounded-full bg-[#FDFDFD]">
                              <Building2 size={12} className="shrink-0" />
                            </div>

                            <span className="text-[11px] font-medium">
                              {lead.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#697588]">
                            <div className="p-1 border border-[#EBEBEB] rounded-full bg-[#FDFDFD]">
                              <Calendar size={12} className="shrink-0" />
                            </div>

                            <span className="text-[11px] font-medium">
                              {lead.date}
                            </span>
                          </div>
                        </div>

                        {/* Card Footer: Value */}
                        <div className="px-4 py-3 border-t border-[#EBEBEB] rounded-bl-lg rounded-br-lg bg-[#F8FAFC] flex items-center gap-1 text-[#4157FE] ">
                          <div className="border border-[#4157FE] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                            <DollarSign size={8} strokeWidth={3} />
                          </div>
                          <span className="text-xs font-bold ">
                            {lead.value}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Column Footer: Add Lead */}
              <Button
                variant="transparent"
                className="mt-2 w-full justify-start text-[#697588] hover:text-[#191F38] hover:bg-white text-[11px] h-8 gap-2 px-1"
              >
                <Plus size={14} /> Add Lead
              </Button>
            </div>
          ))}
        </div>
      )}
      {viewMode == "list" && <ListView />}
      <AddLead isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} />
      <LeadsPipeline
        isOpen={isPipelineOpen}
        onClose={() => setIsPipelineOpen(false)}
      />
    </div>
  );
};

export default Lead;
