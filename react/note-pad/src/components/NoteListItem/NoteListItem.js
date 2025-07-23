import React, { useState } from 'react';
import styles from './NoteListItem.module.css';
import Button from '../Button';
import { formatDate } from '../../utils/noteUtils';

const NoteListItem = ({
  note,
  isActive,
  onSelect,
  onDelete,
  onPermanentDelete,
  onToggleFavorite,
  onRestore,
  activeCategory
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleActionClick = (e) => {
    e.stopPropagation();
    setShowActions(!showActions);
  };

  const handleAction = (e, actionFn) => {
    e.stopPropagation();
    actionFn();
    setShowActions(false);
  };

  const getTitle = () => {
    return note.title || 'Untitled Note';
  };

  return (
    <div
      className={`${styles.noteItem} ${isActive ? styles.active : ''}`}
      onClick={onSelect}
    >
      <div className={styles.noteHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.noteTitle}>{getTitle()}</h3>
          {note.category === 'favorites' && (
            <span className={styles.favoriteIcon}>⭐</span>
          )}
        </div>
        
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="small"
            onClick={handleActionClick}
            className={styles.actionsButton}
          >
            ⋯
          </Button>
          
          {showActions && (
            <div className={styles.actionsDropdown}>
              {activeCategory === 'trash' ? (
                <>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={(e) => handleAction(e, onRestore)}
                    className={styles.actionItem}
                  >
                    ↶ Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={(e) => handleAction(e, onPermanentDelete)}
                    className={`${styles.actionItem} ${styles.danger}`}
                  >
                    🗑️ Delete Forever
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={(e) => handleAction(e, onToggleFavorite)}
                    className={styles.actionItem}
                  >
                    {note.category === 'favorites' ? '⭐ Unfavorite' : '⭐ Favorite'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={(e) => handleAction(e, onDelete)}
                    className={`${styles.actionItem} ${styles.danger}`}
                  >
                    🗑️ Delete
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.noteMeta}>
        <span className={styles.noteDate}>{formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
};

export default NoteListItem;
