import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ 
  icon, 
  size = 'medium', 
  color, 
  hoverColor,
  clickable = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const iconClasses = [
    styles.icon,
    styles[size],
    clickable ? styles.clickable : '',
    className
  ].join(' ');

  const iconStyle = {
    color: color || undefined,
    '--hover-color': hoverColor || '#2874f0'
  };

  return (
    <div
      className={iconClasses}
      style={iconStyle}
      onClick={onClick}
      {...props}
    >
      {icon}
    </div>
  );
};

export default Icon;
