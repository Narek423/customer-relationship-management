import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type TagProps = {
  color: 'purple' | 'green' | 'red' | 'yellow' | 'dark' | 'light_gray';

  children: ReactNode;
};

const Tag: FC<TagProps> = ({ color, children }) => {
  return <div className={`${styles[color]}`}>{children}</div>;
};

export default Tag;
