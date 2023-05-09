import { FC } from 'react';

import styles from './styles.module.scss';

const LoadingAvatar: FC = () => {
  return (
    <div className={styles.loading_container}>
      <span className={styles.loading_spinner}></span>
    </div>
  );
};

export default LoadingAvatar;
