import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ItemType } from "./timeline-body-row"
import TaskMeta from "@/components/tasks/layout/task-meta"
import TaskDescription from "@/components/tasks/layout/task-description"
import TaskTabs from "@/components/tasks/layout/task-tabs"
import TaskActivityPanel from "@/components/tasks/layout/task-activity-panel"

export function TaskDetailsDialog({
    item,
    setEditedTitle,
    open,
    onOpenChange,
}: {
    item: ItemType
    setEditedTitle: (title: string) => void
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
                <div className="flex flex-col lg:grid lg:grid-cols-12 flex-1 overflow-y-auto max-h-[85vh]">
                    <div className="lg:col-span-9 p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-4">
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="text-2xl font-bold w-full border-none outline-none focus:ring-0 bg-transparent px-0"
                            placeholder="Task title..."
                        />
                        <TaskMeta />
                        <TaskDescription />
                        <TaskTabs />
                    </div>
                    {/* Right Activity Panel */}
                    <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l">
                        <TaskActivityPanel />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}