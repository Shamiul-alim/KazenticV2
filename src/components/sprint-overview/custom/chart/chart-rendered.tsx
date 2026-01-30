import { ChartConfig } from "@/types/chart.types";

interface Props {
    data: any[];
    config: ChartConfig;
}

export function ChartRenderer({ data, config }: Props) {
    switch (config.type) {
        case "line":
            return <div>Line Chart Here</div>;
        case "bar":
            return <div>Bar Chart Here</div>;
        default:
            return <div>Unsupported chart</div>;
    }
}
