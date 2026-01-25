import { TOP_TASKS } from '@/data/dashboard-data'
import CardContainer from '../../card-container'
import { TopTaskItem } from '../../top-task-item'

export default function MyTopTasksCard() {
    return (
        <CardContainer childrenClassName="space-y-4 overflow-y-auto max-h-110" title="My Top Tasks">
            {
                TOP_TASKS.map((task) => (
                    <TopTaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        estimatedHours={task.estimatedHours}
                        workedHours={task.workedHours}
                        progressPercentage={task.progressPercentage}
                        assigneeName={task.assigneeName}
                        assigneeAvatarUrl={task.assigneeAvatarUrl}
                        status={task.status}
                        type={task.type}
                        projectName={task.projectName}
                    />
                ))
            }
        </CardContainer>
    )
}
