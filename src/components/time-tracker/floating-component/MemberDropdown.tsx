"use client";
import { Search } from "lucide-react";
import Image from "next/image";

export interface Person {
  id: string;
  name: string;
}

interface MemberDropdownProps {
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMembers: Person[];
  selectedMembers: string[];
  toggleMember: (id: string) => void;
}

export default function MemberDropdown({
  onClose,
  searchQuery,
  setSearchQuery,
  filteredMembers,
  selectedMembers,
  toggleMember,
}: MemberDropdownProps) {
  return (
    <>
      {/* Backdrop to close when clicking outside */}
      <div className="fixed inset-0 z-10" onClick={onClose} />

      <div className="absolute right-1 top-5 mt-2 w-64 bg-white border border-[#EBEBEB] shadow-xl rounded-lg z-20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="py-2 px-3 ">
          <div className="relative flex items-center bg-[#697588]/10 rounded-md px-3 py-2">
            <Search size={18} className="text-[#64748B] mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 bg-transparent outline-none text-[13px] w-full placeholder:text-[#94A3B8]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Member List */}
        <div className="max-h-40 overflow-y-auto hide-scrollbar">
          {filteredMembers.map((person) => (
            <button
              key={person.id}
              onClick={() => toggleMember(person.id)}
              className="group/member w-full flex items-center justify-between px-3 py-2 hover:bg-[#F2F9FE] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/profile.svg"
                  alt="profile"
                  width={23}
                  height={23}
                />
                <span
                  className={`text-[13px] font-medium tracking-[-0.03em] ${
                    selectedMembers.includes(person.id)
                      ? "text-[#4157FE]"
                      : "text-[#64748B]"
                  }`}
                >
                  {person.name}
                </span>
              </div>

              {/* Custom Checkbox UI */}
              <div
                className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                  selectedMembers.includes(person.id)
                    ? "bg-[#4157FE] border-[#4157FE]"
                    : "border-[#CBD5E1] group-hover/member:border-[#4157FE]"
                }`}
              >
                {selectedMembers.includes(person.id) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          ))}

          {filteredMembers.length === 0 && (
            <div className="px-4 py-8 text-center text-[#94A3B8] text-[12px]">
              No members found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
