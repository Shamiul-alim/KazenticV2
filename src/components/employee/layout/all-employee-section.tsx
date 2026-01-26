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

export const toolbarButton =
    "rounded-md h-10"


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
                                    <Button variant="outline" className={toolbarButton}>
                                        Export
                                        <ChevronDown className="ml-2 h-4 w-4" />
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
                        <Button onClick={handleManageEmployee} className={cn(toolbarButton, "px-3")}>
                            Manage Employee
                            <Settings size={10} />
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
