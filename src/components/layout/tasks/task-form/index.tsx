import { Dispatch, FC, SetStateAction, useState } from 'react';

import DeleteModal from '../../delete-modal';
import Modal from '../../modal';
import Tag from '../../tag';
import TaskEdit from '@/components/layout/tasks/task-edit';
import EllipseIcon from '@/components/svg-icons/icons-for-task/ellipse-icon';
import { ITaskData } from '@/components/types/main-task';
import { useTasksDataContext } from '@/context/tasks-context';
import { useUserContext } from '@/context/user-context';
import { removeTask } from '@/firebase/firebase';
import statusSwitcher from '@/utils/status-switcher';

import styles from './styles.module.scss';

type CheckItemProps = {
  checkItem: ITaskData;
  setDeleteIndicator: Dispatch<SetStateAction<string>>;
};

const TaskForm: FC<CheckItemProps> = ({ checkItem, setDeleteIndicator }) => {
  const { userData, setUserData } = useUserContext();
  const { setTaskData, taskData } = useTasksDataContext();
  const [remuveModal, setRemuveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [edit, setEdit] = useState<{
    ['Full name']: string;
    Label: string;
    ['Due date']: string;
    Type: string;
    Status: string;
    Uid: string;
  } | null>(null);

  const colorPicker = (status: string) => {
    switch (status) {
      case 'Ended':
        return 'red';
      case 'Completed':
        return 'green';
      case 'Active':
        return 'yellow';
      default:
        return 'green';
    }
  };
  const indicatorIconColor = [
    { status: 'Completed', style: styles.ellipse_green },
    { status: 'Active', style: styles.ellipse_yellow },
    { status: 'Ended', style: styles.ellipse_red },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.title}>{checkItem.Label}</div>
        <div className={styles.type}>{checkItem.Type}</div>
      </div>
      <div className={styles.due_date}>
        <span>Due date:</span> {checkItem['Due date']}
      </div>
      <div className={styles.avatar_idicator_container}>
        <div className={styles.avatar_name}>
          <img className={styles.avatar} src={checkItem.avatar} alt="" />
          <div>{checkItem['Full name']}</div>
        </div>
        <div className={styles.indicatorc_main_container}>
          <div className={styles.indicator_container}>
            {indicatorIconColor.map((elem, index) => {
              if (checkItem.Status === elem.status) return;
              return (
                <div
                  key={Math.random() + index}
                  className={elem.style}
                  onClick={() => {
                    statusSwitcher(
                      elem.status,
                      checkItem,
                      setTaskData,
                      taskData
                    );
                  }}
                >
                  <EllipseIcon />
                </div>
              );
            })}
          </div>
          <div className={styles.edit_recycle_icon}>
            <img
              className="flex"
              src="/assets/pan.svg"
              alt="pan"
              onClick={e => {
                e.stopPropagation();
                setEditModal(true);
                setEdit({
                  ['Full name']: checkItem['Full name'],
                  Label: checkItem.Label,
                  ['Due date']: checkItem['Due date'],
                  Type: checkItem.Type,
                  Status: checkItem.Status,
                  Uid: checkItem.uid,
                });
              }}
            />

            <img
              className="flex"
              src="/assets/recycle.svg"
              alt="recycle"
              onClick={() => setRemuveModal(true)}
            />
          </div>
          {editModal && (
            <div className={styles.modal_full_screen}>
              <Modal openModal={editModal} onClose={() => setEditModal(false)}>
                <TaskEdit
                  onClose={() => setEditModal(false)}
                  checkItem={checkItem}
                />
              </Modal>
            </div>
          )}

          {remuveModal && (
            <div className={styles.modal_full_screen}>
              <Modal
                openModal={remuveModal}
                onClose={() => setRemuveModal(false)}
              >
                <DeleteModal
                  onClose={() => setRemuveModal(false)}
                  removeTask={async () => {
                    try {
                      await removeTask(
                        checkItem.uid,
                        setTaskData,
                        userData,
                        setUserData
                      );
                      setDeleteIndicator('Task has been deleted successfully');
                    } catch (err) {
                      setDeleteIndicator('Task deleting failed');
                    }

                    setTimeout(() => setDeleteIndicator(''), 2000);
                  }}
                />
              </Modal>
            </div>
          )}
          <Tag color={colorPicker(checkItem.Status)}>{checkItem.Status}</Tag>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
