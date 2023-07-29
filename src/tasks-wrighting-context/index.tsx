import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

import { writeUserTask } from '@/firebase/firebase';
import { ITasks } from '@/types/main-task';
import { ImageUploadObjact } from '@/user-context';

type ProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ContextProps = {
  backendInputData: BackendInputTasks;
  setBackendInputData: Dispatch<SetStateAction<BackendInputTasks>>;
  writeNewTask: (
    backendInputData: BackendInputTasks,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setTaskData: Dispatch<SetStateAction<ITasks | null>>
  ) => void;
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

export const TasksContext = createContext<ContextProps | null>(null);

export const TasksContextProvider: FC<ProviderProps> = ({ children }) => {
  const [backendInputData, setBackendInputData] = useState<BackendInputTasks>({
    ['Full name']: '',
    Label: '',
    ['Due date']: '',
    Type: '',
    Status: '',
    belongsTo: '',
    avatar: '',
  });

  const writeNewTask = (
    backendInputData: BackendInputTasks,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setTaskData: Dispatch<SetStateAction<ITasks | null>>
  ) => {
    return writeUserTask(backendInputData, user, setUserData, setTaskData);
  };
  const value = {
    backendInputData,
    setBackendInputData,
    writeNewTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext) as ContextProps;
};
