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
                <TabsList className="h-10 w-full inline-flex justify-start items-end border-b bg-transparent p-0 text-[#697588] rounded-none">
                    <TabsTrigger
                        value="sprint-reporting"
                        className="w-35 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-xs"
                    >
                        <span className="flex gap-2">
                            <GridIcon />
                            Sprint Reporting
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="list"
                        className="w-15 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4157FE] font-medium text-xs"
                    >
                        <span className="flex gap-2">
                            <List size={14} />
                            List
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* Sprint Reporting Tab */}
                <TabsContent value="sprint-reporting" className="grow flex flex-col">
                    <SprintReportingTab />
                </TabsContent>

                {/* List Tab */}
                <TabsContent value="list" className="grow flex flex-col">
                    <SprintListTab />
                </TabsContent>
            </Tabs>
        </main>
    )
}
