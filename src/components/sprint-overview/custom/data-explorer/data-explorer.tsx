import { TaskTable } from "./data-table";
import { DataNode } from "./data.types";
import { DataExplorerHeader } from "./header";
import { TASK_DATA } from "./task.mock";

export function DataExplorer() {
    return (
        <div className="space-y-2 overflow-auto">
            <DataExplorerHeader />
            <TaskTable
                data={TASK_DATA}
            />
        </div>
    );
}
