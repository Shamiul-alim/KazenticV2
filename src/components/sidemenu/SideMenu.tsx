'use client';

import { ChevronDown, ChevronRight } from "lucide-react";
import sectionsData from "@/data/sectionsData.json";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import PlayFilledIcon from "../icons/play-filled";
import PlayOutlineIcon from "../icons/play-outline-dashed";
import { Button } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SPRINTS_MOCK_DATA } from "@/data/sprint-data";

type SectionItem = {
  name: string;
  icon: string;
  path?: string;
};
export default function SideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const expandableItems = [
    "Manage",
    "Tasks",
    "Reports",
    "Storage",
    "HRM",
    "CRM",
  ];

  const isActive = (path?: string) => {
    return pathname === path;
  };

  const renderSection = (section: SectionItem) => {
    const isExpandable = expandableItems.includes(section.name);
    const isTasks = section.name === "Tasks";

    if (!isTasks) {
      return (
        <div key={section.name}>
          <button className="flex items-center w-full rounded-md py-2 px-3 transition duration-200 hover:bg-gray-100 group">
            <div className="flex items-center gap-3">
              <Image src={section.icon} alt="icon" width={18} height={18} />
              <span className="text-[13px] font-medium text-[#191F38]">
                {section.name}
              </span>
            </div>

            {isExpandable && (
              <ChevronRight
                size={16}
                className="ml-auto text-gray-400 group-hover:text-gray-600"
              />
            )}
          </button>
        </div>
      );
    }

    /* ===== TASKS SECTION (SHADCN) ===== */
    return (
      <Collapsible key="tasks" className="bg-[#F5F8FF] border rounded-md">
        <CollapsibleTrigger asChild>
          <button className="flex items-center w-full rounded-md py-2 px-3">
            <div className="flex items-center gap-3">
              <Image src={section.icon} alt="icon" width={18} height={18} />
              <span className="text-[13px] font-medium text-[#3B5BDB]">
                Tasks
              </span>
            </div>
            {
              !collapsed ? (
                <ChevronRight
                  size={16}
                  className="ml-auto text-[#3B5BDB]"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <ChevronDown
                  size={16}
                  className="ml-auto text-[#3B5BDB]"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )
            }
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-6 space-y-1 text-[12px] text-gray-600">
          <Button variant="ghost" className="flex items-center gap-2">
            Projects
          </Button>
        </CollapsibleContent>

        <CollapsibleContent className="space-y-1 bg-white border rounded-md mx-2 mb-2 px-2">
          {/* Sprints */}
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-1 text-[13px] text-[#3B5BDB]">
              <Button variant="ghost" className="flex items-center gap-2">
                <PlayFilledIcon className="w-4 h-4" />
                Sprints
              </Button>
              <ChevronDown size={14} className="mr-2" />
            </CollapsibleTrigger>

            <CollapsibleContent className={cn("pl-4 space-y-1 text-[11px]")}>
              {
                SPRINTS_MOCK_DATA.map((sprint) => (
                  <Button
                    key={sprint.id}
                    onClick={() => router.push(`/sprint-overview/${sprint.id}`)}
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-2 truncate max-w-full",
                      isActive(`/sprint-overview/${sprint.id}`) && "text-primary"
                    )}
                  >
                    <PlayOutlineIcon
                      className="w-4 h-4 shrink-0"
                    />
                    <span className="truncate">
                      {sprint.name} {sprint.range}
                    </span>
                  </Button>
                ))
              }
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible >
    );
  };

  return (
    <div className="w-50 bg-[#FFFFFF] text-[#191F38] border-r border-[#EBEBEB] flex flex-col h-full  rounded-tl-md md:relative absolute z-50 ">
      {/* Carbon Stream Section */}
      <div className="flex items-center mb-2 border-b border-[#EBEBEB] p-3 h-[2.188rem] rounded-tl-md">
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 bg-[#FDBF00] rounded-lg flex justify-center text-center ">
            <span className="text-[#FFFFFF] text-[1rem] font-medium">C</span>
          </button>
          <span className="font-semibold text-sm leading-5 tracking-tighter text-[#191F38]">
            Carbon Stream
          </span>
        </div>
        <Image
          alt="icon"
          src="/assets/sidemenu.svg"
          className="flex cursor-pointer ml-auto"
          width={16}
          height={16}
        />
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-2 pl-3 pr-3 pt-0.5">
        {sectionsData.map((section) => {
          return renderSection(section);
        })}
      </div>

      {/* Upgrade Space */}
      <div className="mt-auto">
        <Image
          alt="upgrade"
          src="/assets/add.svg"
          width={178}
          height={129}
          className="w-full"
        />
      </div>
    </div>
  );
}
