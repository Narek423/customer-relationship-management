const currentWeekDates = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const weekDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(curr.setDate(first + i)));
  }

  return weekDates;
};

export default currentWeekDates;
