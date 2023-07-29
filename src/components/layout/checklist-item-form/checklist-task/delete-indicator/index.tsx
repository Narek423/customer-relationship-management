import { FC } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

import styles from './styles.module.scss';

type DeleteIndicatorProps = {
  success: boolean;
  deleteIndicator: string;
};

const DeleteIndicator: FC<DeleteIndicatorProps> = ({
  success,
  deleteIndicator,
}) => {
  return (
    <div
      className={
        success ? styles.main_container_success : styles.main_container_failed
      }
    >
      {success ? (
        <CheckCircleIcon className={styles.success_icon} />
      ) : (
        <DangerousIcon className={styles.success_icon} />
      )}
      {deleteIndicator}
    </div>
  );
};
export default DeleteIndicator;
