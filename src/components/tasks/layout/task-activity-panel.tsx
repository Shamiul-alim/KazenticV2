import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskActivityPanel() {
    return (
        <div className="h-full p-4 space-y-4">
            <Tabs defaultValue="activity">
                <TabsList className="w-full">
                    <TabsTrigger value="activity" className="flex-1">
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="comments" className="flex-1">
                        Comments
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 border rounded-md p-2 text-xs"
                    >
                        <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">John Doe was removed</p>
                            <span className="text-muted-foreground">
                                29 Jul, 6:50 PM
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
