type UsersTasks = {
  ['Due date']: string;
  Label: string;
  Name: string;
  Status: string;
  Type: string;
  belongsTo: string;
}[];

const getTasksStatistics = (userTasks: UsersTasks) => {
  const userStatisctics = { active: 0, complited: 0, ended: 0 };
  for (const elem of userTasks) {
    if (elem.Status === 'Active') {
      userStatisctics.active = ++userStatisctics.active;
    } else if (elem.Status === 'Complited') {
      userStatisctics.complited = ++userStatisctics.complited;
    } else {
      userStatisctics.ended = ++userStatisctics.ended;
    }
  }

  return userStatisctics;
};

export default getTasksStatistics;
