"use client";
import { useState } from "react";

import TimeTracker from "./TimeTracker";
import MyTimeLogs from "./MyTimeLogs";
import Image from "next/image";
import mockData from "@/data/time-tracker/tracker-details.json";
import { Button } from "../ui/Button";
import AllTimeLogs from "./AllTimeLogs";
import { ChevronDown } from "lucide-react";
import ReviewRequests from "./ReviewRequests";
import CustomizeSection from "./floating-component/CustomizeSection";
import MemberDropdown from "./floating-component/MemberDropdown";
import SelectAssign from "./floating-component/SelectAssign";
const tabs = mockData.header.tabs;

export default function Header() {
  const [activeTab, setActiveTab] = useState("Time Tracker");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const [isReviewMembersOpen, setIsReviewMembersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const filteredMembers = mockData.allLogs.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const toggleAssignee = (id: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] border-t border-[#EBEBEB]  text-[#475569] ">
      <div className="mx-auto bg-[#FFFFFF]  overflow-hidden">
        {/* Header Tabs */}
        <div className="flex items-center pr-3 h-[2.188rem] justify-between border-b border-[#EBEBEB] relative">
          <div className="flex ">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`h-[2.188rem] px-3 text-xs font-medium flex items-center gap-1.5 relative transition-colors ${
                    isActive ? "text-[#4157FE]" : "text-[#697588]"
                  }`}
                >
                  <Image
                    src={isActive ? tab.activeIcon : tab.icon}
                    alt={tab.label}
                    width={16}
                    height={16}
                  />

                  {tab.label}

                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4F46E5]" />
                  )}
                </button>
              );
            })}
          </div>
          {activeTab === "My Time Logs" && (
            <Button
              variant="outline"
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
            >
              <Image src="/assets/setting.svg" alt="" width={14} height={14} />
              Customize
            </Button>
          )}
          {isCustomizeOpen && (
            <CustomizeSection onClose={() => setIsCustomizeOpen(false)} />
          )}
          {activeTab === "Review Requests" && (
            <div className="flex items-center gap-2 relative">
              <Button variant="outline" size="md">
                This Week
              </Button>
              <Button
                onClick={() => setIsReviewMembersOpen(!isReviewMembersOpen)}
                className={
                  isReviewMembersOpen ? "border-[#4157FE] text-[#4157FE]" : ""
                }
                variant="outline"
                size="md"
              >
                Teams <ChevronDown size={12} />
              </Button>
              {isReviewMembersOpen && (
                <MemberDropdown
                  onClose={() => setIsReviewMembersOpen(false)}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredMembers={filteredMembers}
                  selectedMembers={selectedMembers}
                  toggleMember={toggleMember}
                />
              )}

              <Button
                onClick={() => setIsAssigneeOpen(true)}
                variant="outline"
                size="md"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[8px] font-medium">
                  AH
                </div>
                <span className="text-xs font-medium leading-4 text-[#64748B]">
                  Alif Hassan
                </span>
              </Button>
              {isAssigneeOpen && (
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
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-h-lvw">
          {activeTab === "Time Tracker" && <TimeTracker />}
          {activeTab === "My Time Logs" && <MyTimeLogs />}
          {activeTab === "All Time Logs" && <AllTimeLogs />}
          {activeTab === "Review Requests" && <ReviewRequests />}
        </div>
      </div>
    </div>
  );
}
