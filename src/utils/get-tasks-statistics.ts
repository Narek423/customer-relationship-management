type UsersTasks = {
  ['Full name']: string;
  Label: string;
  ['Due date']: string;
  Type: string;
  Status: string;
  belongsTo: string;
  uid: string;
  avatar: string;
}[];

const getTasksStatistics = (userTasks: UsersTasks) => {
  const userStatisctics = { active: 0, completed: 0, ended: 0 };
  for (const elem of userTasks) {
    if (elem.Status === 'Active') {
      userStatisctics.active = ++userStatisctics.active;
    } else if (elem.Status === 'Completed') {
      userStatisctics.completed = ++userStatisctics.completed;
    } else {
      userStatisctics.ended = ++userStatisctics.ended;
    }
  }

  return userStatisctics;
};

export default getTasksStatistics;
