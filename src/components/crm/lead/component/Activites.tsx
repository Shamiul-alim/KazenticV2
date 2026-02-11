"use client";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import { Plus, Video } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { Button } from "@/components/ui/Button";
import React from "react";
import AddActivities from "./AddActivities";

const Activities = () => {
  const { leadDetails } = leadsData;
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const renderTimelineIcon = (item: any) => {
    if (item.icon === "video") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#FDFDFD] flex items-center justify-center border border-[#EBEBEB] z-10 relative">
          <Video size={14} className="text-[#4157FE]" />
        </div>
      );
    }
    return (
      <Avatar className="w-8 h-8 z-10 relative border border-white">
        <Image
          src={item.avatar || "/assets/avatar-placeholder.png"}
          alt="User"
          width={32}
          height={32}
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
  };
  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] rounded-bl-lg rounded-br-lg">
      {/* Activity Actions Header */}
      <div className="flex items-center justify-between pr-4">
        <div className="flex-col px-4 mt-3">
          <h3 className="text-sm font-semibold text-[#191F38] leading-6">
            Activities
          </h3>
          <p className="text-[11px] text-[#697588]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar non praesent sit
            nisi pharetra faucibus.
          </p>
        </div>
        <div className="flex gap-2">
          <FilterPopover />
          <Button
            onClick={() => setIsAddOpen(true)}
            variant="success"
            size="sm"
          >
            <Plus size={14} /> Add Activity
          </Button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className=" mt-3 space-y-6">
        {leadDetails.activities.map((group, groupIdx) => {
          return (
            <div key={groupIdx} className="relative">
              {/* Date Header */}
              <h4 className="text-[11px] font-bold text-[#191F38] mb-4 px-4">
                {group.date}
              </h4>

              {/* Items */}
              <div className="space-y-6">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 relative  border-b border-[#EBEBEB] px-4"
                  >
                    <div className="border-l-2 pl-2 border-[#4157FE]">
                      {renderTimelineIcon(item)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex justify-between items-center pt-1  pb-4">
                      <div
                        className="text-[11px] text-[#191F38]"
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                      <span className="text-[10px] text-[#9CA3AF] shrink-0 ml-4">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <AddActivities isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};
export default Activities;
