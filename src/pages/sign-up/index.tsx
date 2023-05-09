import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Button from '@/components/layout/button';
import LoadingSpinner from '@/components/layout/loading-spinner';
import { writeUserData } from '@/firebase/firebase';
import { inputsData } from '@/input-data';
import InputSignUp from '@/pages/sign-up/input-sign-up';
import { useUserContext } from '@/user-context';
import {
  BackendInputDataType,
  UserSignupContextProvider,
} from '@/user-signup-context';

import styles from './styles.module.scss';

type SignUpProps = {
  inputValue: string;
};
const SignUp: FC<SignUpProps> = () => {
  const [err, setErr] = useState<string>('');
  const { user, createUser } = useUserContext();

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
      writeUserData(name, lastName, email, uid, [''], '');
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
          <UserSignupContextProvider>
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
          </UserSignupContextProvider>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
