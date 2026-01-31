"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  ArrowUpRight,
  XCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import jobData from "@/data/hrm/find-job/job_data.json";
import { Button } from "@/components/ui/Button";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import Link from "next/link";

type TabType = "Saved" | "Applied";

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Applied");

  const appliedJobIds = [1, 2, 3];
  const savedJobIds = [1];

  const displayJobs = jobData.jobs.filter((job) =>
    activeTab === "Applied"
      ? appliedJobIds.includes(job.id)
      : savedJobIds.includes(job.id),
  );

  return (
    <div className="bg-[#FFFFFF] h-screen flex flex-col text-[#191F38] border-t border-[#EBEBEB] ">
      {/* Top Navigation Tab Bar */}
      <div className="flex items-center justify-between px-4 border-b border-[#EBEBEB] bg-white">
        <div className="flex gap-10">
          {(["Saved", "Applied"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-xs font-bold transition-all relative ${
                activeTab === tab ? "text-[#4157FE]" : "text-[#697588]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4157FE] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <FilterPopover />
          <Link href="/hrm/find-job">
            <Button variant="success" size="md" className="py-2.75">
              Apply More Jobs{" "}
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

      {/* Grid Content */}
      <div className="p-4 overflow-y-auto bg-[#FFFFFF] flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-xl overflow-hidden flex flex-col hover:shadow-sm transition-shadow"
            >
              <div className="p-5 flex flex-col gap-4">
                {/* Job Header */}
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

                {/* Info Rows */}
                <div className="space-y-3">
                  <InfoRow icon={<MapPin size={14} />} text={job.location} />
                  <InfoRow
                    icon={<Calendar size={14} />}
                    text={`Posted : ${job.posted}`}
                  />
                  <InfoRow
                    icon={<Calendar size={14} />}
                    text={`Deadline : ${job.deadline}`}
                  />
                  <InfoRow
                    icon={<DollarSign size={14} />}
                    text={`$${job.salaryMin} - $${job.salaryMax}`}
                  />
                </div>
              </div>

              {/* Recruitment Status Footer - Exact Match to Image */}
              <div className="mt-auto border-t border-[#EBEBEB] px-4 py-2 flex items-center justify-between bg-white">
                <span className="text-[11px] font-semibold text-[#191F38]">
                  Recruitment Status:
                </span>
                <StatusBadge status={job.recruitmentStatus} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS FOR 1:1 STYLING --- */

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-[#697588]">
    <div className="bg-[#F5F5F5] p-1 rounded-md">{icon}</div>
    <span className="text-[11px] font-medium">{text}</span>
  </div>
);

const Badge = ({ text, variant }: { text: string; variant: string }) => {
  const styles: any = {
    status: "bg-[#ECFDF5] text-[#10B981] border-[#D1FAE5]",
    category: "bg-[#F5F3FF] text-[#8B5CF6] border-[#EDE9FE]",
    type: "bg-[#EFF6FF] text-[#3B82F6] border-[#DBEAFE]",
  };
  return (
    <span
      className={`text-[10px] px-2.5 py-1 rounded-md border font-bold ${styles[variant]}`}
    >
      {variant === "status" && "✓ "} {text}
    </span>
  );
};

const StatusBadge = ({ status }: { status?: string }) => {
  if (status === "Interviewed") {
    return (
      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#E8F9F1] border border-[#B7E9D1] text-[#10B981]">
        <CheckCircle2 size={12} strokeWidth={3} />
        <span className="text-[10px] font-bold">Interviewed</span>
      </div>
    );
  }
  if (status === "Screened") {
    return (
      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#FFF7ED] border border-[#FFEDD5] text-[#F97316]">
        <CheckCircle2 size={12} strokeWidth={3} />
        <span className="text-[10px] font-bold">Screened</span>
      </div>
    );
  }
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#FFF1F2] border border-[#FFE4E6] text-[#F43F5E]">
        <XCircle size={12} strokeWidth={3} />
        <span className="text-[10px] font-bold">Cancelled</span>
      </div>
    );
  }
  return null;
};

export default AppliedJobs;
