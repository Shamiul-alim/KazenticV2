export type RecentEmail = {
    id: number;
    starred: boolean;
    title: string;
    sender: string;
    time: string;
};

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

export const RECENT_EMAILS: RecentEmail[] = [
    {
        id: 1,
        starred: true,
        title: "Project Update Required",
        sender: "Md. Al-Amin",
        time: "2 Min Ago",
    },
    {
        id: 2,
        starred: true,
        title: "Client Feedback Received",
        sender: "Sarah Khan",
        time: "10 Min Ago",
    },
    {
        id: 3,
        starred: false,
        title: "Meeting Rescheduled",
        sender: "Team Lead",
        time: "25 Min Ago",
    },
    {
        id: 4,
        starred: false,
        title: "Design Review Notes",
        sender: "UI Team",
        time: "1 Hour Ago",
    },
    {
        id: 5,
        starred: false,
        title: "Welcome Aboard",
        sender: "HR Department",
        time: "2 Hours Ago",
    },
]


export const SHARED_USERS: SharedUser[] = [
    { id: 1, name: "Hasib", avatar: "/assets/dashboard/avatar-1.jpg" },
    { id: 2, name: "Aisha", avatar: "/assets/dashboard/avatar-2.jpg" },
    { id: 3, name: "Rahim", avatar: "/assets/dashboard/avatar-3.jpg" },
    { id: 4, name: "Sara", avatar: "/assets/dashboard/avatar-4.jpg" },
    { id: 5, name: "Imran", avatar: "/assets/dashboard/avatar-5.jpg" },
];

type CalendarEventProps = {
    id: number;
    title: string;
    date: string;
    time: string;
    attendees: SharedUser[];
    meetingLink: string;
}

export const CALENDAR_EVENTS: CalendarEventProps[] = [
    {
        id: 1,
        title: "Team Sprint Review",
        date: "14 Jul, Mon",
        time: "10:00 PM",
        attendees: SHARED_USERS.slice(0, 3),
        meetingLink: "https://meet.kazentic.com/meeting/12345",
    },
    {
        id: 2,
        title: "Client Meeting",
        date: "15 Jul, Tue",
        time: "2:00 PM",
        attendees: SHARED_USERS.slice(1, 4),
        meetingLink: "https://meet.kazentic.com/meeting/67890",
    },
    {
        id: 3,
        title: "Project Kickoff",
        date: "16 Jul, Wed",
        time: "11:00 AM",
        attendees: SHARED_USERS.slice(2, 5),
        meetingLink: "https://meet.kazentic.com/meeting/54321",
    },
    {
        id: 4,
        title: "Design Brainstorming",
        date: "17 Jul, Thu",
        time: "4:00 PM",
        attendees: SHARED_USERS.slice(0, 2),
        meetingLink: "https://meet.kazentic.com/meeting/98765",
    },
    {
        id: 5,
        title: "Weekly Sync-up",
        date: "18 Jul, Fri",
        time: "9:00 AM",
        attendees: SHARED_USERS.slice(1, 3),
        meetingLink: "https://meet.kazentic.com/meeting/11223",
    }
]

type NoticeItem = {
    id: number;
    title: string;
    description: string;
    status: "active" | "inactive";
    timeAgo: string;
}

export const NOTICE_ITEMS: NoticeItem[] = [
    {
        id: 1,
        title: "System Maintenance Scheduled",
        description: "The system will be down for maintenance on 20th Jul from 1 AM to 3 AM.",
        status: "active",
        timeAgo: "2h Ago",
    },
    {
        id: 2,
        title: "New Feature Released",
        description: "We have released a new feature that enhances user experience.",
        status: "inactive",
        timeAgo: "5h Ago",
    },
    {
        id: 3,
        title: "Password Expiry Notice",
        description: "Your password will expire in 5 days. Please update it soon.",
        status: "active",
        timeAgo: "1d Ago",
    },
    {
        id: 4,
        title: "Meeting Reminder",
        description: "Don't forget about the team meeting scheduled for tomorrow at 10 AM.",
        status: "inactive",
        timeAgo: "2d Ago",
    },
    {
        id: 5,
        title: "Policy Update",
        description: "Please review the updated company policies effective from next month.",
        status: "active",
        timeAgo: "3d Ago",
    },
];

type LeaveItem = {
    id: number;
    title: string;
    description: string;
    dateRange: string;
}

export const LEAVE_ITEMS: LeaveItem[] = [
    {
        id: 1,
        title: "Emergency Leave",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        dateRange: "13 - 12 Jul, 2025",
    },
    {
        id: 2,
        title: "Medical Leave",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        dateRange: "20 - 22 Jul, 2025",
    },
    {
        id: 3,
        title: "Vacation Leave",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        dateRange: "1 - 10 Aug, 2025",
    },
    {
        id: 4,
        title: "Personal Leave",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        dateRange: "15 - 16 Aug, 2025",
    },
    {
        id: 5,
        title: "Maternity Leave",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum...",
        dateRange: "1 Sep - 1 Dec, 2025",
    }
];

type TaskItem = {
    id: number,
    title: string,
    estimatedHours: number,
    workedHours: number,
    progressPercentage: number,
    assigneeAvatarUrl: string,
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED',
    type: string,
    projectName: string
}

export const TASKS: TaskItem[] = [
    {
        id: 1,
        title: "Design Landing Page",
        estimatedHours: 12,
        workedHours: 8,
        progressPercentage: 70,
        assigneeAvatarUrl: "/assets/dashboard/avatar-1.jpg",
        status: 'ACTIVE',
        type: "Design",
        projectName: "Kazentic"
    },
    {
        id: 2,
        title: "Develop Authentication Module",
        estimatedHours: 20,
        workedHours: 15,
        progressPercentage: 75,
        assigneeAvatarUrl: "/assets/dashboard/avatar-2.jpg",
        status: 'PENDING',
        type: "Development",
        projectName: "Swisscheese"
    },
    {
        id: 3,
        title: "Set Up Database",
        estimatedHours: 15,
        workedHours: 10,
        progressPercentage: 66,
        assigneeAvatarUrl: "/assets/dashboard/avatar-3.jpg",
        status: 'COMPLETED',
        type: "Database",
        projectName: "Carbo Stream"
    },
    {
        id: 4,
        title: "Implement Payment Gateway",
        estimatedHours: 18,
        workedHours: 12,
        progressPercentage: 66,
        assigneeAvatarUrl: "/assets/dashboard/avatar-4.jpg",
        status: 'ACTIVE',
        type: "Development",
        projectName: "Krown Blockchain"
    },
    {
        id: 5,
        title: "Create Marketing Plan",
        estimatedHours: 10,
        workedHours: 7,
        progressPercentage: 70,
        assigneeAvatarUrl: "/assets/dashboard/avatar-2.jpg",
        status: 'PENDING',
        type: "Marketing",
        projectName: "Multigent"
    }
];

type TopTaskItem = {
    id: number,
    title: string,
    estimatedHours: number,
    workedHours: number,
    progressPercentage: number,
    assigneeName: string,
    assigneeAvatarUrl: string,
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | string,
    type: string,
    projectName: string
}

export const TOP_TASKS: TopTaskItem[] = [
    {
        id: 1,
        title: "Design Landing Page",
        estimatedHours: 12,
        workedHours: 8,
        progressPercentage: 70,
        assigneeName: "Pat Cummins",
        assigneeAvatarUrl: "/assets/dashboard/avatar-1.jpg",
        status: 'ACTIVE',
        type: "Design",
        projectName: "Kazentic"
    },
    {
        id: 2,
        title: "Develop Authentication Module",
        estimatedHours: 20,
        workedHours: 15,
        progressPercentage: 75,
        assigneeName: "Jane Smith",
        assigneeAvatarUrl: "/assets/dashboard/avatar-2.jpg",
        status: 'PENDING',
        type: "Development",
        projectName: "Swisscheese"
    },
    {
        id: 3,
        title: "Set Up Database",
        estimatedHours: 15,
        workedHours: 10,
        progressPercentage: 66,
        assigneeName: "John Doe",
        assigneeAvatarUrl: "/assets/dashboard/avatar-3.jpg",
        status: 'COMPLETED',
        type: "Database",
        projectName: "Carbo Stream"
    },
    {
        id: 4,
        title: "Implement Payment Gateway",
        estimatedHours: 18,
        workedHours: 12,
        progressPercentage: 66,
        assigneeName: "Sarah Lee",
        assigneeAvatarUrl: "/assets/dashboard/avatar-4.jpg",
        status: 'ACTIVE',
        type: "Development",
        projectName: "Krown Blockchain"
    },
    {
        id: 5,
        title: "Create Marketing Plan",
        estimatedHours: 10,
        workedHours: 7,
        progressPercentage: 70,
        assigneeName: "Jane Smith",
        assigneeAvatarUrl: "/assets/dashboard/avatar-2.jpg",
        status: 'PENDING',
        type: "Marketing",
        projectName: "Multigent"
    }
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
    { project: "Kaznetic", completed: 40, total: 50 },
    { project: "Swisscheese", completed: 8, total: 10 },
    { project: "Carbo Stream", completed: 18, total: 20 },
    { project: "Krown Blockchain", completed: 10, total: 15 },
    { project: "Multigent", completed: 32, total: 40 },
    { project: "Finance App", completed: 9, total: 12 },
    { project: "Trading Bot", completed: 22, total: 25 },
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


export type Issue = {
    title: string
    category: string
    date: string
    time: string
    assignee: string
    ticketId: string
    status: "Open" | "Closed" | "In Progress"
    priority: "Low" | "Medium" | "High"
}

export const ISSUE_TICKETS: Issue[] = [
    {
        title: "Login Issues with Dashboard Access",
        category: "Frontend • Authentication",
        date: "Aug 12, 2025",
        time: "2h Ago",
        assignee: "Pat Cummins",
        ticketId: "001",
        status: "Open",
        priority: "High",
    },
    {
        title: "API Timeout on Payment Gateway",
        category: "Backend • Payments",
        date: "Aug 11, 2025",
        time: "5h Ago",
        assignee: "Jane Smith",
        ticketId: "002",
        status: "In Progress",
        priority: "High",
    },
    {
        title: "Profile Image Not Updating",
        category: "Frontend • User Settings",
        date: "Aug 10, 2025",
        time: "1d Ago",
        assignee: "John Doe",
        ticketId: "003",
        status: "Open",
        priority: "Medium",
    },
    {
        title: "Email Notifications Delayed",
        category: "Backend • Notifications",
        date: "Aug 09, 2025",
        time: "2d Ago",
        assignee: "Sarah Lee",
        ticketId: "004",
        status: "In Progress",
        priority: "Medium",
    },
    {
        title: "Broken Link in Footer",
        category: "Frontend • UI",
        date: "Aug 08, 2025",
        time: "3d Ago",
        assignee: "Michael Brown",
        ticketId: "005",
        status: "Closed",
        priority: "Low",
    },
    {
        title: "Database Backup Failed",
        category: "DevOps • Infrastructure",
        date: "Aug 07, 2025",
        time: "4d Ago",
        assignee: "Emily Davis",
        ticketId: "006",
        status: "Open",
        priority: "High",
    },
]
