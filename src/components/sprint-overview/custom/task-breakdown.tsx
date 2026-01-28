
import { AlertCircle, ChartColumn, CheckCircle2, MinusCircle, PlusCircle, XCircle } from "lucide-react"
import { TaskSection } from "../layout/task-section"
import { TaskTable } from "../layout/task-table"

export function TaskBreakdown() {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-medium text-[#191F38]">
                Task Breakdown
            </h3>

            <TaskSection
                title={<span className="flex gap-1"><ChartColumn className="h-4 w-4" />Committed</span>}
                color="blue"
            >
                <TaskTable
                    columns={[
                        "Task Name",
                        "Date",
                        "Details",
                        "Sprint Points",
                    ]}
                    rows={[
                        [
                            "Auth, Profile, Dashboard...",
                            "Dec 6 at 5:00 am",
                            "Task Added",
                            "3 pts",
                        ],
                        [
                            "Auth, Profile, Dashboard...",
                            "Dec 6 at 5:00 am",
                            "Task Added",
                            "3 pts",
                        ],
                    ]}
                />
            </TaskSection>

            <TaskSection
                title={<span className="flex gap-1"><PlusCircle className="h-4 w-4" />Added</span>}
                color="green"
            >
                <TaskTable
                    columns={[
                        "Task Name",
                        "Date",
                        "Details",
                        "Change",
                    ]}
                    rows={[
                        [
                            "Auth, Profile, Dashboard...",
                            "Dec 6 at 5:00 am",
                            "effort changed",
                            "+3 pts",
                        ],
                    ]}
                />
            </TaskSection>

            <TaskSection
                title={<span className="flex gap-1"><MinusCircle className="h-4 w-4" />Removed</span>}
                color="red"
            >
                <TaskTable
                    columns={[
                        "Task Name",
                        "Date",
                        "Details",
                        "Change",
                    ]}
                    rows={[
                        [
                            "Auth, Profile, Dashboard...",
                            "Dec 6 at 5:00 am",
                            "effort changed",
                            "+3 pts",
                        ],
                    ]}
                />
            </TaskSection>

            {/* Collapsed sections */}
            <TaskSection
                title={<span className="flex gap-1"><CheckCircle2 className="h-4 w-4" />Completed</span>}
                color="green"
            >
                {/* empty */}
                <></>
            </TaskSection>

            <TaskSection
                title={<span className="flex gap-1"><AlertCircle className="h-4 w-4" />Remaining</span>}
                color="yellow"
            >
                {/* empty */}
                <></>
            </TaskSection>

            <TaskSection
                title={<span className="flex gap-1"><XCircle className="h-4 w-4" />After Sprint Close</span>}
                color="purple"
            >
                {/* empty */}
                <></>
            </TaskSection>
        </div>
    )
}

