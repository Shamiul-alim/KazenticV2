"use client";
import Image from "next/image";
import entriesData from "@/data/time-tracker/time-log-entries.json";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

interface TimeLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TimeLogDrawer({ isOpen, onClose }: TimeLogDrawerProps) {
  if (!isOpen) return null;
  const router = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<string | number | null>(
    null,
  );
  const toggleMenu = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Drawer Content */}
      <div className="relative w-95 h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pl-3 pr-4 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <Image
                src="/assets/arrow-left.svg"
                alt="back"
                width={20}
                height={20}
              />
            </button>
            <h2 className="text-sm font-semibold text-[#191F38] tracking-[-0.05em] leading-normal">
              Time Logs Sent For Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#DBE9FF] text-[#4157FE] hover:bg-blue-200 transition-colors"
          >
            <Image src="/assets/cross.svg" alt="" width={10} height={10} />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto pl-4 px-2 py-2  space-y-4 ">
          {entriesData.map((entry) => (
            <Link
              href={`/time-tracker/logview/${entry.id}`}
              key={entry.id}
              className="block"
            >
              <div className=" border border-[#EBEBEB] bg-[#FDFDFD] rounded-lg py-2 pr-2 pl-5 relative group hover:border-[#4157FE] transition-colors cursor-pointer mt-3 ">
                {/* Left Blue Accent Bar */}
                <div className="absolute left-2 top-3 bottom-3 w-0.75 bg-[#4157FE] rounded-r-full" />

                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-[#191F38] leading-5 tracking-[-0.05em]">
                      {entry.duration}
                    </h3>
                    <p className="text-[11px] text-[#697588] font-medium leading-3.5 tracking-[-0.05em]">
                      {entry.dateRange}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Button variant="pending" size="sm">
                      <Image
                        src="/assets/clock-red.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                      {entry.status}
                    </Button>
                    <Button variant="transparent">
                      <Image
                        src="/assets/3dot.svg"
                        alt="more"
                        width={20}
                        height={20}
                        onClick={(e) => toggleMenu(e, entry.id)}
                      />
                    </Button>
                    {activeMenuId === entry.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                          }}
                        />
                        <div className="absolute right-0 top-10 w-46 z-100 bg-white border border-[#EBEBEB] rounded-lg shadow-xl  animate-in fade-in zoom-in-95 duration-100 text-xs font-medium tracking-tight leading-5 text-[#697588]">
                          <button className="group/3dot w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#F2F9FE]  hover:text-[#4157FE] transition-colors rounded-tl-lg rounded-tr-lg">
                            <div className="flex items-center gap-3">
                              <div className="relative w-4 h-4">
                                <Image
                                  src="/assets/export.svg"
                                  alt=""
                                  fill
                                  className="opacity-100 group-hover/3dot:opacity-0 transition-opacity"
                                />
                                <Image
                                  src="/assets/export-blue.svg"
                                  alt=""
                                  fill
                                  className="opacity-0 group-hover/3dot:opacity-100 transition-opacity"
                                />
                              </div>
                              <span className="">Open</span>
                            </div>
                            <Check size={16} />
                          </button>

                          <button className="group/3dot w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F9FE]  hover:text-[#4157FE] transition-colors">
                            <div className="relative w-4 h-4">
                              <Image
                                src="/assets/link.svg"
                                alt=""
                                fill
                                className="opacity-100 group-hover/3dot:opacity-0 transition-opacity"
                              />
                              <Image
                                src="/assets/link-blue.svg"
                                alt=""
                                fill
                                className="opacity-0 group-hover/3dot:opacity-100 transition-opacity"
                              />
                            </div>
                            <span className="">Copy Url</span>
                          </button>

                          <button className="group/3dot w-full flex items-center gap-3 px-4 py-2.5 border-t border-[#EBEBEB] hover:bg-[#F2F9FE]  hover:text-[#4157FE] transition-colors">
                            <div className="relative w-4 h-4">
                              <Image
                                src="/assets/redo.svg"
                                alt=""
                                fill
                                className="opacity-100 group-hover/3dot:opacity-0 transition-opacity"
                              />
                              <Image
                                src="/assets/redo-blue.svg"
                                alt=""
                                fill
                                className="opacity-0 group-hover/3dot:opacity-100 transition-opacity"
                              />
                            </div>
                            <span className="">Change Date</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Submitter Info */}
                <div className="mt-2 flex items-center gap-2  pt-1 border-t-1 border-[#EBEBEB]">
                  <span className="text-[11px] text-[#697588] tracking-[-0.05em]">
                    Submitted by :
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#4157FE] flex items-center justify-center text-[8px] text-white font-semibold">
                      AH
                    </div>
                    <span className="text-[11px] font-bold leading-3.5 text-[#697588] tracking-[-0.05em]">
                      {entry.userName} · {entry.submittedAt}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
