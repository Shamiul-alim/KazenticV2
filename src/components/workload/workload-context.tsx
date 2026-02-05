'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type WorkloadContextType = {
    expandedUsers: Set<string>
    toggleUser: (userId: string) => void
    isCollapsed: boolean
    toggleCollapsed: () => void
}

const WorkloadContext = createContext<WorkloadContextType | undefined>(undefined)

export function WorkloadProvider({ children }: { children: ReactNode }) {
    const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleUser = (userId: string) => {
        setExpandedUsers(prev => {
            const next = new Set(prev)
            if (next.has(userId)) {
                next.delete(userId)
            } else {
                next.add(userId)
            }
            return next
        })
    }

    const toggleCollapsed = () => {
        setIsCollapsed(prev => !prev)
    }

    return (
        <WorkloadContext.Provider value={{ expandedUsers, toggleUser, isCollapsed, toggleCollapsed }}>
            {children}
        </WorkloadContext.Provider>
    )
}

export function useWorkload() {
    const context = useContext(WorkloadContext)
    if (!context) {
        throw new Error('useWorkload must be used within WorkloadProvider')
    }
    return context
}
