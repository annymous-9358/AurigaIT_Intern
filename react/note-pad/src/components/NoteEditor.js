import React, { useState, useEffect, useRef } from 'react';
import styles from './NoteEditor.module.css';

const NoteEditor = ({
  activeNote,
  onUpdateNote,
  isDarkMode
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (activeNote) {
      onUpdateNote(activeNote.id, { title: newTitle });
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (activeNote) {
      onUpdateNote(activeNote.id, { content: newContent });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      setContent(newContent);
      
      if (activeNote) {
        onUpdateNote(activeNote.id, { content: newContent });
      }

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    }
  };

  if (!activeNote) {
    return (
      <div className={styles.noteEditor}>
        <div className={styles.editorPlaceholder}>
          <div className={styles.placeholderContent}>
            <h2>Welcome to TakeNote</h2>
            <p>Select a note from the sidebar to start editing, or create a new note.</p>
            <div className={styles.featuresList}>
              <h3>Features:</h3>
              <ul>
                <li>✨ Simple note taking</li>
                <li>🔍 Search functionality</li>
                <li>⭐ Favorites system</li>
                <li>🗑️ Trash with recovery</li>
                <li>🌙 Dark/Light theme</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.noteEditor}>
      <div className={styles.editorHeader}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Note title..."
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className={styles.editorContent}>
        <textarea
          ref={textareaRef}
          className={styles.contentTextarea}
          placeholder="Start writing your note..."
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={styles.editorFooter}>
        <span className={styles.wordCount}>
          {content.split(/\s+/).filter(word => word.length > 0).length} words
        </span>
        <span className={styles.charCount}>
          {content.length} characters
        </span>
      </div>
    </div>
  );
};

export default NoteEditor;
