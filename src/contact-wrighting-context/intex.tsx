import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

import { writeUserContact } from '@/firebase/firebase';
import { IContact } from '@/types/contact-type';
import { ImageUploadObjact } from '@/user-context';

type ProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ContactContextProps = {
  backendContactInputData: BackendContactInputContact;
  setBackendContactInputData: Dispatch<
    SetStateAction<BackendContactInputContact>
  >;
  writeNewContact: (
    backendContactInputData: BackendContactInputContact,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setContactData: Dispatch<SetStateAction<IContact | null>>
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

export const ContactsContext = createContext<ContactContextProps | null>(null);

export const ContactsContextProvider: FC<ProviderProps> = ({ children }) => {
  const [backendContactInputData, setBackendContactInputData] =
    useState<BackendContactInputContact>({
      Name: '',
      Email: '',
      ['Company name']: '',
      Role: '',
      Forecast: '',
      ['Due date']: '',
      belongsContactTo: '',
      avatar: '',
      isDone: false,
    });

  const writeNewContact = (
    backendContactInputData: BackendContactInputContact,
    user: ImageUploadObjact,
    setUserData: Dispatch<SetStateAction<ImageUploadObjact>>,
    setContactData: Dispatch<SetStateAction<IContact | null>>
  ) => {
    return writeUserContact(
      backendContactInputData,
      user,
      setUserData,
      setContactData
    );
  };

  const value = {
    backendContactInputData,
    setBackendContactInputData,
    writeNewContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => {
  return useContext(ContactsContext) as ContactContextProps;
};
