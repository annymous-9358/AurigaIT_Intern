import React from 'react';
import styles from './CategoryNav.module.css';

const CategoryNav = ({ onCategoryClick, products = [] }) => {
  const availableCategories = [
    { name: 'Audio', apiCategory: 'audio', icon: '🎧' },
    { name: 'Mobiles', apiCategory: 'mobile', icon: '📱' },
    { name: 'Gaming', apiCategory: 'gaming', icon: '🎮' },
    { name: 'TV & Electronics', apiCategory: 'tv', icon: '📺' }
  ];

  const categoriesWithProducts = availableCategories.filter(category => {
    return products.some(product => product.category === category.apiCategory);
  });

  const handleClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category.apiCategory);
    }
  };

  return (
    <div className={styles.categoryNav}>
      <div className={styles.categoryContainer}>
        {categoriesWithProducts.map((category, index) => (
          <div 
            key={index} 
            className={styles.categoryItem}
            onClick={() => handleClick(category)}
          >
            <div className={styles.categoryImage}>
              <span style={{fontSize: '32px'}}>{category.icon}</span>
            </div>
            <span className={styles.categoryName}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
