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

import { Logout } from '@mui/icons-material';
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
import { auth, storage, writeUserData } from '@/firebase/firebase';
import dataRequest from '@/utils/rest';

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
  contactsId: string[];
};

type ContextProps = {
  user: User | null;
  userData: ImageUploadObjact;
  setUserData: Dispatch<SetStateAction<ImageUploadObjact>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  signIn: (email: string, password: string) => void;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  userSignOut: () => void;
  contact: boolean;
  setContact: Dispatch<SetStateAction<boolean>>;
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
  const [contact, setContact] = useState<boolean>(false);

  const [userData, setUserData] = useState<ImageUploadObjact>({
    avatar: '',
    email: '',
    ['Last Name']: '',
    name: '',
    uid: '',
    tasksId: [''],
    contactsId: [''],
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
              userData.contactsId,
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
        alert(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    if (user && user.uid) {
      dataRequest<ImageUploadObjact>(`/users/${user.uid}`).then(response => {
        response && setUserData(response);
      });
    }

    return () => {
      unsubscribe();
    };
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
    contact,
    setContact,
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
