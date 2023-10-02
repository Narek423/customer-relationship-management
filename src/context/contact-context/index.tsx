import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

import LoadingAvatar from '@/components/layout/loading-avatar';
import { IContact, IContactData } from '@/components/types/contact-type';
import { ImageUploadObjact, useUserContext } from '@/context/user-context';
import { writeUserContact } from '@/firebase/firebase';
import dataRequest from '@/utils/rest';

type ProviderProps = {
  children: ReactNode;
};

type ContactContextProps = {
  contactData: IContactData[];
  setContactData: Dispatch<SetStateAction<IContactData[]>>;
  writeNewContact: (
    backendContactInputData: BackendContactInputContact,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setContactData: Dispatch<SetStateAction<IContactData[]>>
  ) => void;
};

export type BackendContactInputContact = {
  Name: string;
  Email: string;
  ['Company name']: string;
  Role: string;
  Forecast: string;
  ['Due date']: string;
  belongsContactTo: string;
  avatar: string;
  isDone: boolean;
};

export const ContactDataContext = createContext<ContactContextProps | null>(
  null
);

// eslint-disable-next-line prefer-const
export const backendContactInputData: BackendContactInputContact = {
  Name: '',
  Email: '',
  ['Company name']: '',
  Role: '',
  Forecast: '',
  ['Due date']: '',
  belongsContactTo: '',
  avatar: '',
  isDone: false,
};

export const ContactDataContextProvider: FC<ProviderProps> = ({ children }) => {
  const [contactData, setContactData] = useState<IContactData[]>([]);
  const { user, userData } = useUserContext();

  const writeNewContact = (
    backendContactInputData: BackendContactInputContact,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setContactData: Dispatch<SetStateAction<IContactData[]>>
  ) => {
    return writeUserContact(
      backendContactInputData,
      user,
      setUserData,
      setContactData
    );
  };

  useEffect(() => {
    if (user === null) return;
    dataRequest<IContactData[]>('/contacts').then(backData => {
      setContactData(backData);
    });
  }, [user, userData]);

  const value = {
    contactData,
    setContactData,
    writeNewContact,
  };

  return (
    <ContactDataContext.Provider value={value}>
      {!contactData ? (
        <div className="m-10">
          <LoadingAvatar />
        </div>
      ) : (
        children
      )}
    </ContactDataContext.Provider>
  );
};

export const useContactsDataContext = () => {
  return useContext(ContactDataContext) as ContactContextProps;
};
