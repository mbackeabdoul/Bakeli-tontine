import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Bell, ChevronDown } from 'lucide-react';
import './Navbar.css'; // Importez le CSS si nécessaire

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <div className="user-info">
        {/* Notifications */}
        <Dropdown>
          <Dropdown.Toggle as="div" id="notification-dropdown">
            <Bell size={20} className="notification-icon" />
            <span className="notification-badge">1</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item>Nouvelle cotisation</Dropdown.Item>
            <Dropdown.Item>Nouveau membre</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* User Menu */}
        <div className="user-details">
          <img src="/api/placeholder/40/40" alt="User" className="user-avatar" />
          <div className="user-info-text">
            <span className="user-name">Ndiaga SALL</span>
            <span className="user-role">Administrator</span>
          </div>
          <Dropdown>
            <Dropdown.Toggle as="div" id="user-dropdown">
              <ChevronDown size={16} className="dropdown-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
