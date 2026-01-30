import TaskHeader from "@/components/tasks/layout/task-header";
import TaskMeta from "@/components/tasks/layout/task-meta";
import TaskDescription from "@/components/tasks/layout/task-description";
import TaskTabs from "@/components/tasks/layout/task-tabs";
import TaskCustomFields from "@/components/tasks/layout/task-custom-fields";
import TaskActivityPanel from "@/components/tasks/layout/task-activity-panel";
import { Separator } from "@/components/ui/separator";

export default function TaskDetailsPage() {
    return (
        <div className="flex flex-col h-full bg-background">
            <TaskHeader />
            <Separator />
            <div className="flex flex-col lg:grid lg:grid-cols-12 flex-1 h-full overflow-hidden">
                <div className="lg:col-span-9 p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-4 overflow-auto">
                    <TaskMeta />
                    <TaskDescription />
                    <TaskTabs />
                </div>
                {/* Right Activity Panel */}
                <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l">
                    <TaskActivityPanel />
                </div>
            </div>
        </div>
    );
}
