import GridIcon from "@/components/sprint-overview/icons/grid";
import SprintListTab from "@/components/sprint-overview/layout/sprint-list-tab";
import SprintReportingTab from "@/components/sprint-overview/layout/sprint-reporting-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/sprint-overview/ui/tabs";
import { List } from "lucide-react";

export default function SprintOverview() {
    return (
        <main className="w-full h-full bg-white">
            {/* Header Tabs */}
            <Tabs defaultValue="sprint-reporting" className="w-full flex flex-col h-full">
                <TabsList className="h-10 sm:h-10 w-full inline-flex justify-start items-end border-b bg-transparent p-0 text-[#697588] rounded-none overflow-x-auto">
                    <TabsTrigger
                        value="sprint-reporting"
                        className="shrink-0 px-3 sm:px-4 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span className="flex gap-1.5 sm:gap-2 items-center">
                            <GridIcon />
                            <span className="hidden sm:inline text-xs">Sprint Reporting</span>
                            <span className="sm:hidden">Reporting</span>
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="list"
                        className="shrink-0 px-3 sm:px-4 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span className="flex gap-1.5 sm:gap-2 items-center text-xs">
                            <List size={14} className="sm:w-4 sm:h-4" />
                            List
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* Sprint Reporting Tab */}
                <TabsContent value="sprint-reporting" className="grow flex flex-col overflow-auto">
                    <SprintReportingTab />
                </TabsContent>

                {/* List Tab */}
                <TabsContent value="list" className="grow flex flex-col overflow-auto w-full">
                    <SprintListTab />
                </TabsContent>
            </Tabs>
        </main>
    )
}
