import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { inputsData } from 'src/components/data/input-data';

import Button from '@/components/layout/button';
import LoadingSpinner from '@/components/layout/loading-spinner';
import { useUserContext } from '@/context/user-context';
import { BackendInputDataType } from '@/context/user-context';
import { writeUserData } from '@/firebase/firebase';
import InputSignUp from '@/pages/sign-up/input-sign-up';

import styles from './styles.module.scss';

type SignUpProps = {
  inputValue: string;
};
const SignUp: FC<SignUpProps> = () => {
  const [err, setErr] = useState<string>('');
  const { user, createUser, setUserData } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    user && router.push('/profile-page');
  }, [user]);

  const handleSubmit = async (backendInputData: BackendInputDataType) => {
    const {
      Name: name,
      Email: email,
      Password: password,
      ['Last Name']: lastName,
    } = backendInputData;
    try {
      const UserCredential = await createUser(email, password);
      const uid = UserCredential.user.uid;
      writeUserData(name, lastName, email, uid, [''], [''], '');
      setUserData({
        name,
        ['Last Name']: lastName,
        email,
        uid,
        tasksId: [''],
        contactsId: [''],
        avatar: '',
      });
      router.push('/profile-page');
    } catch (err) {
      setErr('Invalid input! Please enter valid information.');
    }
  };

  return user ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>SaaS Kit</div>
        <div className={styles.signUp_button}>
          <Button variant="text" onClick={() => router.push('/sign-in')}>
            Sign in
          </Button>
        </div>
      </div>
      <div className={styles.sign_up_card_container}>
        <div className={styles.sign_up_card}>
          <div className={styles.title}>
            Sign<span>up</span>
          </div>
          {err && <div className={styles.error}>{err}</div>}
          {inputsData.map((input, index) => {
            return (
              <div key={Math.random()} className={styles.inputs}>
                <InputSignUp
                  input={input}
                  inputsData={inputsData}
                  index={index}
                  handleSubmit={handleSubmit}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
