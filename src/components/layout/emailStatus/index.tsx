import { FC, ReactNode } from 'react';

import Tag from '@/components/layout/tag';

type EmailStatusProps = {
  emailStatus?: 'Scheduled' | 'Sent' | 'Archived' | 'Draft';
};
const EmailStatus: FC<EmailStatusProps> = ({ emailStatus }) => {
  const emailColor = (emailStatus: ReactNode) => {
    switch (emailStatus) {
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

  return <Tag color={emailColor(emailStatus)}>{emailStatus}</Tag>;
};

export default EmailStatus;
