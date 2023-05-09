import {
  createContext,
  ReactNode,
  useContext,
  FC,
  SetStateAction,
  Dispatch,
  useState,
} from 'react';

type ProviderProps = {
  children: ReactNode;
};

export type BackendInputDataType = {
  Name: string;
  Email: string;
  ['Last Name']: string;
  Password: string;
};

type ContextProps = {
  backendInputData: BackendInputDataType;
  setBackendInputData: Dispatch<SetStateAction<BackendInputDataType>>;
};

export const UserSignupContext = createContext<ContextProps | null>(null);

export const UserSignupContextProvider: FC<ProviderProps> = ({ children }) => {
  const [backendInputData, setBackendInputData] =
    useState<BackendInputDataType>({
      Name: '',
      Email: '',
      ['Last Name']: '',
      Password: '',
    });
  const value = { backendInputData, setBackendInputData };
  return (
    <UserSignupContext.Provider value={value}>
      {children}
    </UserSignupContext.Provider>
  );
};

export const useUserSignupContext = () => {
  return useContext(UserSignupContext) as ContextProps;
};
