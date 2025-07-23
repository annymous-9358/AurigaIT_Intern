import React from 'react';
import styles from './CategoryList.module.css';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList = ({
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts
}) => {
  const categoryConfig = {
    all: { icon: '📝', label: 'All Notes' },
    favorites: { icon: '⭐', label: 'Favorites' },
    trash: { icon: '🗑️', label: 'Trash' }
  };

  return (
    <div className={styles.categoryList}>
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category.id}
          icon={categoryConfig[category.id]?.icon || '📁'}
          label={categoryConfig[category.id]?.label || category.name}
          count={categoryCounts[category.id] || 0}
          isActive={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
