export type FilterOperator = "IS" | "IS_NOT" | "CONTAINS";

export interface FilterRule {
    id: string;
    field?: string;
    operator?: FilterOperator;
    value?: string;
    children?: FilterRule[];
}
