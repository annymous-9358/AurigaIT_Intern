import React, { useState, useEffect } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';
import NotesListPanel from '../NotesListPanel/NotesListPanel';
import NoteEditor from '../NoteEditor';
import { generateId, getCurrentTimestamp } from '../../utils/noteUtils';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './NotePadLayout.module.css';

const NotePadLayout = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [categories, setCategories] = useLocalStorage('categories', [
    { id: 'all', name: 'All Notes', isDefault: true },
    { id: 'favorites', name: 'Favorites', isDefault: true }
  ]);
  const [activeNote, setActiveNote] = useLocalStorage('activeNote', null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Create new note
  const createNote = () => {
    const newNote = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      category: activeCategory === 'all' || activeCategory === 'favorites' ? 'general' : activeCategory,
      isFavorite: false,
      isDeleted: false,
      created: getCurrentTimestamp(),
      lastModified: getCurrentTimestamp()
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNote(newNote.id);
  };

  // Update note
  const updateNote = (id, updates) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id
          ? { ...note, ...updates, lastModified: getCurrentTimestamp() }
          : note
      )
    );
  };

  // Delete note (move to trash)
  const deleteNote = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, isDeleted: true } : note
      )
    );
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  // Permanently delete note
  const permanentlyDeleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  // Restore note from trash
  const restoreNote = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, isDeleted: false } : note
      )
    );
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  // Create category
  const createCategory = (name) => {
    const newCategory = {
      id: generateId(),
      name,
      isDefault: false
    };
    setCategories(prevCategories => [...prevCategories, newCategory]);
    return newCategory.id;
  };

  // Delete category
  const deleteCategory = (id) => {
    // Don't delete default categories
    const category = categories.find(cat => cat.id === id);
    if (category?.isDefault) return;

    // Move notes from deleted category to 'general'
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.category === id ? { ...note, category: 'general' } : note
      )
    );

    setCategories(prevCategories => 
      prevCategories.filter(cat => cat.id !== id)
    );

    if (activeCategory === id) {
      setActiveCategory('all');
    }
  };

  // Get filtered notes based on search and category
  const getFilteredNotes = () => {
    let filtered = notes;

    // Filter by category
    if (activeCategory === 'favorites') {
      filtered = filtered.filter(note => note.isFavorite && !note.isDeleted);
    } else if (activeCategory === 'trash') {
      filtered = filtered.filter(note => note.isDeleted);
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(note => note.category === activeCategory && !note.isDeleted);
    } else {
      filtered = filtered.filter(note => !note.isDeleted);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Get category counts
  const getCategoryCounts = () => {
    const counts = {};
    
    counts.all = notes.filter(note => !note.isDeleted).length;
    counts.favorites = notes.filter(note => note.isFavorite && !note.isDeleted).length;
    counts.trash = notes.filter(note => note.isDeleted).length;

    categories.forEach(category => {
      if (!category.isDefault) {
        counts[category.id] = notes.filter(note => 
          note.category === category.id && !note.isDeleted
        ).length;
      }
    });

    return counts;
  };

  const filteredNotes = getFilteredNotes();
  const categoryCounts = getCategoryCounts();
  const currentNote = notes.find(note => note.id === activeNote);

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.darkMode : styles.lightMode}`}>
      <AppSidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onCreateNote={createNote}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isDarkMode={theme === 'dark'}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        categoryCounts={categoryCounts}
        onCreateCategory={createCategory}
        onDeleteCategory={deleteCategory}
      />
      
      <NotesListPanel
        notes={filteredNotes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        createNote={createNote}
        deleteNote={deleteNote}
        permanentlyDeleteNote={permanentlyDeleteNote}
        restoreNote={restoreNote}
        toggleFavorite={toggleFavorite}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
      />
      
      <NoteEditor
        note={currentNote}
        updateNote={updateNote}
        categories={categories.filter(cat => !cat.isDefault)}
      />
    </div>
  );
};

export default NotePadLayout;