import React from "react";
import {
  ChevronDown,
  Filter,
  Clock,
  Hourglass,
  CheckCircle,
  Calendar,
  ChevronsUpDown,
  CircleCheck,
} from "lucide-react";
import attendanceData from "@/data/hrm/perfomance/attendance_data.json";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { GroupActionMenu } from "./component/GroupActionMenu";
import { DropdownMenuItem } from "@/components/sprint-overview/ui/dropdown-menu";

const UserAttendance: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen border-t border-[#EBEBEB]">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center py-1  border-b border-[#EBEBEB] px-4">
        <GroupActionMenu
          trigger={
            <Button variant="outline">
              Export <ChevronDown size={14} />
            </Button>
          }
        >
          {/* Basic Items */}
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
            <Image
              src="/assets/task-square.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="text-sm font-medium">CSV</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
            <Image
              src="/assets/task-square.svg"
              alt=""
              width={16}
              height={16}
            />

            <span className="text-sm font-medium">PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-[#F5F7FF] text-[#4F5B76] outline-none">
            <Image
              src="/assets/task-square.svg"
              alt=""
              width={16}
              height={16}
            />

            <span className="text-sm font-medium">ZIP</span>
          </DropdownMenuItem>
        </GroupActionMenu>
        <FilterPopover />
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-5 gap-4 mb-7 mt-4 mx-4">
        {attendanceData.metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-[#FDFDFD] border border-[#EBEBEB] p-3 rounded-md flex items-center gap-2"
          >
            <div className="p-1.5 bg-blue-50 text-blue-600 border border-[#4157FEB2] rounded-md">
              {metric.type === "total" && (
                <Image
                  src="/assets/clock-blue.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              )}
              {metric.type === "avg" && (
                <Image
                  src="/assets/timer-blue.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              )}
              {metric.type === "active" && (
                <Image
                  src="/assets/tick-circle-blue.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              )}
              {metric.type === "late" && (
                <Image
                  src="/assets/calendar-blue.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div>
              <p className="text-[#191F38] text-xs font-bold leading-tight">
                {metric.label}
              </p>
              <p className="text-[#697588] text-xs mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="px-4">
        <h3 className="text-sm font-semibold mb-2">Attendance Summary</h3>

        <div className="overflow-hidden border border-[#EBEBEB] rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F2F9FE] border-b border-[#EBEBEB]">
              <tr>
                <HeaderCell label="Employee Name" />
                <HeaderCell label="Task Worked" />
                <HeaderCell label="Date" />
                <HeaderCell label="Sign In" />
                <HeaderCell label="Sign Out" />
                <HeaderCell label="Duration" />
                <HeaderCell label="Status" />
                <HeaderCell label="Reason" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {attendanceData.records.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#EBEBEB] last:border-b-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#4157FE] text-white rounded-full flex items-center justify-center text-[11px] font-bold">
                        P
                      </div>
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-xs text-[#191F38]">{row.tasks}</td>
                  <td className="p-3 text-xs text-[#191F38]">{row.date}</td>
                  <td className="p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      {row.signIn}
                    </div>
                  </td>
                  <td className="p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-rose-500 rounded-full" />
                      {row.signOut}
                    </div>
                  </td>
                  <td className="p-3 text-xs text-[#191F38]">{row.duration}</td>
                  <td className="p-3">
                    <Button variant="active" size="md">
                      <Image
                        src="/assets/tick-circle-green.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      PRESENT
                    </Button>
                  </td>
                  <td className="p-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#FFF7ED] border border-[#FF9F0080] text-[#FF9F00] text-[11px] font-bold">
                      <Image
                        src="/assets/prayer.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      Prayer Break
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Header Cells to reduce repetition
const HeaderCell = ({ label }: { label: string }) => (
  <th className="p-3 text-[11px] leading-3.5 font-bold text-[#191F38] tracking-tight whitespace-nowrap">
    <div className="flex items-center gap-1 cursor-pointer">
      {label} <ChevronsUpDown size={12} className="text-slate-400" />
    </div>
  </th>
);

export default UserAttendance;
