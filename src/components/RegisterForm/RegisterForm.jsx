import React, { useState } from 'react';
import { register } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username) {
      newErrors.general = 'User already exists';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser = { username, email, password };
      dispatch(register(newUser));
      setTimeout(() => {
        navigate('/users');
      }, 1000);

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
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
        <label htmlFor="email">Email</label>
        <input
          className={errors.email ? 'error-input' : ''}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
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

      <div>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          className={errors.confirmPassword ? 'error-input' : ''}
          type="password"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>

      <button type="submit">Sign Up</button>

      {errors.general && <p className="error-message">{errors.general}</p>}
    </form>
  );
};

export default RegisterForm;
