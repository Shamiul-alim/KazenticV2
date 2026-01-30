import { DataExplorer } from "../data-explorer/data-explorer";

export function ChartDataPanel() {
    return (
        <div className="h-96 w-full overflow-auto">
            <DataExplorer />
        </div>
    )
}
