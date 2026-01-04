import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/evangadi-logo.png';
import classes from './Header.module.css'; 

const Header = () => {
  const navigate = useNavigate();

  // Retrieve token to check if user is logged in (Session Persistence)
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Clear the session and redirect
    localStorage.removeItem('token');
    navigate('/login');
    // Reloading ensures all components reset to "logged out" state
    window.location.reload();
  };

  return (
    <nav className={classes.header_container}>
      <div className={classes.header_inner}>
        {/* Logo Link */}
        <Link to="/" className={classes.header_logo}>
          <img src={logo} alt="Evangadi Logo" />
        </Link>

        {/* Navigation Links */}
        <div className={classes.header_links}>
          <Link to="/" className={classes.nav_link}>Home</Link>
          <Link to="/how-it-works" className={classes.nav_link}>How it works</Link>
          
          {token ? (
            // Show LOG OUT if token exists in localStorage
            <button className={classes.header_button} onClick={handleLogout}>
              LOG OUT
            </button>
          ) : (
            // Show SIGN IN if no token is found
            <Link to="/login" className={classes.header_button_link}>
              <button className={classes.header_button}>SIGN IN</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;