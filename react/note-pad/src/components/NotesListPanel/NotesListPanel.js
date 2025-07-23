import React from 'react';
import styles from './NotesListPanel.module.css';
import NoteListItem from '../NoteListItem/NoteListItem';
import EmptyState from '../EmptyState/EmptyState';

const NotesListPanel = ({
  notes,
  activeNote,
  onNoteSelect,
  onDeleteNote,
  onPermanentDelete,
  onToggleFavorite,
  onRestoreNote,
  activeCategory
}) => {
  const getCategoryTitle = () => {
    const titles = {
      notes: 'Notes',
      favorites: 'Favorites',
      trash: 'Trash'
    };
    return titles[activeCategory] || activeCategory;
  };

  if (notes.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>{getCategoryTitle()}</h2>
          <span className={styles.count}>0</span>
        </div>
        <EmptyState activeCategory={activeCategory} />
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{getCategoryTitle()}</h2>
        <span className={styles.count}>{notes.length}</span>
      </div>
      
      <div className={styles.notesList}>
        {notes.map(note => (
          <NoteListItem
            key={note.id}
            note={note}
            isActive={activeNote?.id === note.id}
            onSelect={() => onNoteSelect(note)}
            onDelete={() => onDeleteNote(note.id)}
            onPermanentDelete={() => onPermanentDelete(note.id)}
            onToggleFavorite={() => onToggleFavorite(note.id)}
            onRestore={() => onRestoreNote(note.id)}
            activeCategory={activeCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesListPanel;
