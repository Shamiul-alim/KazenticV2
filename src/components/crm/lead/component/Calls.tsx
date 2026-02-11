"use client";
import React, { useState } from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  Plus,
  PhoneIncoming,
  PhoneOutgoing,
  MoreHorizontal,
  Hourglass,
  ChevronDown,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import AddCalls from "./AddCalls";

const Calls = () => {
  const { calls } = leadsData.leadDetails;
  const [isAddCallOpen, setIsAddCallOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] rounded-bl-lg rounded-br-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-[#191F38] leading-6">
            Calls
          </h3>
          <p className="text-[11px] text-[#697588]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar non praesent sit
            nisi pharetra faucibus.
          </p>
        </div>
        <div className="flex gap-2">
          <FilterPopover />
          <Button onClick={() => setIsAddCallOpen(true)} variant="success">
            <Plus size={14} /> Add Call Log
          </Button>
        </div>
      </div>

      {/* Calls List */}
      <div className="px-4 pb-4 space-y-3 overflow-y-auto">
        {calls.map((call) => (
          <Card
            key={call.id}
            className="border border-[#EBEBEB] bg-[#FFFFFF] shadow-none rounded-lg overflow-hidden"
          >
            <div className="flex h-full relative">
              {/* Status Indicator Line */}
              <div
                className="w-0.5 absolute left-1.5 right-0 top-2.5 bottom-2.5"
                style={{
                  backgroundColor: call.isMissed ? "#DC2626" : "#178D6C",
                }}
              />

              <CardContent className="flex-1 p-3 flex items-center justify-between">
                {/* Left: User Info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border border-[#EBEBEB] ml-2">
                      <AvatarImage src={call.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#191F38]">
                      {call.user}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {call.isMissed ? (
                        <PhoneIncoming size={12} className="text-[#EF4444]" />
                      ) : (
                        <PhoneOutgoing size={12} className="text-[#10B981]" />
                      )}
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: call.typeColor }}
                      >
                        {call.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Controls and Metadata */}
                <div className="flex items-center gap-6">
                  {/* Select Status */}
                  <Select
                    defaultValue={call.status === "Answered" ? "answered" : ""}
                  >
                    <SelectTrigger className="h-8 w-[140px] text-[11px] text-[#697588] border-[#EBEBEB] bg-white rounded-lg">
                      <SelectValue placeholder={call.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="answered" className="text-[11px]">
                        Answered
                      </SelectItem>
                      <SelectItem value="no-answer" className="text-[11px]">
                        No Answer
                      </SelectItem>
                      <SelectItem value="busy" className="text-[11px]">
                        Busy
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date & Duration */}
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-xs leading-6 font-medium text-[#191F38]">
                      {call.date}
                    </span>
                    <div className="flex items-center gap-1 text-[#697588]">
                      <span className="text-xs">{call.duration}</span>
                      <Hourglass size={10} className="opacity-60" />
                    </div>
                  </div>

                  {/* Actions */}
                  <button className="text-[#9CA3AF] flex hover:text-[#191F38]">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
      <AddCalls
        isOpen={isAddCallOpen}
        onClose={() => setIsAddCallOpen(false)}
      />
    </div>
  );
};

export default Calls;
