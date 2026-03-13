import React, { useState } from 'react';
import LoginForm from '../../fff/LoginForm/LoginForm';
import '../../styles/LoginForm.css';
import RegisterForm from '../../fff/RegisterForm/RegisterForm';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-page">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <button onClick={toggleForm}>
        {isLogin ? 'Don’t have an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginPage;
