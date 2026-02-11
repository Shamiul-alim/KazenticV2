"use client";

import { X, ListFilter, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import backlogData from "@/data/project/project-details/timeline/backlog-data.json";
import Image from "next/image";

interface BacklogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Backlog({ isOpen, onClose }: BacklogProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[440px] p-0 bg-white border-l border-[#EBEBEB] gap-0"
      >
        <SheetHeader className="px-4 py-3 flex-row items-center justify-between space-y-0 ">
          <div className="flex items-center gap-3">
            <Image src="/assets/arrow-left.svg" alt="" width={16} height={16} />
            <SheetTitle className="">Backlog Tasks</SheetTitle>
          </div>
        </SheetHeader>

        <Tabs defaultValue="unscheduled" className="w-full ">
          <div className="flex items-center justify-between gap-8 border-b border-[#EBEBEB]">
            <TabsList className=" bg-transparent p-0 border-transparent">
              <TabsTrigger value="unscheduled" className="py-1">
                Unscheduled ({backlogData.unscheduled.length})
              </TabsTrigger>
              <TabsTrigger value="overdue" className="py-1">
                Overdue (4)
              </TabsTrigger>
              <Button variant="outline" size="sm" className="mr-4 ">
                <ListFilter className="h-3.5 w-3.5 text-[#4157FE]" />
              </Button>
            </TabsList>
          </div>

          <TabsContent value="unscheduled" className="p-4 space-y-3 m-0">
            {backlogData.unscheduled.map((task) => (
              <div
                key={task.id}
                className="group relative bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg p-2 transition-all cursor-pointer hover:shadow-sm"
              >
                {/* Accent Line */}
                <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-[#F97316] rounded-r-full" />

                <h4 className="text-xs font-medium text-[#191F38] mb-2 pl-3 leading-5 tracking-tight">
                  {task.title}
                </h4>

                <div className="flex items-center gap-2 pl-2">
                  <Badge
                    variant="outline"
                    className="bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/80 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <ArrowUpRight size={10} strokeWidth={3} />
                    {task.status}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="bg-[#EEF2FF] border border-[#4157FE]/80 text-[#4157FE] text-[11px] font-medium px-2 py-0.5 rounded-sm"
                  >
                    {task.type}
                  </Badge>

                  <span className="text-[11px] text-[#697588] font-medium bg-[#F3F4F6] px-2 py-0.5 rounded-sm border border-[#697588]/80">
                    [{task.id}]
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="p-4 space-y-3 m-0">
            {backlogData.unscheduled.map((task) => (
              <div
                key={task.id}
                className="group relative bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg p-2 transition-all cursor-pointer hover:shadow-sm"
              >
                {/* Accent Line */}
                <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-[#F97316] rounded-r-full" />

                <h4 className="text-xs font-medium text-[#191F38] mb-2 pl-3 leading-5 tracking-tight">
                  {task.title}
                </h4>

                <div className="flex items-center gap-2 pl-2">
                  <Badge
                    variant="outline"
                    className="bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/80 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <ArrowUpRight size={10} strokeWidth={3} />
                    {task.status}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="bg-[#EEF2FF] border border-[#4157FE]/80 text-[#4157FE] text-[11px] font-medium px-2 py-0.5 rounded-sm"
                  >
                    {task.type}
                  </Badge>

                  <span className="text-[11px] text-[#697588] font-medium bg-[#F3F4F6] px-2 py-0.5 rounded-sm border border-[#697588]/80">
                    [{task.id}]
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
