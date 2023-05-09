import { FC, ReactNode } from 'react';

import ItemTag from '@/components/layout/navbar-items-status/item-tag';
import ItemsIcon from '@/components/svg-icons/items-icon';

type ItemDealStatusProps = {
  toggle: boolean;
  itemDealStatus?: 'Low' | 'High' | 'Urgent';
};
const ItemDealStatus: FC<ItemDealStatusProps> = ({
  itemDealStatus,
  toggle,
}) => {
  const itemDealStatusColor = (itemDealStatus: ReactNode) => {
    switch (itemDealStatus) {
      case 'Low':
        return 'yellow';
      case 'High':
        return 'green';
      case 'Urgent':
        return 'red';
      default:
        return 'green';
    }
  };

  return (
    <ItemTag color={itemDealStatusColor(itemDealStatus)}>
      <div className="px-3">
        <ItemsIcon />
      </div>
      {!toggle && itemDealStatus}
    </ItemTag>
  );
};

export default ItemDealStatus;
