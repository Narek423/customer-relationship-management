const userTasksFilter = (tasksId: string[], tasks: any) => {
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
