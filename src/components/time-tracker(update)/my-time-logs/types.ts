export type ViewMode = "entries" | "sheet";

export type MyLogSubEntry = {
    id?: string | number;
    time?: string;
    startTime?: string;
    endTime?: string;

    payable: boolean;
    status: "completed" | "in_progress" | string;
    weeklyHours: string[];

    source?: "timer" | "manual";
    createdAt?: number;

    notes?: string;
    tags?: string[];

    isRunning?: boolean;
};

export type MyLogTask = {
    id: string | number;
    title: string;
    status: "completed" | "in_progress" | string;
    isExpanded?: boolean;
    weeklyHours: string[];
    total: string;
    subEntries?: MyLogSubEntry[];
};

export type TimeEntryRow = {
    id: string | number;
    task: string;
    description: string;
    payable: boolean;
    tag: string;
    tagIds?: string[];
    signIn: string;
    signOut: string;
    duration: string;
};

export type TimeEntryGroup = {
    date: string;
    totalHours: string;
    limit: string;
    isExpanded?: boolean;
    entries: TimeEntryRow[];
};

export type ActiveTimer = {
    taskId: string | number;
    subId: string;
    startedAt: number;
    dayIndex: number;
};

export type EditingCell =
    | { kind: "task"; taskId: string | number; dayIndex: number }
    | { kind: "sub"; taskId: string | number; subKey: string; dayIndex: number }
    | null;
