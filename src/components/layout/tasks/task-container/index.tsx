import { FC, useState } from 'react';

import DeleteIndicator from './delete-indicator';
import Calendar from '../../checklist-item-form/calendar';
import Modal from '../../modal';
import TaskCreateForm from '../task-create-form';
import TaskBodyTitle from '../tasks-body-title';
import TaskForm from '@/components/layout/tasks/task-form';
import { ITaskData } from '@/components/types/main-task';
import { useTasksDataContext } from '@/context/tasks-context';

import styles from './styles.module.scss';

const TaskContainer: FC = () => {
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
      <TaskBodyTitle />
      <Calendar />
      <hr />
      <div
        className={
          showMoreSwitcher
            ? styles.tasks_container
            : styles.tasks_container_show_more
        }
      >
        {filteredTaskData.map((checkItem: ITaskData) => {
          return (
            <div key={Math.random()}>
              <TaskForm
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
            <TaskCreateForm onClose={() => setCreatTaskModal(false)} />
          </Modal>
        </div>
      )}
    </div>
  );
};
export default TaskContainer;
