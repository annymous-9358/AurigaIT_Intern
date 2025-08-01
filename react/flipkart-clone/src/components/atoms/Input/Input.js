import React from 'react';
import styles from './Input.module.css';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
