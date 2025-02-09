//import React from "react";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import "./Header.css";
import startupsData from '../data/startups.json';
import companyImage from '../assets/images/company-placeholder.png';
import { useCategory } from '../context/CategoryContext';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { setSelectedCategory } = useCategory();

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

  const getSearchSuggestions = (query) => {
    if (!query.trim()) {
      const popularCategories = Array.from(new Set(startupsData.startups.map(s => s.industry)))
        .slice(0, 3)
        .map(category => ({
          type: 'category',
          text: category,
          industry: category,
          prefix: 'Popular in'
        }));

      const trendingCompanies = startupsData.startups
        .slice(0, 4)
        .map(company => ({
          type: 'company',
          text: company.name,
          industry: company.industry,
          logo: company.logo || companyImage,
          prefix: 'Trending'
        }));

      return [...popularCategories, ...trendingCompanies];
    }

    const lowercaseQuery = query.toLowerCase();
    
    // Search in categories
    const matchingCategories = Array.from(new Set(startupsData.startups.map(s => s.industry)))
      .filter(category => category.toLowerCase().includes(lowercaseQuery))
      .map(category => ({
        type: 'category',
        text: category,
        industry: category
      }));

    // Search in companies
    const matchingCompanies = startupsData.startups
      .filter(startup => 
        startup.name.toLowerCase().includes(lowercaseQuery) ||
        startup.industry.toLowerCase().includes(lowercaseQuery)
      )
      .map(startup => ({
        type: 'company',
        text: startup.name,
        industry: startup.industry,
        logo: startup.logo || companyImage
      }));

    // Combine and limit results
    return [...matchingCategories, ...matchingCompanies].slice(0, 7);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchResults(getSearchSuggestions(query));
    setShowResults(true);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      navigate('/');
      setSelectedCategory(suggestion.text);
    } else {
      navigate(`/company/${suggestion.text}`);
    }
    setShowResults(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-bar-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-container">
      <div className="top-section">
        <div className="logo">YOLO_Fund</div>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search companies or industries..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => {
              setShowResults(true);
              setSearchResults(getSearchSuggestions(''));  // Show initial suggestions
            }}
          />
          {showResults && (
            <div className="search-results">
              {searchResults.map((suggestion, index) => (
                <div 
                  key={index}
                  className="search-result-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.type === 'company' ? (
                    <>
                      <img 
                        src={suggestion.logo || companyImage} 
                        alt={suggestion.text} 
                        className="search-result-logo"
                        onError={(e) => {
                          console.log('Logo failed to load:', suggestion.logo);
                          e.target.src = companyImage;
                        }}
                      />
                      <div className="search-result-info">
                        {!searchQuery && <div className="suggestion-prefix">{suggestion.prefix}</div>}
                        <div className="search-result-name">{suggestion.text}</div>
                        <div className="search-result-industry">{suggestion.industry}</div>
                      </div>
                    </>
                  ) : (
                    <div className="search-result-category">
                      <i className="fas fa-tag"></i>
                      <div className="category-info">
                        {!searchQuery && <div className="suggestion-prefix">{suggestion.prefix}</div>}
                        <span>{suggestion.text}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
