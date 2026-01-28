export interface Member {
    id: string
    name: string
    role: string
    phone: string
    email: string
    image?: string
    isHighlighted?: boolean
}

export interface Activity {
    id: string | number
    user: string
    action: string
    target: string
    date: string
}

export interface Project {
    id: string
    name: string
    status: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED'
    type: 'Web App' | 'Mobile App' | 'API' | 'Internal Tool' | 'Marketing Campaign' | 'Research'
    progress: number
    members: { id: string; name: string; image?: string }[]
    isPrivate?: boolean
    iconInitial: string
    iconColor: string
}

export interface Team {
    id: string
    name: string
    description: string
    initial: string
    members: Member[]
    projects: Project[]
    activities: Activity[]
    stats: {
        totalProjects: number
        completedProjects: number
        activeMembers: number
    }
}

// --------------------------------------------
// Expanded & Realistic Data
// --------------------------------------------

const COMMON_PROJECTS: Project[] = [
    {
        id: "p1",
        name: "Krown DEX",
        status: "ACTIVE",
        type: "Web App",
        progress: 70,
        iconInitial: "K",
        iconColor: "bg-emerald-500",
        members: [
            { id: "m1", name: "John Doe", image: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" },
            { id: "m2", name: "Jane Smith", image: "https://ui-avatars.com/api/?name=Jane+Smith&background=118AB2&color=fff" },
            { id: "m5", name: "Ethan Hunt", image: "https://ui-avatars.com/api/?name=Ethan+Hunt&background=4361EE&color=fff" },
            { id: "m10", name: "Jenny Slate", image: "https://ui-avatars.com/api/?name=Jenny+Slate&background=4CC9F0&color=fff" }
        ]
    },
    {
        id: "p2",
        name: "Kazentic",
        status: "ACTIVE",
        type: "Mobile App",
        progress: 85,
        isPrivate: true,
        iconInitial: "K",
        iconColor: "bg-blue-600",
        members: [
            { id: "m1", name: "John Doe", image: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" },
            { id: "m2", name: "Jane Smith", image: "https://ui-avatars.com/api/?name=Jane+Smith&background=118AB2&color=fff" },
            { id: "m5", name: "Ethan Hunt", image: "https://ui-avatars.com/api/?name=Ethan+Hunt&background=4361EE&color=fff" },
            { id: "m15", name: "Oscar Isaac", image: "https://ui-avatars.com/api/?name=Oscar+Isaac&background=7209B7&color=fff" }
        ]
    },
    {
        id: "p3",
        name: "Project Name",
        status: "ON_HOLD",
        type: "Internal Tool",
        progress: 40,
        iconInitial: "P",
        iconColor: "bg-orange-500",
        members: [
            { id: "m1", name: "John Doe" },
            { id: "m7", name: "George Miller" },
            { id: "m10", name: "Jenny Slate" },
            { id: "m15", name: "Oscar Isaac" }
        ]
    },
    {
        id: "p4",
        name: "Auth Gateway v3",
        status: "ACTIVE",
        type: "API",
        progress: 90,
        iconInitial: "A",
        iconColor: "bg-purple-600",
        members: [
            { id: "m15", name: "Oscar Isaac" },
            { id: "m16", name: "Liam Chen", image: "https://ui-avatars.com/api/?name=Liam+Chen&background=8338EC&color=fff" },
            { id: "m17", name: "Amara Patel", image: "https://ui-avatars.com/api/?name=Amara+Patel&background=FF0080&color=fff" }
        ]
    },
    {
        id: "p5",
        name: "Brand Identity Refresh",
        status: "COMPLETED",
        type: "Marketing Campaign",
        progress: 100,
        iconInitial: "B",
        iconColor: "bg-pink-500",
        members: [
            { id: "m2", name: "Jane Smith" },
            { id: "m5", name: "Ethan Hunt" },
            { id: "m7", name: "George Miller" }
        ]
    },
    {
        id: "p6",
        name: "Onboarding Flow Redesign",
        status: "ACTIVE",
        type: "Web App",
        progress: 60,
        iconInitial: "O",
        iconColor: "bg-indigo-500",
        members: [
            { id: "m1", name: "John Doe" },
            { id: "m2", name: "Jane Smith" },
            { id: "m10", name: "Jenny Slate" }
        ]
    },
    {
        id: "p7",
        name: "Data Pipeline Migration",
        status: "ACTIVE",
        type: "API",
        progress: 55,
        iconInitial: "D",
        iconColor: "bg-teal-600",
        members: [
            { id: "m15", name: "Oscar Isaac" },
            { id: "m16", name: "Liam Chen" },
            { id: "m18", name: "Sophia Kim", image: "https://ui-avatars.com/api/?name=Sophia+Kim&background=4361EE&color=fff" }
        ]
    },
    {
        id: "p8",
        name: "Annual Report Generator",
        status: "ON_HOLD",
        type: "Internal Tool",
        progress: 30,
        iconInitial: "R",
        iconColor: "bg-red-500",
        members: [
            { id: "m7", name: "George Miller" },
            { id: "m18", name: "Sophia Kim" },
            { id: "m19", name: "Diego Ruiz", image: "https://ui-avatars.com/api/?name=Diego+Ruiz&background=FF6B9D&color=fff" }
        ]
    },
    {
        id: "p9",
        name: "Customer Feedback Portal",
        status: "COMPLETED",
        type: "Web App",
        progress: 100,
        iconInitial: "C",
        iconColor: "bg-cyan-500",
        members: [
            { id: "m2", name: "Jane Smith" },
            { id: "m10", name: "Jenny Slate" },
            { id: "m17", name: "Amara Patel" }
        ]
    },
    {
        id: "p10",
        name: "AI Chat Support Integration",
        status: "ACTIVE",
        type: "Mobile App",
        progress: 25,
        iconInitial: "A",
        iconColor: "bg-violet-500",
        members: [
            { id: "m15", name: "Oscar Isaac" },
            { id: "m16", name: "Liam Chen" },
            { id: "m17", name: "Amara Patel" },
            { id: "m20", name: "Zara Khan", image: "https://ui-avatars.com/api/?name=Zara+Khan&background=9D4EDD&color=fff" }
        ]
    }
]

const COMMON_ACTIVITIES: Activity[] = [
    { id: 1, user: "John Doe", action: "commented \"Need Review on UI\"", target: "Krown DEX", date: "29 Jul, 2025" },
    { id: 2, user: "Jane Smith", action: "updated status to PROGRESS", target: "Krown DEX", date: "28 Jul, 2025" },
    { id: 3, user: "Ethan Hunt", action: "uploaded new wireframes", target: "Brand Identity Refresh", date: "27 Jul, 2025" },
    { id: 4, user: "Jenny Slate", action: "created support ticket #4210", target: "Customer Feedback Portal", date: "27 Jul, 2025" },
    { id: 5, user: "Oscar Isaac", action: "deployed v2.1 to staging", target: "Auth Gateway v3", date: "26 Jul, 2025" },
    { id: 6, user: "George Miller", action: "published campaign assets", target: "Brand Identity Refresh", date: "25 Jul, 2025" },
    { id: 7, user: "Liam Chen", action: "refactored API endpoints", target: "Data Pipeline Migration", date: "24 Jul, 2025" },
    { id: 8, user: "Amara Patel", action: "reviewed login flow prototype", target: "Onboarding Flow Redesign", date: "23 Jul, 2025" },
    { id: 9, user: "Sophia Kim", action: "initiated migration plan", target: "Data Pipeline Migration", date: "22 Jul, 2025" },
    { id: 10, user: "Diego Ruiz", action: "requested access to backend", target: "Annual Report Generator", date: "21 Jul, 2025" },
    { id: 11, user: "John Doe", action: "approved final design", target: "Customer Feedback Portal", date: "20 Jul, 2025" },
    { id: 12, user: "Zara Khan", action: "submitted AI model training data", target: "AI Chat Support Integration", date: "19 Jul, 2025" },
    { id: 13, user: "Jane Smith", action: "created style guide doc", target: "Brand Identity Refresh", date: "18 Jul, 2025" },
    { id: 14, user: "Oscar Isaac", action: "fixed authentication bug", target: "Auth Gateway v3", date: "17 Jul, 2025" },
    { id: 15, user: "George Miller", action: "launched social media campaign", target: "Brand Identity Refresh", date: "16 Jul, 2025" },
    { id: 16, user: "Jenny Slate", action: "resolved 12 user tickets", target: "Customer Feedback Portal", date: "15 Jul, 2025" },
    { id: 17, user: "Liam Chen", action: "added rate limiting", target: "Auth Gateway v3", date: "14 Jul, 2025" },
    { id: 18, user: "Amara Patel", action: "tested performance on iOS", target: "Kazentic", date: "13 Jul, 2025" },
    { id: 19, user: "Sophia Kim", action: "scheduled migration window", target: "Data Pipeline Migration", date: "12 Jul, 2025" },
    { id: 20, user: "Diego Ruiz", action: "submitted feature request", target: "Annual Report Generator", date: "11 Jul, 2025" }
]

export const TEAMS_DATA: Team[] = [
    {
        id: "team-1",
        name: "Product Development",
        description: "Lorem ipsum dolor sit amet consectetur. Viverra egestas. In in quis ut fringilla mi nibh dui.",
        initial: "P",
        stats: { totalProjects: 8, completedProjects: 4, activeMembers: 15 },
        members: [
            { id: "m1", name: "John Doe", role: "Product Manager", phone: "+880170-3454542", email: "john.doe@company.com", isHighlighted: true, image: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" },
            { id: "m2", name: "Jane Smith", role: "UX/UI Designer", phone: "+880170-3454543", email: "jane.smith@company.com", image: "https://ui-avatars.com/api/?name=Jane+Smith&background=118AB2&color=fff" },
            { id: "m3", name: "Marcus Lee", role: "Frontend Developer", phone: "+880170-3454544", email: "marcus.lee@company.com", image: "https://ui-avatars.com/api/?name=Marcus+Lee&background=0D5D28&color=fff" },
            { id: "m4", name: "Priya Nair", role: "Backend Developer", phone: "+880170-3454545", email: "priya.nair@company.com", image: "https://ui-avatars.com/api/?name=Priya+Nair&background=7D1D37&color=fff" },
            { id: "m5", name: "Ethan Hunt", role: "DevOps Engineer", phone: "+880170-3454555", email: "ethan.hunt@company.com", image: "https://ui-avatars.com/api/?name=Ethan+Hunt&background=4361EE&color=fff" },
            { id: "m6", name: "Luna Park", role: "QA Lead", phone: "+880170-3454556", email: "luna.park@company.com", image: "https://ui-avatars.com/api/?name=Luna+Park&background=3A0CA3&color=fff" },
            { id: "m7", name: "George Miller", role: "Product Designer", phone: "+880170-3454566", email: "george.miller@company.com", image: "https://ui-avatars.com/api/?name=George+Miller&background=FF6B9D&color=fff" }
        ],
        projects: COMMON_PROJECTS.slice(0, 6),
        activities: COMMON_ACTIVITIES.slice(0, 10)
    },
    {
        id: "team-2",
        name: "Design Systems",
        description: "Creating and maintaining the visual language of our products.",
        initial: "D",
        stats: { totalProjects: 5, completedProjects: 3, activeMembers: 6 },
        members: [
            { id: "m5", name: "Ethan Hunt", role: "Lead Designer", phone: "+880170-3454555", email: "ethan.hunt@company.com", image: "https://ui-avatars.com/api/?name=Ethan+Hunt&background=4361EE&color=fff" },
            { id: "m2", name: "Jane Smith", role: "Senior Designer", phone: "+880170-3454543", email: "jane.smith@company.com", image: "https://ui-avatars.com/api/?name=Jane+Smith&background=118AB2&color=fff" },
            { id: "m7", name: "George Miller", role: "Design Systems Lead", phone: "+880170-3454566", email: "george.miller@company.com", image: "https://ui-avatars.com/api/?name=George+Miller&background=FF6B9D&color=fff" },
            { id: "m10", name: "Jenny Slate", role: "UI Developer", phone: "+880170-3454577", email: "jenny.slate@company.com", image: "https://ui-avatars.com/api/?name=Jenny+Slate&background=4CC9F0&color=fff" },
            { id: "m8", name: "Yuki Tanaka", role: "Illustrator", phone: "+880170-3454580", email: "yuki.tanaka@company.com", image: "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=5C529C&color=fff" },
            { id: "m9", name: "Rafael Dias", role: "Motion Designer", phone: "+880170-3454581", email: "rafael.dias@company.com", image: "https://ui-avatars.com/api/?name=Rafael+Dias&background=D35F60&color=fff" }
        ],
        projects: COMMON_PROJECTS.slice(0, 3),
        activities: COMMON_ACTIVITIES.slice(10, 15)
    },
    {
        id: "team-3",
        name: "Marketing Ops",
        description: "Focused on growth, lead generation and brand awareness.",
        initial: "M",
        stats: { totalProjects: 7, completedProjects: 4, activeMembers: 12 },
        members: [
            { id: "m7", name: "George Miller", role: "Marketing Lead", phone: "+880170-3454566", email: "george.miller@company.com", image: "https://ui-avatars.com/api/?name=George+Miller&background=FF6B9D&color=fff" },
            { id: "m11", name: "Maya Williams", role: "Growth Marketer", phone: "+880170-3454585", email: "maya.williams@company.com", image: "https://ui-avatars.com/api/?name=Maya+Williams&background=EA593C&color=fff" },
            { id: "m12", name: "Tariq Ahmed", role: "Content Strategist", phone: "+880170-3454586", email: "tariq.ahmed@company.com", image: "https://ui-avatars.com/api/?name=Tariq+Ahmed&background=5B4195&color=fff" },
            { id: "m13", name: "Nina Cruz", role: "SEO Specialist", phone: "+880170-3454587", email: "nina.cruz@company.com", image: "https://ui-avatars.com/api/?name=Nina+Cruz&background=2D383F&color=fff" },
            { id: "m14", name: "Samir Khan", role: "Social Media Manager", phone: "+880170-3454588", email: "samir.khan@company.com", image: "https://ui-avatars.com/api/?name=Samir+Khan&background=9B6C56&color=fff" },
            { id: "m15", name: "Oscar Isaac", role: "Analytics Lead", phone: "+880170-3454588", email: "oscar.isaac@company.com", image: "https://ui-avatars.com/api/?name=Oscar+Isaac&background=7209B7&color=fff" }
        ],
        projects: COMMON_PROJECTS.slice(2, 7),
        activities: COMMON_ACTIVITIES.slice(5, 12)
    },
    {
        id: "team-4",
        name: "Customer Success",
        description: "Ensuring our customers get the most value out of our tool.",
        initial: "C",
        stats: { totalProjects: 6, completedProjects: 5, activeMembers: 14 },
        members: [
            { id: "m10", name: "Jenny Slate", role: "Support Lead", phone: "+880170-3454577", email: "jenny.slate@company.com", image: "https://ui-avatars.com/api/?name=Jenny+Slate&background=4CC9F0&color=fff" },
            { id: "m16", name: "Liam Chen", role: "Account Manager", phone: "+880170-3454590", email: "liam.chen@company.com", image: "https://ui-avatars.com/api/?name=Liam+Chen&background=8338EC&color=fff" },
            { id: "m17", name: "Amara Patel", role: "Customer Educator", phone: "+880170-3454591", email: "amara.patel@company.com", image: "https://ui-avatars.com/api/?name=Amara+Patel&background=FF0080&color=fff" },
            { id: "m18", name: "Sophia Kim", role: "Onboarding Specialist", phone: "+880170-3454592", email: "sophia.kim@company.com", image: "https://ui-avatars.com/api/?name=Sophia+Kim&background=4361EE&color=fff" },
            { id: "m19", name: "Diego Ruiz", role: "Feedback Analyst", phone: "+880170-3454593", email: "diego.ruiz@company.com", image: "https://ui-avatars.com/api/?name=Diego+Ruiz&background=FF6B9D&color=fff" },
            { id: "m20", name: "Zara Khan", role: "CS Manager", phone: "+880170-3454594", email: "zara.khan@company.com", image: "https://ui-avatars.com/api/?name=Zara+Khan&background=9D4EDD&color=fff" },
            { id: "m21", name: "Chloe Evans", role: "Success Coordinator", phone: "+880170-3454595", email: "chloe.evans@company.com", image: "https://ui-avatars.com/api/?name=Chloe+Evans&background=00B094&color=fff" }
        ],
        projects: COMMON_PROJECTS.slice(1, 4),
        activities: COMMON_ACTIVITIES.slice(3, 9)
    },
    {
        id: "team-5",
        name: "Backend Engineering",
        description: "Scalable architecture and API development for core services.",
        initial: "B",
        stats: { totalProjects: 9, completedProjects: 7, activeMembers: 18 },
        members: [
            { id: "m15", name: "Oscar Isaac", role: "Backend Lead", phone: "+880170-3454588", email: "oscar.isaac@company.com", image: "https://ui-avatars.com/api/?name=Oscar+Isaac&background=7209B7&color=fff" },
            { id: "m16", name: "Liam Chen", role: "Senior Backend", phone: "+880170-3454590", email: "liam.chen@company.com", image: "https://ui-avatars.com/api/?name=Liam+Chen&background=8338EC&color=fff" },
            { id: "m17", name: "Amara Patel", role: "API Engineer", phone: "+880170-3454591", email: "amara.patel@company.com", image: "https://ui-avatars.com/api/?name=Amara+Patel&background=FF0080&color=fff" },
            { id: "m18", name: "Sophia Kim", role: "DevOps Engineer", phone: "+880170-3454592", email: "sophia.kim@company.com", image: "https://ui-avatars.com/api/?name=Sophia+Kim&background=4361EE&color=fff" },
            { id: "m22", name: "Felix Wright", role: "Database Architect", phone: "+880170-3454596", email: "felix.wright@company.com", image: "https://ui-avatars.com/api/?name=Felix+Wright&background=69436B&color=fff" },
            { id: "m23", name: "Aisha Johnson", role: "Microservices Lead", phone: "+880170-3454597", email: "aisha.johnson@company.com", image: "https://ui-avatars.com/api/?name=Aisha+Johnson&background=9779C8&color=fff" },
            { id: "m24", name: "Kevin Okafor", role: "Security Engineer", phone: "+880170-3454598", email: "kevin.okafor@company.com", image: "https://ui-avatars.com/api/?name=Kevin+Okafor&background=2D2D5A&color=fff" },
            { id: "m25", name: "Nina Kim", role: "CI/CD Specialist", phone: "+880170-3454599", email: "nina.kim@company.com", image: "https://ui-avatars.com/api/?name=Nina+Kim&background=3D4DB6&color=fff" },
            { id: "m26", name: "Mateo Silva", role: "Cloud Architect", phone: "+880170-3454600", email: "mateo.silva@company.com", image: "https://ui-avatars.com/api/?name=Mateo+Silva&background=195B44&color=fff" }
        ],
        projects: COMMON_PROJECTS,
        activities: COMMON_ACTIVITIES.slice(8, 18)
    }
]

// Add one more team for completeness
export const TEAMS_DATA_WITH_EXTRA: Team[] = [
    ...TEAMS_DATA,
    {
        id: "team-6",
        name: "QA & Automation",
        description: "Ensuring product quality through automated testing and CI/CD practices.",
        initial: "Q",
        stats: { totalProjects: 5, completedProjects: 4, activeMembers: 8 },
        members: [
            { id: "m6", name: "Luna Park", role: "QA Lead", phone: "+880170-3454556", email: "luna.park@company.com", image: "https://ui-avatars.com/api/?name=Luna+Park&background=3A0CA3&color=fff" },
            { id: "m27", name: "Arjun Mehta", role: "Test Automation", phone: "+880170-3454601", email: "arjun.mehta@company.com", image: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=B31E4B&color=fff" },
            { id: "m28", name: "Clara Chen", role: "Performance Tester", phone: "+880170-3454602", email: "clara.chen@company.com", image: "https://ui-avatars.com/api/?name=Clara+Chen&background=350C25&color=fff" },
            { id: "m29", name: "Ricardo Mendes", role: "Security QA", phone: "+880170-3454603", email: "ricardo.mendes@company.com", image: "https://ui-avatars.com/api/?name=Ricardo+Mendes&background=7C2929&color=fff" },
            { id: "m30", name: "Yasmin Al-Farsi", role: "Automation Engineer", phone: "+880170-3454604", email: "yasmin.al-farsi@company.com", image: "https://ui-avatars.com/api/?name=Yasmin+Al-Farsi&background=3E5749&color=fff" }
        ],
        projects: COMMON_PROJECTS.slice(0, 5),
        activities: COMMON_ACTIVITIES.slice(1, 6)
    }
]