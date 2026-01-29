import { Users, User, Briefcase, DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react"

export interface PayrollStat {
    label: string
    value: string | number
    icon: any
    iconClassName: string
    bgClassName: string
}

export const payrollStatsData: PayrollStat[] = [
    {
        label: "Total Employees",
        value: "24",
        icon: Users,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Full-Time Employees",
        value: "24",
        icon: User,
        iconClassName: "text-indigo-600",
        bgClassName: "bg-indigo-50"
    },
    {
        label: "Contractual Employees",
        value: "24",
        icon: Briefcase,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Average Monthly Payroll",
        value: "24",
        icon: DollarSign,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Paid This Month",
        value: "24",
        icon: CheckCircle,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Overdue Reviews",
        value: "24",
        icon: AlertCircle,
        iconClassName: "text-indigo-600",
        bgClassName: "bg-indigo-50"
    }
]

export const payrollTrendData = [
    {
        name: "Jan",
        total: 260000,
        fullTime: 170000,
        contractual: 120000,
    },
    {
        name: "Feb",
        total: 300000,
        fullTime: 230000,
        contractual: 150000,
    },
    {
        name: "Mar",
        total: 320000,
        fullTime: 250000,
        contractual: 155000,
    },
    {
        name: "Apr",
        total: 260000,
        fullTime: 215000,
        contractual: 300000,
    },
    {
        name: "May",
        total: 160000,
        fullTime: 80000,
        contractual: 240000,
    },
    {
        name: "Jun",
        total: 290000,
        fullTime: 225000,
        contractual: 320000,
    },
]

export const employmentDistributionData = [
    { name: "Full Time", value: 3, color: "#C084FC" }, // purple
    { name: "Part Time", value: 4, color: "#6EE7B7" }, // green active
    { name: "Contract", value: 6, color: "#A78BFA" }, // indigo/purple
]

export const paymentStatusData = [
    { name: "Paid", value: 116, color: "#6EE7B7" }, // green
    { name: "Pending", value: 126, color: "#FCD34D" }, // yellow/orange
]

export type Employee = {
    id: string
    name: string
    avatar: string
    designation: string
    position: "Full-Time" | "Part-Time" | "Contract"
    email: string
    number: string
    joiningDate: string
    salary: string
    status: "PAID" | "PENDING" | "OVERDUE"
    approval: "COMPLETED" | "HR Review" | "Finance Review" | "Director Approval"
}

export const employeePayrollData: Employee[] = [
    {
        id: "1",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Full-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PAID",
        approval: "COMPLETED"
    },
    {
        id: "2",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Part-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PENDING",
        approval: "HR Review"
    },
    {
        id: "3",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Contract",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "OVERDUE",
        approval: "Finance Review"
    },
    {
        id: "4",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Full-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PAID",
        approval: "Director Approval"
    },
    {
        id: "5",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Full-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PAID",
        approval: "COMPLETED"
    },
    {
        id: "6",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Full-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PAID",
        approval: "COMPLETED"
    },
    {
        id: "7",
        name: "Pat Cummins",
        avatar: "P",
        designation: "Senior Developer",
        position: "Full-Time",
        email: "john@gmail.com",
        number: "01823834849",
        joiningDate: "11/12/2024",
        salary: "$3000",
        status: "PAID",
        approval: "COMPLETED"
    }
]

export const salaryRevisionStats = [
    {
        label: "Total Pending",
        value: "24",
        icon: Clock,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Avg. Processing",
        value: "24",
        icon: User,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "Total Amount",
        value: "24",
        icon: DollarSign,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    },
    {
        label: "High Priority",
        value: "24",
        icon: AlertCircle,
        iconClassName: "text-blue-600",
        bgClassName: "bg-blue-50"
    }
]

export type ApprovalItem = {
    id: string
    name: string
    avatar: string
    designation: string
    submissionDate: string
    priority: "High" | "Medium"
    status: "HR Review" | "Finance Review" | "Direct Approval"
    amount: string
    payPeriod: string
    netPay: string
    salaryBreakdown: {
        basicSalary: string
        allowances: string
        overtime: string
        deductions: string
        netPay: string
    }
    submittedBy: string
}

export const pendingApprovalsData: ApprovalItem[] = [
    {
        id: "1",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "High",
        status: "HR Review",
        amount: "$ 90,000",
        payPeriod: "August 2025",
        netPay: "$90,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$90,015"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "2",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "High",
        status: "HR Review",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "3",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Finance Review",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "4",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Finance Review",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "5",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Finance Review",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "6",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Direct Approval",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "7",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Direct Approval",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    },
    {
        id: "8",
        name: "John Doe",
        avatar: "JD",
        designation: "Senior Developer",
        submissionDate: "2024-12-15",
        priority: "Medium",
        status: "Direct Approval",
        amount: "$ 83,000",
        payPeriod: "August 2025",
        netPay: "$75,000",
        salaryBreakdown: {
            basicSalary: "$83,000",
            allowances: "+$14.9",
            overtime: "+$14.9",
            deductions: "-$14.9",
            netPay: "$15"
        },
        submittedBy: "Sarah Wilson"
    }
]
export const defaultPaymentHistory = [
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
    { id: "INV-2025-01", date: "Aug 22, 2205", type: "Salary", amount: "$23,000", status: "PAID" },
]

export const defaultUserInfo = {
    firstName: "Pat",
    lastName: "Cummins",
    designation: "Software Developer",
    position: "Full-Time",
    email: "John",
    phone: "+88037474478459",
    bankName: "John",
    branchName: "Doe",
    accountHolderName: "John Doe",
    accountNumber: "99234545735",
    routingNumber: "99234545735",
    swiftCode: "99234545735",
    stats: {
        totalPaid: 24,
        totalUnpaid: 24,
        totalFine: 24
    }
}
