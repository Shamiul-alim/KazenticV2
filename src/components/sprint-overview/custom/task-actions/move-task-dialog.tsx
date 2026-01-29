"use client";

import * as React from "react";
import { Check, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../ui/dialog";
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
} from "../../ui/command";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

interface Project {
    id: string;
    name: string;
    color: string;
}

interface MoveTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projects: Project[];
    onConfirm: (projectId: string) => void;
}

export function MoveTaskDialog({
    open,
    onOpenChange,
    projects,
    onConfirm,
}: MoveTaskDialogProps) {
    const [selectedProject, setSelectedProject] = React.useState<string>();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-105">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-sm font-medium">Move Task to New Project</DialogTitle>
                </DialogHeader>

                {/* Search + List */}
                <Command className="rounded-lg">
                    <CommandInput placeholder="Search" />


                    <span className="text-xs my-2">Search projects from below</span>
                    <CommandList className="border-0">
                        <CommandEmpty>No project found.</CommandEmpty>

                        {projects.map((project) => (
                            <CommandItem
                                key={project.id}
                                value={project.name}
                                onSelect={() => setSelectedProject(project.id)}
                                className={cn(
                                    "flex items-center gap-3 rounded-md text-xs",
                                    selectedProject === project.id &&
                                    "bg-blue-50 text-blue-600"
                                )}
                            >
                                {/* Avatar */}
                                <div
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white"
                                    style={{ backgroundColor: project.color }}
                                >
                                    {project.name.charAt(0).toUpperCase()}
                                </div>

                                <span className="flex-1">{project.name}</span>

                                {selectedProject === project.id && (
                                    <Check className="h-4 w-4 text-blue-600" />
                                )}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>

                {/* Footer */}
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!selectedProject}
                        onClick={() => {
                            if (selectedProject) {
                                onConfirm(selectedProject);
                                onOpenChange(false);
                            }
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
