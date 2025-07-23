import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ activeCategory }) => {
  const getEmptyStateContent = () => {
    const content = {
      notes: {
        icon: '📝',
        title: 'No notes yet',
        message: 'Create your first note to get started.'
      },
      favorites: {
        icon: '⭐',
        title: 'No favorites yet',
        message: 'Star notes to add them to your favorites.'
      },
      trash: {
        icon: '🗑️',
        title: 'Trash is empty',
        message: 'Deleted notes will appear here.'
      }
    };
    
    return content[activeCategory] || content.notes;
  };

  const { icon, title, message } = getEmptyStateContent();

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyMessage}>{message}</p>
    </div>
  );
};

export default EmptyState;
