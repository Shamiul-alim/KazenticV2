'use client';

import { ChevronDown, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EmployeeTable } from "./employee-table";
import { useState } from "react";
import EmployeeGrid from "./employee-grid";
import { useRouter } from "next/navigation";
import FilterViewToolkit from "./filter-view-toolkit";
import SettingsIcon from "../icons/settings";

export const toolbarButton =
    "rounded-sm text-xs leading-5";

const colors = {
    exportBtn: {
        border: "#EBEBEB",
        text: "#191F38",
    }
}

export default function AllEmployeeSection() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const router = useRouter();
    const handleManageEmployee = () => {
        router.push('/employee/manage');
    }

    return (
        <main className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <span className="text-base font-semibold">All Employees</span>
                <div>
                    <div className="flex items-center justify-between gap-3">
                        {/* Left actions */}
                        <div className="flex items-center gap-2">
                            {/* Export */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={toolbarButton} style={{ borderColor: colors.exportBtn.border, color: colors.exportBtn.text }}>
                                        Export
                                        <ChevronDown className="ml-2 h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Excel</DropdownMenuItem>
                                    <DropdownMenuItem>PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <FilterViewToolkit viewMode={viewMode} setViewMode={setViewMode} />
                        </div>

                        {/* Right action */}
                        <Button onClick={handleManageEmployee} className={cn(toolbarButton, "px-3 flex items-center gap-2 font-medium")}>
                            Manage Employee
                            {/* <Settings size={3.5} /> */}
                            <SettingsIcon className="size-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {viewMode === "list" ? <EmployeeTable /> : <EmployeeGrid />}
            </div>
        </main>
    )
}
