import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type ButtonProps = {
  variant?: 'contained' | 'text' | 'outlined';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({
  variant = 'contained',
  disabled = false,
  onClick = () => alert('No click function'),
  children,
}) => {
  return (
    <button
      className={`${variant !== 'text' ? styles.button : styles.text} ${
        styles[variant]
      } ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
