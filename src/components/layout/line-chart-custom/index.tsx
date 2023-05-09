import { FC } from 'react';

import dynamic from 'next/dynamic';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import ChartNavbar from '../chart-navbar';
import data from '@/fake-data/line-chart';
import EllipseIconThik from '@/icons-for-task/ellipse-icon-thik';

import styles from './styles.module.scss';

const LineChartCustom: FC = () => {
  return (
    <div className={styles.charts_line}>
      <ChartNavbar title={'Deals'} period={'Monthly'} />
      <div className={styles.status_items}>
        <EllipseIconThik />
        <div className={styles.status_items_text}>Closed deals</div>
      </div>
      <AreaChart
        width={500}
        height={230}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="6 6" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#109CF1" fill="#109bf16b" />
      </AreaChart>
    </div>
  );
};

export default LineChartCustom;
