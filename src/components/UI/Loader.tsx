import React from 'react';
import './Loader.css';

type LoaderProps = {
  message?: string;
  size?: number;
  color?: string;
};

const Loader = ({
  message = "Загрузка...",
  size = 50,
  color = "#3498db"
}: LoaderProps) => (
  <div className="loader-container">
    <div 
      className="spinner" 
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: 'transparent'
      }}
    />
    <p className="loader-text" style={{ color }}>{message}</p>
  </div>
);

export default Loader;