"use client"

import * as React from "react"
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    ChevronDown
} from "lucide-react"
import moment from "moment"
import { cn } from "@/lib/utils"

export const CustomDatePicker = () => {
    const today = moment("2026-01-21") // Mocking "now" from metadata: Jan 21, 2026
    const [viewDate, setViewDate] = React.useState(moment(today).startOf('month'))
    const [selectedDate, setSelectedDate] = React.useState(moment(today))

    const monthNames = moment.monthsShort()
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"]

    const currentYear = viewDate.year()
    const currentMonth = viewDate.month()

    const prevMonth = () => setViewDate(viewDate.clone().subtract(1, 'month'))
    const nextMonth = () => setViewDate(viewDate.clone().add(1, 'month'))
    const prevYear = () => setViewDate(viewDate.clone().subtract(1, 'year'))
    const nextYear = () => setViewDate(viewDate.clone().add(1, 'year'))

    // Generate calendar grid
    const days = []
    const totalDays = viewDate.daysInMonth()
    const firstDay = viewDate.clone().startOf('month').day()

    // Previous month filler
    const prevMonthDate = viewDate.clone().subtract(1, 'month')
    const prevMonthDays = prevMonthDate.daysInMonth()

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, current: false })
    }

    // Current month
    for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, current: true })
    }

    // Next month filler
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
        days.push({ day: i, current: false })
    }

    const quickOptions = [
        { label: "Today", value: "Wed", date: moment(today) },
        { label: "Tomorrow", value: "Thu", date: moment(today).add(1, 'days') },
        { label: "Later", value: "1:54 pm", date: moment(today).add(2, 'days') },
        { label: "This weekend", value: "Sat", date: moment(today).day(6) },
        { label: "Next Week", value: "Mon", date: moment(today).add(1, 'weeks').startOf('isoWeek') },
        { label: "2 Weeks", value: moment(today).add(14, 'days').format("MMM DD"), date: moment(today).add(14, 'days') },
    ]

    const handleSelectDate = (day: number) => {
        const newDate = viewDate.clone().date(day)
        setSelectedDate(newDate)
    }

    const isToday = (day: number, isCurrent: boolean) => {
        if (!isCurrent) return false
        const checkDate = viewDate.clone().date(day)
        return checkDate.isSame(today, 'day')
    }

    const isSelected = (day: number, isCurrent: boolean) => {
        if (!isCurrent) return false
        const checkDate = viewDate.clone().date(day)
        return checkDate.isSame(selectedDate, 'day')
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col w-[540px] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Top Inputs */}
            <div className="flex border-b border-gray-100">
                <div className="flex-1 p-2 border-r border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-1.5 group hover:border-blue-400 transition-colors cursor-pointer" onClick={() => setSelectedDate(moment(today))}>
                        <CalendarIcon size={16} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-600">Today</span>
                    </div>
                </div>
                <div className="flex-1 p-2">
                    <div className="flex items-center gap-2 bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-1.5 group hover:border-blue-400 transition-colors cursor-pointer" onClick={() => setSelectedDate(moment(today).add(1, 'd'))}>
                        <CalendarIcon size={16} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-600">Tomorrow</span>
                    </div>
                </div>
            </div>

            <div className="flex h-[320px]">
                {/* Left Pane: Quick Selection */}
                <div className="w-[200px] border-r border-gray-100 py-2">
                    {quickOptions.map((opt, i) => {
                        const active = selectedDate.isSame(opt.date, 'day')
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setSelectedDate(opt.date)
                                    setViewDate(opt.date.clone().startOf('month'))
                                }}
                                className={cn(
                                    "px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors",
                                    active ? "bg-blue-50/50 text-blue-600" : "text-gray-500 hover:bg-gray-50"
                                )}
                            >
                                <span className="text-[13px] font-bold">{opt.label}</span>
                                <span className={cn("text-[12px] font-medium", active ? "text-blue-500" : "text-gray-400")}>{opt.value}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Right Pane: Calendar */}
                <div className="flex-1 p-4 flex flex-col">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                                <span className="font-bold text-gray-700 text-sm">{viewDate.format("MMM")}</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                            <div className="flex items-center gap-4">
                                <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={prevMonth} />
                                <ChevronRight size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={nextMonth} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                                <span className="font-bold text-gray-700 text-sm">{currentYear}</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                            <div className="flex items-center gap-4">
                                <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={prevYear} />
                                <ChevronRight size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={nextYear} />
                            </div>
                        </div>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 mb-2">
                        {dayNames.map(day => (
                            <div key={day} className="text-center text-[12px] font-bold text-gray-400 h-8 flex items-center justify-center">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-7 flex-1">
                        {days.map((item, i) => {
                            const isSelectedDate = isSelected(item.day, item.current)
                            const isTodayDate = isToday(item.day, item.current)

                            return (
                                <div
                                    key={i}
                                    onClick={() => item.current && handleSelectDate(item.day)}
                                    className={cn(
                                        "h-9 flex items-center justify-center text-[13px] font-bold cursor-pointer transition-all rounded-full m-0.5 relative",
                                        isSelectedDate ? "bg-blue-600 text-white shadow-lg shadow-blue-200 z-10" :
                                            item.current ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600" : "text-gray-300",
                                        isTodayDate && !isSelectedDate && "text-blue-600"
                                    )}
                                >
                                    {item.day}
                                    {isTodayDate && !isSelectedDate && (
                                        <div className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Footer shadow fade */}
            <div className="h-2 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
        </div>
    )
}
