import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>StartupSprint</h1>
        <nav className="navbar">
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#footer">Contact</a></li>
            <li><a href="#footer">Enquiry</a></li>
            
          </ul>
        </nav>
        <div className="cta-buttons">
          <a href="/">Login</a>
          <a href="/">Signup</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
