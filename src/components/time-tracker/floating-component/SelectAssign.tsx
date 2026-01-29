"use client";
import Image from "next/image";
import { X, Search } from "lucide-react";

interface Person {
  id: string;
  name: string;
  count?: number;
  initials?: string;
}

interface SelectAssignProps {
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedMembers: string[];
  toggleMember: (id: string) => void;
  people: Person[];
}

export default function SelectAssign({
  onClose,
  searchQuery,
  setSearchQuery,
  selectedMembers,
  toggleMember,
  people,
}: SelectAssignProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 z-40 transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 ease-in-out px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <h2 className="text-md font-bold text-[#191F38] tracking-tight">
            Select Assignees
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#EEF2FF] text-[#4157FE] hover:bg-[#E0E7FF] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Bar */}
        <div className=" mt-5">
          <div className="relative flex items-center bg-[#F1F5F9] rounded-lg px-3 py-2.5">
            <Search size={18} className="text-[#64748B] mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-[14px] w-full placeholder:text-[#94A3B8] text-[#191F38]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {/* People Section */}
          <div className="mt-4">
            <h3 className="text-[12px] font-medium text-[#697588] ">
              People {people.length}
            </h3>

            <div className="">
              {people.map((person) => {
                const isSelected = selectedMembers.includes(person.id);
                return (
                  <button
                    key={person.id}
                    onClick={() => toggleMember(person.id)}
                    className={`w-full flex items-center justify-between  py-1.5 rounded-md transition-colors ${
                      isSelected ? "bg-[#F2F9FE]" : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar with image or initials */}
                      <div className="relative w-7 h-7">
                        <Image
                          src="/assets/profile.svg"
                          alt={person.name}
                          width={28}
                          height={28}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span
                        className={`text-[12px] font-medium tracking-tight ${
                          isSelected ? "text-[#4157FE]" : "text-[#697588]"
                        }`}
                      >
                        {person.name} {person.count ? `(${person.count})` : ""}
                      </span>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#4157FE] border-[#4157FE]"
                          : "border-[#CBD5E1]"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.5L3.5 7L9 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[#EBEBEB] my-2" />

          {/* Teams Section */}
          <div className="">
            <h3 className="text-[12px] font-medium text-[#94A3B8] ">Teams</h3>
            <button className="w-full flex items-center justify-between  py-2.5 rounded-md hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[10px] font-bold">
                  K
                </div>
                <span className="text-[13px] font-medium text-[#475569]">
                  Kazentic
                </span>
              </div>
              <div className="w-4 h-4 rounded border border-[#CBD5E1]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
