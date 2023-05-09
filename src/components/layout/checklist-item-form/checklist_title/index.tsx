import { FC } from 'react';

import styles from './styles.module.scss';

type ChecklistTitleProps = {
  checkItems: any;
};

const ChecklistTitle: FC<ChecklistTitleProps> = ({ checkItems }) => {
  const complated = checkItems.filter(
    (checkItem: any) => checkItem.status === 'Completed'
  ).length;
  const items = `${checkItems.length !== 0 ? checkItems.length : 1}`;
  const percent = `${(complated / Number(items)) * 100}%`;

  return (
    <>
      <div className={styles.title}>
        <div className={styles.checklist_title}>
          <div className={styles.title_text}>
            {`${complated} task completed out of ${items}`}
          </div>
          <div className={styles.title_week}>
            <span>Show:</span>
            <a className={styles.title_week_btn}>This week</a>
            <img
              className={styles.down_arrow}
              src="/assets/down-arrow.svg"
              alt="down-arrow"
            />
          </div>
        </div>
      </div>
      <div className={styles.checklist_progress}>
        <div className={styles.percent_line}>
          <div
            className={styles.percent_line_div}
            style={{
              width: percent,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ChecklistTitle;
