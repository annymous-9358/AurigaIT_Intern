import React from 'react';
import styles from './Image.module.css';

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  objectFit,
  borderRadius,
  clickable = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const imageClasses = [
    styles.image,
    clickable ? styles.clickable : '',
    className
  ].join(' ');

  const imageStyle = {
    width: width || 'auto',
    height: height || 'auto',
    objectFit: objectFit || 'cover',
    borderRadius: borderRadius || '0'
  };

  return (
    <img
      className={imageClasses}
      src={src}
      alt={alt}
      style={imageStyle}
      onClick={onClick}
      {...props}
    />
  );
};

export default Image;
