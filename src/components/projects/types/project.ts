export type ProjectStatus = {
    id: string
    name: string
    color: string
}

export type ProjectType = {
    id: string
    name: string
    color: string
}

export type ProjectMember = {
    id: string
    name: string
    avatarUrl?: string
}

export type Project = {
    id: string
    name: string
    status: ProjectStatus
    type: ProjectType
    progress: number
    startDate: string
    endDate?: string
    isPrivate: boolean
    members: ProjectMember[]
}
