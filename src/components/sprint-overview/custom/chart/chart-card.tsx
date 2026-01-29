"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "../../ui/card";
import { ChartRenderer } from "./chart-rendered";
import { ChartSettingsPanel } from "./chart-settings-panel";
import { ChartDataPanel } from "./chart-data-panel";
import { ChartConfig } from "@/types/chart.types";
import { useState } from "react";
import PriorityBreakdownChart from "../priority-breakdown-chart";

interface ChartCardProps {
    title: string;
    children?: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
    return (
        <Card className="grid grid-cols-5 gap-0 py-0 ring-0">
            {/* LEFT: Chart */}
            <div className="flex-1 p-4 col-span-3">
                {title && <h3 className="font-semibold">{title}</h3>}
                {children}
            </div>

            {/* RIGHT: Tabs */}
            <div className="border-l col-span-2">
                <Tabs defaultValue="settings">
                    <TabsList className="w-full h-9 rounded-none border-b grid grid-cols-2 bg-transparent p-0 m-0">
                        <TabsTrigger className="py-2" value="settings">Settings</TabsTrigger>
                        <TabsTrigger className="py-2" value="data">Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="settings">
                        <ChartSettingsPanel />
                    </TabsContent>

                    <TabsContent value="data">
                        <ChartDataPanel />
                    </TabsContent>
                </Tabs>
            </div>
        </Card>
    );
}
