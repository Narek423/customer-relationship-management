import { FC, useState, useEffect } from 'react';

import Button from '@/components/layout/button';
import Input from '@/components/layout/input';
import { BackendInputTasks } from '@/context/tasks-context';
import { backendInputData } from '@/context/tasks-context';

import styles from './styles.module.scss';

type InputElementType = {
  variant: string;
  label: string;
  title: string;
  options?: string[];
};

type InputTasksProps = {
  input: InputElementType;
  inputsData: InputElementType[];
  index: number;
  handleSubmit: (backendInputData: BackendInputTasks) => void;
};

const InputTasks: FC<InputTasksProps> = ({
  input,
  inputsData,
  handleSubmit,
  index,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    (backendInputData as { [key: string]: string | boolean })[
      input.label as keyof BackendInputTasks
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
            Create task
          </Button>
        </div>
      )}
    </>
  );
};

export default InputTasks;
