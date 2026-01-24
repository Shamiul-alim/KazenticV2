"use client";

import { WORK_TREND } from "@/data/dashboard-data";
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export function WorkTrendChart() {
    return (
        <div className="h-55 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WORK_TREND}>
                    <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "none" }}
                        labelStyle={{ color: "#6366f1", fontWeight: 600 }}
                        formatter={(value, _) => [`${value}`, "Task Completed"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
