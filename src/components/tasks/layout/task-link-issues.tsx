import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type LinkedIssue = {
    id: number
    key: string
    title: string
}

export function TaskLinkIssues() {
    const issues: LinkedIssue[] = [
        {
            id: 1,
            key: "int-141",
            title:
                "Create new task and assign to sprint board from sprint board",
        },
        {
            id: 2,
            key: "int-141",
            title:
                "Create new task and assign to sprint board from sprint board",
        },
        {
            id: 3,
            key: "int-141",
            title:
                "Create new task and assign to sprint board from sprint board",
        },
        {
            id: 4,
            key: "int-141",
            title:
                "Create new task and assign to sprint board from sprint board",
        },
    ]

    return (
        <section className="rounded-xl border bg-background p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <h3 className="text-xs sm:text-sm font-semibold">Link Issues</h3>

                <button
                    type="button"
                    className="flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
                >
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border-2 border-primary flex-shrink-0" />
                    Link Issue
                </button>
            </div>

            {/* List */}
            <div className="space-y-1.5 sm:space-y-2">
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        className={cn(
                            "flex items-center justify-between gap-2",
                            "rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2",
                            "hover:bg-muted/40"
                        )}
                    >
                        {/* Left */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <span className="h-5 w-0.5 sm:h-6 sm:w-1 rounded-full bg-red-500 flex-shrink-0" />

                            <p className="text-xs sm:text-sm min-w-0">
                                <span className="text-primary font-medium">
                                    [{issue.key}]
                                </span>{" "}
                                <span className="break-words">{issue.title}</span>
                            </p>
                        </div>

                        {/* Action */}
                        <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 cursor-pointer flex-shrink-0" />
                    </div>
                ))}
            </div>
        </section>
    )
}
