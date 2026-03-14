import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import LoginPage from './pages/LoginPage/LoginPage';

const App = () => {
  return (
    <Router>
      <div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
