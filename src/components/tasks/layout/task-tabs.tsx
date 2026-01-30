import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCustomFields from "./task-custom-fields";
import { TaskTable } from "@/components/sprint-overview/custom/data-explorer/data-table";
import { TASK_DATA } from "@/components/sprint-overview/custom/data-explorer/task.mock";
import Card from "@/components/ui/card";
import { TaskChecklist } from "./task-checklist";
import { TaskAttachments } from "./task-attachment";
import { TaskLinkIssues } from "./task-link-issues";

export default function TaskTabs() {
    return (
        <Tabs defaultValue="info">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start overflow-x-auto">
                <TabsTrigger value="info" className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">Additional Info</TabsTrigger>
                <TabsTrigger value="subtasks" className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">Subtasks</TabsTrigger>
                <TabsTrigger value="actions" className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">Action Items</TabsTrigger>
                <TabsTrigger value="attachments" className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">Attachments</TabsTrigger>
                <TabsTrigger value="links" className="text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">Link Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
                <TaskCustomFields />
            </TabsContent>
            <TabsContent value="subtasks">
                <Card className="p-2 sm:p-3 lg:p-4">
                    <TaskTable
                        data={TASK_DATA}
                    />
                </Card>
            </TabsContent>
            <TabsContent value="actions">
                <Card className="p-2 sm:p-3 lg:p-4">
                    <TaskChecklist />
                </Card>
            </TabsContent>
            <TabsContent value="attachments">
                <Card className="p-2 sm:p-3 lg:p-4">
                    <TaskAttachments />
                </Card>
            </TabsContent>
            <TabsContent value="links">
                <Card className="p-2 sm:p-3 lg:p-4">
                    <TaskLinkIssues />
                </Card>
            </TabsContent>
        </Tabs>
    );
}
