import JobDetails from "@/components/hrm/find-job/JobDetails";
import jobData from "@/data/hrm/find-job/job_data.json";

import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);

  const job = jobData.jobs.find((j) => j.id === jobId);

  if (!job) {
    return notFound();
  }

  return <JobDetails job={job} />;
}
