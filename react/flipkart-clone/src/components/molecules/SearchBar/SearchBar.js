import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import Input from '../../atoms/Input';
import Icon from '../../atoms/Icon';
import { Search } from '@mui/icons-material';

const SearchBar = ({ 
  placeholder = "Search for products, brands and more", 
  value, 
  onChange, 
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState(value || '');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchIconWrapper}>
          <Icon 
            icon={<Search />} 
            size="small" 
            color="#2874f0"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
