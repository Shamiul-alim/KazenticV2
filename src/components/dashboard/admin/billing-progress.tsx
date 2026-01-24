import { cn } from "@/lib/utils";

type Props = {
    totalSegments?: number;
    usedSegments: number;
    className?: string;
};

export function BillingProgress({ totalSegments = 50, usedSegments, className }: Props) {
    return (
        <div className={cn("flex justify-between", className)}>
            {Array.from({ length: totalSegments }).map((_, i) => (
                <span
                    key={i}
                    className={`h-5 w-1 rounded-full ${i < usedSegments ? "bg-success/80" : "bg-muted"
                        }`}
                />
            ))}
        </div>
    );
}
