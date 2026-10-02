interface PendingTask { status: 'pending'; }
interface InProgressTask { status: 'in_progress'; assignee: string; }
interface CompletedTask { status: 'completed'; completedAt: Date; reviewer: string; }

export type NirmanIQTask = PendingTask | InProgressTask | CompletedTask;

export const processTask = (task: NirmanIQTask): void => {
  switch (task.status) {
    case 'pending': console.log("Task is waiting to start."); break;
    case 'in_progress': console.log(`Task assigned to ${task.assignee}.`); break;
    case 'completed': console.log(`Reviewed by ${task.reviewer} on ${task.completedAt.toISOString()}.`); break;
    default: const _exhaustiveCheck: never = task; return _exhaustiveCheck;
  }
};