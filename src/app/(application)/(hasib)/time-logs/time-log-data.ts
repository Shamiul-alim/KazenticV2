export type TimeLogUser = {
    id: number
    name: string
    avatar?: string
    capacity: number
    allocations: TimeLog[]
    totalCapacity: number
    totalPercentage: number
}

export type TimeLog = {
    id: number
    date: string
    trackedHours: number
    billableHours: number
    nonBillableHours: number
    remainingCapacity: number
    percentage: number
}

export const TIME_LOG_DATA: TimeLogUser[] = [
    {
        id: 1,
        name: "Alif Hassan",
        capacity: 45,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 45, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 45, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 45, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 45, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 45, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 22.5, billableHours: 22.5, nonBillableHours: 0, remainingCapacity: 22.5, percentage: 50 },
            { id: 7, date: "19/2/2026", trackedHours: 22.5, billableHours: 22.5, nonBillableHours: 0, remainingCapacity: 22.5, percentage: 50 },
        ],
        totalCapacity: 45,
        totalPercentage: 50,
    },
    {
        id: 2,
        name: "John Doe",
        capacity: 40,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 20, billableHours: 20, nonBillableHours: 0, remainingCapacity: 20, percentage: 50 },
            { id: 7, date: "19/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 40, percentage: 0 },
        ],
        totalCapacity: 40,
        totalPercentage: 50,
    },
    {
        id: 3,
        name: "Jane Smith",
        capacity: 30,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 15, billableHours: 15, nonBillableHours: 0, remainingCapacity: 15, percentage: 50 },
            { id: 7, date: "19/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 30, percentage: 0 },
        ],
        totalCapacity: 30,
        totalPercentage: 50,
    },
    {
        id: 4,
        name: "Bob Johnson",
        capacity: 20,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 10, billableHours: 10, nonBillableHours: 0, remainingCapacity: 10, percentage: 50 },
            { id: 7, date: "19/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 20, percentage: 0 },
        ],
        totalCapacity: 20,
        totalPercentage: 50,
    },
    {
        id: 5,
        name: "Alice Williams",
        capacity: 25,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 25, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 25, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 25, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 25, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 25, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 12, billableHours: 12, nonBillableHours: 0, remainingCapacity: 13, percentage: 48 },
            { id: 7, date: "19/2/2026", trackedHours: 13, billableHours: 13, nonBillableHours: 0, remainingCapacity: 12, percentage: 52 },
        ],
        totalCapacity: 25,
        totalPercentage: 52,
    },
    {
        id: 6,
        name: "Charlie Brown",
        capacity: 35,
        allocations: [
            { id: 1, date: "13/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 35, percentage: 0 },
            { id: 2, date: "14/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 35, percentage: 0 },
            { id: 3, date: "15/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 35, percentage: 0 },
            { id: 4, date: "16/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 35, percentage: 0 },
            { id: 5, date: "17/2/2026", trackedHours: 0, billableHours: 0, nonBillableHours: 0, remainingCapacity: 35, percentage: 0 },
            { id: 6, date: "18/2/2026", trackedHours: 18, billableHours: 18, nonBillableHours: 0, remainingCapacity: 17, percentage: 51 },
            { id: 7, date: "19/2/2026", trackedHours: 17, billableHours: 17, nonBillableHours: 0, remainingCapacity: 18, percentage: 49 },
        ],
        totalCapacity: 35,
        totalPercentage: 51,
    }
]
