import { TaskNode } from "./data.types";

export const TASK_DATA: TaskNode[] = [
    {
        id: "task-1",
        name: "[kzt-1] Auth, Profile, Dashboard",
        subtaskCount: 1,
        priority: "Urgent",
        assignee: {
            id: "1",
            initials: "AH",
        },
        startDate: "2025-11-23",
        dueDate: "2025-11-23",
        sprint: {
            name: "Sprint 2",
            range: "7/12 - 8/12",
            points: 21,
            timeEstimate: "15d",
            timeTracked: "5d",
        },
        children: [
            {
                id: "subtask-1",
                name: "Design Login Page",
                priority: "High",
                assignee: {
                    id: "2",
                    initials: "MK",
                },
                startDate: "2025-11-20",
                dueDate: "2025-11-21",
                sprint: {
                    name: "Sprint 2",
                    range: "7/12 - 8/12",
                    points: 5,
                    timeEstimate: "3d",
                    timeTracked: "1d",
                },
            },
        ],
    },
    {
        id: "task-2",
        name: "[kzt-1] Auth, Profile, Dashboard",
        subtaskCount: 1,
        priority: "Urgent",
        assignee: {
            id: "1",
            initials: "AH",
        },
        startDate: "2025-11-23",
        dueDate: "2025-11-23",
        sprint: {
            name: "Sprint 2",
            range: "7/12 - 8/12",
            points: 13,
            timeEstimate: "10d",
            timeTracked: "4d",
        },
    },
    {
        id: "task-3",
        name: "[kzt-1] Auth, Profile, Dashboard",
        subtaskCount: 1,
        priority: "Urgent",
        assignee: {
            id: "1",
            initials: "AH",
        },
        startDate: "2025-11-23",
        dueDate: "2025-11-23",
        sprint: {
            name: "Sprint 2",
            range: "7/12 - 8/12",
            points: 8,
            timeEstimate: "7d",
            timeTracked: "3d",
        },
    },
    {
        id: "task-4",
        name: "[kzt-1] Auth, Profile, Dashboard",
        subtaskCount: 1,
        priority: "Urgent",
        assignee: {
            id: "1",
            initials: "AH",
        },
        startDate: "2025-11-23",
        dueDate: "2025-11-23",
        sprint: {
            name: "Sprint 2",
            range: "7/12 - 8/12",
            points: 13,
            timeEstimate: "10d",
            timeTracked: "4d",
        },
    },
];

export const TASK_USER_DATA = [
    {
        id: "1",
        name: "Alif Hassan",
        avatarUrl: "/avatars/alif.png",
    },
    {
        id: "2",
        name: "Tommoy Asif",
        avatarUrl: "/avatars/tommoy.png",
    },
    {
        id: "3",
        name: "John Doe",
        avatarUrl: "/avatars/john.png",
    },
    {
        id: "4",
        name: "Nat qwe",
        avatarUrl: "/avatars/nat.png",
    },
];