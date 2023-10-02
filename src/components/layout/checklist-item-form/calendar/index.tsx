import { FC, useState } from 'react';

import { useTasksDataContext } from '@/context/tasks-context';
import currentWeekDates from '@/utils/current-week-dates';
import handleCalendarDateClick from '@/utils/handle-calendar-date-click';

import styles from './styles.module.scss';

export type WeekDaysType = {
  Sun: string;
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
};

const Calendar: FC = () => {
  const [clickDayStyle, setClickDayStyle] = useState<WeekDaysType>({
    Sun: '',
    Mon: '',
    Tue: '',
    Wed: '',
    Thu: '',
    Fri: '',
    Sat: '',
  });
  const { handleDateFilter } = useTasksDataContext();
  return (
    <div className={styles.container} onClick={() => currentWeekDates()}>
      <div className={styles.date_title}>
        {new Date().toString().slice(0, 11)}
      </div>
      <div className={styles.week_days}>
        {currentWeekDates().map((day, index) => {
          const weekDay = day.toString().slice(0, 3);
          let currentDayStyle = '';
          if (
            day.toString().slice(0, 11) === new Date().toString().slice(0, 11)
          )
            currentDayStyle = 'blue';

          return (
            <div key={Math.random() + index} className={styles.day_container}>
              <div className={`${styles.week_day} ${styles[currentDayStyle]}`}>
                {day.toString().slice(0, 3)}
              </div>
              <div
                className={`${styles.date} ${styles[currentDayStyle]} ${
                  styles[clickDayStyle[weekDay as keyof WeekDaysType]]
                }`}
                onClick={() => {
                  handleCalendarDateClick(
                    weekDay,
                    clickDayStyle,
                    setClickDayStyle
                  );
                  handleDateFilter(day.toISOString().slice(0, 10));
                }}
              >
                {day.toString().slice(8, 11)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
