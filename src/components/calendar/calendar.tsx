"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Settings, Plus, User } from 'lucide-react';
import moment from 'moment';
import WeeklyView from './calendar-ui/WeeklyView';
import MonthlyView from './calendar-ui/MonthlyView';
import YearlyView from './calendar-ui/YearlyView';
import ScheduleView from './calendar-ui/ScheduleView';
import DayView from './calendar-ui/DayView';
import FourDayView from './calendar-ui/FourDayView';
import { AssigneeSidebar } from '../sprint-report/list/AssigneeSidebar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/sprint-report/ui/popover";
import { EventDetailsModal } from './calendar-ui/EventDetailsModal';
import { EventSettings } from './settings/EventSettings';
import { CreateEventSidebar } from './calendar-ui/CreateEventSidebar';
import { ScheduleMeetingModal } from './calendar-ui/ScheduleMeetingModal';

export default function Calendar() {
    const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [view, setView] = useState("Day");
    const [currentDate, setCurrentDate] = useState(moment());
    const [showSettings, setShowSettings] = useState(false);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
    const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);

    const handlePrev = () => {
        if (view === "Day") setCurrentDate(prev => moment(prev).subtract(1, 'days'));
        else if (view === "Week") setCurrentDate(prev => moment(prev).subtract(1, 'weeks'));
        else if (view === "Month") setCurrentDate(prev => moment(prev).subtract(1, 'months'));
        else if (view === "Schedule") setCurrentDate(prev => moment(prev).subtract(2, 'months'));
        else if (view === "Year") setCurrentDate(prev => moment(prev).subtract(1, 'years'));
        else if (view === "4 Days") setCurrentDate(prev => moment(prev).subtract(4, 'days'));
    };

    const handleNext = () => {
        if (view === "Day") setCurrentDate(prev => moment(prev).add(1, 'days'));
        else if (view === "Week") setCurrentDate(prev => moment(prev).add(1, 'weeks'));
        else if (view === "Month") setCurrentDate(prev => moment(prev).add(1, 'months'));
        else if (view === "Schedule") setCurrentDate(prev => moment(prev).add(2, 'months'));
        else if (view === "Year") setCurrentDate(prev => moment(prev).add(1, 'years'));
        else if (view === "4 Days") setCurrentDate(prev => moment(prev).add(4, 'days'));
    };

    const getHeaderText = () => {
        if (view === "Day") return currentDate.format("ddd, MMM D");
        if (view === "Week") {
            const start = moment(currentDate).startOf('week');
            const end = moment(currentDate).endOf('week');
            return `${start.format("MMM D")} - ${end.format("MMM D")}`;
        }
        if (view === "Month") return currentDate.format("MMMM YYYY");
        if (view === "Year") return currentDate.format("YYYY");
        if (view === "Schedule") {
            const endMonth = moment(currentDate).add(1, 'months');
            return `${currentDate.format("MMM")} - ${endMonth.format("MMM YYYY")}`;
        }
        if (view === "4 Days") {
            const end = moment(currentDate).add(3, 'days');
            return `${currentDate.format("MMM D")} - ${end.format("MMM D")}`;
        }
        return currentDate.format("YYYY");
    };

    const viewOptions = [
        "Day", "Week", "Month", "Year", "4 Days", "Schedule", "Custom"
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-white text-gray-800 font-sans">
            {showSettings ? (
                <EventSettings onBack={() => setShowSettings(false)} />
            ) : (
                <>
                    {/* 1. HEADER */}
                    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 gap-4 shrink-0 bg-white">

                        {/* Left Controls */}
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start">

                            {/* Today Button */}
                            <button
                                onClick={() => setCurrentDate(moment())}
                                className="px-4 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm transition-all"
                            >
                                Today
                            </button>

                            {/* Day Dropdown (View Switcher) */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm transition-all">
                                        {view}
                                        <ChevronLeft size={14} className="-rotate-90 text-gray-400" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-1 w-[120px] bg-white border border-gray-100 shadow-xl rounded-lg" align="start">
                                    <div className="flex flex-col">
                                        {viewOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setView(option)}
                                                className={`
                                            px-3 py-2 text-xs font-medium text-left rounded-md transition-colors
                                            ${view === option ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Date Navigation Group */}
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm p-0.5">
                                <button
                                    onClick={handlePrev}
                                    className="p-1 hover:bg-gray-50 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="px-3 text-sm font-bold text-gray-600 whitespace-nowrap min-w-[90px] text-center">
                                    {getHeaderText()}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="p-1 hover:bg-gray-50 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm whitespace-nowrap transition-all">
                                <Filter size={14} className="text-gray-500" />
                                <span className="hidden sm:inline">Filter</span>
                            </button>

                            <button
                                onClick={() => setIsAssigneeOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm whitespace-nowrap transition-all"
                            >
                                <User size={14} className="text-gray-500" />
                                <span className="hidden sm:inline">Assignees</span>
                            </button>

                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm whitespace-nowrap transition-all"
                            >
                                <Settings size={14} className="text-gray-500" />
                                <span className="hidden sm:inline">Settings</span>
                            </button>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#3b82f6] text-white rounded-lg hover:bg-blue-700 shadow-sm whitespace-nowrap transition-all ml-auto md:ml-0">
                                        <span className="hidden sm:inline">Create</span>
                                        <span className="sm:hidden">New</span>
                                        <ChevronLeft className="-rotate-90 text-white/80 hidden sm:block" size={12} />
                                        <Plus className="sm:hidden" size={16} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-[200px] bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden" align="end" sideOffset={8}>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => setIsCreateEventOpen(true)}
                                            className="px-4 py-3 text-[13px] font-bold text-slate-400 bg-white hover:bg-slate-50 transition-colors text-left w-full"
                                        >
                                            Event
                                        </button>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className="flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-blue-600 bg-blue-50/30 hover:bg-blue-50 transition-colors group w-full"
                                                >
                                                    Meeting
                                                    <ChevronRight size={18} className="text-blue-500 transition-transform group-hover:translate-x-0.5" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-[180px] bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden" align="end" side="left" sideOffset={12}>
                                                <div className="flex flex-col">
                                                    <div className="px-4 py-3 text-[14px] font-bold text-slate-400 bg-white">
                                                        Instant Meeting
                                                    </div>
                                                    <button
                                                        onClick={() => setIsScheduleMeetingOpen(true)}
                                                        className="flex items-center justify-start px-4 py-3.5 text-[15px] font-semibold text-blue-600 bg-blue-50/30 hover:bg-blue-50 transition-colors w-full"
                                                    >
                                                        Schedule a Meeting
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </header>

                    {/* 2. SCROLLABLE CONTENT */}
                    <div className="flex-1 overflow-hidden relative">
                        {view === "Day" ? (
                            <DayView onEventClick={setSelectedEvent} currentDate={currentDate} />
                        ) : view === "Week" ? (
                            <div className="h-full">
                                <WeeklyView onEventClick={setSelectedEvent} currentDate={currentDate} />
                            </div>
                        ) : view === "Month" ? (
                            <div className="h-full">
                                <MonthlyView onEventClick={setSelectedEvent} currentDate={currentDate} />
                            </div>
                        ) : view === "Year" ? (
                            <div className="h-full">
                                <YearlyView
                                    currentDate={currentDate}
                                    onMonthClick={(m) => {
                                        // Optionally switch to Month view when a month is clicked
                                        // setView("Month");
                                    }} />
                            </div>
                        ) : view === "Schedule" ? (
                            <div className="h-full">
                                <ScheduleView
                                    onEventClick={setSelectedEvent} currentDate={currentDate} />
                            </div>
                        ) : view === "4 Days" ? (
                            <div className="h-full">
                                <FourDayView onEventClick={setSelectedEvent} currentDate={currentDate} />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 font-medium">
                                {view} View Coming Soon
                            </div>
                        )}
                    </div>
                    <AssigneeSidebar
                        isOpen={isAssigneeOpen}
                        onClose={() => setIsAssigneeOpen(false)}
                    />
                    <EventDetailsModal
                        isOpen={!!selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                        event={selectedEvent}
                    />
                    <CreateEventSidebar
                        isOpen={isCreateEventOpen}
                        onClose={() => setIsCreateEventOpen(false)}
                    />
                    <ScheduleMeetingModal
                        isOpen={isScheduleMeetingOpen}
                        onClose={() => setIsScheduleMeetingOpen(false)}
                    />
                </>
            )}
        </div>
    );
}