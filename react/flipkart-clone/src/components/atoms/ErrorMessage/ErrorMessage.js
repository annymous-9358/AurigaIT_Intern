import React from 'react';
import styles from './ErrorMessage.module.css';
import Button from '../Button';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry, 
  fullWidth = false,
  showRetry = true 
}) => {
  return (
    <div className={`${styles.errorContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      <div className={styles.errorIcon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
            fill="#ff6161"
          />
        </svg>
      </div>
      <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
      <p className={styles.errorMessage}>{message}</p>
      {showRetry && onRetry && (
        <Button 
          variant="primary" 
          size="medium" 
          onClick={onRetry}
          className={styles.retryButton}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
