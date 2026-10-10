export interface Project {
    id: string;
    name: string;
    status: 'Active' | 'Pending' | 'Completed' | 'On Hold';
    progress: number;
    risk: 'Low' | 'Medium' | 'High';
    updatedAt: string;
}
