import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

type EmailItemProps = {
    starred?: boolean
    title: string
    sender: string
    time: string
}

export function EmailItem({
    starred,
    title,
    sender,
    time,
}: EmailItemProps) {
    return (
        <Card>
            <div className="flex items-start gap-3">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Star
                            className={cn(
                                "h-4 w-4",
                                starred
                                    ? "fill-orange-400 text-orange-400"
                                    : "text-muted-foreground"
                            )}
                        />
                        <p className="text-sm font-medium text-foreground">
                            {title}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/dashboard/avatar-1.jpg"
                            alt={sender}
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                        <p className="text-xs font-medium text-muted-foreground">
                            {sender}
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {time}
            </p>
        </Card>
    )
}
