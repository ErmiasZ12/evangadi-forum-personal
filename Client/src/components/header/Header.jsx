import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/evangadi-logo.png'; // Update path to your logo
import './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  // We check if a token exists to determine if the user is logged in
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Clear the token and redirect to login/home
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // Refresh to update the UI state
  };

  return (
    <nav className="header_container">
      <div className="header_inner">
        {/* Logo Link */}
        <Link to="/" className="header_logo">
          <img src={logo} alt="Evangadi Logo" />
        </Link>

        {/* Navigation Links */}
        <div className="header_links">
          <Link to="/" className="nav_link">Home</Link>
          <Link to="/how-it-works" className="nav_link">How it works</Link>
          
          {token ? (
            // Show Log Out if token exists
            <button className="header_button" onClick={handleLogout}>
              LOG OUT
            </button>
          ) : (
            // Show Sign In if no token exists
            <Link to="/login" className="header_button_link">
              <button className="header_button">SIGN IN</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;