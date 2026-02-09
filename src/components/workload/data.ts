export type Task = {
    id: string;
    title: string;
    assignees: string[];        // userIds
    priority: "low" | "medium" | "high" | "urgent";
    status: "todo" | "in_progress" | "review" | "done";
    tags: string[];
    startDate: string;
    dueDate: string;
    taskType: "sprint_point" | "task_group" | "time_estimate";
    estimate?: number;          // hours or points
    color?: string;
    parentId?: string;          // for hierarchy
};


export const TASK_DB: Task[] = [
    {
        id: "sp-1",
        title: "UI Design",
        assignees: ["user-1"],
        priority: "high",
        status: "in_progress",
        tags: ["design", "sprint"],
        startDate: "2026-02-09",
        dueDate: "2026-02-12",
        taskType: "sprint_point",
        estimate: 13,
        color: "purple",
    },
    {
        id: "task-1",
        title: "UI Design Tasks",
        assignees: ["user-1"],
        priority: "medium",
        status: "todo",
        tags: ["design", "tasks"],
        startDate: "2026-02-09",
        dueDate: "2026-02-12",
        taskType: "task_group",
        estimate: 6,
        color: "purple",
        parentId: "sp-1",
    },
    {
        id: "time-1",
        title: "UI Design Time",
        assignees: ["user-1"],
        priority: "medium",
        status: "todo",
        tags: ["design", "time"],
        startDate: "2026-02-09",
        dueDate: "2026-02-12",
        taskType: "time_estimate",
        estimate: 6,
        color: "purple",
        parentId: "sp-1",
    },

    {
        id: "sp-2",
        title: "Dashboard Layout",
        assignees: ["user-1"],
        priority: "high",
        status: "todo",
        tags: ["dashboard", "sprint"],
        startDate: "2026-02-14",
        dueDate: "2026-02-17",
        taskType: "sprint_point",
        estimate: 8,
        color: "green",
    },
    {
        id: "task-2",
        title: "Dashboard Layout Tasks",
        assignees: ["user-1"],
        priority: "medium",
        status: "todo",
        tags: ["dashboard", "tasks"],
        startDate: "2026-02-14",
        dueDate: "2026-02-17",
        taskType: "task_group",
        estimate: 4,
        color: "green",
        parentId: "sp-2",
    },
    {
        id: "time-2",
        title: "Dashboard Layout Time",
        assignees: ["user-1"],
        priority: "medium",
        status: "todo",
        tags: ["dashboard", "time"],
        startDate: "2026-02-14",
        dueDate: "2026-02-17",
        taskType: "time_estimate",
        estimate: 4,
        color: "green",
        parentId: "sp-2",
    },

    {
        id: "sp-3",
        title: "Sprint Planning",
        assignees: ["user-2"],
        priority: "urgent",
        status: "in_progress",
        tags: ["planning", "sprint"],
        startDate: "2026-02-10",
        dueDate: "2026-02-13",
        taskType: "sprint_point",
        estimate: 5,
        color: "purple",
    },

    {
        id: "time-3",
        title: "Sprint Planning Time",
        assignees: ["user-2"],
        priority: "high",
        status: "todo",
        tags: ["planning", "time"],
        startDate: "2026-02-10",
        dueDate: "2026-02-13",
        taskType: "time_estimate",
        estimate: 5,
        color: "purple",
        parentId: "sp-3",
    },

    {
        id: "sp-1-1-1",
        title: "Wireframes",
        assignees: ["user-1"],
        priority: "high",
        status: "in_progress",
        tags: ["ui", "wireframes"],
        startDate: "2026-02-09",
        dueDate: "2026-02-11",
        taskType: "sprint_point",
        estimate: 5,
        color: "green",
        parentId: "sp-1",
    },

    {
        id: "time-1-1-1",
        title: "Wireframes Time",
        assignees: ["user-1"],
        priority: "medium",
        status: "todo",
        tags: ["ui", "time"],
        startDate: "2026-02-09",
        dueDate: "2026-02-11",
        taskType: "time_estimate",
        estimate: 4,
        color: "green",
        parentId: "sp-1-1-1",
    },
];


type User = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: "admin" | "manager" | "member";
    status: "active" | "inactive";
    timezone: string;
    capacityHoursPerDay: number;
    tags: string[];
};

export const USER_DB: User[] = [
    {
        id: "user-1",
        name: "Alif Hassan",
        email: "alif.hassan@company.com",
        avatar: null,
        role: "member",
        status: "active",
        timezone: "Asia/Dhaka",
        capacityHoursPerDay: 8,
        tags: ["ui", "frontend", "design"],
    },
    {
        id: "user-2",
        name: "Nusrat Jahan",
        email: "nusrat.jahan@company.com",
        avatar: null,
        role: "manager",
        status: "active",
        timezone: "Asia/Dhaka",
        capacityHoursPerDay: 6,
        tags: ["planning", "scrum", "management"],
    },
    {
        id: "user-3",
        name: "Tanvir Ahmed",
        email: "tanvir.ahmed@company.com",
        avatar: null,
        role: "member",
        status: "active",
        timezone: "Asia/Dhaka",
        capacityHoursPerDay: 7,
        tags: ["dashboard", "frontend"],
    },
    {
        id: "user-4",
        name: "Farzana Rahman",
        email: "farzana.rahman@company.com",
        avatar: null,
        role: "admin",
        status: "active",
        timezone: "Asia/Dhaka",
        capacityHoursPerDay: 5,
        tags: ["admin", "ops"],
    },
];
