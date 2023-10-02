import { FC } from 'react';

import TaskContainer from 'src/components/layout/tasks/task-container';

import LineChartCustom from '../line-chart-custom';
import PieChartCustom from '../pie-chart-custom';
import { useTasksDataContext } from '@/context/tasks-context';
import { useUserContext } from '@/context/user-context';

import styles from './styles.module.scss';

const TasksStatisticsContent: FC = () => {
  const { taskData } = useTasksDataContext();
  const { userData } = useUserContext();

  return (
    <div className={styles.content}>
      <div className={styles.taskarea_container}>
        {userData && taskData && <TaskContainer />}
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
