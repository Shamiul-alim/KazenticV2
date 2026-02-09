'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, useEffect } from 'react'
import { TimelineEngine, useTimelineEngine, ZoomLevel } from './workload-engine'
import dayjs from 'dayjs'

export type WorkloadUnit = 'sprint-points' | 'tasks' | 'time-estimates'
export type GroupByOption = 'Status' | 'Assignee' | 'Priority' | 'Tags' | 'Due Date' | 'Task Type'
export type SortOrder = 'Ascending' | 'Descending'

type UserWorkload = {
    userId: string
    date: string
    workloadHours: number
}

type WorkloadContextType = {
    expandedUsers: Set<string>
    toggleUser: (userId: string) => void

    isCollapsed: boolean
    toggleCollapsed: () => void

    zoom: ZoomLevel
    setZoom: (zoom: ZoomLevel) => void
    zoomIn: () => void
    zoomOut: () => void

    cellWidth: number
    cellHeight: number

    engine: TimelineEngine
    setEngine: Dispatch<TimelineEngine>

    shiftPrev: () => void
    shiftNext: () => void
    getDateRange: () => string
    jumpToToday: () => void
    refreshKey: number

    unit: WorkloadUnit
    setUnit: (unit: WorkloadUnit) => void

    data: UserWorkload[]
    setData: Dispatch<UserWorkload[]>

    groupBy: GroupByOption
    setGroupBy: (groupBy: GroupByOption) => void

    sortOrder: SortOrder
    setSortOrder: (sortOrder: SortOrder) => void
}

const WorkloadContext = createContext<WorkloadContextType | undefined>(undefined)

export function WorkloadProvider({ children }: { children: ReactNode }) {
    const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const [engine, setEngine] = useState<TimelineEngine>(
        useTimelineEngine(
            {
                startDate: dayjs().format('YYYY-MM-DD'),
                endDate: dayjs().add(99, 'day').format('YYYY-MM-DD'),
            },
            "14_days"
        )
    )
    const [zoom, setZoom] = useState<ZoomLevel>('14_days')
    const [cellWidth, setCellWidth] = useState(engine.getCellWidth())
    const [cellHeight, setCellHeight] = useState(engine.getRowHeight())
    const [unit, setUnit] = useState<WorkloadUnit>('time-estimates')
    const [data, setData] = useState<UserWorkload[]>([])
    const [groupBy, setGroupBy] = useState<GroupByOption>('Assignee')
    const [sortOrder, setSortOrder] = useState<SortOrder>('Ascending')

    useEffect(() => {
        engine.setZoom(zoom)
        setCellWidth(engine.getCellWidth())
        // setCellHeight(engine.getRowHeight())
    }, [zoom, engine])

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

    const zoomIn = () => {
        switch (zoom) {
            case 'months':
                setZoom('weeks')
                break
            case 'weeks':
                setZoom('days')
                break
            case 'days':
                setZoom('14_days')
                break
            case '14_days':
                setZoom('7_days')
                break
            default:
                break
        }
    }

    const zoomOut = () => {
        switch (zoom) {
            case '7_days':
                setZoom('14_days')
                break
            case '14_days':
                setZoom('days')
                break
            case 'days':
                setZoom('weeks')
                break
            case 'weeks':
                setZoom('months')
                break
            default:
                break
        }
    }

    const shiftPrev = () => {
        engine.shift('prev')
        setRefreshKey(prev => prev + 1)
    }

    const shiftNext = () => {
        engine.shift('next')
        setRefreshKey(prev => prev + 1)
    }

    const getDateRange = () => {
        const window = engine.getWindow()
        const start = dayjs(window.startDate)
        const end = dayjs(window.endDate)

        // Format as "Jan 8 - 22" if same month, otherwise "Jan 8 - Feb 5"
        if (start.month() === end.month()) {
            return `${start.format('MMM D')} - ${end.format('D')}`
        } else {
            return `${start.format('MMM D')} - ${end.format('MMM D')}`
        }
    }

    const jumpToToday = () => {
        engine.jumpTo(dayjs().format('YYYY-MM-DD'))
        setRefreshKey(prev => prev + 1)
    }

    return (
        <WorkloadContext.Provider value={{
            expandedUsers,
            toggleUser,
            isCollapsed,
            toggleCollapsed,
            zoom,
            setZoom,
            zoomIn,
            zoomOut,
            cellWidth,
            cellHeight,
            engine,
            setEngine,
            shiftPrev,
            shiftNext,
            getDateRange,
            jumpToToday,
            refreshKey,
            unit,
            setUnit,
            data,
            setData,
            groupBy,
            setGroupBy,
            sortOrder,
            setSortOrder,
        }}>
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
