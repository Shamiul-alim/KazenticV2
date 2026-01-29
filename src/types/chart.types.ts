export type ChartType = "line" | "bar" | "area" | "pie";

export interface ChartConfig {
    type: ChartType;
    stacked?: boolean;
    showLegend?: boolean;
    xAxis: {
        measure: "time" | "category";
        range?: string;
        groupBy?: string;
    };
    yAxis: {
        measure: string;
        groupBy?: string;
    };
}
