//import React from "react";
import "./Header.css";

const Header = () => {
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
          <button className="login-button">Login/Sign up</button>
          <button className="launch-button">Launch_</button>
        </div>
      </div>
      <nav className="bottom-nav">
        <a href="/discover" className="nav-link active">
          Discover
        </a>
        <a href="/feed" className="nav-link">
          Feed
        </a>
        <a href="/portfolio" className="nav-link">
          Portfolio
        </a>
      </nav>
    </header>
  );
};

export default Header;
