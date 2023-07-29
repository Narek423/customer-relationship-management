type UsersTasks = {
  ['Due date']: string;
  Label: string;
  Name: string;
  Status: string;
  Type: string;
  belongsTo: string;
}[];

const daysOfTheWeek = (userTasks: UsersTasks) => {
  const date = new Date();
  const week = [];
  const milliseconds = 86400000;

  for (let i = 0; i <= 6; i++) {
    const monthBack = new Date(
      date.getTime() - i * milliseconds
    ).toLocaleString('ru-RU');
    const monthFront = new Date(date.getTime() - i * milliseconds)
      .toString()
      .slice(4, 10);

    let num = 0;
    const chart: any = userTasks.map(userTask => {
      const utMonth = userTask?.['Due date'].slice(5, 7);
      const utDay = userTask?.['Due date'].slice(8, 10);
      const monthMonth = monthBack.slice(3, 5);
      const monthDay = monthBack.slice(0, 2);
      if (
        utMonth === monthMonth &&
        utDay === monthDay &&
        userTask?.Status === 'Ended'
      ) {
        return ++num;
      } else {
        return 0;
      }
    });
    const uv = Math.max.apply(null, chart);
    week.push({ name: monthFront, uv: uv < 0 ? 0 : uv });
  }

  return week.reverse();
};

export default daysOfTheWeek;
