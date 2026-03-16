import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Page not found</p>
      <button className="notfound-button" onClick={() => navigate('/users')}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
