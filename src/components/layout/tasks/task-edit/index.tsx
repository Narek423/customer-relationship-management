import { FC, useState } from 'react';

import Button from '@/components/layout/button';
import Input from '@/components/layout/input';
import { IEditData } from '@/components/types/edit-data-type';
import { useTasksDataContext } from '@/context/tasks-context';
import { useUserContext } from '@/context/user-context';
import taskUpdateForUi from '@/utils/task-update-for-ui';

import styles from './styles.module.scss';

type TaskTaskEditProps = {
  onClose: () => void;
  checkItem: IEditData;
};
const TaskEdit: FC<TaskTaskEditProps> = ({ onClose, checkItem }) => {
  const [fullName, setFullName] = useState<string>(checkItem['Full name']);
  const [label, setLabel] = useState<string>(checkItem.Label);
  const [dueDate, setDueDate] = useState<string>(checkItem['Due date']);
  const [type, setType] = useState<string>(checkItem.Type);
  const [status, setStatus] = useState<string>(checkItem.Status);
  const { taskData, setTaskData } = useTasksDataContext();
  const { userData } = useUserContext();

  const id = checkItem.uid;
  const updatedCheckItem = {
    uid: id,
    ['Full name']: fullName,
    Label: label,
    ['Due date']: dueDate,
    Type: type,
    Status: status,
    avatar: './assets/avatar.jpg',
    belongsTo: userData.uid,
  };

  const statuses = ['Ended', 'Completed', 'Active'];
  const types = ['Call', 'Event', 'Reminder'];

  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <div className={styles.title}>Edit task</div>
        <img
          onClick={onClose}
          className={styles.icon_X}
          src="assets/xIcon.png"
        />
      </div>

      <div className={styles.inputs_container}>
        <Input
          variant="text"
          title="Full name"
          inputValue={fullName}
          setInputValue={setFullName}
        />
        <Input
          variant="text"
          title="Label"
          inputValue={label}
          setInputValue={setLabel}
        />
        <Input
          variant="date"
          title="Due date"
          inputValue={dueDate}
          setInputValue={setDueDate}
        />
        <Input
          variant="select"
          title="Type"
          inputValue={type}
          setInputValue={setType}
          options={types}
        />
        <Input
          variant="select"
          title="Status"
          inputValue={status}
          setInputValue={setStatus}
          options={statuses}
        />
        <Button
          variant="contained"
          onClick={() =>
            taskUpdateForUi(id, updatedCheckItem, taskData, setTaskData)
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskEdit;
