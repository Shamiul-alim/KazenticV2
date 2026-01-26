// data/employees.ts
export type Employee = {
    id: number
    name: string
    email: string
    phone: string
    designation: string
    position: "Full-Time" | "Part-Time" | "Contract"
    joiningDate: string
    status: "ACTIVE" | "INACTIVE"
}

export const employees: Employee[] = [
    {
        id: 1,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "Backend Developer",
        position: "Full-Time",
        joiningDate: "11/11/2025",
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "Designer",
        position: "Full-Time",
        joiningDate: "11/11/2025",
        status: "ACTIVE",
    },
    {
        id: 3,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "Project Manager",
        position: "Full-Time",
        joiningDate: "11/11/2025",
        status: "ACTIVE",
    },
    {
        id: 4,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "Frontend Developer",
        position: "Full-Time",
        joiningDate: "11/11/2025",
        status: "ACTIVE",
    },
    {
        id: 5,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "DevOps Engineer",
        position: "Full-Time",
        joiningDate: "11/11/2025",
        status: "ACTIVE",
    },
    ...Array.from({ length: 15 }).map((_, i) => ({
        id: i + 6,
        name: "Pat Cummins",
        email: "email@gmail.com",
        phone: "+8802634585696",
        designation: "Developer",
        position: "Full-Time" as const,
        joiningDate: "11/11/2025",
        status: (i % 2 === 0 ? "INACTIVE" : "ACTIVE") as "ACTIVE" | "INACTIVE",
    })),
]
