import { ArrowRightFromLine, Copy, Delete, Filter, House, Layers, Link, List, LockKeyhole, PencilLine, Pin, ShieldCheck, Trash, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { Section, SectionRow } from "./section-layout";
import SubtaskIcon from "../icons/subtask";

export function CustomizeViewSidebar() {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 flex flex-col gap-4">
                <h2 className="text-sm font-semibold">Customize View</h2>

                {/* Tab */}
                <div className="flex gap-2 items-center border px-2 py-0 rounded-md">
                    <span className="border-r py-2 pr-2">
                        <List className="size-4 text-[#4157FE]" />
                    </span>
                    <span className="text-[11px] font-medium">List</span>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-2">

                {/* Quick Actions */}
                <Section title="Quick Actions">
                    <SectionRow label="Show Empty Statuses" isSwitch />
                    <SectionRow label="Show Closed Tasks" isSwitch />
                </Section>

                <Separator />

                {/* Task Visibility */}
                <Section title="Task Visibility">
                    <SectionRow icon={<PencilLine className="size-4" />} label="Fields" value="12 Shown" />
                    <SectionRow icon={<Filter className="size-4" />} label="Filter" value="None" />
                    <SectionRow icon={<Layers className="size-4" />} label="Group" value="Status" />
                    <SectionRow icon={<SubtaskIcon className="size-4" />} label="Subtasks" value="Collapsed" />
                </Section>

                {/* View Settings */}
                <Section title="View Settings">
                    <SectionRow icon={<Pin className="size-4" />} label="Pin This View" isSwitch />
                    <SectionRow icon={<ShieldCheck className="size-4" />} label="Secure View" isSwitch />
                    <SectionRow icon={<LockKeyhole className="size-4" />} label="Private View" isSwitch />
                    <SectionRow icon={<House className="size-4" />} label="Make Default" isSwitch />
                </Section>

                <Separator />

                {/* Utility Actions */}
                <Section title="Utility Actions">
                    <SectionRow icon={<Link className="size-4" />} label="Copy View Link" />
                    <SectionRow icon={<ArrowRightFromLine className="size-4" />} label="Export View" />
                    <SectionRow icon={<Trash2 className="size-4" />} label="Delete View" variant="destructive" />
                </Section>
            </div>
        </div>
    )
}
