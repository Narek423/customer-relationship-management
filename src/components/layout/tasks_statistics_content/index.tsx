import { FC } from 'react';

import ChecklistTask from '../checklist-item-form/checklist-task';
import LineChartCustom from '../line-chart-custom';
import PieChartCustom from '../pie-chart-custom';
import { useTasksDataContext } from '@/tasks-context';
import { useUserContext } from '@/user-context';

import styles from './styles.module.scss';

const TasksStatisticsContent: FC = () => {
  const { taskData } = useTasksDataContext();
  const { userData } = useUserContext();

  return (
    <div className={styles.content}>
      <div className={styles.taskarea_container}>
        {userData && taskData && <ChecklistTask />}
      </div>
      <div className={styles.charts_container}>
        {userData && taskData && <LineChartCustom />}
        {userData && taskData && (
          <PieChartCustom taskData={taskData} userData={userData} />
        )}
      </div>
    </div>
  );
};

export default TasksStatisticsContent;
