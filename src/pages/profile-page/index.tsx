import { FC, useEffect } from 'react';

import { useRouter } from 'next/router';

import LoadingSpinner from '@/components/layout/loading-spinner';
import Navbar from '@/components/layout/navbar';
import Search from '@/components/layout/search';
import TasksStatisticsContent from '@/components/layout/tasks_statistics_content';
import { TasksDataContextProvider } from '@/tasks-context';
import { useUserContext } from '@/user-context';

import styles from './styles.module.scss';

const ProfilePage: FC = () => {
  const router = useRouter();

  const { user } = useUserContext();
  useEffect(() => {
    !user && router.push('/sign-in');
  }, [user]);

  return !user ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.search_content}>
        <div className={styles.search}>
          <Search placeholder="Global search" />
        </div>
        <TasksDataContextProvider>
          <TasksStatisticsContent />
        </TasksDataContextProvider>
      </div>
    </div>
  );
};

export default ProfilePage;
