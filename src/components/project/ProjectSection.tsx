"use client";
import { useState } from "react";
import ProjectStatus from "@/data/projectstatus.json";
import { Folder } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";
import CreateForm from "./CreateForm";

const ProjectSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  const rowData = Array(5).fill({
    name: "Kazentic",
    type: "Type",
    start: "1 Aug 2025",
    end: "1 Aug 2025",
    progress: "70",
    days: "23 days",
  });

  return (
    <div className="w-full h-lvw bg-[#FFFFFF] text-[#191F38]">
      <div className="flex items-center h-[2.188rem] border-b border-[#EBEBEB] bg-[#FFFFFF] justify-between mb-5 pl-4.75 pr-4.75 ">
        <Button variant="outline">
          <Image
            src="/assets/Group.svg"
            alt="group"
            width={12}
            height={12}
            className=""
          />
          Group by : Status
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Image
              src="/assets/customization.svg"
              alt="group"
              width={12}
              height={12}
              className=""
            />{" "}
            Customize
          </Button>
          <Button variant="outline">
            <Image
              src="/assets/filter.svg"
              alt="group"
              width={12}
              height={12}
              className=""
            />{" "}
            Filter
          </Button>
          <div className="flex items-center  bg-[#FDFDFD] border border-[#EBEBEB] rounded-md text-xs leading-3 tracking-tighter font-medium text-[#697588]">
            <button
              className={`cursor-pointer px-1.5 py-1 border-r rounded-tl-md rounded-bl-md border-[#EBEBEB] transition-colors ${viewMode === "grid" ? "bg-[#F2F9FE]" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Image
                src={`/assets/${viewMode === "grid" ? "grid-blue" : "grid"}.svg`}
                alt="group"
                width={12}
                height={12}
                className=""
              />
            </button>
            <button
              className={`cursor-pointer px-1.5 py-1.5 rounded-tr-md rounded-br-md transition-colors ${viewMode === "list" ? "bg-[#F2F9FE]" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <Image
                src={`/assets/${viewMode === "list" ? "list-blue" : "list"}.svg`}
                alt="group"
                width={12}
                height={12}
                className=""
              />
            </button>
          </div>
          <Button
            variant="sucess"
            // onClick={(e) => {
            //   toggleForm();
            // }}
          >
            <Image
              src="/assets/plus.svg"
              alt="group"
              width={16}
              height={16}
              className=""
            />{" "}
            Create Project
          </Button>
          {isFormVisible && <CreateForm onClose={toggleForm} />}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 mb-6 pl-4.75 pr-4.75">
        {ProjectStatus.map((e) => {
          return (
            <div
              className="flex items-center gap-3 p-3 bg-[#FDFDFD] border border-gray-100 rounded-xl w-53.75 h-16 cursor-pointer"
              key={e.id}
            >
              <div className="p-2.5 bg-[#F2F9FE] rounded-lg border border-[#4157FEB2] text-[#4157FE]">
                <Folder size={20} />
              </div>
              <div>
                <p className="text-xs leading-5 tracking-tighter font-semibold text-[#191F38]">
                  {e.status}
                </p>
                <p className="text-xs leading-5 tracking-tighter text-[#697588] font-medium">
                  {e.number}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Group */}
      <div className="mb-2 pl-4.75 pr-4.75">
        <div className="flex  justify-between  mb-3">
          <div className="flex gap-1.5 items-center ">
            <Image
              src="/assets/arrow-down.svg"
              alt="group"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Button variant="active">
              <Image
                src="/assets/charm_tick.svg"
                alt="group"
                width={14}
                height={14}
                className=""
              />{" "}
              ACTIVE
            </Button>
            <Button variant="active">4</Button>
          </div>
          {viewMode === "grid" && (
            <div className="flex gap-1">
              <button>
                <Image
                  src="/assets/arrow-circle-left.svg"
                  width={20}
                  height={20}
                  alt="prev"
                />
              </button>
              <button>
                <Image
                  src="/assets/arrow-circle-right.svg"
                  width={20}
                  height={20}
                  alt="next"
                />
              </button>
            </div>
          )}
        </div>

        {/* Table Container */}
        {viewMode === "list" ? (
          <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
            <div className="grid grid-cols-[45px_440px_100px_120px_120px_100px_100px_100px_80px] bg-[#F2F9FE] border-b border-[#EBEBEB] text-[11px] font-semibold text-[#191F38]  tracking-tighter leading-3.5 py-2.5 px-4">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-[#EBEBEB]"
              />
              <div className="flex items-center gap-1.5">
                Project Name
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Type
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Start Date
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                End Date
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Status
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Progress
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Days Left
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
              <div className="flex items-center gap-1.5">
                Action
                <Image
                  src="/assets/up-down.svg"
                  alt="group"
                  width={7}
                  height={5}
                  className=""
                />
              </div>
            </div>

            {rowData.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[45px_440px_100px_120px_120px_100px_100px_100px_80px] items-center py-2.5 px-4 border-b border-[#EBEBEB] last:border-0 text-[12px] tracking-tighter leading-3.5 hover:bg-gray-50 transition-colors font-medium text-[#191F38] cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-md border-[#EBEBEB]"
                />
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/K-fill.svg"
                    alt="group"
                    width={20}
                    height={20}
                    className=""
                  />
                  <span>{row.name}</span>
                </div>
                <div>
                  <Button variant="type" size="sm">
                    Type
                  </Button>
                </div>
                <div>{row.start}</div>
                <div>{row.end}</div>
                <div>
                  <Button variant="active">
                    <Image
                      src="/assets/charm_tick.svg"
                      alt="group"
                      width={14}
                      height={14}
                      className=""
                    />
                    ACTIVE
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#191F38]">
                  <Image
                    src="/assets/progress.svg"
                    alt="group"
                    width={14}
                    height={14}
                    className=""
                  />
                  <span className="font-semibold">{row.progress}%</span>
                </div>
                <div className="">{row.days}</div>
                <button>
                  <Image
                    src="/assets/3dot.svg"
                    alt="group"
                    width={22}
                    height={22}
                    className=""
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {rowData.map((row, i) => (
              <div
                key={i}
                className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-xl w-53.75 h-42.25 p-3 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/assets/K-fill.svg"
                        alt="group"
                        width={20}
                        height={20}
                      />
                      <span className="font-semibold text-xs leading-5 tracking-tighter text-[#191F38]">
                        {row.name}
                      </span>
                    </div>
                    {i === 1 && (
                      <Image
                        src="/assets/lock.svg"
                        width={12}
                        height={12}
                        alt="private"
                      />
                    )}
                  </div>
                  <button className="text-gray-400">
                    <Image
                      src="/assets/3dot.svg"
                      alt="group"
                      width={22}
                      height={22}
                    />
                  </button>
                </div>

                <div className="flex justify-between mb-2 pr-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-[#697588] leading-4 tracking-tighter">
                      Status
                    </span>

                    <Button variant="active">
                      <Image
                        src="/assets/charm_tick.svg"
                        alt="group"
                        width={14}
                        height={14}
                        className=""
                      />
                      ACTIVE
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-[#697588] leading-4 tracking-tighter">
                      Project Type
                    </span>
                    <Button variant="type" size="sm">
                      Type
                    </Button>
                  </div>
                </div>

                <div className="mt-3 mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="w-full bg-[#E5EDFF] rounded-full h-2 mr-2">
                      <div
                        className="bg-[#4157FE] h-2 rounded-full"
                        style={{ width: `${row.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[12px] font-medium text-[#697588] leading-5 tracking-tighter">
                      {row.progress}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center pt-1 border-t-2 border-[#F5F5F5]">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((u) => (
                      <div
                        key={u}
                        className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${u + 10}`}
                          alt="user"
                        />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-[#F2F9FE] flex items-center justify-center text-[#4157FE] text-[10px] font-bold">
                      +5
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full pl-4.75 pr-4.75">
        <div className=" w-full h-[0.1rem] bg-[#EBEBEB]  mt-6 mb-2"></div>
      </div>

      {/* Inactive Section - Collapsed as per image */}
      <div className="flex items-center gap-1 mt-6  pl-4.75 pr-4.75">
        <Image
          src="/assets/arrow-down-fill.svg"
          alt="group"
          width={22}
          height={22}
          className="cursor-pointer"
        />
        <Button variant="inactive">
          <Image
            src="/assets/info-circle.svg"
            alt="group"
            width={14}
            height={14}
            className=""
          />
          INACTIVE
        </Button>
        <Button variant="inactive">4</Button>
      </div>
    </div>
  );
};

export default ProjectSection;
