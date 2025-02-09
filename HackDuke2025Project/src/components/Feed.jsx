import { useState, useEffect } from 'react';
import startupData from '../data/startups.json';
import './Feed.css';
import companyImage from '../assets/images/company-placeholder.png';
import postImage from '../assets/images/post-placeholder.png';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [followingCompanies, setFollowingCompanies] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const allPosts = startupData.startups.flatMap(startup => 
      startup.posts.map(post => ({
        ...post,
        companyName: startup.companyName,
        logo: startup.logo,
        industry: startup.industry
      }))
    );
    
    let filteredPosts = allPosts;
    
    if (selectedCompany) {
      filteredPosts = filteredPosts.filter(post => post.companyName === selectedCompany);
    }
    
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(post => post.industry === selectedCategory);
    }
    
    setPosts(filteredPosts);
  }, [selectedCompany, selectedCategory]);

  const categories = Array.from(new Set(startupData.startups.map(s => s.industry)));

  const handleFollow = (companyName) => {
    setFollowingCompanies(prev => {
      if (prev.includes(companyName)) {
        return prev.filter(name => name !== companyName);
      }
      return [...prev, companyName];
    });
  };

  const handleCompanySelect = (company, section) => {
    if (selectedCompany === company && selectedSection === section) {
      setSelectedCompany(null);
      setSelectedSection(null);
    } else {
      setSelectedCompany(company);
      setSelectedSection(section);
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-main">
        <div className="feed-header">
          <h1>Startup Feed</h1>
          <div className="categories-section">
            {categories.map(industry => (
              <button 
                key={industry}
                className={`category-button ${selectedCategory === industry ? 'active' : ''}`}
                onClick={() => setSelectedCategory(industry === selectedCategory ? null : industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="instagram-feed">
          {posts.map(post => (
            <div key={post.id} className="instagram-post">
              <div className="post-header">
                <div className="company-info">
                  <img 
                    src={post.logo || companyImage} 
                    alt={post.companyName} 
                    className="company-logo" 
                    onError={(e) => {
                      console.log('Logo failed to load:', post.logo);
                      e.target.src = companyImage;
                    }}
                  />
                  <div className="company-details">
                    <h3>{post.companyName}</h3>
                    <span className="industry">{post.industry}</span>
                  </div>
                </div>
                <button 
                  className={`follow-button ${followingCompanies.includes(post.companyName) ? 'following' : ''}`}
                  onClick={() => handleFollow(post.companyName)}
                >
                  {followingCompanies.includes(post.companyName) ? 'Following' : 'Follow'}
                </button>
              </div>

              <div className="post-image-container">
                <img 
                  src={post.image || postImage} 
                  alt="" 
                  className="post-image" 
                  onError={(e) => {
                    console.log('Post image failed to load:', post.image);
                    e.target.src = postImage;
                  }}
                />
              </div>

              <div className="post-actions">
                <div className="action-buttons">
                  <button className="action-button">
                    <i className="far fa-heart"></i>
                  </button>
                  <button className="action-button">
                    <i className="far fa-comment"></i>
                  </button>
                  <button className="action-button">
                    <i className="far fa-bookmark"></i>
                  </button>
                </div>
                <div className="likes-count">
                  {post.likes.toLocaleString()} likes
                </div>
              </div>

              <div className="post-content">
                <span className="company-name">{post.companyName}</span>
                {post.content}
              </div>

              <div className="post-comments">
                <span className="view-comments">
                  View all {post.comments} comments
                </span>
              </div>

              <div className="post-timestamp">
                {post.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="feed-sidebar">
        <div className="sidebar-section">
          <h2>Your Investments</h2>
          <div className="company-list">
            {startupData.startups.map(company => (
              <div 
                key={company.id} 
                className={`company-item ${
                  selectedCompany === company.companyName && selectedSection === 'investments' 
                    ? 'selected' 
                    : ''
                }`}
                onClick={() => handleCompanySelect(company.companyName, 'investments')}
              >
                <img 
                  src={companyImage} 
                  alt={company.companyName} 
                />
                <div className="company-item-info">
                  <div className="company-item-name">{company.companyName}</div>
                  <div className="company-item-industry">{company.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Following</h2>
          <div className="company-list">
            {startupData.startups
              .filter(company => followingCompanies.includes(company.companyName))
              .map(company => (
                <div 
                  key={company.id} 
                  className={`company-item ${
                    selectedCompany === company.companyName && selectedSection === 'following' 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => handleCompanySelect(company.companyName, 'following')}
                >
                  <img 
                    src={companyImage} 
                    alt={company.companyName} 
                  />
                  <div className="company-item-info">
                    <div className="company-item-name">{company.companyName}</div>
                    <div className="company-item-industry">{company.industry}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
