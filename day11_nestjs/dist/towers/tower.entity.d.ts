export interface Tower {
    id: string;
    projectId: string;
    name: string;
    floors: number;
    status: 'Planned' | 'Under Construction' | 'Completed';
}
