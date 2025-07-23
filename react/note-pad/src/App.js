import React from 'react';
import styles from './App.module.css';
import NotePadLayout from './components/NotePadLayout/NotePadLayout';

function App() {
  return (
    <div className={styles.app}>
      <NotePadLayout />
    </div>
  );
}

export default App;
