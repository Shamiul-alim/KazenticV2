"use client";

import {
  ChevronRight,
  Filter,
  Layers,
  ListTree,
  Pin,
  ShieldCheck,
  Lock,
  Home,
  Link2,
  Share2,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/Button";
import customizeData from "@/data/project/project-details/timeline/customize-data.json";
import Image from "next/image";

interface CustomizeViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, any> = {
  Filter,
  Layers,
  ListTree,
  Pin,
  ShieldCheck,
  Lock,
  Home,
};

export function CustomizeView({ isOpen, onClose }: CustomizeViewProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[400px] p-0 bg-white border-l border-[#EBEBEB] flex flex-col gap-0"
      >
        {/* Header */}
        <SheetHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 ">
          <SheetTitle>Customize View</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Timeline Search Input Section */}
          <div className="px-4 mt-2 space-y-4">
            <div className="flex items-center border border-[#EBEBEB] rounded-lg  bg-[#FDFDFD]">
              <div className=" h-9 flex  justify-center p-2 border-r border-[#EBEBEB]">
                <Image
                  src="/assets/timeline-active.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              </div>
              <Input
                placeholder="Timeline"
                className="border-none items-start shadow-none focus-visible:ring-0 text-xs text-[#697588] h-9"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-meidum text-[#697588] uppercase tracking-wider">
                Quick Actions
              </Label>
              <div className="flex items-center justify-between py-1">
                <span className="text-[13px] font-normal text-[#4157FE]">
                  Show Weekends
                </span>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#4157FE]"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-[#EBEBEB]" />

          {/* Task Visibility Section */}
          <div className="p-4 space-y-4">
            <Label className="text-[11px] font-meidum text-[#697588] uppercase tracking-wider">
              Task Visibility
            </Label>
            <div className="">
              {customizeData.taskVisibility.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-1.5 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-3 h-3 text-[#697588]" />
                      <span className="text-xs font-medium text-[#697588]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-[#697588]">
                        {item.value}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#697588]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="bg-[#EBEBEB]" />

          {/* View Settings Section */}
          <div className="p-4">
            <Label className="text-[11px] font-meidum text-[#697588] uppercase tracking-wider">
              View Settings
            </Label>
            <div className="space-y-4 mt-3">
              {customizeData.viewSettings.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-3 h-3 text-[#697588]" />
                      <span className="text-xs font-medium text-[#697588]">
                        {item.label}
                      </span>
                    </div>
                    <Switch
                      defaultChecked={item.default}
                      className="data-[state=checked]:bg-[#4157FE]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="bg-[#EBEBEB]" />

          {/* Utility Actions */}
          <div className="p-4 ">
            <Label className="text-[11px] font-meidum text-[#697588] uppercase tracking-wider">
              Utility Actions
            </Label>
            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-3 cursor-pointer">
                <Link2 className="w-3 h-3 text-[#697588]" />
                <span className="text-xs font-medium text-[#697588]">
                  Copy View Link
                </span>
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 text-[#697588]" />
                  <span className="text-xs font-medium text-[#697588]">
                    Export View
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#697588]" />
              </div>
              <div className="flex items-center gap-3 cursor-pointer pt-2">
                <Trash2 className="w-4 h-4 text-[#EF4444]" />
                <span className="text-xs font-medium text-[#EF4444]">
                  Delete View
                </span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
