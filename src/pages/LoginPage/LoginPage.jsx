import React, { useState } from 'react';
import '../../styles/LoginForm.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="page-wrapper">
      <div className="welcome-header">
        <div className="welcome-icon">
          <svg viewBox="0 0 48 48" fill="none">
            <g clipPath="url(#clip0)">
              <rect width="48" height="48" fill="#F25A5A" />
              <path
                d="M38 6H29.63C28.81 3.68 26.61 2 24 2C21.39 2 19.19 3.68 18.37 6H10C7.79 6 6 7.79 6 10V38C6 40.21 7.79 42 10 42H38C40.21 42 42 40.21 42 38V10C42 7.79 40.21 6 38 6ZM24 6C25.1 6 26 6.89 26 8C26 9.11 25.1 10 24 10C22.9 10 22 9.11 22 8C22 6.89 22.9 6 24 6ZM24 14C27.31 14 30 16.69 30 20C30 23.32 27.31 26 24 26C20.69 26 18 23.32 18 20C18 16.69 20.69 14 24 14ZM36 38H12V35.2C12 31.2 20 29 24 29C28 29 36 31.2 36 35.2V38Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="welcome-header-text">
          <h1>Welcome to User Management</h1>
          <p>Manage users easily and securely</p>
        </div>
      </div>

      <div className="login-page">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <button className="switch-form-btn" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
