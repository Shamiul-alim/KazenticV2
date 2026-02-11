import ganttData from "@/data/gantt/gantt-data.json";
import { GanttTask, GanttDependency } from "@/data/gantt/gantt.types";
import GanttClient from "./GanttClient";

export default async function GanttPage() {
  const tasks = (ganttData as { tasks: GanttTask[] }).tasks ?? [];
  const dependencies =
    (ganttData as { dependencies: GanttDependency[] }).dependencies ?? [];

  return (
    <GanttClient
      initialTasks={tasks}
      initialDependencies={dependencies}
      projectSettings={(ganttData as any).projectSettings ?? {}}
    />
  );
}
