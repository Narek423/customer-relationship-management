import { FC, useState, useEffect } from 'react';

import Button from '@/components/layout/button';
import Input from '@/components/layout/input';
import { backendContactInputData } from '@/context/contact-context';
import { BackendContactInputContact } from '@/context/contact-context';

import styles from './styles.module.scss';

type InputElementType = {
  variant: string;
  label: string;
  title: string;
};

type InputContactProps = {
  input: InputElementType;
  inputsData: InputElementType[];
  index: number;
  handleSubmitContact: (
    backendContactInputData: BackendContactInputContact
  ) => void;
};

const InputContact: FC<InputContactProps> = ({
  input,
  inputsData,
  handleSubmitContact,
  index,
}) => {
  const [inputContactValue, setInputContactValue] = useState<string>('');

  useEffect(() => {
    (backendContactInputData as { [key: string]: string | boolean })[
      input.label as keyof BackendContactInputContact
    ] = inputContactValue;
  }, [inputContactValue]);

  return (
    <>
      <Input
        variant={input.variant}
        title={input.title}
        inputValue={inputContactValue}
        setInputValue={setInputContactValue}
      />
      {inputsData.length - 1 === index && (
        <div className={styles.button}>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmitContact(backendContactInputData);
            }}
          >
            Add contact
          </Button>
        </div>
      )}
    </>
  );
};

export default InputContact;
