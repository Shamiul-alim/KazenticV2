import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CustomizeViewSidebar } from "../layout/customize-view-sidebar";

export function CustomizeViewTrigger() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="mr-0.5" />
                    Customize View
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-95 p-0">
                <CustomizeViewSidebar />
            </SheetContent>
        </Sheet>
    )
}
