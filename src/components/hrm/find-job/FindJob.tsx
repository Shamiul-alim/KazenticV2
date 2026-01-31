"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  Users,
  DollarSign,
  MapPin,
  UserCheck,
  Calendar,
  Filter,
  UserCircle,
  ChevronUp,
  ChevronDown,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import jobData from "@/data/hrm/find-job/job_data.json";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { Button } from "@/components/ui/Button";
import { ApplyJobModal } from "./component/ApplyJobModal";

const FindJob: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number>(500);
  const [team, setTeam] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const filteredJobs = useMemo(() => {
    return jobData.jobs.filter((job) => {
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchSalary = job.salaryMin <= salaryRange;
      const matchTeam = !team || job.team === team;
      const matchLocation = !location || job.location === location;
      const matchPosition = !position || job.position === position;
      const matchDeadline =
        !deadline || new Date(job.deadline) >= new Date(deadline);

      return (
        matchType &&
        matchSalary &&
        matchTeam &&
        matchLocation &&
        matchPosition &&
        matchDeadline
      );
    });
  }, [selectedTypes, salaryRange, team, location, position, deadline]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSalaryRange(500);
    setTeam("");
    setLocation("");
    setPosition("");
    setDeadline("");
  };

  const toggleBookmark = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-[#FFFFFF] h-screen p-4 flex gap-4 text-[#191F38] border-t border-[#EBEBEB]">
      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />
      {/* SIDEBAR FILTER */}
      <aside className="w-[270px] bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg flex flex-col shrink-0 h-fit">
        <div className="p-4 border-b border-[#EBEBEB] flex justify-between items-center">
          <h2 className="text-sm font-bold">Filter By</h2>
          <button
            onClick={clearFilters}
            className="text-[11px] text-[#697588] font-bold hover:underline"
          >
            Clear Filter
          </button>
        </div>

        <div className="flex-1">
          {/* Job Type Checkboxes */}
          <div className="p-4 border-b border-[#EBEBEB] ">
            <div className="flex items-center justify-between text-[#4157FE] mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/briefcase.svg"
                  width={14}
                  height={14}
                  alt=""
                />
                <span className="text-xs font-medium">Job Type</span>
              </div>
              <ChevronUp size={16} className="text-[#191F38]" />
            </div>
            <div className="space-y-3 pl-1">
              {["Contact", "Full-Time", "Part-Time", "Internship"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 border-[#EBEBEB] rounded-full accent-[#4157FE]"
                    />
                    <span
                      className={`text-xs ${selectedTypes.includes(type) ? "text-[#191F38] font-medium" : "text-[#697588]"}`}
                    >
                      {type}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Team Select */}
          <FilterSelect
            icon={<Users size={16} />}
            title="Team"
            value={team}
            options={jobData.options.teams}
            onChange={setTeam}
          />

          {/* Functional Salary Slider */}
          <div className="p-4 border-b border-[#EBEBEB]">
            <div className="flex items-center gap-2 text-[#4157FE] mb-4">
              <DollarSign size={16} />
              <span className="text-xs font-bold">
                Max Salary: ${salaryRange}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={salaryRange}
              onChange={(e) => setSalaryRange(Number(e.target.value))}
              className="w-full h-1 bg-[#EBEBEB] rounded-lg appearance-none cursor-pointer accent-[#4157FE] mb-4"
            />
            <div className="flex justify-between gap-2">
              <div className="flex-1 border border-[#EBEBEB] rounded-md p-2 text-center text-xs font-medium bg-[#FDFDFD]">
                $ 100
              </div>
              <div className="flex-1 border border-[#EBEBEB] rounded-md p-2 text-center text-xs font-medium bg-[#FDFDFD]">
                $ {salaryRange}
              </div>
            </div>
          </div>

          <FilterSelect
            icon={<MapPin size={16} />}
            title="Location"
            value={location}
            options={jobData.options.locations}
            onChange={setLocation}
          />
          <FilterSelect
            icon={
              <Image src="/assets/user-tag.svg" width={16} height={16} alt="" />
            }
            title="Position"
            value={position}
            options={jobData.options.positions}
            onChange={setPosition}
          />

          {/* Deadline Date Picker */}
          <div className="p-4">
            <div className="flex items-center gap-2 text-[#4157FE] mb-4">
              <Image
                src="/assets/calendar-blue.svg"
                width={14}
                height={14}
                alt=""
              />
              <span className="text-xs font-bold">Deadline</span>
            </div>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-[#EBEBEB] rounded-md p-2 text-xs text-[#697588] bg-[#FDFDFD] outline-none"
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 border border-[#EBEBEB] bg-[#FDFDFD] rounded-lg px-4 py-3">
        <header className="flex justify-between items-center mb-3">
          <h1 className="text-sm font-semibold leading-6">
            Showing Jobs ({filteredJobs.length})
          </h1>
          <div className="flex items-center gap-3">
            <FilterPopover />
            <Button
              variant="outline"
              className=" border border-[#4157FE]  text-[#4157FE]"
            >
              <Image src="/assets/user-tag.svg" width={14} height={14} alt="" />{" "}
              My Job Profile
            </Button>
            <Link href="/hrm/find-job/applied">
              <Button variant="success" size="md">
                Applied Jobs
              </Button>
            </Link>
          </div>
        </header>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link key={job.id} href={`/hrm/find-job/${job.id}`}>
                <div className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-lg overflow-hidden flex flex-col  hover:shadow-md transition-shadow cursor-pointer">
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EBEBEB] flex items-center justify-center relative shrink-0">
                        <Image
                          src="/assets/job.svg"
                          alt=""
                          width={55}
                          height={55}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-[11px] text-[#697588] mt-1">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="active" size="md">
                        <Image
                          src="/assets/charm_tick.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                        Status
                      </Button>
                      <Button variant="progress" size="md">
                        Category
                      </Button>
                      <Button variant="type" size="md">
                        Type
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <DetailRow
                        icon={<MapPin size={14} />}
                        text={job.location}
                      />
                      <DetailRow
                        icon={<Calendar size={14} />}
                        text={`Posted : ${job.posted}`}
                      />
                      <DetailRow
                        icon={<Calendar size={14} />}
                        text={`Deadline : ${job.deadline}`}
                      />
                      <DetailRow
                        icon={<DollarSign size={14} />}
                        text={`$${job.salaryMin} - $${job.salaryMax}`}
                      />
                    </div>
                  </div>

                  <div className="mt-auto border-t border-[#EBEBEB] p-3 px-5 flex justify-between items-center bg-white">
                    <Button
                      onClick={(e) => {
                        setIsModalOpen(true);
                        e.stopPropagation();
                        e.preventDefault();
                        setSelectedJob(job);
                        setIsModalOpen(true);
                      }}
                      variant="outline"
                      className=" border border-[#4157FE]  text-[#4157FE]"
                    >
                      Easy Apply
                      <Image
                        src="/assets/arrow-up-right-blue.svg"
                        width={14}
                        height={14}
                        alt=""
                      />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => toggleBookmark(e, job.id)}
                      className={`p-1 border border-[#EBEBEB] rounded-md transition-colors ${bookmarks.includes(job.id) ? "bg-[#4157FE] text-white border-[#4157FE]" : "text-[#4157FE]"}`}
                    >
                      <Bookmark
                        size={16}
                        fill={
                          bookmarks.includes(job.id) ? "currentColor" : "none"
                        }
                      />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center bg-white border border-[#EBEBEB] border-dashed rounded-2xl text-[#697588]">
            <Briefcase size={40} className="mb-2 opacity-20" />
            <p className="text-sm font-medium">
              No jobs match your current filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
const FilterSelect = ({ icon, title, value, options, onChange }: any) => (
  <div className="p-4 border-b border-[#EBEBEB]">
    <div className="flex items-center gap-2 text-[#4157FE] mb-4">
      {icon}
      <span className="text-xs font-bold">{title}</span>
    </div>

    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Select {title}</SelectItem>
        {options.map((opt: string) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);


const DetailRow = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-3 text-[#697588]">
    <div className="bg-[#F5F5F5] p-1 rounded-md">{icon}</div>
    <span className="text-[11px] font-medium">{text}</span>
  </div>
);

export default FindJob;
