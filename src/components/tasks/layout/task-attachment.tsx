import { Eye, Download, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Attachment = {
    id: number
    name: string
    size: string
    type: string
}

export function TaskAttachments() {
    const attachments: Attachment[] = [
        { id: 1, name: "Wireframe", size: "5 MB", type: "PDF" },
        { id: 2, name: "Wireframe", size: "5 MB", type: "PDF" },
    ]

    return (
        <section className="rounded-xl border bg-background p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
            {/* Header */}
            <h3 className="text-xs sm:text-sm font-semibold">Attachments</h3>

            {/* Dropzone */}
            <Field>
                <FieldLabel htmlFor="attachment" className="text-[10px] sm:text-xs">Attachments</FieldLabel>
                <Input id="attachment" type="file" className="text-xs sm:text-sm" />
            </Field>

            {/* Files */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {attachments.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <FileIcon />

                            <div className="leading-tight min-w-0">
                                <p className="text-xs sm:text-sm font-medium truncate">
                                    {file.name}
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    {file.size} • {file.type}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground flex-shrink-0">
                            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-foreground" />
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-foreground" />
                            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer hover:text-destructive" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

/* Simple PDF-like icon */
function FileIcon() {
    return (
        <div
            className={cn(
                "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center shrink-0",
                "rounded-md bg-orange-100 text-orange-600 text-[10px] sm:text-xs font-semibold"
            )}
        >
            PDF
        </div>
    )
}
