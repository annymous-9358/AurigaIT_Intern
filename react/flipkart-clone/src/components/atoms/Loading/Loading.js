import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullscreen = false,
  overlay = false 
}) => {
  const loadingClass = `${styles.loading} ${styles[size]} ${fullscreen ? styles.fullscreen : ''} ${overlay ? styles.overlay : ''}`;

  return (
    <div className={loadingClass}>
      <div className={styles.spinner}>
        <div className={styles.flipkartSpinner}>
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
        </div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loading;
