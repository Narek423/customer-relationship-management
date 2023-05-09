import { FC } from 'react';

import ChecklistTask from '../checklist-item-form/checklist-task';
import LineChartCustom from '../line-chart-custom';
import PieChartCustom from '../pie-chart-custom';
import dataCheck from '@/fake-data/checklist-task';
import { TasksDataContextProvider, useTasksDataContext } from '@/tasks-context';

import styles from './styles.module.scss';

const TasksStatisticsContent: FC = () => {
  const { taskData } = useTasksDataContext();

  return (
    <div className={styles.content}>
      <div className={styles.taskarea_container}>
        <TasksDataContextProvider>
          <ChecklistTask checkItems={dataCheck} />
        </TasksDataContextProvider>
      </div>
      <div className={styles.charts_container}>
        <LineChartCustom />
        <PieChartCustom taskData={taskData} />
      </div>
    </div>
  );
};

export default TasksStatisticsContent;
