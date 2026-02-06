'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, useEffect } from 'react'
import { TimelineEngine, useTimelineEngine, ZoomLevel } from './workload-engine'
import dayjs from 'dayjs'

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
}

const WorkloadContext = createContext<WorkloadContextType | undefined>(undefined)

export function WorkloadProvider({ children }: { children: ReactNode }) {
    const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())
    const [isCollapsed, setIsCollapsed] = useState(false)
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

    useEffect(() => {
        engine.setZoom(zoom)
        setCellWidth(engine.getCellWidth())
        // setCellHeight(engine.getRowHeight())
        console.log("debug", zoom);
        console.log("debug", engine.getCellWidth());
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
            setEngine
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
