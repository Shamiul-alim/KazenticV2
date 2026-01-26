import { Clock, Activity, Hourglass } from "lucide-react";
import { Card } from "../ui/card";

type Props = {
    icon: "clock" | "activity" | "hourglass";
    title: string;
    value: string;
};

const icons = {
    clock: Clock,
    activity: Activity,
    hourglass: Hourglass,
};

export function InsightRow({ icon, title, value }: Props) {
    const Icon = icons[icon];

    return (
        <Card className="flex items-center justify-between rounded-xl shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="font-medium">{title}</span>
            </div>
            <span className="text-muted-foreground text-[11px]">{value}</span>
        </Card>
    );
}
