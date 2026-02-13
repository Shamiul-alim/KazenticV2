export type Subtask = {
    id: string
    name: string
    loggedHours?: string
}

export type User = {
    id: string
    name: string
    role?: string
    avatar?: string | null
    loggedHours?: string
    subtasks?: Subtask[]
}