import { FC } from 'react';

import styles from './styles.module.scss';

type DeleteModalProps = {
  onClose: () => void;
  removeTask: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ onClose, removeTask }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Delete card ?</h3>
        <div
          onClick={() => {
            onClose();
          }}
          className={styles.x_icon}
        >
          X
        </div>
      </div>
      <div className={styles.text}>
        All actions will be removed from the activity feed and you won’t be able
        to re-open the card. There is no undo.
      </div>

      <span
        className={styles.delete_button}
        onClick={() => {
          onClose();
          removeTask();
        }}
      >
        Delete
      </span>
    </div>
  );
};

export default DeleteModal;
