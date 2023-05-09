import { FC } from 'react';

import dynamic from 'next/dynamic';
import { Pie, Cell } from 'recharts';

import ChartNavbar from '../chart-navbar';
import EllipseIconThik from '@/icons-for-task/ellipse-icon-thik';
import { ITasks } from '@/types/main-task';
import { useUserContext } from '@/user-context';
import getTasksStatistics from '@/utils/get-tasks-statistics';
import userTasksFlter from '@/utils/user-tasks-filter';

import styles from './styles.module.scss';

const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

type PieChartCustomProps = {
  taskData: ITasks | null;
};

const PieChartCustom: FC<PieChartCustomProps> = ({ taskData }) => {
  const { userData } = useUserContext();
  const userTasks = userTasksFlter(userData.tasksId, taskData);
  const tasksStatistics = getTasksStatistics(userTasks);

  const data1 = [
    { name: 'Active', value: tasksStatistics.active },
    { name: 'Complited', value: tasksStatistics.complited },
    { name: 'Ended', value: tasksStatistics.ended },
  ];
  const COLORS = ['#2ed47a', '#ffb946', '#f7685b'];

  const statusItems = [
    { color: 'stroke-[#ffb946]', title: 'Active' },
    { color: 'stroke-[#2ed47a]', title: 'Complited' },
    { color: 'stroke-[#f7685b]', title: 'Ended' },
  ];

  return (
    <div className={styles.charts_circul}>
      <div className={styles.percent}>
        {Math.round(
          ((tasksStatistics.active +
            tasksStatistics.complited +
            tasksStatistics.ended) /
            10) *
            tasksStatistics.complited
        ) + '%'}
      </div>
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
