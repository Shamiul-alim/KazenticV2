import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/Button";
import { Ban, ClipboardList, CloudLightning, Mail, Sun } from "lucide-react";

export default function Dashboard() {
    return (
        <section className='flex flex-col bg-primary-foreground h-full'>
            <div className="p-4 flex items-center justify-between border-b border-b-border">
                <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-6 tracking-[-0.05em] align-middle">
                        {/* TODO: text-primary should be the color of text-btn-primary */}
                        Good Morning, <span className="text-btn-primary">John Doe</span> <Sun className="inline-block w-4 h-4" color="#FD6A45" />
                    </h1>
                    <p className="text-xs font-medium leading-6 tracking-[-0.05em] align-middle text-muted-foreground">
                        Welcome back! Here's an overview of your workspace.
                    </p>
                </div>

                <Button variant="default" size="sm" className="px-2 py-1.5 text-sm rounded-md">Task Summary</Button>
            </div>
            <div className="p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4 border-b border-b-border">
                <StatsCard
                    title="Emails"
                    left={{ value: "12", label: "Unread", color: "text-blue-600" }}
                    right={{ value: "100", label: "Received Today", color: "text-green-600" }}
                    icon={<Mail className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Tasks"
                    left={{ value: "12", label: "Completed", color: "text-green-600" }}
                    right={{ value: "2", label: "Pending", color: "text-orange-500" }}
                    icon={<ClipboardList className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Storage"
                    left={{ value: "80 GB", label: "Overall Storage Used", color: "text-blue-600" }}
                    icon={<CloudLightning className="w-5 h-5 text-border-strong" />}
                />

                <StatsCard
                    title="Leaves"
                    left={{ value: "12", label: "Pending", color: "text-orange-500" }}
                    right={{ value: "2", label: "Approved", color: "text-green-600" }}
                    icon={<Ban className="w-5 h-5 text-border-strong" />}
                />
            </div>
            <div className="p-4">
                Recent Activity
            </div>
        </section>
    )
}
