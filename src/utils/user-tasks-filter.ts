import { ITasks } from '@/types/main-task';

const userTasksFlter = (tasksId: string[], tasks: ITasks | null) => {
  const filteredUserTasks = [];
  for (const key in tasks) {
    if (tasksId.includes(key)) filteredUserTasks.push(tasks[key]);
  }
  return filteredUserTasks;
};

export default userTasksFlter;
