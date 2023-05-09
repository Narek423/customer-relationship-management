import { FC, ReactNode } from 'react';

import Tag from '@/components/layout/tag';
import styles from '@/components/layout/tag/styles.module.scss';

type TaskStatusesProps = {
  taskStatuses?: 'Completed' | 'Ended' | 'Active';
};
const TaskStatuses: FC<TaskStatusesProps> = ({ taskStatuses }) => {
  const taskStatusesColor = (taskStatuses: ReactNode) => {
    switch (taskStatuses) {
      case 'Completed':
        return 'green';
      case 'Ended':
        return 'red';
      case 'Active':
        return 'yellow';
      default:
        return 'green';
    }
  };

  return <Tag color={taskStatusesColor(taskStatuses)}>{taskStatuses}</Tag>;
};

export default TaskStatuses;
