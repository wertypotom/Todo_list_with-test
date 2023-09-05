import React from 'react';
import styles from './Checkbox.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ ...rest }: Props) => {
  return (
    <div className={styles.container}>
      <input type='checkbox' {...rest} />
    </div>
  );
};

export default Checkbox;
