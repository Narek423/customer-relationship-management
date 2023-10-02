import { Dispatch, SetStateAction } from 'react';

import { WeekDaysType } from '@/components/layout/checklist-item-form/calendar';

const handleCalendarDateClick = (
  weekDay: string,
  clickDayStyle: WeekDaysType,
  setClickDayStyle: Dispatch<SetStateAction<WeekDaysType>>
) => {
  const clickDayStyleUpdated = { ...clickDayStyle };

  for (const key in clickDayStyleUpdated) {
    if (weekDay === key) {
      clickDayStyleUpdated[key as keyof WeekDaysType] = 'clicked';
    } else {
      clickDayStyleUpdated[key as keyof WeekDaysType] = '';
    }
  }
  setClickDayStyle(clickDayStyleUpdated);
};

export default handleCalendarDateClick;
