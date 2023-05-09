import { FC } from 'react';

import styles from './styles.module.scss';

type ChartNavbarProps = {
  title: string;
  period: string;
};

const ChartNavbar: FC<ChartNavbarProps> = ({ title, period }) => {
  return (
    <div className={styles.container_main}>
      <div className={styles.title_text}>{title}</div>
      <div className={styles.title_date}>
        <span>Show:</span>
        <a className={styles.title_date_btn}>{period}</a>
        <img
          className={styles.down_arrow}
          src="/assets/down-arrow.svg"
          alt="down-arrow"
        />
      </div>
    </div>
  );
};

export default ChartNavbar;
