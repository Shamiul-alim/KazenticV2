"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Settings, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

import data from "@/data/gantt/gantt-data.json";
import mockData from "@/data/time-tracker/tracker-details.json";

import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import SelectAssign from "@/components/time-tracker/floating-component/SelectAssign";

import { Backlog } from "@/components/project/floating-component/timeline/Backlog";
import { CustomizeView } from "@/components/project/floating-component/timeline/CustomizeView";
import CreateTask from "@/components/project/floating-component/timeline/CreateTask";

import { GanttTask, GanttDependency } from "@/data/gantt/gantt.types";

type ViewMode = "day" | "week" | "month";
const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5] as const;

const DayGanttView = dynamic(
  () => import("@/components/gantt/views/DayGanttView"),
  { ssr: false },
);
const WeekGanttView = dynamic(
  () => import("@/components/gantt/views/WeekGanttView"),
  { ssr: false },
);
const MonthGanttView = dynamic(
  () => import("@/components/gantt/views/MonthGanttView"),
  { ssr: false },
);

export default function GanttClient(props: {
  initialTasks: GanttTask[];
  initialDependencies: GanttDependency[];
  projectSettings: any;
}) {
  const statusThemes = (data as any).statusThemes ?? {};

  const [tasks, setTasks] = useState<GanttTask[]>((data as any).tasks ?? []);
  const [dependencies, setDependencies] = useState<GanttDependency[]>(
    (data as any).dependencies ?? [],
  );

  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const [zoomIndex, setZoomIndex] = useState<number>(ZOOM_LEVELS.indexOf(1));
  const zoom = ZOOM_LEVELS[zoomIndex];

  const zoomIn = () =>
    setZoomIndex((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1));
  const zoomOut = () => setZoomIndex((z) => Math.max(z - 1, 0));

  const [isBacklogOpen, setIsBacklogOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const toggleAssignee = (id: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const scrollToTodayActiveView = () => {
    window.dispatchEvent(
      new CustomEvent("gantt:scrollToToday", { detail: { mode: viewMode } }),
    );
  };

  const viewLabel = useMemo(() => {
    if (viewMode === "day") return "Day";
    if (viewMode === "week") return "Week";
    return "Month";
  }, [viewMode]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#FDFDFD] border-t border-[#EBEBEB] text-xs font-medium leading-5 tracking-tight overflow-hidden">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-[#EBEBEB] bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={scrollToTodayActiveView}
            className="text-[#4157FE] border-[#4157FE] bg-[#F2F9FE] hover:bg-[#E0F0FF]"
          >
            Today
          </Button>

          <Select
            value={viewMode}
            onValueChange={(v) => setViewMode(v as ViewMode)}
          >
            <SelectTrigger className="h-6 text-xs text-[#697588] border border-[#EBEBEB] rounded-sm bg-[#FDFDFD] focus:ring-0">
              <SelectValue placeholder="View">{viewLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={zoomIn}>
            <ZoomIn size={14} className="text-[#697588]" />
          </Button>
          <Button variant="outline" onClick={zoomOut}>
            <ZoomOut size={14} className="text-[#697588]" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsBacklogOpen(true)}>
            <Image
              src="/assets/backlog.svg"
              alt="Backlog"
              width={16}
              height={16}
            />{" "}
            Backlog
          </Button>

          <FilterPopover />

          <div className="relative">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsAssigneeOpen((open) => !open)}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[8px] font-medium mr-2">
                AH
              </div>
              <span className="text-xs font-medium text-[#64748B]">
                Alif Hassan
              </span>
            </Button>

            {isAssigneeOpen && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <SelectAssign
                  onClose={() => setIsAssigneeOpen(false)}
                  searchQuery={assigneeSearch}
                  setSearchQuery={setAssigneeSearch}
                  selectedMembers={selectedAssignees}
                  toggleMember={toggleAssignee}
                  people={mockData.allLogs.map((person) => ({
                    ...person,
                    count:
                      typeof person.count === "string"
                        ? parseInt(person.count, 10)
                        : person.count,
                  }))}
                />
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="h-6"
            onClick={() => setIsCustomizeOpen(true)}
          >
            <Settings size={14} /> Customize view
          </Button>

          <Button variant="success" onClick={() => setIsCreateOpen(true)}>
            <Plus size={14} /> Create Task
          </Button>
        </div>
      </div>

      {/* Active gantt view */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        {viewMode === "day" && (
          <DayGanttView
            tasks={tasks}
            setTasks={setTasks}
            dependencies={dependencies}
            setDependencies={setDependencies}
            zoom={zoom}
            statusThemes={statusThemes}
            onCreateTask={() => setIsCreateOpen(true)}
          />
        )}

        {viewMode === "week" && (
          <WeekGanttView
            tasks={tasks}
            setTasks={setTasks}
            dependencies={dependencies}
            setDependencies={setDependencies}
            zoom={zoom}
            statusThemes={statusThemes}
            onCreateTask={() => setIsCreateOpen(true)}
          />
        )}

        {viewMode === "month" && (
          <MonthGanttView
            tasks={tasks}
            setTasks={setTasks}
            dependencies={dependencies}
            setDependencies={setDependencies}
            zoom={zoom}
            statusThemes={statusThemes}
            onCreateTask={() => setIsCreateOpen(true)}
          />
        )}
      </div>

      <Backlog isOpen={isBacklogOpen} onClose={() => setIsBacklogOpen(false)} />
      <CustomizeView
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
      <CreateTask
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
