'use client';

import { Video } from "lucide-react"
import Image from "next/image"
import { Card } from "../../ui/card"
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../../ui/avatar";

type AvatarType = {
    id: number;
    name: string;
    avatar: string;
}

type CalendarEventProps = {
    id: number;
    title: string;
    date: string;
    time: string;
    attendees: AvatarType[];
    meetingLink: string;
}

export function CalendarEvent(props: CalendarEventProps) {
    return (
        <Card>
            <div className="flex items-start gap-3 border-l-2 border-l-primary-dashboard pl-3">
                <div className="space-y-2">
                    <p className="text-sm font-medium">{props.title}</p>

                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <div className="flex -space-x-1">
                            <AvatarGroup className="grayscale">
                                {
                                    props.attendees.map((attendee) => (
                                        <Avatar key={attendee.id} size="sm">
                                            <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    ))
                                }
                                <AvatarGroupCount>+3</AvatarGroupCount>
                            </AvatarGroup>
                        </div>
                        <span>{props.date} @ {props.time}</span>
                    </div>
                </div>
            </div>

            <Button onClick={() => window.open(props.meetingLink, "_blank")} className="flex items-center gap-2 rounded-md bg-primary-dashboard/10 hover:bg-primary-dashboard/20 px-3 py-1 text-xs font-medium text-primary-dashboard">
                <Video className="w-4 h-4" /> Join
            </Button>
        </Card>
    )
}
