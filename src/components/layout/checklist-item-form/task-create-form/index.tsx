import { FC, useState } from 'react';

import InputTasks from './input-tasks';
import { taskInptsData } from '@/task-inpts-data';
import { useTasksDataContext } from '@/tasks-context';
import {
  BackendInputTasks,
  TasksContextProvider,
  useTasksContext,
} from '@/tasks-wrighting-context';
import { useUserContext } from '@/user-context';

import styles from './styles.module.scss';

type TaskCreateFormProps = { onClose: () => void };

const TaskCreateForm: FC<TaskCreateFormProps> = ({ onClose }) => {
  const [err, setErr] = useState<string>('');
  const { writeNewTask } = useTasksContext();
  const { setTaskData } = useTasksDataContext();

  const { userData, setUserData } = useUserContext();
  const handleSubmit = async (backendInputData: BackendInputTasks) => {
    try {
      writeNewTask(backendInputData, userData, setUserData, setTaskData);
      onClose();
    } catch (error) {
      setErr('Invalid input! Please enter valid information.');
      alert(err);
    }
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <div className={styles.title}>Create task</div>
        <img
          onClick={onClose}
          className={styles.icon_X}
          src="assets/xIcon.png"
        />
      </div>

      <div className={styles.inputs_container}>
        <TasksContextProvider>
          {taskInptsData.map((input, index) => {
            return (
              <div key={Math.random()} className={styles.inputs}>
                <InputTasks
                  input={input}
                  inputsData={taskInptsData}
                  index={index}
                  handleSubmit={handleSubmit}
                />
              </div>
            );
          })}
        </TasksContextProvider>
      </div>
    </div>
  );
};

export default TaskCreateForm;
