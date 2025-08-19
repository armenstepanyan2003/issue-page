export interface Label {
    id: number;
    name: string;
    color: string;
}

export interface Issue {
    id: number;
    title: string;
    description: string;
    labels: number[];
}

export type EditingIssue = Omit<Issue, "id">;

export interface LabelProps {
    labelsList: Label[];
    setLabelsList: (labelsList: Label[]) => void;
}

export interface IssuesProps {
    issueList: Issue[];
    setIssueList: (issueList: Issue[]) => void;
    labelsList: Label[];
}

export interface Tab {
    label: string;
    value: 'issues' | 'labels';
}