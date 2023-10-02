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
import { ITaskData, ITasks } from '@/components/types/main-task';
import { ImageUploadObjact, useUserContext } from '@/context/user-context';
import { writeUserTask } from '@/firebase/firebase';
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
  setFilteredTaskData: Dispatch<SetStateAction<ITaskData[]>>;
  writeNewTask: (
    backendInputData: BackendInputTasks,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setTaskData: Dispatch<SetStateAction<ITasks>>
  ) => void;
  handleDateFilter: (date: string) => void;
};

export type BackendInputTasks = {
  ['Full name']: string;
  Label: string;
  ['Due date']: string;
  Type: string;
  Status: string;
  belongsTo: string;
  avatar: string;
};

export const TasksDataContext = createContext<ContextProps | null>(null);

export const backendInputData: BackendInputTasks = {
  ['Full name']: '',
  Label: '',
  ['Due date']: '',
  Type: '',
  Status: '',
  belongsTo: '',
  avatar: '',
};

export const TasksDataContextProvider: FC<ProviderProps> = ({ children }) => {
  const [taskData, setTaskData] = useState<ITasks>({});
  const { user, userData } = useUserContext();
  const [filteredTaskData, setFilteredTaskData] = useState<ITaskData[]>([]);
  const [filter, setFilter] = useState('All');
  const userTask = userTasksFlter(userData.tasksId, taskData);

  const writeNewTask = (
    backendInputData: BackendInputTasks,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>
  ) => {
    return writeUserTask(backendInputData, user, setUserData);
  };

  const handleFilter = () => {
    if (!filter) return;

    if (filter === 'Active' || filter === 'Ended' || filter === 'Completed') {
      const userTasksList = userTask.filter(task => task.Status === filter);
      setFilteredTaskData(userTasksList);
    } else {
      setFilteredTaskData(userTask);
    }
  };

  const handleDateFilter = (date: string) => {
    const userTasksList = userTask.filter(task => task['Due date'] === date);
    setFilter('');
    setFilteredTaskData(userTasksList);
  };

  useEffect(() => {
    if (user !== null && userData.email !== '') {
      dataRequest<ITasks>('/tasks').then(backData => {
        setTaskData(backData);
      });
    }
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
    setFilteredTaskData,
    writeNewTask,
    handleDateFilter,
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
