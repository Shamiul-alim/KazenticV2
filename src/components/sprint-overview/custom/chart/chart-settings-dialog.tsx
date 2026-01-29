import { ChevronLeft, ChevronRight, MoreHorizontal, RefreshCcw, Settings, X } from "lucide-react"
import { Button } from "../../ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog"
import { ChartCard } from "./chart-card"
import { TaskBreakdown } from "../task-breakdown";
import { SprintReportCard } from "../sprint-report-card";

type ChartSettingsDialogProps = {
    title: string;
    children?: React.ReactNode;
    isChart?: boolean;
}

export function ChartSettingsDialog({ title, children, isChart }: ChartSettingsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-0">
                    <Settings className="h-4 w-4 cursor-pointer" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-0 gap-0" showClose={false}>
                <DialogHeader className="px-4 py-2 border-b flex flex-row justify-between items-center">
                    {/* <DialogTitle className="text-lg font-medium"></DialogTitle> */}
                    <div className="flex gap-2 items-center align-baseline">
                        <Button variant="outline" size="sm" className="px-2">
                            <ChevronLeft className="h-5 w-5 cursor-pointer rounded-md text-[#697588]" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2">
                            <ChevronRight className="h-5 w-5 cursor-pointer rounded-md text-[#697588]" />
                        </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" size="sm" className="px-2">
                            <RefreshCcw className="h-4 w-4 stroke-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2">
                            <MoreHorizontal className="h-4 w-4 stroke-3" />
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" size="sm" className="px-2">
                                <X className="h-4 w-4 stroke-3" />
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>

                {
                    isChart ? (
                        <ChartCard
                            title={title}
                        >
                            {children}
                        </ChartCard>
                    ) : (
                        <SprintReportCard>
                            <div className="flex flex-col gap-4 text-xs text-[#191F38]">
                                <h1 className="text-sm font-semibold">Sprint Task Report</h1>
                                <div className="font-medium flex flex-wrap gap-4">
                                    <span>Committed: <span className="text-[#697588]">7 pts &nbsp;</span></span>
                                    <span>Added: <span className="text-[#697588]">7 pts &nbsp;</span></span>
                                    <span>Removed: <span className="text-[#697588]">7 pts &nbsp;</span></span>
                                    <span>Completed: <span className="text-[#697588]">7 pts &nbsp;</span></span>
                                    <span>Remaining: <span className="text-[#697588]">7 pts &nbsp;</span></span>
                                </div>
                                <TaskBreakdown isDialog />
                            </div>
                        </SprintReportCard>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
