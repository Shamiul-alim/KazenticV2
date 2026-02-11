import React from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import { Plus, MoreHorizontal, Eye, Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { Badge } from "@/components/ui/badge";

const Files = () => {
  const { files } = leadsData.leadDetails;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] rounded-bl-lg rounded-br-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-[#191F38] leading-6">
            Files
          </h3>
          <p className="text-[11px] text-[#697588]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar non praesent sit
            nisi pharetra faucibus.
          </p>
        </div>
        <div className="flex gap-2">
          <FilterPopover />
          <Button variant="success">
            <Plus size={14} /> Create Document
          </Button>
        </div>
      </div>

      {/* Files List */}
      <div className="px-4 pb-4 space-y-4 overflow-y-auto">
        {files.map((file) => (
          <Card
            key={file.id}
            className="border border-[#EBEBEB] bg-[#FFFFFF] shadow-none rounded-lg"
          >
            <CardContent className="p-4">
              {/* Top Row: Headline and Menu */}
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[12px] font-semibold text-[#191F38]">
                  {file.title}
                </h4>
                <button className="text-[#9CA3AF] hover:text-[#191F38]">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <p className="text-[11px] text-[#697588] mb-4">
                {file.description}
              </p>

              {/* Attachments (Conditional) */}
              {file.attachments.length > 0 && (
                <div className="flex gap-3 mb-4">
                  {file.attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className=" group flex min-w-62.5 items-center justify-between p-2.5 border border-[#EBEBEB] rounded-lg bg-[#FFFFFF] hover:border-[#4157FE] hover:bg-[#F2F9FE] transition-all duration-200 cursor-pointer"
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
                            {file.size} • {file.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex  text-gray-300">
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
              )}

              {/* Divider */}
              <div className="h-[1px] bg-[#EBEBEB] w-full mb-3" />

              {/* Footer: Author and Tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="w-8 h-8 border border-[#EBEBEB]">
                      <AvatarImage src={file.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#10B981] border border-white rounded-full"></span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#191F38] leading-tight">
                      {file.author}
                    </p>
                    <p className="text-[10px] text-[#697588]">
                      {file.date} | {file.time}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-[#F0E4FF] border-[#B187E5] text-[#A855F7] text-[10px] px-2 py-0.5 font-medium rounded-sm"
                  >
                    Deal Name
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-[#F2F9FE] border-[#4157FE80] text-[#4157FE] text-[10px] px-2 py-0.5 font-medium rounded-sm"
                  >
                    Contract
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Files;
