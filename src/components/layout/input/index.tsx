import {
  FC,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

import styles from './styles.module.scss';

type InputProps = {
  variant?: string;
  title?: string;
  inputValue?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

const Input: FC<InputProps> = ({
  variant = 'text',
  title = '',
  inputValue,
  setInputValue,
}) => {
  const [focusDetecter, setFocusDetecter] = useState<boolean>(false);
  const [passwordToggle, setPasswordToggle] = useState<boolean>(true);

  const inputTypePicker = (variant: string) => {
    if (variant === 'date') return 'date';
    return variant === 'password' && passwordToggle ? 'password' : 'text';
  };

  const selectElement = useRef<HTMLSelectElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      setFocusDetecter(true);
    };

    selectElement?.current?.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('focus', handleFocus);
    };
  }, [focusDetecter]);

  useEffect(() => {
    const handleFocus = () => {
      setFocusDetecter(true);
    };

    inputElement?.current?.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('focus', handleFocus);
    };
  }, [focusDetecter]);

  useEffect(() => {
    const handleBlur = () => {
      setFocusDetecter(false);
    };

    selectElement?.current?.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('blur', handleBlur);
    };
  }, [focusDetecter]);

  useEffect(() => {
    const handleBlur = () => {
      setFocusDetecter(false);
    };

    inputElement?.current?.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('blur', handleBlur);
    };
  }, [focusDetecter]);

  return (
    <div className={styles.input_wrapper}>
      <div
        className={
          focusDetecter
            ? styles.input_title_focus
            : `${
                inputValue
                  ? styles.input_title_with_value
                  : variant === 'avatar'
                  ? styles.input_title_with_avatar
                  : styles.input_title
              }`
        }
      >
        {title}
      </div>
      {variant === 'avatar' && (
        <img className={styles.input_avatar} src="/assets/girl.svg" alt="" />
      )}
      {variant === 'select' ? (
        <select
          ref={selectElement}
          className={
            focusDetecter ? styles.input_select_focus : styles.input_select
          }
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          required
        >
          <option value="" disabled hidden>
            {' '}
          </option>
          <option>Gwen 5:30</option>
          <option>Narek 4:30</option>
          <option>Esimov 4:20</option>
        </select>
      ) : (
        <div className={'flex '}>
          <input
            ref={inputElement}
            className={`${styles.input} ${styles[variant]} ${
              focusDetecter ? styles.input_focus : ''
            }`}
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
            onClick={() => setFocusDetecter(true)}
            type={inputTypePicker(variant)}
            required
          />
          {variant === 'password' &&
            (!passwordToggle ? (
              <img
                onClick={() => {
                  setPasswordToggle(!passwordToggle);
                }}
                className={'-ml-5 cursor-pointer'}
                src="/assets/eye-fill.svg"
                alt=""
              />
            ) : (
              <img
                onClick={() => {
                  setPasswordToggle(!passwordToggle);
                }}
                className={'-ml-5 cursor-pointer'}
                src="/assets/eye-slash-fill.svg"
                alt=""
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Input;
