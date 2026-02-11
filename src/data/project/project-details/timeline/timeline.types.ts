export type TaskStatus = string; 
export type TaskPriority = "low" | "normal" | "high" | "urgent";

export type StatusTheme = {
    bg: string;      
    border: string;    
    text: string;    
    solidBg: string;  
    solidText: string; 

    cardBg: string;
    cardText: string;
    cardBorder: string;
    cardMuted: string;
};

export type TimelineTask = {
    id: string;
    title: string;
    startDate: string;
    dueDate: string;

    status: TaskStatus;
    assignee: string;

    path?: string[];
    priority?: TaskPriority;
    row?: number;
};

export type ProjectSettings = {
    viewStart?: string;
    viewEnd?: string;

    statusThemes?: Record<string, StatusTheme>;
};
