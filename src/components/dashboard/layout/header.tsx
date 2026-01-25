import { Button } from '@/components/ui/Button'
import { Sun } from 'lucide-react'

export default function DashboardHeader() {
    return (
        <div className="p-4 flex items-center justify-between border-b border-b-border">
            <div className="space-y-1">
                <h1 className="text-sm font-semibold leading-6 tracking-[-0.05em] align-middle">
                    Good Morning, <span className="text-primary-dashboard">John Doe</span> <Sun className="inline-block w-4 h-4" color="#FD6A45" />
                </h1>
                <p className="text-xs font-medium leading-6 tracking-[-0.05em] align-middle text-muted-foreground">
                    Welcome back! Here's an overview of your workspace.
                </p>
            </div>

            <Button variant="default" size="sm" className="px-2 py-1.5 text-sm rounded-md bg-primary-dashboard text-primary-dashboard-foreground">Task Summary</Button>
        </div>
    )
}
