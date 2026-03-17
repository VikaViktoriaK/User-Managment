import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Container } from './components/Container/Container';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import UserDetailPage from './pages/UserDetail/UserDetailPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
