import { useNavigate } from 'react-router-dom';
import './CompanyProfile.css';
import { IoArrowBack } from "react-icons/io5";
import companyImage from '../assets/images/company-placeholder.png';
import postImage from '../assets/images/post-placeholder.png';

const CompanyProfile = () => {
  const navigate = useNavigate();
  
  const companyData = {
    name: "Cubiko",
    raised: 10000,
    goal: 50000,
    sharesAvailable: 200,
    totalShares: 500,
    equityPerShare: 0.02,
    pricePerShare: 100,
    targetValuation: 10000000, // $10M target valuation
    bannerImage: companyImage,
    posts: [
      {
        id: 1,
        content: "Exciting news! We've just reached our first milestone!",
        timestamp: "2h ago",
        likes: 156,
        comments: 23,
        image: postImage
      },
      {
        id: 2,
        content: "Thank you to all our early investors for believing in our vision!",
        timestamp: "1d ago",
        likes: 234,
        comments: 45,
        image: postImage
      }
    ]
  };

  const progressPercentage = (companyData.raised / companyData.goal) * 100;

  // Calculate current valuation
  const currentValuation = (companyData.totalShares * companyData.pricePerShare) / (companyData.equityPerShare / 100);
  
  // Calculate potential return per share
  const potentialReturnPerShare = (companyData.targetValuation * (companyData.equityPerShare / 100)) / companyData.totalShares;

  return (
    <div className="company-profile">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <IoArrowBack size={24} />
        </button>
        <h1 className="company-name">{companyData.name}</h1>
      </div>

      <div className="banner">
        <img src={companyData.bannerImage} alt={companyData.name} />
      </div>

      <div className="profile-content">
        <div className="feed-section">
          {companyData.posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-image">
                <img src={post.image} alt="" className="post-img" />
              </div>
              <p className="post-text">{post.content}</p>
              <div className="post-meta">
                <span>{post.timestamp}</span>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="investment-section">
          <div className="investment-header">
            <div className="progress-invest-row">
              <div className="progress-bar-wrapper">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${progressPercentage}%`,
                      backgroundColor: '#00F6D5'
                    }}
                  />
                </div>
                <div className="progress-labels">
                  <span className="raised-amount">${companyData.raised / 1000}K</span>
                  <span className="goal-amount">${companyData.goal / 1000}K</span>
                </div>
              </div>
              <button className="invest-button">Invest Now</button>
            </div>
          </div>

          <div className="investment-stats">
            <div className="stat-item">
              <div className="stat-value">{companyData.sharesAvailable}/{companyData.totalShares}</div>
              <div className="stat-label">Shares Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{companyData.equityPerShare}%</div>
              <div className="stat-label">Equity per Share</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">${companyData.pricePerShare}</div>
              <div className="stat-label">Price per Share</div>
            </div>
          </div>

          <div className="valuation-info">
            <div className="valuation-item">
              <div className="valuation-label">Current Valuation</div>
              <div className="valuation-value">
                ${(currentValuation / 1000000).toFixed(2)}M
              </div>
            </div>
            
            <div className="valuation-item">
              <div className="valuation-label">Potential Return per Share</div>
              <div className="valuation-value">
                ${potentialReturnPerShare.toFixed(2)}
                <span className="return-note">
                  at ${(companyData.targetValuation / 1000000)}M valuation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
