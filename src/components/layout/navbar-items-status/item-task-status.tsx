import { FC, ReactNode } from 'react';

import ItemTag from '@/components/layout/navbar-items-status/item-tag';
import ItemsIcon from '@/components/svg-icons/items-icon';

type ItemTaskStatusesProps = {
  itemTaskStatuses?: 'Completed' | 'Ended' | 'Active';
  toggle: boolean;
};
const ItemTaskStatuses: FC<ItemTaskStatusesProps> = ({
  itemTaskStatuses,
  toggle,
}) => {
  const itemTaskStatusesColor = (itemTaskStatuses: ReactNode) => {
    switch (itemTaskStatuses) {
      case 'Completed':
        return 'green';
      case 'Ended':
        return 'red';
      case 'Active':
        return 'yellow';
      default:
        return 'green';
    }
  };

  return (
    <ItemTag color={itemTaskStatusesColor(itemTaskStatuses)}>
      <div className="px-3">
        <ItemsIcon />
      </div>
      {!toggle && itemTaskStatuses}
    </ItemTag>
  );
};

export default ItemTaskStatuses;
