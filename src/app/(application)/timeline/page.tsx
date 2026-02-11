import timelineData from "@/data/project/project-details/timeline/timeline-data.json";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";
import TimelineClient from "./TimelineClient";

export default async function TimelinePage() {
  const tasks = (timelineData as { tasks: TimelineTask[] }).tasks ?? [];
  return (
    <TimelineClient
      initialTasks={(timelineData as any).tasks ?? []}
      projectSettings={(timelineData as any).projectSettings ?? {}}
    />
  );
}
