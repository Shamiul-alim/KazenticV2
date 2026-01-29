import { TaskStatus } from "@/data/task-status.enum";

export interface DataNode {
    id: string;
    label: string;
    children?: DataNode[];
    meta?: {
        subtasksCount?: number;
        status?: string;
        date?: string;
    };
}

export interface TaskNode {
    id: string;
    name: string;

    // hierarchy
    children?: TaskNode[];
    subtaskCount?: number;

    // status
    // status: TaskStatus;

    // task metadata
    priority?: "Urgent" | "High" | "Medium" | "Low";
    assignee?: {
        id: string;
        initials: string;
    };
    startDate?: string; // ISO preferred later
    dueDate?: string;
    sprint?: {
        name: string;
        range: string;
        points?: number;
        timeEstimate?: string;
        timeTracked?: string;
    };
}
