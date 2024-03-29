import { FC, useState, useEffect } from 'react';

import Button from '@/components/layout/button';
import Input from '@/components/layout/input';
import { BackendInputDataType, backendInputData } from '@/context/user-context';

import styles from './styles.module.scss';

type InputElementType = {
  variant: string;
  label: string;
  title: string;
  options: string[];
};

type InputSignUpProps = {
  input: InputElementType;
  inputsData: InputElementType[];
  index: number;
  handleSubmit: (backendInputData: BackendInputDataType) => void;
};

const InputSignUp: FC<InputSignUpProps> = ({
  input,
  inputsData,
  handleSubmit,
  index,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    (backendInputData as { [key: string]: string | boolean })[
      input.label as keyof BackendInputDataType
    ] = inputValue;
  }, [inputValue]);

  return (
    <>
      <Input
        variant={input.variant}
        title={input.title}
        inputValue={inputValue}
        setInputValue={setInputValue}
        options={input.options}
      />
      {inputsData.length - 1 === index && (
        <div className={styles.button}>
          <Button
            variant="contained"
            onClick={() => handleSubmit(backendInputData)}
          >
            Sign up
          </Button>
        </div>
      )}
    </>
  );
};

export default InputSignUp;
