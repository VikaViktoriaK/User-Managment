import React from 'react';
import './Container.css';

export const Container = ({ children, className = '' }) => {
  return <div className={`container ${className}`.trim()}>{children}</div>;
};
