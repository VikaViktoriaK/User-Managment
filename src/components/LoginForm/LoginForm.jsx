import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      newErrors.general = 'User not found';
    }

    if (storedUser && (storedUser.username !== username || storedUser.password !== password)) {
      newErrors.general = 'Invalid username or password';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login({ username, password }));
      navigate('/users');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          className={errors.username ? 'error-input' : ''}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          className={errors.password ? 'error-input' : ''}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <button type="submit">Login</button>

      {errors.general && <p className="error-message">{errors.general}</p>}
    </form>
  );
};

export default LoginForm;
