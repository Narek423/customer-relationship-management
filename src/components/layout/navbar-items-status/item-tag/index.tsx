import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type ItemTagProps = {
  color: 'purple' | 'green' | 'red' | 'yellow' | 'dark' | 'light_gray';
  children: ReactNode;
};

const ItemTag: FC<ItemTagProps> = ({ children, color }) => {
  return <div className={`${styles[color]}`}>{children}</div>;
};

export default ItemTag;
