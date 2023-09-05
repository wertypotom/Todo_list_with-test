import React from 'react';
import styles from './Input.module.css';
import { ArrowDown } from '../Icons/ArrowDown';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onFormSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onArrowClick?: () => void;
}

const Input = ({ onFormSubmit, onArrowClick, ...rest }: Props) => {
  return (
    <form onSubmit={onFormSubmit} className={styles.container}>
      <ArrowDown
        className={styles.icon}
        onClick={onArrowClick}
        data-testid='arrow-down'
      />
      <input autoFocus type='text' {...rest} />
    </form>
  );
};

export default Input;
