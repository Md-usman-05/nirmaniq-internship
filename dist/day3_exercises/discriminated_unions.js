export const processTask = (task) => {
    switch (task.status) {
        case 'pending':
            console.log("Task is waiting to start.");
            break;
        case 'in_progress':
            console.log(`Task assigned to ${task.assignee}.`);
            break;
        case 'completed':
            console.log(`Reviewed by ${task.reviewer} on ${task.completedAt.toISOString()}.`);
            break;
        default:
            const _exhaustiveCheck = task;
            return _exhaustiveCheck;
    }
};
