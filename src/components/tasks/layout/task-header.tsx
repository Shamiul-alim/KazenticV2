import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronRight, Copy, File } from "lucide-react"

export default function TaskHeader() {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 p-2 sm:p-3 lg:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground overflow-x-auto">
                <Button variant="outline" size="md" className="flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3 flex-shrink-0">
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button variant="outline" size="md" className="flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3 text-[10px] sm:text-xs flex-shrink-0">
                    Task
                </Button>
                <Button variant="outline" size="md" className="flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3 text-[10px] sm:text-xs whitespace-nowrap">
                    <span className="hidden xs:inline">Task ID: </span>kzt-1
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </Button>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                <Button size="md" variant="outline" className="text-[10px] sm:text-xs flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3">
                    <File className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                </Button>
                <Button size="md" className="text-[10px] sm:text-xs flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3">
                    Start
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
