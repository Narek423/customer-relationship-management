import { FC } from 'react';

import { CalendarView } from 'kalend';
import dynamic from 'next/dynamic';

import 'kalend/dist/styles/index.css';

import styles from './styles.module.scss';

const Kalend = dynamic(() => import('kalend'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const KalendCustom: FC = () => {
  return (
    <>
      <div className="h-22">
        <Kalend
          colors={{
            light: {
              primaryColor: '#109CF1',
            },
            dark: {
              primaryColor: 'orange',
            },
          }}
          initialDate={new Date().toISOString()}
          events={[]}
          hourHeight={60}
          initialView={CalendarView.WEEK}
          disabledViews={[
            CalendarView.DAY,
            CalendarView.MONTH,
            CalendarView.AGENDA,
          ]}
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={'en'}
        />
      </div>
      <div className={styles.line_container}>
        <hr />
      </div>
    </>
  );
};

export default KalendCustom;
