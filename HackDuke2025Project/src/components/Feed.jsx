import { useState, useEffect } from 'react';
import './Feed.css';
import companyImage from '../assets/images/company-placeholder.png';
import postImage from '../assets/images/post-placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5001/api/startups');
      const startups = await response.json();
      
      const allPosts = startups.flatMap(startup => 
        (startup.posts || []).map(post => ({
          ...post,
          companyName: startup.name,
          logo: startup.logo,
          industry: startup.industry
        }))
      );
      
      setPosts(allPosts);
    };
    
    fetchPosts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [followingCompanies, setFollowingCompanies] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [postLikes, setPostLikes] = useState({});

  const categories = Array.from(new Set(posts.map(s => s.industry)));

  const filteredPosts = posts.filter(post => {
    if (selectedCompany) {
      return post.companyName === selectedCompany;
    }
    if (selectedCategory) {
      return post.industry === selectedCategory;
    }
    return true;
  });

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
      // Clear category selection when selecting from sidebar
      setSelectedCategory(null);
    }
  };

  const handleLike = (postId) => {
    const isCurrentlyLiked = likedPosts.includes(postId);
    
    // Update likes count
    setPostLikes(prevLikes => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || posts.find(p => p.id === postId).likes) + (isCurrentlyLiked ? -1 : 1)
    }));
    
    // Update liked posts array
    setLikedPosts(prev => 
      isCurrentlyLiked 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="feed-container">
      <div className="feed-main">
        <div className="feed-header">
          <h1>Startup Feed</h1>
          {selectedCompany && (
            <h2 className="selected-company">Posts from {selectedCompany}</h2>
          )}
          <div className="categories-section">
            {categories.map(industry => (
              <button 
                key={industry}
                className={`category-button ${selectedCategory === industry ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(selectedCategory === industry ? null : industry);
                  // Clear sidebar selection when category is clicked
                  setSelectedCompany(null);
                  setSelectedSection(null);
                }}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="instagram-feed">
          {filteredPosts.map(post => (
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
                <div className="likes-section">
                  <button 
                    className={`like-button ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <FontAwesomeIcon icon={likedPosts.includes(post.id) ? fasHeart : faHeart} />
                  </button>
                  <span className="likes-count">
                    {(postLikes[post.id] || post.likes).toLocaleString()} likes
                  </span>
                </div>
                <div className="action-buttons">
                  <button className="action-button">
                    <FontAwesomeIcon icon={faComment} />
                  </button>
                  <button className="action-button">
                    <i className="far fa-bookmark"></i>
                  </button>
                </div>
              </div>

              <div className="post-content">
                {post.content}
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
            {posts.slice(0, 5).map(startup => (
              <div 
                key={startup.id} 
                className={`company-item ${
                  selectedCompany === startup.name && selectedSection === 'investments' 
                    ? 'selected' 
                    : ''
                }`}
                onClick={() => handleCompanySelect(startup.name, 'investments')}
              >
                <img 
                  src={startup.logo || companyImage} 
                  alt={startup.name} 
                  onError={(e) => e.target.src = companyImage}
                />
                <div className="company-item-info">
                  <div className="company-item-name">{startup.name}</div>
                  <div className="company-item-industry">{startup.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Following</h2>
          <div className="company-list">
            {posts
              .filter(startup => followingCompanies.includes(startup.name))
              .map(startup => (
                <div 
                  key={startup.id} 
                  className={`company-item ${
                    selectedCompany === startup.name && selectedSection === 'following' 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => handleCompanySelect(startup.name, 'following')}
                >
                  <img 
                    src={startup.logo || companyImage} 
                    alt={startup.name} 
                    onError={(e) => e.target.src = companyImage}
                  />
                  <div className="company-item-info">
                    <div className="company-item-name">{startup.name}</div>
                    <div className="company-item-industry">{startup.industry}</div>
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