import { FC, useState } from 'react';

import DeleteIndicator from './delete-indicator';
import Modal from '../../modal';
import ChecklistTitle from '../checklist_title';
import KalendCustom from '../custom-kalend';
import TaskCreateForm from '../task-create-form';
import CheckItem from '@/components/layout/checklist-item-form/checkItem';
import { useTasksDataContext } from '@/tasks-context';
import { TasksContextProvider } from '@/tasks-wrighting-context';

import 'kalend/dist/styles/index.css';
import styles from './styles.module.scss';

const ChecklistTask: FC = () => {
  const [creatTaskModal, setCreatTaskModal] = useState<boolean>(false);
  const { filteredTaskData } = useTasksDataContext();
  const [deleteIndicator, setDeleteIndicator] = useState<string>('');
  const [showMoreSwitcher, setShowMoreSwitcher] = useState<boolean>(false);

  return (
    <div className={styles.main_container}>
      {deleteIndicator && (
        <div className={styles.delete_indicator}>
          {deleteIndicator === 'Task deleting failed' ? (
            <DeleteIndicator
              success={false}
              deleteIndicator={deleteIndicator}
            />
          ) : (
            <DeleteIndicator success deleteIndicator={deleteIndicator} />
          )}
        </div>
      )}
      <ChecklistTitle />
      <KalendCustom />
      <div
        className={
          showMoreSwitcher
            ? styles.tasks_container
            : styles.tasks_container_show_more
        }
      >
        {filteredTaskData.map((checkItem: any) => {
          return (
            <div key={Math.random()}>
              <CheckItem
                checkItem={checkItem}
                setDeleteIndicator={setDeleteIndicator}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.button_container}>
        <a
          className={styles.show_btn}
          onClick={() => setShowMoreSwitcher(true)}
        >
          Show more
        </a>
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
