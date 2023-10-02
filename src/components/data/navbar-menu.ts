import ChatIcon from '@/components/svg-icons/chat-icon';
import DashboardIcon from '@/components/svg-icons/dashboard-icon';
import DealIcon from '@/components/svg-icons/deal-icon';
import EmailIcon from '@/components/svg-icons/email-icon';
import TaskIcon from '@/components/svg-icons/tasks-icon';
import UserIcon from '@/components/svg-icons/user-icon';
import { INavbarMenu } from '@/components/types/i-navbar-menu';

export const menu: INavbarMenu[] = [
  {
    name: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Tasks',
    icon: TaskIcon,
  },
  {
    name: 'Email',
    icon: EmailIcon,
  },
  {
    name: 'Contacts',
    icon: UserIcon,
  },
  {
    name: 'Chat',
    icon: ChatIcon,
  },
  {
    name: 'Deals',
    icon: DealIcon,
  },
];
