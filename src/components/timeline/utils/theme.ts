import { StatusTheme } from "@/data/project/project-details/timeline/timeline.types";

const DEFAULT_THEME: StatusTheme = {
    bg: "#EEF2FF",
    border: "#4157FE",
    text: "#4157FE",
    solidBg: "#4157FE",
    solidText: "#FFFFFF",
    cardBg: "#EEF2FF",
    cardText: "#4157FE",
    cardBorder: "rgba(65,87,254,0.20)",
    cardMuted: "rgba(65,87,254,0.70)",
};

export function resolveStatusTheme(
    themes: Record<string, StatusTheme> | undefined,
    status: string,
) {
    return (themes && themes[status]) ? themes[status] : DEFAULT_THEME;
}
