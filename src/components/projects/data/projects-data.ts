import { Project, ProjectStatus } from "../types/project";

export const PROJECTS_DB: Project[] = [
    {
        id: "1",
        name: "Project Alpha",
        status: { id: "s1", name: "In Progress", color: "#facc15" },
        type: { id: "t1", name: "Development", color: "#3b82f6" },
        progress: 45,
        isPrivate: false,
        members: [
            { id: "m1", name: "Alice", avatarUrl: "/assets/dashboard/avatar-1.jpg" },
            { id: "m2", name: "Bob", avatarUrl: "/assets/dashboard/avatar-2.jpg" },
        ],
        startDate: "2024-01-01",
        endDate: "2024-06-30",
    },
    {
        id: "2",
        name: "Project Beta",
        status: { id: "s2", name: "Completed", color: "#22c55e" },
        type: { id: "t2", name: "Research", color: "#8b5cf6" },
        progress: 100,
        isPrivate: true,
        members: [
            { id: "m3", name: "Charlie", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
        ],
        startDate: "2023-05-01",
        endDate: "2023-12-31",
    },
    {
        id: "3",
        name: "Project Gamma",
        status: { id: "s1", name: "In Progress", color: "#facc15" },
        type: { id: "t1", name: "Development", color: "#3b82f6" },
        progress: 70,
        isPrivate: false,
        members: [
            { id: "m1", name: "Alice", avatarUrl: "/assets/dashboard/avatar-1.jpg" },
            { id: "m2", name: "Alice", avatarUrl: "/assets/dashboard/avatar-2.jpg" },
            { id: "m3", name: "Alice", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
            { id: "m4", name: "Alice", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
            { id: "m5", name: "David", avatarUrl: "/assets/dashboard/avatar-4.jpg" },
        ],
        startDate: "2024-02-15",
        endDate: "2024-08-31",
    },
    {
        id: "4",
        name: "Project Delta",
        status: { id: "s3", name: "On Hold", color: "#ef4444" },
        type: { id: "t3", name: "Design", color: "#ec4899" },
        progress: 20,
        isPrivate: true,
        members: [
            { id: "m4", name: "David", avatarUrl: "/assets/dashboard/avatar-4.jpg" },
        ],
        startDate: "2024-03-01",
        endDate: "2024-09-30",
    },
    {
        id: "5",
        name: "Project Epsilon",
        status: { id: "s4", name: "Active", color: "#6b7280" },
        type: { id: "t2", name: "Research", color: "#8b5cf6" },
        progress: 60,
        isPrivate: false,
        members: [
            { id: "m5", name: "Eve", avatarUrl: "/assets/dashboard/avatar-5.jpg" },
        ],
        startDate: "2024-01-15",
        endDate: "2024-07-31",
    },
    {
        id: "6",
        name: "Project Zeta",
        status: { id: "s5", name: "Inactive", color: "#3b82f6" },
        type: { id: "t1", name: "Development", color: "#3b82f6" },
        progress: 0,
        isPrivate: true,
        members: [
            { id: "m6", name: "Frank", avatarUrl: "/assets/dashboard/avatar-6.jpg" },
        ],
        startDate: "2024-04-01",
        endDate: "2024-10-31",
    },
    {
        id: "7",
        name: "Project Eta",
        status: { id: "s1", name: "In Progress", color: "#facc15" },
        type: { id: "t3", name: "Design", color: "#ec4899" },
        progress: 30,
        isPrivate: false,
        members: [
            { id: "m7", name: "Grace", avatarUrl: "/assets/dashboard/avatar-7.jpg" },
        ],
        startDate: "2024-02-01",
        endDate: "2024-08-31",
    },
    {
        id: "8",
        name: "Project Theta",
        status: { id: "s2", name: "In Progress", color: "#22c55e" },
        type: { id: "t2", name: "Research", color: "#8b5cf6" },
        progress: 100,
        isPrivate: true,
        members: [
            { id: "m8", name: "Heidi", avatarUrl: "/assets/dashboard/avatar-8.jpg" },
        ],
        startDate: "2023-06-01",
        endDate: "2023-12-31",
    },
    {
        id: "9",
        name: "Project Iota",
        status: { id: "s3", name: "In Progress", color: "#ef4444" },
        type: { id: "t1", name: "Development", color: "#3b82f6" },
        progress: 20,
        isPrivate: false,
        members: [
            { id: "m9", name: "Ivan", avatarUrl: "/assets/dashboard/avatar-9.jpg" },
        ],
        startDate: "2024-03-15",
        endDate: "2024-09-30",
    },
    {
        id: "10",
        name: "Project Kappa",
        status: { id: "s4", name: "In Progress", color: "#6b7280" },
        type: { id: "t3", name: "Design", color: "#ec4899" },
        progress: 60,
        isPrivate: true,
        members: [
            { id: "m10", name: "Judy", avatarUrl: "/assets/dashboard/avatar-10.jpg" },
        ],
        startDate: "2024-01-10",
        endDate: "2024-07-31",
    }
]

export const STATUSES_DB: ProjectStatus[] = [
    { id: "s1", name: "In Progress", color: "#facc15" },
    { id: "s2", name: "Completed", color: "#22c55e" },
    { id: "s3", name: "On Hold", color: "#ef4444" },
    { id: "s4", name: "Active", color: "#6b7280" },
    { id: "s5", name: "Inactive", color: "#3b82f6" },
]

export const TYPES_DB = [
    { id: "t1", name: "Development", color: "#3b82f6" },
    { id: "t2", name: "Research", color: "#8b5cf6" },
    { id: "t3", name: "Design", color: "#ec4899" },
]

export const MEMBERS_DB = [
    { id: "m1", name: "Alice", avatarUrl: "/assets/dashboard/avatar-1.jpg" },
    { id: "m2", name: "Bob", avatarUrl: "/assets/dashboard/avatar-2.jpg" },
    { id: "m3", name: "Charlie", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
    { id: "m4", name: "David", avatarUrl: "/assets/dashboard/avatar-4.jpg" },
    { id: "m5", name: "Eve", avatarUrl: "/assets/dashboard/avatar-1.jpg" },
    { id: "m6", name: "Frank", avatarUrl: "/assets/dashboard/avatar-2.jpg" },
    { id: "m7", name: "Grace", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
    { id: "m8", name: "Heidi", avatarUrl: "/assets/dashboard/avatar-4.jpg" },
    { id: "m9", name: "Ivan", avatarUrl: "/assets/dashboard/avatar-3.jpg" },
    { id: "m10", name: "Judy", avatarUrl: "/assets/dashboard/avatar-1.jpg" },
]