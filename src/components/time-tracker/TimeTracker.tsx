"use client";
import mockData from "@/data/tracker-details.json";
import { Button } from "../ui/Button";
import Image from "next/image";
import { useState } from "react";
import RequestForm from "./floating-component/RequestForm";

export default function TimeTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-3 leading-5 tracking-[-0.05em] text-[#191F38]">
      <div className="flex justify-between gap-2 py-1.5 px-4 border-b border-[#EBEBEB]">
        <Button variant="outline">
          <Image src="/assets/dollar.svg" alt="down" width={14} height={14} />{" "}
          Payable
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="success"
          size="md"
        >
          Send for Review
        </Button>
      </div>
      <RequestForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="space-y-3 px-4">
        {mockData.timeTracker.map((user) => (
          <div
            key={user.id}
            className={`border border-[#EBEBEB] ${user.isExpanded ? "bg-[#F2F9FE]" : "bg-[#FDFDFD]"} rounded-md transition-all ${user.isOutOfOffice ? "opacity-50" : "opacity-100"}`}
          >
            {/* User Row */}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex flex-row items-center gap-2">
                {user.isOutOfOffice && (
                  <div className="w-[0.13rem] bg-[#178D6C] self-stretch" />
                )}

                {!user.isOutOfOffice && (
                  <div className="w-[0.13rem] bg-[#722BCC] self-stretch" />
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center  gap-1.5">
                    <Image
                      src="/assets/profile.svg"
                      alt="Profile"
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                    <h4 className="font-semibold  text-xs ">{user.name}</h4>
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-0.5">
                        <p className="text-xs text-[#4157FE] font-medium">
                          {user.taskid}
                        </p>
                        <p className="text-xs text-[#697588] font-medium">
                          {user.task}
                        </p>
                      </div>
                      {user.status === "COMPLETED" && (
                        <Button variant="active">
                          <Image
                            src="/assets/charm_tick.svg"
                            alt="group"
                            width={14}
                            height={14}
                            className=""
                          />{" "}
                          COMPLETED
                        </Button>
                      )}
                      {user.status !== "COMPLETED" && (
                        <Button variant="progress" size="md">
                          <Image
                            src="/assets/flash.svg"
                            alt="down"
                            width={16}
                            height={16}
                            className="rotate-0"
                          />
                          IN PROGRESS
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {user.isOutOfOffice && (
                  <div className="flex items-center gap-2 text-[#4157FE] font-bold text-sm leading-4">
                    <Image
                      src="/assets/logout-blue.svg"
                      alt="down"
                      width={16}
                      height={16}
                    />{" "}
                    Out Of Office
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className=" bg-[#C4FFE2] rounded-sm text-start pl-2 pt-1 pb-1 pr-5 ">
                  <span className="text-[11px] text-[#059669] font-semibold ">
                    Signed in
                  </span>
                  <div className=" text-[#191F38]  text-xs font-medium mt-2">
                    {user.signIn}
                  </div>
                </div>
                <div className="bg-[#DBE9FF] rounded-sm text-start pl-2 pt-1 pb-1 pr-5 ">
                  <span className="text-[11px] text-[#4157FE] font-semibold">
                    Duration
                  </span>
                  <div className="text-[#191F38]  text-xs font-medium mt-2">
                    {user.duration}
                  </div>
                </div>
                <button className="text-[#64748B]">
                  {user.isExpanded ? (
                    <Image
                      src="/assets/arrow-circle-up.svg"
                      alt="down"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/assets/arrow-circle-down.svg"
                      alt="down"
                      width={20}
                      height={20}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Breakdown */}
            <div className="bg-[#F2F9FE] px-3 ">
              {user.isExpanded && user.breakdown && (
                <div className="border-t border-[#EBEBEBE] py-4">
                  <h5 className="font-semibold text-xs text-[#191F38] ">
                    Description
                  </h5>
                  <p className="text-xs text-[#697588] mb-3 leading-6 font-medium">
                    {user.description}
                  </p>

                  <h5 className="font-semibold text-xs text-[#191F38] mb-3">
                    Time Breakdown
                  </h5>
                  <div className="overflow-hidden overflow-y-auto hide-scrollbar rounded-md border border-[#EBEBEB] bg-[#FFFFFF]">
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead className="bg-white">
                        <tr className="text-[#191F38] border-b  font-medium text-[11px]">
                          <th className="px-1.5  ">Signed in</th>
                          <th className="px-4 ">Task Name</th>
                          <th className="px-4  text-center">Payable</th>
                          <th className="px-4 ">Signed out</th>
                          <th className="px-4 ">Duration</th>
                          <th className="px-4 ">Break</th>
                          <th className="px-4 py-2 ">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.breakdown.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b last:border-0 hover:bg-gray-50"
                          >
                            <td className="p-1.5">
                              <span className="bg-[#C4FFE2] px-6 py-1.5 text-[#191F38] rounded-sm font-medium text-xs">
                                {row.signedIn}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-[#4F46E5] font-medium">
                              <div className="flex gap-0.5">
                                <p className="text-xs text-[#4157FE] font-medium">
                                  {row.taskid}
                                </p>
                                <p className="text-xs text-[#191F38] font-medium">
                                  {row.task}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="flex justify-center">
                                {row.reason === "Prayer Break" ? (
                                  <span className="text-green-600 border border-green-100 rounded p-1">
                                    <Image
                                      src="/assets/dollar-green.svg"
                                      alt="down"
                                      width={18}
                                      height={18}
                                    />
                                  </span>
                                ) : (
                                  <span className="text-gray-300 border border-gray-100 rounded p-1 grayscale opacity-50">
                                    <Image
                                      src="/assets/dollar-cross.svg"
                                      alt="down"
                                      width={14}
                                      height={14}
                                    />
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-1.5">
                              <span className="bg-[#FFD1CC] px-6 py-1.5 text-[#191F38] rounded-sm font-medium text-xs">
                                {row.signedOut}
                              </span>
                            </td>
                            <td className="p-1.5">
                              <span className="bg-[#DBE9FF] px-6 py-1.5 text-[#191F38] rounded-sm font-medium text-xs">
                                {row.duration}
                              </span>
                            </td>
                            <td className="p-1.5">
                              <span className="bg-[#FFE4B6] px-6 py-1.5 text-[#191F38] rounded-sm font-medium text-xs">
                                {row.break}
                              </span>
                            </td>
                            <td className="p-1.5">
                              <div
                                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm font-bold text-[11px] w-fit
                            ${
                              row.reason === "Prayer Break"
                                ? "bg-[#FFFDF6] border border-[#FF9F0080] text-[#FF9F00]"
                                : row.reason === "Dinner Break"
                                  ? "bg-[#F4FFFB] border border-[#05966980] text-[#178D6C]"
                                  : "bg-[#EDEFFF] border border-[#4157FE80] text-[#4157FE]"
                            }`}
                              >
                                <Image
                                  src={`${row.icon}`}
                                  alt="down"
                                  width={14}
                                  height={14}
                                />
                                {row.reason.toUpperCase()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
