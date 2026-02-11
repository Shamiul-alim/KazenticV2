"use client";

import React from "react";

import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";
import TimelineCanvas from "../TimelineCanvas";

export default function MonthTimelineView(props: {
  tasks: TimelineTask[];
  setTasks: React.Dispatch<React.SetStateAction<TimelineTask[]>>;
  zoomIndex: number;
  onCreateTask: () => void;
  projectSettings: any;
}) {
  return (
    <TimelineCanvas
      mode="month"
      headerVariant="month"
      tasks={props.tasks}
      setTasks={props.setTasks}
      zoomIndex={props.zoomIndex}
      onCreateTask={props.onCreateTask}
      projectSettings={props.projectSettings}
    />
  );
}
