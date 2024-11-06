import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AdminDashboard from './components/AdminDashboard';
import AddUserForm from './components/AddUserForm';
// import SettingsPage from './components/Settings'; // Assure-toi que le chemin est correct 

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
        
        {/* Route pour la page des paramètres */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
