import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  Dispatch,
  useEffect,
  SetStateAction,
} from 'react';

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signOut,
} from 'firebase/auth';
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import LoadingSpinner from '@/components/layout/loading-spinner';
import { auth, getUserData, storage, writeUserData } from '@/firebase/firebase';

type ProviderProps = {
  children: ReactNode;
};

export type ImageUploadObjact = {
  avatar: string;
  email: string;
  ['Last Name']: string;
  name: string;
  uid: string;
  tasksId: string[];
};

type ContextProps = {
  user: User | null;
  userData: ImageUploadObjact;
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  signIn: (email: string, password: string) => void;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  userSignOut: () => void;
  onHandleClick: (
    imageUpload: Blob | null,
    setImageUpload: Dispatch<SetStateAction<Blob | null>>,
    setUrl: Dispatch<SetStateAction<string>>
  ) => void;
};
const UserContext = createContext<ContextProps | null>(null);

export const UserContextProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<ImageUploadObjact>({
    avatar: '',
    email: '',
    ['Last Name']: '',
    name: '',
    uid: '',
    tasksId: [''],
  });

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      currentUser => {
        setUser(currentUser.user);
      }
    );
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  const onHandleClick = (
    imageUpload: Blob | null,
    setImageUpload: Dispatch<SetStateAction<Blob | null>>,
    setUrl: Dispatch<SetStateAction<string>>
  ) => {
    if (imageUpload == null) return;

    const imageRef = sRef(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then(url => {
            writeUserData(
              userData.name,
              userData['Last Name'],
              userData.email,
              userData.uid,
              userData.tasksId,
              url
            );
            setUrl(url);
          })
          .catch(err => {
            alert(err);
          });
        setImageUpload(null);
      })
      .catch(error => {
        alert(error.massage);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (user === null) return;

    getUserData(user).then(backData => setUserData(backData.val()));
  }, [user]);

  const value = {
    user,
    setUser,
    signIn,
    userSignOut,
    createUser,
    userData,
    onHandleClick,
    setUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {loading ? <LoadingSpinner /> : children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext) as ContextProps;
};
