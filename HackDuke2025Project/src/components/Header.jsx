//import React from "react";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  const handleLaunchClick = () => {
    navigate('/launch');
  };

  return (
    <header className="header-container">
      <div className="top-section">
        <div className="logo">YOLO_Fund</div>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
          />
        </div>
        <div className="action-buttons">
          {currentUser ? (
            <>
              <div className="user-profile">
                <img 
                  src={`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=0D8ABC&color=fff`} 
                  alt="Profile" 
                  className="profile-icon"
                />
                <span className="user-name">Welcome, {currentUser.firstName}</span>
              </div>
              <button className="login-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={handleLoginClick}>
                Login/Sign up
              </button>
              <button className="launch-button" onClick={handleLaunchClick}>
                Launch
              </button>
            </>
          )}
        </div>
      </div>
      <nav className="bottom-nav">
        {/* Discover NavLink */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Discover
        </NavLink>

        {/* Feed NavLink */}
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Feed
        </NavLink>

        {/* Portfolio NavLink */}
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Portfolio
        </NavLink>
      </nav>
      
      <Login 
        isOpen={showLogin} 
        onClose={handleClose}
        onSwitch={handleSignupClick}
      />
      <Signup 
        isOpen={showSignup} 
        onClose={handleClose}
        onSwitch={handleLoginClick}
      />
    </header>
  );
};

export default Header;
