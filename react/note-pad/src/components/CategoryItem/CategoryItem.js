import React from 'react';
import styles from './CategoryItem.module.css';

const CategoryItem = ({
  category,
  icon,
  label,
  count,
  isActive,
  onClick
}) => {
  return (
    <button
      className={`${styles.categoryItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.categoryContent}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </div>
      <span className={styles.count}>{count}</span>
    </button>
  );
};

export default CategoryItem;
