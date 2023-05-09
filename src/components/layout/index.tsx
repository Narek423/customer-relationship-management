import * as React from 'react';

import SignIn from '../../pages/sign-in';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { editTasksData, getUserTask, writeUserTask } from '@/firebase/firebase';
import ProfilePage from '@/pages/profile-page';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <ProfilePage />
      </main>

      <Footer />
      <div className="m-2 flex flex-col items-center justify-center gap-3">
        <button
          className=" w-32 bg-orange-500 p-2"
          onClick={() => writeUserTask('Do homework', 'do js homework')}
        >
          Write
        </button>
        <button
          className=" w-32 bg-green-500 p-2"
          onClick={async () => {
            const x = await getUserTask('c0fa3ed5-b8c4-41c2-a36e-a0d44c3ab89b');
          }}
        >
          Get
        </button>
        <button
          className="w-32 bg-blue-500 p-2"
          onClick={() =>
            editTasksData(
              'Party',
              'dencing',
              'c0fa3ed5-b8c4-41c2-a36e-a0d44c3ab89b'
            )
          }
        >
          Edit
        </button>
        <SignIn />
      </div>
    </>
  );
}
