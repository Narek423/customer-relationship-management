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
import { getTaskData } from '@/firebase/firebase';
import { ITasks } from '@/types/main-task';
import { useUserContext } from '@/user-context';

type ProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ContextProps = {
  taskData: ITasks | null;
  setTaskData: Dispatch<SetStateAction<ITasks | null>>;
};

export const TasksDataContext = createContext<ContextProps | null>(null);

export const TasksDataContextProvider: FC<ProviderProps> = ({ children }) => {
  const [taskData, setTaskData] = useState<ITasks | null>(null);

  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) return;

    getTaskData().then(backData => setTaskData(backData.val()));
  }, [user]);

  const value = {
    taskData,
    setTaskData,
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
