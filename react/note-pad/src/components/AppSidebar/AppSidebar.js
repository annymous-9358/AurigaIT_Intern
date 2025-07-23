import React from 'react';
import styles from './AppSidebar.module.css';
import Button from '../Button';
import SearchInput from '../SearchInput/SearchInput';
import CategoryList from '../CategoryList/CategoryList';

const AppSidebar = ({
  categories,
  activeCategory,
  onCategoryChange,
  onCreateNote,
  searchTerm,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  categoryCounts,
  onCreateCategory,
  onDeleteCategory
}) => {
  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1 className={styles.title}>TakeNote</h1>
          <Button
            variant="ghost"
            size="small"
            onClick={() => onThemeToggle(!isDarkMode)}
            className={styles.themeToggle}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={onCreateNote}
          className={styles.createButton}
        >
          + New Note
        </Button>
      </div>

      {/* Search */}
      <div className={styles.search}>
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search notes..."
        />
      </div>

      {/* Categories */}
      <div className={styles.navigation}>
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          categoryCounts={categoryCounts}
          onCreateCategory={onCreateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
