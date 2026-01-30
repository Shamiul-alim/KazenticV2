// ChartSettingsPanel.tsx
import { Section, SectionRow } from "../../layout/section-layout";
import { ArrowUpDown, Eye, Filter, Layers } from "lucide-react";

export function ChartSettingsPanel() {
    return (
        <div className="flex-1 space-y-2">
            {/* Dislay */}
            <Section title="Dislay">
                <div className="pl-4">
                    <SectionRow label="Display as percentages" isSwitch />
                    <SectionRow label="Show Legend" isSwitch />
                </div>
            </Section>

            {/* Data */}
            <Section title="Data">
                <SectionRow icon={<Eye className="size-4" />} label="Show" value="12 Shown" />
                <SectionRow icon={<ArrowUpDown className="size-4" />} label="Measure" value="None" />
                <SectionRow icon={<Layers className="size-4" />} label="Group by" value="Status" />
            </Section>

            {/* Filter */}
            <Section title="Filter">
                <SectionRow icon={<Filter className="size-4" />} label="Filter" value="None" />
            </Section>
        </div>
    );
}
