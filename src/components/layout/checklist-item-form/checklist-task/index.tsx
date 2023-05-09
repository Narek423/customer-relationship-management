import { FC, useState } from 'react';

import Modal from '../../modal';
import ChecklistTitle from '../checklist_title';
import KalendCustom from '../custom-kalend';
import TaskCreateForm from '../task-create-form';
import CheckItem from '@/components/layout/checklist-item-form/checkItem';
import { useTasksDataContext } from '@/tasks-context';
import { TasksContextProvider } from '@/tasks-wrighting-context';
import { useUserContext } from '@/user-context';
import userTasksFlter from '@/utils/user-tasks-filter';

import 'kalend/dist/styles/index.css';

import styles from './styles.module.scss';

type ChecklistTaskProps = {
  checkItems: any;
};

const ChecklistTask: FC<ChecklistTaskProps> = ({ checkItems }) => {
  const [creatTaskModal, setCreatTaskModal] = useState<boolean>(false);
  const { taskData } = useTasksDataContext();
  const { userData } = useUserContext();
  return (
    <div className={styles.main_container}>
      <ChecklistTitle checkItems={checkItems} />
      <KalendCustom />
      <div className={styles.tasks_container}>
        {userTasksFlter(userData.tasksId, taskData).map((checkItem: any) => {
          return (
            <div key={Math.random()}>
              <CheckItem checkItem={checkItem} />
            </div>
          );
        })}
      </div>

      <div className={styles.button_container}>
        <a className={styles.show_btn}>Show more</a>
        <a
          className={styles.add_item_btn}
          onClick={() => setCreatTaskModal(true)}
        >
          Add task
        </a>
      </div>
      {creatTaskModal && (
        <div className={styles.modal_full_screen}>
          <Modal
            openModal={creatTaskModal}
            onClose={() => setCreatTaskModal(false)}
          >
            <TasksContextProvider>
              <TaskCreateForm onClose={() => setCreatTaskModal(false)} />
            </TasksContextProvider>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ChecklistTask;
