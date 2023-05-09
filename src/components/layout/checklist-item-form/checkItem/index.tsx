import { FC } from 'react';

import Tag from '../../tag';
import EllipseIcon from '@/icons-for-task/ellipse-icon';

import styles from './styles.module.scss';

type CheckItemProps = {
  checkItem: any;
};

const CheckItem: FC<CheckItemProps> = ({ checkItem }) => {
  const colorPicker = (status: string) => {
    switch (status) {
      case 'Ended':
        return 'red';
      case 'Complited':
        return 'green';
      case 'Active':
        return 'yellow';
      default:
        return 'green';
    }
  };

  const indicatorIconColor = [
    { status: 'Complited', style: styles.ellipse_green },
    { status: 'Active', style: styles.ellipse_yellow },
    { status: 'Ended', style: styles.ellipse_red },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.title}>{checkItem.Label}</div>
        <div className={styles.type}>{checkItem.Type}</div>
      </div>
      <div className={styles.due_date}>
        <span>Due date:</span> {checkItem['Due date']}
      </div>
      <div className={styles.avatar_idicator_container}>
        <div className={styles.avatar_name}>
          <img className={styles.avatar} src={checkItem.avatar} alt="" />
          <div>{checkItem['Full name']}</div>
        </div>
        <div className={styles.indicatorc_main_container}>
          <div className={styles.indicator_container}>
            {indicatorIconColor.map((elem, index) => {
              if (checkItem.Status === elem.status) return;
              return (
                <div key={Math.random() + index} className={elem.style}>
                  <EllipseIcon />
                </div>
              );
            })}
          </div>
          <div className={styles.edit_recycle_icon}>
            <img className="flex" src="/assets/pan.svg" alt="pan" />
            <img className="flex" src="/assets/recycle.svg" alt="recycle" />
          </div>
          <Tag color={colorPicker(checkItem.Status)}>{checkItem.Status}</Tag>
        </div>
      </div>
    </div>
  );
};

export default CheckItem;
