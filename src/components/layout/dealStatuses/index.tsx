import { FC, ReactNode } from 'react';

import Tag from '@/components/layout/tag';

type DealStatusProps = {
  dealStatus?: 'Low' | 'High' | 'Urgent';
};
const DealStatus: FC<DealStatusProps> = ({ dealStatus }) => {
  const dealStatusColor = (dealStatus: ReactNode) => {
    switch (dealStatus) {
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

  return <Tag color={dealStatusColor(dealStatus)}>{dealStatus}</Tag>;
};

export default DealStatus;
