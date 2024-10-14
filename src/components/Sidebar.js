import React from 'react';
import { TrendingUp, Users, Wallet, Settings } from 'lucide-react';
import './Sidebar.css'; // Importez le CSS si nécessaire

const Sidebar = ({ activeItem, handleItemClick }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Wallet size={24} />
        <span> Bakéli Tontine</span>
      </div>
      <ul>
        {[
          { icon: TrendingUp, label: 'Dashboard' },
          { icon: Users, label: 'Utilisateurs' },
          { icon: Wallet, label: 'Cotisations' },
          { icon: Settings, label: 'Paramètres' },
        ].map(({ icon: Icon, label }) => (
          <li
            key={label}
            className={`${activeItem === label ? 'active' : ''}`}
            onClick={() => handleItemClick(label)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
