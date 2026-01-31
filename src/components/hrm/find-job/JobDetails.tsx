"use client";

import Image from "next/image";
import { Bookmark, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import detailsData from "@/data/hrm/find-job/job_details.json";
import { useState } from "react";
import { ApplyJobModal } from "./component/ApplyJobModal";
import Link from "next/link";

const SectionWrapper = ({ children, title, icon, description }: any) => (
  <div className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-md bg-[#F2F9FE] border border-[#4157FE33] flex items-center justify-center shrink-0">
        <Image src={`/assets/${icon}`} alt="" width={20} height={20} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#191F38] leading-5">
          {title}
        </h3>
        <p className="text-xs text-[#697588] leading-5">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const InfoItem = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-md bg-[#F2F9FE] border border-[#EBEBEB] flex items-center justify-center shrink-0">
      <Image src={`/assets/${icon}`} alt="" width={16} height={16} />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-[#191F38] leading-5 -tracking-tight">
        {label}
      </span>

      <span className="text-[11px] text-[#697588] leading-3.5 -tracking-tight mb-0.5">
        {value}
      </span>
    </div>
  </div>
);

const JobDetails = ({ job }: any) => {
  const details = (detailsData as any)[job.id] || (detailsData as any)["1"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  return (
    <div className="p-4 bg-white min-h-screen space-y-4 border-t border-[#EBEBEB]">
      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
      {/* Header Card */}
      <div className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg p-4 flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <h1 className="text-sm font-semibold text-[#191F38]">{job.title}</h1>
          <div className="flex items-center gap-4 text-[11px] text-[#697588] font-medium">
            <div className="flex items-center gap-1.5">
              <Image
                src="/assets/buildings.svg"
                width={14}
                height={14}
                alt=""
              />{" "}
              {job.company}
            </div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/assets/location-gray.svg"
                width={14}
                height={14}
                alt=""
              />{" "}
              {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Image src="/assets/mic.svg" width={14} height={14} alt="" /> 100
              Vacancies
            </div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/assets/calendar-normal.svg"
                width={14}
                height={14}
                alt=""
              />{" "}
              Posted on {job.posted}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="active">
            <Image
              src="/assets/tick-circle-green.svg"
              width={14}
              height={14}
              alt=""
            />{" "}
            STATUS
          </Button>
          <div className="p-1 border border-[#EBEBEB] rounded-md text-[#4157FE] cursor-pointer mb-">
            <Bookmark size={14} />
          </div>
          <Link href="/hrm/find-job">
            <Button
              onClick={(e) => {
                setIsModalOpen(true);
                e.stopPropagation();
              }}
              variant="success"
            >
              Easy Apply{" "}
              <Image
                src="/assets/arrow-up-right-white.svg"
                width={8}
                height={8}
                alt=""
              />
            </Button>
          </Link>
        </div>
      </div>
      <SectionWrapper
        title="Basic Job Information"
        icon="info-circle-blue.svg"
        description="Lorem ipsum dolor sit amet consectetur. Ut amet."
      >
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 mt-5">
          {details.basicInfo.map((info: any, i: number) => (
            <InfoItem key={i} {...info} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Job Description"
        icon="clipboard-text.svg"
        description="Lorem ipsum dolor sit amet consectetur. Ut amet."
      >
        <p className="text-xs text-[#191F38] leading-6 mt-4">
          Lorem ipsum dolor sit amet consectetur. Pulvinar gravida ac
          pellentesque non eu nullam...
        </p>
      </SectionWrapper>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <SectionWrapper
            title="Key Responsibilities"
            icon="task-square2.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <ul className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="text-xs text-[#191F38] leading-5 flex items-start gap-2"
                >
                  {i}. Lorem ipsum dolor sit amet consectetur. Pulvinar gravida
                  ac pellentesque...
                </li>
              ))}
            </ul>
          </SectionWrapper>
          <SectionWrapper
            title="Benefits & Perks"
            icon="gift.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <ul className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="text-xs text-[#191F38] leading-5 flex items-start gap-2"
                >
                  {i}. Lorem ipsum dolor sit amet consectetur. Pulvinar gravida
                  ac pellentesque...
                </li>
              ))}
            </ul>
          </SectionWrapper>
          <SectionWrapper
            title="Application Process"
            icon="document-blue.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <ul className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="text-xs text-[#191F38] leading-5 flex items-start gap-2"
                >
                  {i}. Lorem ipsum dolor sit amet consectetur. Pulvinar gravida
                  ac pellentesque...
                </li>
              ))}
            </ul>
          </SectionWrapper>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <SectionWrapper
            title="Skills"
            icon="chart-2.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <div className="flex flex-wrap gap-2 mt-4">
              {details.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#F2F9FE] border border-[#4157FE26] rounded-sm text-[11px] text-[#4157FE] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper
            title="Education & Experience"
            icon="teacher.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <ul className="mt-4 space-y-3">
              {details.education.map((edu: string, i: number) => (
                <li
                  key={i}
                  className="text-xs text-[#191F38] font-medium flex gap-2"
                >
                  {i + 1}. {edu}
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper
            title="Attachments"
            icon="document-blue.svg"
            description="Lorem ipsum dolor sit amet consectetur. Ut amet."
          >
            <div className="mt-4 space-y-3">
              {details.attachments.map((file: any, i: number) => (
                <div
                  key={i}
                  className=" group flex items-center justify-between p-2.5 border border-[#EBEBEB] rounded-2xl bg-[#FFFFFF] hover:border-[#4157FE] hover:bg-[#F2F9FE] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/document.svg"
                      alt="group"
                      width={34.61}
                      height={34.61}
                      className=""
                    />
                    <div>
                      <div className="text-xs font-medium leading-5 tracking-tighter text-[#191F38]">
                        {file.name}
                      </div>
                      <div className="text-[11px] text-[#697588]">
                        {file.size} • {file.extension}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 text-gray-300">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2">
                      <Image
                        src="/assets/download.svg"
                        alt="group"
                        width={18}
                        height={18}
                        className=""
                      />
                    </div>
                    <Eye
                      size={16}
                      className="cursor-pointer group-hover:text-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
