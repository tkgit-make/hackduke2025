import { useNavigate, useParams } from 'react-router-dom';
import './CompanyProfile.css';
import { IoArrowBack } from "react-icons/io5";
import companyImage from '../assets/images/company-placeholder.png';
import postImage from '../assets/images/post-placeholder.png';
import sampleStartups from '../data/sample_startups.json';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { companyName } = useParams();
  
  // Find the matching company data from sample data
  const companyData = sampleStartups.startups.find(
    startup => startup.startUpName === companyName
  );

  // If company not found, navigate back to discover page
  if (!companyData) {
    navigate('/');
    return null;
  }

  const progressPercentage = (companyData.totalRaised / companyData.targetGoal) * 100;

  // Calculate number of shares
  // First, calculate total equity the company wants to sell based on target goal and price per share
  const totalEquityWanted = (companyData.targetGoal / companyData.pricePerShare) * companyData.equityPerShare;
  // Then calculate number of shares by dividing total equity by equity per share
  const totalShares = Math.floor(totalEquityWanted / companyData.equityPerShare);
  
  // Calculate current valuation
  // If company is selling totalEquityWanted% for targetGoal dollars
  const currentValuation = (companyData.targetGoal / totalEquityWanted) * 100;
  
  // Calculate potential return per share
  // Each share represents equityPerShare% of the company
  const potentialReturnPerShare = (currentValuation * (companyData.equityPerShare / 100));

  return (
    <div className="company-profile">
      <div className="content-wrapper">
        <div className="company-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <IoArrowBack size={24} />
          </button>
          <div className="company-banner">
            <img 
              src={companyData.image || companyImage} 
              alt={companyData.startUpName}
              onError={(e) => {
                e.target.src = companyImage;
              }}
            />
            <div className="banner-overlay">
              <h1 className="company-title">{companyData.startUpName}</h1>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="feed-section">
            {companyData.postsData?.map((post) => (
              <div key={post.id} className="post">
                <div className="post-image">
                  <img src={postImage} alt="" className="post-img" />
                </div>
                <p className="post-text">{post.caption}</p>
                <div className="post-meta">
                  <span>❤️ {post.likesData}</span>
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
                    <span className="raised-amount">${companyData.totalRaised.toLocaleString()}</span>
                    <span className="goal-amount">${companyData.targetGoal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="invest-button">Invest Now</button>
              </div>
            </div>

            <div className="investment-stats">
              <div className="stat-item">
                <div className="stat-value">{totalShares}</div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
