"use client";

import { ArrowUp, CalendarX, Clock } from "lucide-react";
import { Section, SectionRow } from "../layout/section-layout";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

interface SprintReportCardProps {
    children?: React.ReactNode;
}

export function SprintReportCard({ children }: SprintReportCardProps) {
    return (
        <Card className="grid grid-cols-5 gap-0 py-0 ring-0">
            {/* LEFT: Chart */}
            <div className="flex-1 p-4 col-span-3">
                {children}
            </div>

            {/* RIGHT: Tabs */}
            <div className="border-l col-span-2 text-xs">
                <div className="p-4 space-y-2">
                    <p>Select Sprints from</p>
                    <Select>
                        <SelectTrigger className="shadow-none">
                            <SelectValue placeholder="Sprint Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="p-4 space-y-2">
                    <p>Data Source</p>
                    <Select>
                        <SelectTrigger className="shadow-none">
                            <SelectValue placeholder="Current Sprint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <Section title="X-Axis" className="mt-4">
                    <SectionRow icon={<Clock className="h-4 w-4" />} label="Sprint Length" value={<Input className="w-30" />} isInput />
                    <SectionRow icon={<CalendarX className="h-4 w-4" />} label="Non-Working days" value={<Input className="w-30" />} isInput />
                    <SectionRow icon={<ArrowUp className="h-4 w-4" />} label="Measure of effort" value={<Input className="w-30" />} isInput />
                </Section>
            </div>
        </Card>
    );
}
