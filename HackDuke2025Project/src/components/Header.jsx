//import React from "react";
import { NavLink } from "react-router-dom";
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
    </header>
  );
};

export default Header;
