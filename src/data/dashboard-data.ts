// types first (don’t skip this)
export type SharedUser = {
    id: number;
    name: string;
    avatar: string;
};

export type Folder = {
    id: number;
    name: string;
    filesCount: number;
    size: string;
    color: "green" | "blue";
};

export type FileItem = {
    id: number;
    name: string;
    type: "image" | "doc" | "pdf";
    uploadedAt: string;
    size: string;
    sharedUsers: SharedUser[];
};

// admin types

export type EmployeePerformance = {
    rank: number
    name: string
    role: string
    tasks: number
    hours: number
    productivity: number
}

export const SHARED_USERS: SharedUser[] = [
    { id: 1, name: "Hasib", avatar: "/assets/dashboard/avatar-1.jpg" },
    { id: 2, name: "Aisha", avatar: "/assets/dashboard/avatar-2.jpg" },
    { id: 3, name: "Rahim", avatar: "/assets/dashboard/avatar-3.jpg" },
    { id: 4, name: "Sara", avatar: "/assets/dashboard/avatar-4.jpg" },
    { id: 5, name: "Imran", avatar: "/assets/dashboard/avatar-5.jpg" },
];

export const FOLDERS: Folder[] = [
    {
        id: 1,
        name: "Multigent Docs",
        filesCount: 62,
        size: "2.6 GB",
        color: "green",
    },
    {
        id: 2,
        name: "Multigent Docs",
        filesCount: 62,
        size: "2.6 GB",
        color: "green",
    },
    {
        id: 3,
        name: "Multigent Docs",
        filesCount: 62,
        size: "2.6 GB",
        color: "green",
    },
    {
        id: 4,
        name: "Kazentic Docs",
        filesCount: 62,
        size: "2.6 GB",
        color: "blue",
    },
];

export const FILES: FileItem[] = [
    {
        id: 1,
        name: "Design.img",
        type: "image",
        uploadedAt: "Nov 8, 2024, 13:25 PM",
        size: "10 MB",
        sharedUsers: SHARED_USERS.slice(0, 4),
    },
    {
        id: 2,
        name: "prd.docx",
        type: "doc",
        uploadedAt: "Nov 8, 2024, 13:25 PM",
        size: "10 MB",
        sharedUsers: SHARED_USERS.slice(0, 4),
    },
    {
        id: 3,
        name: "prd.pdf",
        type: "pdf",
        uploadedAt: "Nov 8, 2024, 13:25 PM",
        size: "10 MB",
        sharedUsers: SHARED_USERS.slice(0, 4),
    },
];

export const WORK_TREND = [
    { time: "10 AM", value: 2 },
    { time: "11 AM", value: 3 },
    { time: "12 PM", value: 5 },
    { time: "1 PM", value: 9 },
    { time: "2 PM", value: 6 },
    { time: "3 PM", value: 4 },
];

// admin
export const TASK_COMPLETION_DATA = [
    { project: "Kaznetic", completed: 40 },
    { project: "Swisscheese", completed: 8 },
    { project: "Carbo Stream", completed: 18 },
    { project: "Krown Blockchain", completed: 10 },
    { project: "Multigent", completed: 32 },
    { project: "Finance App", completed: 9 },
    { project: "Trading Bot", completed: 22 },
]



export const EMPLOYEE_PERFORMANCE_DATA: EmployeePerformance[] = [
    {
        rank: 1,
        name: "John Doe",
        role: "Frontend Developer",
        tasks: 10,
        hours: 40,
        productivity: 75,
    },
    {
        rank: 2,
        name: "Jane Smith",
        role: "Backend Developer",
        tasks: 8,
        hours: 38,
        productivity: 80,
    },
    {
        rank: 3,
        name: "John Doe",
        role: "Frontend Developer",
        tasks: 10,
        hours: 40,
        productivity: 75,
    },
    {
        rank: 4,
        name: "John Doe",
        role: "Frontend Developer",
        tasks: 10,
        hours: 40,
        productivity: 75,
    },
    {
        rank: 5,
        name: "John Doe",
        role: "Frontend Developer",
        tasks: 10,
        hours: 40,
        productivity: 75,
    },
]
