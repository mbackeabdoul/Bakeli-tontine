import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AdminDashboard from './components/AdminDashboard';
// import UsersPage from './components/UsersPage';
import AddUserForm from './components/AddUserForm';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route path="/utilisateurs" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
