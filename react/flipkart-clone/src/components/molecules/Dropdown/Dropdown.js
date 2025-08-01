import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import Icon from '../../atoms/Icon';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const Dropdown = ({ 
  label, 
  items = [], 
  onSelect,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (onSelect) onSelect(item);
    setIsOpen(false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : styles.closed}`} onClick={closeDropdown} />
      <div className={`${styles.dropdownContainer} ${className}`}>
        <div className={styles.dropdownTrigger} onClick={toggleDropdown}>
          {label}
          <Icon 
            icon={isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />} 
            size="small"
          />
        </div>
        <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : styles.closed}`}>
          {items.map((item, index) => (
            <div 
              key={index} 
              className={styles.dropdownItem}
              onClick={() => handleItemClick(item)}
            >
              {typeof item === 'string' ? item : item.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
