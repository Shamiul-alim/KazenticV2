import React, { createContext } from "react";
import { GroupByOption, SortOrder } from "../types/project-ui";

type FormValues = {
    name: string;
    identifier: string;
    startDate: string;
    deliveryDate: string;
    githubLink: string;
    projectType: string;
    description: string;
    isPrivate: boolean;
    shareWith: string[];
}

type ProjectContextType = {
    groupBy: GroupByOption;
    setGroupBy: (option: GroupByOption) => void;
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    formValues: FormValues;
    setFormValues: (values: FormValues) => void;
}

const projectContext = createContext<ProjectContextType | undefined>(undefined);

function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [groupBy, setGroupBy] = React.useState<GroupByOption>("Status");
    const [sortOrder, setSortOrder] = React.useState<SortOrder>('Ascending');
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
    const [formValues, setFormValues] = React.useState<FormValues>({
        name: '',
        identifier: '',
        startDate: '',
        deliveryDate: '',
        githubLink: '',
        projectType: '',
        description: '',
        isPrivate: false,
        shareWith: [] as string[],
    });

    return (
        <projectContext.Provider
            value={{
                groupBy,
                setGroupBy,
                sortOrder,
                setSortOrder,
                viewMode,
                setViewMode,
                formValues,
                setFormValues,
            }}>
            {children}
        </projectContext.Provider>
    );
}

function useProjectContext() {
    const context = React.useContext(projectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
}

export { projectContext, ProjectProvider, useProjectContext };