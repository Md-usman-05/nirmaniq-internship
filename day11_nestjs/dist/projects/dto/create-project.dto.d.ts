export declare class CreateProjectDto {
    name: string;
    status: 'Active' | 'Pending' | 'Completed' | 'On Hold';
    progress: number;
    risk: 'Low' | 'Medium' | 'High';
}
