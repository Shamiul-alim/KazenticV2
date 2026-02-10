export type GroupByOption = 'Status' | 'Assignee' | 'Priority' | 'Tags' | 'Due Date' | 'Task Type'
export type SortOrder = 'Ascending' | 'Descending'

export type ProjectFilters = {
    statusIds: string[]
    typeIds: string[]
}

const DEFAULT_FILTERS: ProjectFilters = {
    statusIds: [],
    typeIds: [],
}
