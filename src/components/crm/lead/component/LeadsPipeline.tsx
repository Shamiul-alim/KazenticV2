"use client";
import React from "react";
import { X, GripVertical, MoreHorizontal, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface LeadsPipelineProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadsPipeline = ({ isOpen, onClose }: LeadsPipelineProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[400px] p-0  flex flex-col h-full ">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <h3 className="text-sm font-bold text-[#191F38]">Leads Pipeline</h3>
          <SheetClose />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 space-y-3">
          {/* Stage: New Lead */}
          <div className="flex items-center justify-between p-2 border border-[#EBEBEB] rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <GripVertical size={16} className="text-[#9CA3AF] cursor-grab" />
              <span className="text-xs font-semibold text-[#191F38]">
                New Lead
              </span>
            </div>
            <MoreHorizontal
              size={16}
              className="text-[#9CA3AF] cursor-pointer"
            />
          </div>

          {/* Stage: Contacted */}
          <div className="flex items-center justify-between p-2 border border-[#EBEBEB] rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <GripVertical size={16} className="text-[#697588] cursor-grab" />
              <span className="text-xs font-semibold text-[#191F38]">
                Contacted
              </span>
            </div>
            <MoreHorizontal
              size={16}
              className="text-[#9CA3AF] cursor-pointer"
            />
          </div>

          {/* Expanded Stage: Qualified */}
          <Card className="border-[#EBEBEB] overflow-hidden bg-[#FDFDFD]">
            <div className="flex items-center justify-between p-3 border-b border-[#EBEBEB] bg-[#F2F9FE]">
              <div className="flex items-center gap-3">
                <GripVertical
                  size={16}
                  className="text-[#9CA3AF] cursor-grab"
                />
                <span className="text-xs font-bold text-[#4157FE]">
                  Qualified
                </span>
              </div>
              <MoreHorizontal
                size={16}
                className="text-[#697588] cursor-pointer"
              />
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#191F38]">
                  Pipeline Name
                </label>
                <Input
                  defaultValue="Qualified"
                  className="h-9 text-xs border-[#EBEBEB] focus-visible:ring-[#4157FE] text-[#697588]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#191F38]">
                  Description Name
                </label>
                <Textarea
                  defaultValue="Lorem Ipsum"
                  className="min-h-[80px] text-xs border-[#EBEBEB] focus-visible:ring-[#4157FE] resize-none text-[#697588]"
                />
              </div>

              <div className="flex items-center justify-between p-2 border border-[#EBEBEB] rounded-md bg-white w-full max-w-[150px]">
                <span className="text-[11px] text-[#697588]">
                  Pipeline Color
                </span>
                <div className="w-5 h-5 rounded-full bg-[#EBDBFF] border border-black/5" />
              </div>
            </div>
          </Card>

          {/* Untitled Preview Stage */}
          <div className="border border-[#EBEBEB] bg-[#FDFDFD] rounded-lg opacity-70">
            <div className="flex items-center justify-between p-3 bg-[#F2F9FE] border-b border-[#EBEBEB] rounded-tl-lg rounded-tr-lg">
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-[#9CA3AF]" />
                <span className="text-xs font-bold text-[#4157FE]">
                  Untitled Pipeline
                </span>
              </div>
            </div>
            <div className="p-4  space-y-4 rounded-bl-lg rounded-br-lg">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#191F38]">
                  Pipeline Name
                </label>
                <Input
                  placeholder="Type here"
                  className="h-9 text-xs border-[#EBEBEB]"
                />
              </div>
            </div>
          </div>

          <Button variant="transparent" className="">
            <Plus size={14} /> Add New Pipeline
          </Button>
          {/* Footer */}
          <div className="p-4 flex gap-3 justify-end">
            <SheetClose asChild>
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </SheetClose>
            <Button variant="success" size="lg">
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeadsPipeline;
