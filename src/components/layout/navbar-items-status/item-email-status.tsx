import { FC, ReactNode } from 'react';

import ItemTag from '@/components/layout/navbar-items-status/item-tag';
import ItemsIcon from '@/components/svg-icons/items-icon';

type EmailStatusProps = {
  toggle: boolean;
  itemEmailStatus: 'Scheduled' | 'Sent' | 'Archived' | 'Draft';
};
const ItemEmailStatus: FC<EmailStatusProps> = ({ itemEmailStatus, toggle }) => {
  const itemEmailColor = (itemEmailStatus: ReactNode) => {
    switch (itemEmailStatus) {
      case 'Scheduled':
        return 'purple';
      case 'Sent':
        return 'green';
      case 'Archived':
        return 'red';
      case 'Draft':
        return 'yellow';
      default:
        return 'green';
    }
  };

  return (
    <ItemTag color={itemEmailColor(itemEmailStatus)}>
      <div className="px-3">
        <ItemsIcon />
      </div>
      {!toggle && itemEmailStatus}
    </ItemTag>
  );
};

export default ItemEmailStatus;
