//import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">YOLO_Fund</div>
      <div className="search-bar-container">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <nav className="nav-links">
        <a href="/discover" className="nav-link active">Discover</a>
        <a href="/feed" className="nav-link">Feed</a>
        <a href="/portfolio" className="nav-link">Portfolio</a>
      </nav>
      <div className="header-actions">
        <button className="login-button">Login/Sign up</button>
        <button className="launch-button">Launch_</button>
      </div>
    </header>
  );
};

export default Header;
