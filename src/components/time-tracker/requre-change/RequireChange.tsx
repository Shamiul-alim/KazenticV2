"use client";
import Image from "next/image";
import { Button } from "../../ui/Button";
import mockData from "@/data/time-tracker/tracker-details.json";
import { useRouter } from "next/navigation";

interface RequestChangeDetailViewProps {
  onBack: () => void;
}

export default function RequestChangeDetailView({
  onBack,
}: RequestChangeDetailViewProps) {
  const metrics = [
    {
      label: "Time Tracked",
      value: "36h 5m",
      total: "/ 40h",
      icon: "/assets/timer-blue.svg",
      color: "bg-[#F2F9FE]",
      border: "border-[#4157FEB2]",
    },
    {
      label: "Payable",
      value: "25h",
      icon: "/assets/dollar.svg",
      color: "bg-[#C4FFE2]",
      border: "border-[#178D6CB2]",
    },
    {
      label: "Non-Payable",
      value: "6h 5m",
      total: "/ 40h",
      icon: "/assets/dollar-cross.svg",
      color: "bg-[#F8FAFC]",
    },
    {
      label: "Approved At",
      value: "Thu, Jan 12, 2025 | 11:45 PM",
      icon: "/assets/tick-circle.svg",
      color: "bg-[#F8FAFC]",
    },
  ];
  const router = useRouter();
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
    router.back();
  };
  return (
    <div className="flex flex-col h-lvw bg-[#FFFFFF] ">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between px-3 bg-white  border-t border-[#EBEBEB] ">
        <div className="flex items-center gap-2 py-1 mt-2">
          <button
            onClick={handleBackClick}
            className="p-1 bg-[#F4F5F6] rounded-sm transition-colors"
          >
            <Image src="/assets/arrow-left.svg" alt="" width={16} height={16} />
          </button>

          <Button variant="outline" size="md">
            <div className="w-4.5 h-4.5 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[8px] font-medium">
              AH
            </div>
            <span className="text-xs font-medium leading-4 text-[#64748B]">
              Alif Hassan
            </span>
          </Button>
          <Button variant="outline">
            <Image
              src="/assets/calendar-normal.svg"
              alt="down"
              width={12}
              height={12}
            />

            <span className="text-xs ">Jan 7 - Jan 13,2025</span>
          </Button>

          <Button variant="pending" className="flex gap-1">
            <Image
              src="/assets/setting-red.svg"
              alt=""
              width={16}
              height={16}
            />
            Changes Required
          </Button>
        </div>
      </div>

      {/* 2. Metrics Grid */}
      <div className="px-3">
        <div className="flex justify-items-start gap-4 pt-3 border-t vorder">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-2 py-2 min-w-[242px]  bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg   cursor-pointer"
            >
              <div
                className={`w-10 h-10 shrink-0 rounded-sm ${m.color} flex items-center justify-center border ${m.border}`}
              >
                <Image src={m.icon} alt="" width={20} height={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#191F38] leading-5 tracking-tight">
                  {m.label}
                </span>
                <div className="flex items-baseline gap-1 text-xs font-medium leading-5 tracking-tight">
                  <span className="text-[#191F38] whitespace-nowrap">
                    {m.value}
                  </span>
                  {m.total && (
                    <span className=" text-[#697588] ">{m.total}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between  text-[#697588] px-4 mt-2">
        <Button variant="outline">
          <Image src="/assets/dollar.svg" alt="down" width={14} height={14} />{" "}
          Payable
        </Button>

        <div className="flex py-1.5">
          <button
            className={`flex items-center gap-1 px-1.5 py-1  border border-[#EBEBEB] rounded-tl-sm rounded-bl-sm text-xs leading-3 tracking-tighter font-medium  cursor-pointer "bg-[#F2F9FE] text-[#4157FE]`}
          >
            Time Entries
            <Image
              src="/assets/task-square-blue.svg"
              alt="down"
              width={14}
              height={14}
            />
          </button>

          <button
            className={`flex items-center gap-1 px-1.5 py-1  border border-[#EBEBEB] rounded-tr-sm rounded-br-sm text-xs leading-3 tracking-tighter font-medium  cursor-pointer  "bg-[#FDFDFD] text-[#697588]}`}
          >
            Time Sheet
            <Image src="/assets/grid-5.svg" alt="down" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-3 mx-4 leading-5 tracking-[-0.05em]">
        {mockData.timeEntries.map((group, idx) => (
          <div key={idx} className="">
            {/* Group Header */}
            <div className="  flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/arrow-down.svg"
                  alt=""
                  width={18}
                  height={18}
                  className={`transition-transform -rotate-90"`}
                />
                <Button variant="outline" size="md">
                  <Image
                    src="/assets/calendar-normal.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  {group.date}
                </Button>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium leading-4">
                <Button variant="outline" size="md">
                  <Image
                    src="/assets/timer.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                  <span className="text-[#DC2626] flex items-center gap-1">
                    {group.totalHours}
                  </span>
                  <span className="text-[#697588]">/ {group.limit}</span>
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#E2E8F0] rounded-md overflow-hidden  mt-3 ">
              <table className="w-full text-left text-[11px]">
                <thead className="w-full text-left border-collapse text-[11px]">
                  <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                    <th className="px-3 py-2 w-[35%]">Task</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2">Payable</th>
                    <th className="px-3 py-2">Tags</th>
                    <th className="px-3 py-2">Signed In</th>
                    <th className="px-3 py-2">Signed Out</th>
                    <th className="px-3 py-2">Duration</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {group.entries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-[#EBEBEB] hover:bg-slate-50"
                    >
                      <td className="px-3 py-2 text-[11px] leading-4 font-medium text-[#191F38]">
                        {entry.task}
                      </td>
                      <td className="px-3 py-2 text-[11px] leading-4 font-medium text-[#191F38]">
                        {entry.description}
                      </td>
                      <td className="px-3 py-2">
                        {entry.payable ? (
                          <Button variant="outline" size="md">
                            <Image
                              src="/assets/dollar-green.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </Button>
                        ) : (
                          <Button variant="outline" size="md">
                            <Image
                              src="/assets/dollar-cross.svg"
                              alt=""
                              width={12}
                              height={12}
                            />
                          </Button>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <span className="bg-[#F0E4FF] text-[#722BCC] px-2 py-0.5 rounded-sm border border-[#B187E5] text-[11px] font-medium leading-4">
                          {entry.tag}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="bg-[#C4FFE2] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                          {entry.signIn}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="bg-[#FFD1CC] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                          {entry.signOut}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                          {entry.duration}
                        </span>
                      </td>
                      <td className="px-3 py-2 gap-2 flex text-start">
                        <Image
                          src="/assets/clock-red.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                        <Image
                          src="/assets/3dot.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
