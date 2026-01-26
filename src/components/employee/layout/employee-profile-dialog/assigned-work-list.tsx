import { ASSIGNED_WORK } from "@/data/employees-data"
import { AssignedWorkItem } from "./assigned-work-item"

export function AssignedWorkList() {
    return (
        <div className="space-y-3 max-h-60 overflow-y-auto p-2">
            {ASSIGNED_WORK.map((w) => (
                <AssignedWorkItem key={w.id} work={w} />
            ))}
        </div>
    )
}
