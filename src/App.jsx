import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import UserDetailPage from './pages/UserDetail/UserDetailPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <Router basename="/User-Managment">
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                {' '}
                <UsersPage />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                {' '}
                <UserDetailPage />{' '}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
