import { Dispatch, SetStateAction } from 'react';

import { ITaskData, ITasks } from '@/components/types/main-task';
import { updateTask } from '@/firebase/firebase';

const statusSwitcher = (
  status: string,
  task: ITaskData,
  setTaskData: Dispatch<SetStateAction<ITasks>>,
  taskData: ITasks
) => {
  const updatedTask: ITaskData = {
    ...task,
    Status: status,
  };

  updateTask(task.uid, updatedTask);

  const updatedAllTasks = { ...taskData };

  updatedAllTasks[task.uid] = updatedTask;

  setTaskData(updatedAllTasks);
};

export default statusSwitcher;
