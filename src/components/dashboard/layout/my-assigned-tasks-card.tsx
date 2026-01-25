import CardContainer from '../card-container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, Clock } from 'lucide-react'
import { Underline } from '../underline'
import { TaskItem } from '../recent-items/task-item'
import { TASKS } from '@/data/dashboard-data'

enum ASSIGNED_TASKS_TABS {
    RECENT = "recent",
    DUE = "due"
}

export default function MyAssignedTasksCard() {
    return (
        <CardContainer childrenClassName='p-0' title="My Assigned Tasks">
            <Tabs defaultValue={ASSIGNED_TASKS_TABS.RECENT}
                className="w-full py-4"
            >
                {/* Tabs header */}
                <TabsList className="relative h-auto bg-transparent p-0" variant="line">
                    <TabsTrigger value={ASSIGNED_TASKS_TABS.RECENT}>
                        <ClipboardList className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                        Recent Tasks
                        <Underline />
                    </TabsTrigger>

                    <TabsTrigger value={ASSIGNED_TASKS_TABS.DUE}>
                        <Clock className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                        Due Soon
                        <Underline />
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={ASSIGNED_TASKS_TABS.RECENT}>
                    <div className="space-y-3 px-4 max-h-95 overflow-y-auto">
                        {
                            TASKS.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    estimatedHours={task.estimatedHours}
                                    workedHours={task.workedHours}
                                    progressPercentage={task.progressPercentage}
                                    assigneeAvatarUrl={task.assigneeAvatarUrl}
                                    status={task.status}
                                    type={task.type}
                                    projectName={task.projectName}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value={ASSIGNED_TASKS_TABS.DUE}>
                    <div className="space-y-3 px-4 max-h-95 overflow-y-auto">
                        {
                            TASKS.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    estimatedHours={task.estimatedHours}
                                    workedHours={task.workedHours}
                                    progressPercentage={task.progressPercentage}
                                    assigneeAvatarUrl={task.assigneeAvatarUrl}
                                    status={task.status}
                                    type="Due Soon"
                                    projectName={task.projectName}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </CardContainer>
    )
}
