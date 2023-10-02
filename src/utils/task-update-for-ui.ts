import { Dispatch, SetStateAction } from 'react';

import { ITaskData, ITasks } from '@/components/types/main-task';
import { updateTaskData } from '@/firebase/firebase';

const taskUpdateForUi = (
  id: string,
  updatedCheckItem: ITaskData,
  taskData: ITasks,
  setTaskData: Dispatch<SetStateAction<ITasks>>
) => {
  updateTaskData(id, updatedCheckItem);

  const cloneAllTasks = { ...taskData };

  cloneAllTasks[id] = updatedCheckItem;

  setTaskData(cloneAllTasks);
};

export default taskUpdateForUi;
