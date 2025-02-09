import { useNavigate, useParams } from 'react-router-dom';
import './CompanyProfile.css';
import { IoArrowBack } from "react-icons/io5";
import defaultCompanyImage from '../assets/images/company-placeholder.png';
import defaultPostImage from '../assets/images/post-placeholder.png';
import sampleStartupsData from '../data/sample_startups.json';
import { useState } from 'react';
import InvestmentDialog from './InvestmentDialog';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { companyName } = useParams();
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Fake local wallet balance
  const walletBalance = 5000; // Example wallet balance

  // Find the matching company data from sample data
  const company = sampleStartupsData.startups.find(
    startup => startup.startUpName === companyName
  );

  if (!company) {
    return <div>Company not found</div>;
  }

  // Helper function to get correct image path
  const getImagePath = (path) => {
    if (!path) return defaultCompanyImage;
    
    try {
      // Remove leading slash if present
      const imagePath = path.startsWith('/') ? path.slice(1) : path;
      return new URL(`../${imagePath}`, import.meta.url).href;
    } catch (error) {
      console.warn(`Failed to load image: ${path}`);
      return defaultCompanyImage;
    }
  };

  // Handle image load error
  const handleImageError = (imageId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  const handleInvestClick = () => {
    setDialogOpen(true);
  };

  return (
    <div className="company-profile">
      <div className="back-button" onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </div>

      {/* Header Section */}
      <section className="profile-header">
        <img 
          src={imageLoadErrors.banner ? defaultCompanyImage : getImagePath(company.image)} 
          alt={company.startUpName} 
          className="company-banner"
          onError={() => handleImageError('banner')}
        />
        <div className="company-basic-info">
          <img 
            src={imageLoadErrors.logo ? defaultCompanyImage : getImagePath(company.logo)} 
            alt="logo" 
            className="company-logo"
            onError={() => handleImageError('logo')}
          />
          <h1>{company.startUpName}</h1>
          <p className="location">{company.homeLocation}</p>
          <div className="tags">
            {company.tagsData?.map((tag, index) => (
              <span key={index} className="tag">{tag.body}</span>
            ))}
          </div>
        </div>

        {/* New Investment Summary Box */}
        <div className="investment-summary">
          <div className="investment-metrics">
            <div className="investment-metric">
              <h3>Raised</h3>
              <p>${company.totalRaised?.toLocaleString()}</p>
              <span className="metric-subtitle">of ${company.targetGoal?.toLocaleString()}</span>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${Math.min((company.totalRaised / company.targetGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="investment-metric">
              <h3>Price/Share</h3>
              <p>${company.pricePerShare}</p>
              <span className="metric-subtitle">{(company.equityPerShare * 100).toFixed(3)}% equity</span>
            </div>
            <div className="investment-metric">
              <h3>Min Investment</h3>
              <p>${company.minInvestment?.toLocaleString()}</p>
              <span className="metric-subtitle">{Math.floor(company.minInvestment / company.pricePerShare)} shares</span>
            </div>
          </div>
          <button className="invest-button" onClick={handleInvestClick}>
            Invest in {company.startUpName}
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="profile-section">
        <h2>Company Overview</h2>
        <p>{company.fullDescription}</p>
        <div className="metrics-grid">
          <div className="metric-item">
            <h3>Industry</h3>
            <p>{company.industry}</p>
          </div>
          <div className="metric-item">
            <h3>Stage</h3>
            <p>{company.stage}</p>
          </div>
          <div className="metric-item">
            <h3>Founded</h3>
            <p>{new Date(company.foundedDate).getFullYear()}</p>
          </div>
          <div className="metric-item">
            <h3>Revenue</h3>
            <p>${company.currentRevenue?.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="profile-section">
        <h2>Investment Opportunity</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <h3>Target Goal</h3>
            <p>${company.targetGoal?.toLocaleString()}</p>
          </div>
          <div className="metric-item">
            <h3>Total Raised</h3>
            <p>${company.totalRaised?.toLocaleString()}</p>
          </div>
          <div className="metric-item">
            <h3>Price per Share</h3>
            <p>${company.pricePerShare}</p>
          </div>
          <div className="metric-item">
            <h3>Equity per Share</h3>
            <p>{(company.equityPerShare * 100).toFixed(3)}%</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="profile-section">
        <h2>Team</h2>
        <div className="team-grid">
          {company.teamMembers?.map((member, index) => (
            <div key={index} className="team-member">
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
          ))}
        </div>
      </section>

      {/* Market & Traction */}
      <section className="profile-section">
        <h2>Market & Traction</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <h3>Market Size</h3>
            <p>${(company.marketSize / 1e9).toFixed(1)}B</p>
          </div>
          <div className="metric-item">
            <h3>Monthly Revenue</h3>
            <p>${company.metrics?.mrr?.toLocaleString()}</p>
          </div>
          <div className="metric-item">
            <h3>Growth Rate</h3>
            <p>{company.metrics?.growth}%</p>
          </div>
          <div className="metric-item">
            <h3>Retention</h3>
            <p>{company.metrics?.retention}%</p>
          </div>
        </div>
        <div className="market-details">
          <h3>Target Market</h3>
          <p>{company.targetMarket}</p>
          <h3>Competitive Advantage</h3>
          <p>{company.competitiveAdvantage}</p>
        </div>
      </section>

      {/* Funding History */}
      <section className="profile-section">
        <h2>Previous Funding</h2>
        <div className="funding-history">
          {company.previousRounds?.map((round, index) => (
            <div key={index} className="funding-round">
              <h3>{round.round} Round</h3>
              <p>Amount: ${round.amount?.toLocaleString()}</p>
              <p>Date: {new Date(round.date).toLocaleDateString()}</p>
              <p>Investors: {round.investors}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="profile-section">
        <h2>Roadmap & Milestones</h2>
        <div className="milestones">
          {company.milestones?.map((milestone, index) => (
            <div key={index} className="milestone">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
              <p>Target Date: {new Date(milestone.date).toLocaleDateString()}</p>
              <p>Required Funding: ${milestone.fundingRequired?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Updates/Posts Section */}
      <section className="profile-section">
        <h2>Company Updates</h2>
        <div className="posts-grid">
          {company.postsData?.map((post, index) => (
            <div key={index} className="post-card">
              <img 
                src={imageLoadErrors[`post-${index}`] ? defaultPostImage : getImagePath(post.photos[0].photoLocation)} 
                alt="post"
                onError={() => handleImageError(`post-${index}`)}
              />
              <p>{post.caption}</p>
              <div className="post-meta">
                <span>❤️ {post.likesData}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {dialogOpen && (
        <InvestmentDialog
          onClose={() => setDialogOpen(false)}
          sharePrice={company.pricePerShare}
          equityPerShare={company.equityPerShare}
          walletBalance={walletBalance}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
