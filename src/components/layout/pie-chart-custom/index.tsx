import { FC, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { Pie, Cell } from 'recharts';

import ChartNavbar from '../chart-navbar';
import EllipseIconThik from '@/icons-for-task/ellipse-icon-thik';
import { ITasks } from '@/types/main-task';
import { ImageUploadObjact } from '@/user-context';
import getTasksStatistics from '@/utils/get-tasks-statistics';
import userTasksFilter from '@/utils/user-tasks-filter';

import styles from './styles.module.scss';

const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

type PieChartCustomProps = {
  taskData: ITasks | null;
  userData: ImageUploadObjact;
};

const PieChartCustom: FC<PieChartCustomProps> = ({ taskData, userData }) => {
  const userTasks = userTasksFilter(userData.tasksId, taskData);

  const tasksStatistics = getTasksStatistics(userTasks as any);

  const data1 = [
    { name: 'Active', value: tasksStatistics.active },
    { name: 'Completed', value: tasksStatistics.completed },
    { name: 'Ended', value: tasksStatistics.ended },
  ];
  const COLORS = ['#ffb946', '#2ed47a', '#f7685b'];

  const statusItems = [
    { color: 'stroke-[#ffb946]', title: 'Active' },
    { color: 'stroke-[#2ed47a]', title: 'Completed' },
    { color: 'stroke-[#f7685b]', title: 'Ended' },
  ];
  const completedPercent = Math.round(
    (tasksStatistics.completed /
      (tasksStatistics.active +
        tasksStatistics.completed +
        tasksStatistics.ended)) *
      100
  );
  return (
    <div className={styles.charts_circul}>
      <div
        className={`${styles.percent} ${
          completedPercent > 9 ? styles.high_percent : ''
        } ${completedPercent > 99 ? styles.hundred_percent : ''}`}
      >{`${completedPercent || 0 + '%'}`}</div>
      <ChartNavbar title={'Tasks'} period={'This month'} />
      <PieChart width={500} height={230}>
        <Pie
          data={data1}
          cx={160}
          cy={110}
          innerRadius={90}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className={styles.status_container}>
        {statusItems.map(elem => {
          return (
            <div key={Math.random()} className={elem.color}>
              <div className={styles.status_items}>
                <EllipseIconThik />
                <div className={styles.status_items_text}>{elem.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChartCustom;
