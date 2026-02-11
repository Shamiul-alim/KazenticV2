export type GanttTask = {
    id: string;
    title: string;
    startDate: string; // yyyy-MM-dd
    dueDate: string;   // yyyy-MM-dd
    status: string;
    assignee?: string; // image url
    priority?: string;
    children?: GanttTask[];
};

export type GanttDependency = {
    id: string;
    fromTaskId: string;
    toTaskId: string;
    fromSide: "start" | "end";
    toSide: "start" | "end";
    color?: string; // optional
};

export type StatusTheme = {
    bg: string;
    border: string;
    text: string;
    solidBg?: string;
    solidText?: string;
    cardBg?: string;
    cardText?: string;
    cardBorder?: string;
    cardMuted?: string;
};
