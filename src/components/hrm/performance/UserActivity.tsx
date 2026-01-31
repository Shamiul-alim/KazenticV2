import React from "react";
import {

  Monitor,
  Globe,
  MapPin,

  ChevronDown,

  Activity,

} from "lucide-react";
import data from "@/data/hrm/perfomance/userActivityData.json";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { GroupActionMenu } from "./component/GroupActionMenu";
import { DropdownMenuItem } from "@/components/sprint-overview/ui/dropdown-menu";

const UserActivity: React.FC = () => {
  const { user, metrics, activities } = data;

  return (
    <div className="bg-[#FFFFFF] min-h-screen border-t border-[#EBEBEB]">
      {/* Top Header Controls */}
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

      <div className="flex gap-6 items-start p-4">
        {/* Sidebar Profile Card */}
        <div className="w-[250px] bg-[#FDFDFD] border border-[#EBEBEB] rounded-md p-4">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative ">
              <Image src="/assets/avatar.svg" alt="" width={130} height={130} />
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold tracking-tight mt-[-18]">
              {user.name}
            </h2>
            <p className="text-[#697588] text-sm">{user.email}</p>

            <div className="flex gap-3 mt-4">
              <Button variant="outline">
                <Image src="/assets/call.svg" alt="" width={16} height={16} />
              </Button>
              <Button variant="outline">
                <Image src="/assets/sms.svg" alt="" width={16} height={16} />
              </Button>
              <Button variant="outline">
                <Image
                  src="/assets/messages-2.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </Button>
            </div>
          </div>

          <div className="space-y-6 border-t border-[#EBEBEB] pt-4">
            <InfoRow
              label="Status"
              icon={
                <Image
                  src="/assets/status-black.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={<Button variant="active">ONLINE</Button>}
            />
            <InfoRow
              label="Role"
              icon={
                <Image
                  src="/assets/briefcase-black.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.role}
            />
            <InfoRow
              label="Session"
              icon={
                <Image
                  src="/assets/clock-black.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.session}
            />
            <InfoRow
              label="Operating Software (OS)"
              icon={
                <Image
                  src="/assets/monitor.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.os}
            />
            <InfoRow
              label="Browser"
              icon={
                <Image
                  src="/assets/global-black.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.browser}
            />
            <InfoRow
              label="IP Address"
              icon={
                <Image
                  src="/assets/discover.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.ip}
            />
            <InfoRow
              label="Address"
              icon={
                <Image
                  src="/assets/location-black.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              }
              value={user.address}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="border border-[#EBEBEB] p-3 rounded-md flex items-center gap-2 bg-[#FDFDFD]"
              >
                <div className="p-1.5 bg-blue-50 text-blue-600 border border-[#4157FEB2] rounded-md">
                  {m.type === "time" && (
                    <Image
                      src="/assets/clock-blue.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  {m.type === "logins" && (
                    <Image
                      src="/assets/login-blue.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  {m.type === "days" && (
                    <Image
                      src="/assets/calendar-blue.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  {m.type === "score" && (
                    <Image
                      src="/assets/activity-blue.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold">{m.label}</p>
                  <p className="text-[#697588] text-xs mt-0.5">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Timeline Container */}
          <div className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-md px-6 py-3.5">
            <h3 className="text-base font-bold mb-6">Activity Timeline</h3>
            <div className="space-y-4">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="relative bg-[#FFFFFF] border border-[#EBEBEB] rounded-md p-2 flex justify-between items-start group"
                >
                  {/* Left blue accent border */}
                  <div className="absolute  top-2 bottom-2  w-0.5 bg-[#4157FE] "></div>

                  <div className="flex gap-4 ml-2">
                    <div className="p-2 w-10 h-10 bg-blue-50 rounded-full text-[#4157FE] flex justify-center items-center">
                      {act.type === "login" && (
                        <Image
                          src="/assets/login-blue.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                      {act.type === "file" && (
                        <Image
                          src="/assets/document-blue.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                      {act.type === "settings" && (
                        <Image
                          src="/assets/setting-blue.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-[#191F38]">
                        {act.title}
                      </h4>
                      <p className="text-[#697588] text-[11px] mb-3">
                        {act.desc}
                      </p>

                      {/* Timeline Metadata Row */}
                      <div className="flex items-center gap-4 text-[#697588] text-[11px] font-medium">
                        <span className="flex items-center gap-1.5">
                          <Monitor size={12} /> Mac OS
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Globe size={12} /> Brave Browser
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} /> {user.address}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Activity size={12} /> {user.ip}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[#697588] text-xs pt-1">
                    {act.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SidebarIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="p-2 border border-blue-100 text-blue-600 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
    {icon}
  </div>
);

const InfoRow = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
}) => (
  <div className="space-y-1.5 flex flex-col">
    <div className="flex items-center gap-1 text-[#191F38] font-semiboold text-xs">
      {icon}
      {label}
    </div>
    <div className="text-[#697588] text-[11px]">{value}</div>
  </div>
);

export default UserActivity;
