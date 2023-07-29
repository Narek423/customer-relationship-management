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
import { IContact, IContactData } from '@/types/contact-type';
import { useUserContext } from '@/user-context';
import contactsFilter from '@/utils/contacts-filter';
import dataRequest from '@/utils/rest';

type ProviderProps = {
  children: ReactNode;
};

type ContactContextProps = {
  contactData: IContactData[];
  setContactData: Dispatch<SetStateAction<IContactData[]>>;
};

export const ContactDataContext = createContext<ContactContextProps | null>(
  null
);

export const ContactDataContextProvider: FC<ProviderProps> = ({ children }) => {
  const [contactData, setContactData] = useState<IContactData[]>([]);
  const { user, userData } = useUserContext();

  useEffect(() => {
    if (user === null) return;
    dataRequest<IContactData[]>('/contacts').then(backData => {
      setContactData(backData);
    });
  }, [user, userData]);

  const value = {
    contactData,
    setContactData,
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
