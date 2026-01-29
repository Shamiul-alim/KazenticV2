"use client";
import { useState } from "react";
import Image from "next/image";
import mockData from "@/data/tracker-details.json";
import { Button } from "../ui/Button";

export default function ReviewRequests() {
  const [openSections, setOpenSections] = useState({
    review: true,
    changes: true,
    approved: true,
  });

  const data = mockData.reviewRequests;

  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="w-full bg-white font-sans px-1 py-2 leading-5 tracking-[-0.05em]">
      <div
        className="flex items-center gap-2 px-4 mt-1 cursor-pointer select-none"
        onClick={() => toggle("review")}
      >
        <Image
          src="/assets/arrow-down.svg"
          alt=""
          width={16}
          height={16}
          className={` transition-transform ${!openSections.review ? "-rotate-90" : ""}`}
        />
        <Button variant="type" className="flex gap-1">
          <Image
            src="/assets/search-status.svg"
            alt=""
            width={16}
            height={16}
          />
          To Review
        </Button>
        <Button variant="type">
          {mockData.reviewRequests.toReview.length}
        </Button>
      </div>

      {openSections.review && (
        <div className="border border-[#E2E8F0] rounded-md overflow-hidden mx-4 mt-3 ">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                <th className="w-12 px-4  text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#6975886E] accent-[#4157FE]"
                  />
                </th>
                <th className="text-left pb-1 font-semibold w-[40%]">
                  Details
                </th>
                <th className="text-left  font-semibold">Duration</th>
                <th className="text-left font-semibold">Limit</th>
                <th className="text-left font-semibold">Payable</th>
                <th className="text-left font-semibold">Over Limit</th>
                <th className="text-left py-2 font-semibold pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.toReview.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-[#EBEBEB] last:border-0 hover:bg-[#F8FAFC] transition-colors group"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#EBEBEB] accent-[#4157FE]"
                    />
                  </td>
                  <td className=" pr-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[11px] font-semibold">
                          {item.initials}
                        </div>
                        <span className="text-[11px] font-medium text-[#191F38] whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] leading-4 text-[#9BA2AD] font-medium whitespace-nowrap">
                          {item.date}
                        </span>
                        <Button variant="success" size="md">
                          Review{" "}
                          <Image
                            src="/assets/sidearrow.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.duration}
                    </div>
                  </td>
                  <td className="">
                    <span className="bg-[#C4FFE2] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.limit}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFE4B6] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.payable}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFD1CC] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.overLimit}
                    </span>
                  </td>
                  <td className=" pr-6">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="md">
                        <Image
                          src="/assets/sidearrow-red.svg"
                          alt=""
                          width={12}
                          height={12}
                        />
                      </Button>
                      <Button variant="outline">
                        <Image
                          src="/assets/tick-circle-green.svg"
                          alt="down"
                          width={16}
                          height={16}
                        />{" "}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        className="flex items-center gap-2 px-4 mt-3 cursor-pointer select-none"
        onClick={() => toggle("changes")}
      >
        <Image
          src="/assets/arrow-down.svg"
          alt=""
          width={16}
          height={16}
          className={` transition-transform ${!openSections.changes ? "-rotate-90" : ""}`}
        />
        <Button variant="pending" className="flex gap-1">
          <Image src="/assets/setting-red.svg" alt="" width={16} height={16} />
          Changes Required
        </Button>
        <Button variant="pending">
          {mockData.reviewRequests.changesRequired.length}
        </Button>
      </div>

      {openSections.changes && (
        <div className="border border-[#E2E8F0] rounded-md overflow-hidden mx-4 mt-3 ">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                <th className="w-12 px-4  text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#6975886E] accent-[#4157FE]"
                  />
                </th>
                <th className="text-left pb-1 font-semibold w-[40%]">
                  Details
                </th>
                <th className="text-left  font-semibold">Duration</th>
                <th className="text-left font-semibold">Limit</th>
                <th className="text-left font-semibold">Payable</th>
                <th className="text-left font-semibold">Over Limit</th>
                <th className="text-left py-2 font-semibold pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.changesRequired.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-[#EBEBEB] last:border-0 hover:bg-[#F8FAFC] transition-colors group"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#EBEBEB] accent-[#4157FE]"
                    />
                  </td>
                  <td className=" pr-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[11px] font-semibold">
                          {item.initials}
                        </div>
                        <span className="text-[11px] font-medium text-[#191F38] whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] leading-4 text-[#9BA2AD] font-medium whitespace-nowrap">
                          {item.date}
                        </span>
                        <Button variant="success" size="md">
                          Review{" "}
                          <Image
                            src="/assets/sidearrow.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.duration}
                    </div>
                  </td>
                  <td className="">
                    <span className="bg-[#C4FFE2] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.limit}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFE4B6] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.payable}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFD1CC] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.overLimit}
                    </span>
                  </td>
                  <td className=" pr-6">
                    <Button variant="pending" className="flex gap-1">
                      <Image
                        src="/assets/setting-red.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      Changes Required
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        className="flex items-center gap-2 px-4 mt-3 cursor-pointer select-none"
        onClick={() => toggle("approved")}
      >
        <Image
          src="/assets/arrow-down.svg"
          alt=""
          width={16}
          height={16}
          className={` transition-transform ${!openSections.approved ? "-rotate-90" : ""}`}
        />
        <Button variant="active" size="md" className="flex gap-1">
          <Image src="/assets/charm_tick.svg" alt="" width={16} height={16} />
          Approved
        </Button>
        <Button variant="active" size="md">
          {mockData.reviewRequests.approved.length}
        </Button>
      </div>

      {openSections.approved && (
        <div className="border border-[#E2E8F0] rounded-md overflow-hidden mx-4 mt-3 ">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#F2F9FE] border-b text-[#191F38] font-semibold">
                <th className="w-12 px-4  text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#6975886E] accent-[#4157FE]"
                  />
                </th>
                <th className="text-left pb-1 font-semibold w-[40%]">
                  Details
                </th>
                <th className="text-left  font-semibold">Duration</th>
                <th className="text-left font-semibold">Limit</th>
                <th className="text-left font-semibold">Payable</th>
                <th className="text-left font-semibold">Over Limit</th>
                <th className="text-left py-2 font-semibold pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.approved.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-[#EBEBEB] last:border-0 hover:bg-[#F8FAFC] transition-colors group"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#EBEBEB] accent-[#4157FE]"
                    />
                  </td>
                  <td className=" pr-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[11px] font-semibold">
                          {item.initials}
                        </div>
                        <span className="text-[11px] font-medium text-[#191F38] whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] leading-4 text-[#9BA2AD] font-medium whitespace-nowrap">
                          {item.date}
                        </span>
                        <Button variant="success" size="md">
                          Review{" "}
                          <Image
                            src="/assets/sidearrow.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="bg-[#DBE9FF] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.duration}
                    </div>
                  </td>
                  <td className="">
                    <span className="bg-[#C4FFE2] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.limit}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFE4B6] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.payable}
                    </span>
                  </td>
                  <td className="">
                    <span className="bg-[#FFD1CC] w-25.75 h-6.5 text-[#191F38] flex justify-center items-center text-center rounded-sm font-medium text-xs">
                      {item.overLimit}
                    </span>
                  </td>
                  <td className=" pr-6">
                    <Button variant="active" size="md" className="flex gap-1">
                      <Image
                        src="/assets/tick-circle-green.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      Changes Required
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
