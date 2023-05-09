import { FC, ReactNode } from 'react';

import ItemTag from '@/components/layout/navbar-items-status/item-tag';
import ItemsIcon from '@/components/svg-icons/items-icon';

type ItemContactStatusProps = {
  toggle: boolean;
  itemContactStatus?: 'New' | 'Top rated' | 'Fired';
};
const ItemContactStatus: FC<ItemContactStatusProps> = ({
  itemContactStatus,
  toggle,
}) => {
  const itemContactStatusColor = (itemContactStatus: ReactNode) => {
    switch (itemContactStatus) {
      case 'New':
        return 'green';
      case 'Top rated':
        return 'yellow';
      case 'Fired':
        return 'red';
      default:
        return 'green';
    }
  };

  return (
    <ItemTag color={itemContactStatusColor(itemContactStatus)}>
      <div className="px-3 ">
        <ItemsIcon />
      </div>
      {!toggle && itemContactStatus}
    </ItemTag>
  );
};

export default ItemContactStatus;
