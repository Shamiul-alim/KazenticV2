"use client";
import Image from "next/image";
import mockData from "@/data/time-tracker/tracker-details.json";
import { Button } from "../ui/Button";
import { useState } from "react";
import TaskSection from "./floating-component/TaskSection";
import CustomizeSection from "./floating-component/CustomizeSetting";
import MemberDropdown from "./floating-component/MemberDropdown";
import Link from "next/link";

export default function AllTimeLogs() {
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [activeSettingId, setActiveSettingId] = useState<string | null>(null);

  const [menuConfig, setMenuConfig] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
  });
  const handleHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setMenuConfig({
      isOpen: true,
      x: e.clientX,
      y: e.clientY + 10,
    });
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const filteredMembers = mockData.allLogs.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const days = [
    "Sun, Dec 8",
    "Mon, Dec 9",
    "Tue, Dec 10",
    "Wed, Dec 11",
    "Thu, Dec 13",
    "Fri, Dec 14",
    "Sat, Dec 15",
  ];

  const HourCell = ({
    hour,
    isTotal = false,
  }: {
    hour: string;
    isTotal?: boolean;
  }) => {
    const maxHours = 9;
    const numericHour =
      hour !== "-" ? parseInt(hour.replace("h", ""), 10) : null;

    const percentage = isTotal
      ? 100
      : numericHour !== null && numericHour > 0
        ? Math.min((numericHour / maxHours) * 100, 100)
        : 0;

    const barColor =
      (numericHour !== null && numericHour >= 8) || isTotal
        ? "bg-[#22C55E]"
        : "bg-[#F87171]";

    return (
      <td
        className={`relative px-3 py-2 text-center border-l border-[#EBEBEB] ${hour === "-" ? "bg-[#F3F4F6]" : "bg-white"}`}
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#E4E4E4]">
          {numericHour !== null && numericHour > 0 && (
            <div
              className={`h-full ${barColor} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          )}
          {isTotal && <div className={` ${barColor} w-full`} />}
        </div>
        <span className="text-[11px] font-medium text-[#191F38]">{hour}</span>
      </td>
    );
  };

  return (
    <div className="space-y-3 leading-5 tracking-[-0.05em] text-[#191F38] w-full">
      {/* Action Toolbar */}
      <div className="flex items-center justify-between border-b border-[#EBEBEB] text-[#697588] px-4 py-1">
        <Button variant="outline">
          <Image
            src="/assets/dollar.svg"
            alt="payable"
            width={14}
            height={14}
          />
          Payable
        </Button>

        <div className="flex items-center gap-2 relative">
          <Button
            variant="outline"
            onClick={() => setIsMembersOpen(!isMembersOpen)}
            className={isMembersOpen ? "border-[#4157FE] text-[#4157FE]" : ""}
          >
            All members
            <Image
              src="/assets/arrow-down.svg"
              alt="payable"
              width={14}
              height={14}
              className={`transition-transform duration-200 ${isMembersOpen ? "rotate-180 brightness-75" : ""}`}
            />
          </Button>
          {isMembersOpen && (
            <MemberDropdown
              onClose={() => setIsMembersOpen(false)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredMembers={filteredMembers}
              selectedMembers={selectedMembers}
              toggleMember={toggleMember}
            />
          )}
        </div>
      </div>

      <div className="border border-[#E2E8F0] rounded-md  mx-4">
        <TaskSection
          isOpen={menuConfig.isOpen}
          onClose={() => setMenuConfig({ ...menuConfig, isOpen: false })}
          anchorPoint={{ x: menuConfig.x, y: menuConfig.y }}
        />
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
              <th
                onClick={handleHeaderClick}
                className="px-3 py-2 w-125 cursor-pointer"
              >
                People
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="text-center border-l border-[#E2E8F0] font-semibold"
                >
                  {day}
                </th>
              ))}
              <th className="text-center border-l border-[#E2E8F0]  font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.allLogs.map((person) => (
              <tr key={person.id} className="border-b group transition-colors ">
                <td className="px-3 py-2 flex items-center justify-between  relative">
                  <Link
                    href={`/time-tracker/${person.id}`}
                    className="flex items-center gap-1.5 hover:opacity-80
                    transition-opacity flex-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#4157FE] flex items-center justify-center text-white text-[10px] font-bold">
                        {person.initials}
                      </div>
                      <div className="flex items-center gap-3 font-medium text-[11px] leading-4">
                        <span className=" text-[#191F38]">{person.name}</span>
                        <span className="text-[#9BA2AD]">
                          ({person.capacity})
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    className={`transition-colors  ${activeSettingId === person.id ? "text-[#4157FE]" : "text-[#94A3B8] hover:text-[#4157FE]"}`}
                    onClick={() =>
                      setActiveSettingId(
                        activeSettingId === person.id ? null : person.id,
                      )
                    }
                  >
                    <Image
                      src="/assets/settings.svg"
                      alt="settings"
                      width={14}
                      height={14}
                      className={
                        activeSettingId === person.id
                          ? "opacity-100"
                          : "opacity-50"
                      }
                    />
                  </button>
                  {activeSettingId === person.id && (
                    <CustomizeSection
                      onClose={() => setActiveSettingId(null)}
                    />
                  )}
                </td>

                {person.weeklyHours.map((hour, i) => (
                  <HourCell key={i} hour={hour} />
                ))}

                <HourCell hour={person.total} isTotal />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
