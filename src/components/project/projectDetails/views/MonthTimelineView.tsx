"use client";

import React from "react";
import BaseTimelineView from "./BaseTimelineView";
import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";

export default function MonthTimelineView(props: {
  tasks: TimelineTask[];
  setTasks: React.Dispatch<React.SetStateAction<TimelineTask[]>>;
  zoomIndex: number;
  scrollRootRef?: React.RefObject<HTMLDivElement>;
  onCreateTask: () => void;
}) {
  return (
    <BaseTimelineView
      mode="month"
      headerVariant="month"
      tasks={props.tasks}
      setTasks={props.setTasks}
      zoomIndex={props.zoomIndex}
      scrollRootRef={props.scrollRootRef}
      onCreateTask={props.onCreateTask}
    />
  );
}
