import { FC, ReactNode } from 'react';

import Tag from '@/components/layout/tag';

type ContactStatusProps = {
  contactStatus?: 'New' | 'Top rated' | 'Fired';
};
const ContactStatus: FC<ContactStatusProps> = ({ contactStatus }) => {
  const contactStatusColor = (contactStatus: ReactNode) => {
    switch (contactStatus) {
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

  return <Tag color={contactStatusColor(contactStatus)}>{contactStatus}</Tag>;
};

export default ContactStatus;
