import { ITasks } from '@/components/types/main-task';

const userTasksFilter = (tasksId: string[], tasks: ITasks) => {
  const filteredUserTasks = [];

  for (const key in tasks) {
    if (tasksId.includes(key)) {
      tasks[key].uid = key;
      const taskWithId = tasks[key];
      filteredUserTasks.push(taskWithId);
    }
  }

  return filteredUserTasks;
};

export default userTasksFilter;
