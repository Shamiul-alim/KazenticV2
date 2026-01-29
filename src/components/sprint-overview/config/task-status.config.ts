import { TaskStatus } from "@/data/task-status.enum";
import {
    ArrowUpRight,
    Zap,
    CheckCircle,
    RotateCcw,
    Clock,
    XCircle,
    Monitor,
    Circle,
} from "lucide-react";

export const STATUS_OPTIONS = [
    { value: TaskStatus.TODO, label: "TO DO", icon: ArrowUpRight },
    { value: TaskStatus.IN_PROGRESS, label: "IN PROGRESS", icon: Zap },
    { value: TaskStatus.ACTIVE, label: "ACTIVE", icon: CheckCircle },
    { value: TaskStatus.IN_REVIEW, label: "IN REVIEW", icon: RotateCcw },
    { value: TaskStatus.PENDING, label: "PENDING", icon: Clock },
    { value: TaskStatus.REJECTED, label: "REJECTED", icon: XCircle },
    {
        value: TaskStatus.QUALITY_ASSURANCE,
        label: "QUALITY ASSURANCE",
        icon: Monitor,
    },
    { value: TaskStatus.CLOSED, label: "CLOSED", icon: Circle },
];
