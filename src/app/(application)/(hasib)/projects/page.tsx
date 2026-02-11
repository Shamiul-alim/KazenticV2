// app/projects/page.tsx
"use client"

import NavigationBar from "@/components/workload/navigation-bar"
import { Separator } from "@/components/ui/separator"
import Folder2Icon from "@/components/icons/folder-2"
import FilterToolbar from "@/components/projects/custom/filter-toolbar"
import { ProjectProvider } from "@/components/projects/context/project-context"
import ProjectBody from "@/components/projects/layout/project-body"

export default function ProjectsPage() {
    return (
        <ProjectProvider>
            <main className="bg-background min-h-dvh h-full w-full text-xs">
                <NavigationBar>
                    <span>
                        <Folder2Icon className="inline mr-1.5 h-4 w-4" />
                        Projects
                    </span>
                </NavigationBar>
                <Separator className="mt-0.5" />
                <FilterToolbar />
                <ProjectBody />
            </main>
        </ProjectProvider>
    )
}