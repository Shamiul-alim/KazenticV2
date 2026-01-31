"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/sprint-overview/ui/dropdown-menu";
import React from "react";

interface GroupActionMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const GroupActionMenu = ({
  trigger,
  children,
  align = "end",
}: GroupActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none hover:opacity-70 transition-opacity">
          {trigger}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className=" rounded-xl bg-white border border-[#EBEBEB] shadow-lg shadow-gray-200/50 text-xs text-[#697588]  "
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
