import { FC } from 'react';

import { useTasksDataContext } from '@/tasks-context';
import { useUserContext } from '@/user-context';
import userTasksFilter from '@/utils/user-tasks-filter';

import styles from './styles.module.scss';

const ChecklistTitle: FC = () => {
  const { userData } = useUserContext();
  const { taskData } = useTasksDataContext();

  const userTasks = userTasksFilter(userData.tasksId, taskData);

  const status: string[] = [];

  userTasks.map(userTask => {
    userTask?.Status === 'Completed' ? status.push(userTask.Status) : 0;
  });
  const items = `${userTasks.length !== 0 ? userTasks.length : 0}`;
  const percent = `${(status.length / Number(items)) * 100}%`;
  return (
    <>
      <div className={styles.title}>
        <div className={styles.checklist_title}>
          <div className={styles.title_text}>
            {`${status.length} task completed out of ${items}`}
          </div>
          <div className={styles.title_week}>
            <span>Show:</span>
            <a className={styles.title_week_btn}>This week</a>
            <img
              className={styles.down_arrow}
              src="/assets/down-arrow.svg"
              alt="down-arrow"
            />
          </div>
        </div>
      </div>
      <div className={styles.checklist_progress}>
        <div className={styles.percent_line}>
          <div
            className={styles.percent_line_div}
            style={{
              width: percent,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ChecklistTitle;
