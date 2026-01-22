
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Filter,
    Users,
    Settings,
    Plus
} from "lucide-react"
import { Button } from "@/components/sprint-report/ui/button"

export const CalendarHeader = () => {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                    <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white rounded-md shadow-sm">
                        Today
                    </button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
                        Day
                        <ChevronDown size={12} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-bold text-gray-800">Mon, Aug 1</span>
                    <button className="p-1.5 hover:bg-gray-50 rounded-md text-gray-400 transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-gray-600 gap-2 border-gray-200 bg-white hover:bg-gray-50">
                    <Filter size={14} />
                    Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-gray-600 gap-2 border-gray-200 bg-white hover:bg-gray-50">
                    <Users size={14} />
                    Assignees
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-gray-600 gap-2 border-gray-200 bg-white hover:bg-gray-50">
                    <Settings size={14} />
                    Settings
                </Button>
                <Button size="sm" className="h-8 text-xs font-bold bg-[#3b82f6] hover:bg-blue-600 text-white gap-2 border-0 shadow-lg shadow-blue-200">
                    Create
                    <ChevronDown size={14} className="ml-1" />
                </Button>
            </div>
        </div>
    )
}
