"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Flag, Link2 } from "lucide-react";

import { TimelineTask } from "@/data/project/project-details/timeline/timeline.types";
import { resolveStatusTheme } from "../utils/theme";

/* ---------- label formatters ---------- */

function formatStatusLabel(status: string) {
  return status.replace(/_/g, " ").toUpperCase();
}

function formatPriorityLabel(priority?: string) {
  if (!priority) return "Normal priority";
  return `${priority.charAt(0).toUpperCase()}${priority.slice(1)} priority`;
}

/* ---------- component ---------- */

export function TaskHoverCard(props: {
  task: TimelineTask;
  statusThemes?: Record<string, any>;
  pos: { left: number; top: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const task = props.task;

  const theme = resolveStatusTheme(props.statusThemes, task.status);

  const path =
    task.path?.join("  /  ") ?? "Team Space  /  Kazentic  /  Implement";

  return (
    <div
      className="absolute z-50 w-100 rounded-lg shadow-md border"
      style={{
        left: props.pos.left,
        top: props.pos.top,
        backgroundColor: theme.cardBg ?? theme.bg,
        color: theme.cardText ?? theme.text,
        borderColor: theme.cardBorder ?? theme.border,
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="p-3">
        {/* top row */}
        <div className="flex items-center justify-between">
          <div
            className="text-xs"
            style={{ color: theme.cardMuted ?? theme.text }}
          >
            {path}
          </div>

          <div
            className="flex items-center gap-3"
            style={{ color: theme.cardMuted ?? theme.text }}
          >
            <ExternalLink size={16} className="cursor-pointer" />
            <Link2 size={16} className="cursor-pointer" />
          </div>
        </div>

        {/* title */}
        <div className="text-sm font-semibold">{task.title}</div>

        {/* status + priority */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-1 rounded-md text-xs font-bold"
              style={{
                backgroundColor: theme.solidBg ?? theme.border,
                color: theme.solidText ?? "#fff",
              }}
            >
              {formatStatusLabel(task.status)}
            </span>

            {/* priority */}
            <div
              className="flex items-center gap-2"
              style={{ color: theme.cardMuted ?? theme.text }}
            >
              <Flag size={14} style={{ color: theme.text }} />
              <span className="text-xs">
                {formatPriorityLabel(task.priority)}
              </span>
            </div>
          </div>

          {/* avatar */}
          <Avatar className="w-7 h-7 border border-black/10">
            <AvatarImage src={task.assignee} alt={task.title} />
            <AvatarFallback className="text-xs bg-black/10 text-black">
              {task.assignee ? task.assignee.slice(0, 2).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
