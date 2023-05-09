import { FC, ReactNode } from 'react';

import Image from 'next/image';

import Tag from '@/components/layout/tag';
import styles from '@/components/layout/tag/styles.module.scss';

type ColleguePermissionsProps = {
  hasArrow: boolean;
  names?: 'Admin' | 'Read' | 'Edit';
};
const ColleguePermissions: FC<ColleguePermissionsProps> = ({
  names,
  hasArrow,
}) => {
  const emailColor = (names: ReactNode) => {
    switch (names) {
      case 'Admin':
        return 'dark';
      case 'Read':
        return 'light_gray';
      case 'Edit':
        return 'yellow';
      default:
        return 'green';
    }
  };

  return (
    <Tag color={emailColor(names)}>
      {names}
      {hasArrow && (
        <Image
          className={styles.icon}
          src="/favicon/ChevronDown.svg"
          alt=""
          height={20}
          width={20}
        />
      )}
    </Tag>
  );
};

export default ColleguePermissions;
