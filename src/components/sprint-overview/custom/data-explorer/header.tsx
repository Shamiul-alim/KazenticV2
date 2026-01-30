import { Circle } from "lucide-react";
import { Button } from "../../ui/button";
import SubtaskIcon from "../../icons/subtask";
import SettingsIcon from "@/components/employee/icons/settings";

export function DataExplorerHeader() {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="font-semibold flex items-center gap-2 text-xs text-[#191F38]">
                <span className="h-3 w-3 bg-[#4157FE] rounded-full inline-block"></span>
                TO DO / Oct 1
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <SubtaskIcon />
                    Subtasks
                </Button>
                <Button variant="outline">
                    <SettingsIcon className="stroke-[#697588]" />
                    Customize view
                </Button>
            </div>
        </div>
    );
}
