import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

import LoadingAvatar from '@/components/layout/loading-avatar';
import { ITaskData, ITasks } from '@/types/main-task';
import { useUserContext } from '@/user-context';
import dataRequest from '@/utils/rest';
import userTasksFlter from '@/utils/user-tasks-filter';

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  taskData: ITasks;
  setTaskData: Dispatch<SetStateAction<ITasks>>;
  filteredTaskData: ITaskData[];
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
};

export const TasksDataContext = createContext<ContextProps | null>(null);

export const TasksDataContextProvider: FC<ProviderProps> = ({ children }) => {
  const [taskData, setTaskData] = useState<ITasks>({});
  const { user, userData } = useUserContext();
  const [filteredTaskData, setFilteredTaskData] = useState<ITaskData[]>([]);
  const [filter, setFilter] = useState('');

  const handleFilter = () => {
    const userTask = userTasksFlter(userData.tasksId, taskData);

    if (filter === 'Active' || filter === 'Ended' || filter === 'Completed') {
      const userTasksList = userTask.filter(task => task.Status === filter);
      setFilteredTaskData(userTasksList);
    } else {
      setFilteredTaskData(userTask);
    }
  };

  useEffect(() => {
    if (user === null) return;
    dataRequest<ITasks>('/tasks').then(backData => {
      setTaskData(backData);
      handleFilter();
    });
  }, [user, userData]);

  useEffect(() => {
    handleFilter();
  }, [filter, taskData]);

  const value = {
    taskData,
    setTaskData,
    filteredTaskData,
    setFilter,
    filter,
  };

  return (
    <TasksDataContext.Provider value={value}>
      {!taskData ? (
        <div className="m-10">
          <LoadingAvatar />
        </div>
      ) : (
        children
      )}
    </TasksDataContext.Provider>
  );
};

export const useTasksDataContext = () => {
  return useContext(TasksDataContext) as ContextProps;
};
