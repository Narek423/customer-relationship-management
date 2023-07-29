import { AppProps } from 'next/app';

import '@/styles/global.scss';
import { TasksDataContextProvider } from '@/tasks-context';
import { UserContextProvider } from '@/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <TasksDataContextProvider>
        <Component {...pageProps} />
      </TasksDataContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
