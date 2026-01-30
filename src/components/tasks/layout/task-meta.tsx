'use client';

import { AvatarGroup } from "@/components/dashboard/ui/avatar";
import BrokenStatusIcon from "@/components/icons/broken-status";
import FlashIcon from "@/components/icons/flash";
import { StatusSelect } from "@/components/sprint-overview/custom/status-group/task-status-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/data/task-status.enum";
import { ArrowRight, Calendar, ChevronDown, FlagTriangleRight, Hourglass, Tags, Timer, User, UserPlus } from "lucide-react";

export default function TaskMeta() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center rounded-lg border p-3 sm:p-4 text-[10px] sm:text-xs">
            <Meta label="Status" icon={<BrokenStatusIcon />}>
                <StatusSelect value={TaskStatus.IN_PROGRESS} onChange={() => { }}>
                    <Badge variant="secondary" className="text-purple-600 bg-purple-50 text-[10px] sm:text-xs px-1.5 sm:px-2">
                        <FlashIcon className="inline-block mr-0.5 sm:mr-1 w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-purple-600" />
                        IN PROGRESS
                        <ChevronDown size={12} className="inline-block ml-0.5 sm:ml-1 text-purple-600 sm:w-3.5 sm:h-3.5" />
                    </Badge>
                </StatusSelect>
            </Meta>

            <Meta label="Assignee" icon={<User className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <AvatarGroup className="grayscale">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </AvatarGroup>
            </Meta>

            <Meta label="Dates" icon={
                <Calendar className="mr-0.5 sm:mr-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
            }>
                <span>Today</span>
                <ArrowRight className="mx-0.5 sm:mx-1 h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                <span>Tomorrow</span>
            </Meta>

            <Meta label="Reporter" icon={<UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Type" icon={<UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Tags" icon={<Tags className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Time Estimate" icon={<Hourglass className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Points" icon={<BrokenStatusIcon className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Track Time" icon={<Timer className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>

            <Meta label="Priority" icon={<FlagTriangleRight className="h-3 w-3 sm:h-4 sm:w-4" />}>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Pat Cummins</span>
                </div>
            </Meta>
        </div>
    );
}

function Meta({
    label,
    icon,
    children,
}: {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row sm:justify-start items-center sm:gap-0">
            <div className="flex items-center w-40 sm:mr-4">
                {icon && <span className="mr-0.5 sm:mr-1 inline-block shrink-0">{icon}</span>}
                <span className="text-muted-foreground text-[10px] sm:text-xs">{label}</span>
            </div>
            <div className="font-medium text-[10px] sm:text-xs">{children}</div>
        </div>
    );
}
