import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import startupsData from '../data/startups.json';
import './Discover.css';
import postPlaceholder from '../assets/images/post-placeholder.png';
import { useCategory } from '../context/CategoryContext';

const Discover = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [selectedStage, setSelectedStage] = useState('All');

  // Get unique industries from data
  const industries = ['All', ...new Set(startupsData.startups.map(startup => startup.industry))];
  const stages = ['All', 'Pre-seed', 'Seed', 'Series A'];

  const filteredStartups = startupsData.startups.filter(startup => {
    const industryMatch = !selectedCategory || startup.industry === selectedCategory;
    const stageMatch = selectedStage === 'All' || startup.stage === selectedStage;
    return industryMatch && stageMatch;
  });

  const calculateProgress = (raised, goal) => {
    return (raised / goal) * 100;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStartupClick = (startupName) => {
    navigate(`/company/${startupName}`);
  };

  return (
    <div className="discover-container">
      <div className="filters">
        <div className="filter-group">
          <label>Industry</label>
          <select 
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <h3>Stage</h3>
          <div className="filter-buttons">
            {stages.map(stage => (
              <button
                key={stage}
                className={`filter-button ${selectedStage === stage ? 'active' : ''}`}
                onClick={() => setSelectedStage(stage)}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="startups-grid">
        {filteredStartups.map(startup => (
          <div 
            key={startup.id} 
            className="startup-card"
            onClick={() => handleStartupClick(startup.name)}
          >
            <div className="image-container">
              <img 
                src={startup.logo || postPlaceholder} 
                alt={startup.name} 
                className="startup-logo"
                onError={(e) => {
                  e.target.src = postPlaceholder;
                }}
              />
              <div className="image-overlay">
                <h3>{startup.name}</h3>
              </div>
            </div>
            <div className="startup-info">
              <p className="description">{startup.shortDescription}</p>
              <div className="tags">
                <span className="tag industry">{startup.industry}</span>
                <span className="tag stage">{startup.stage}</span>
              </div>
              <div className="location">{startup.location}</div>
              <div className="funding-info">
                <div className="funding-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${calculateProgress(startup.fundingRaised, startup.fundingGoal)}%` }}
                  ></div>
                </div>
                <div className="funding-details">
                  <span>{formatCurrency(startup.fundingRaised)} raised</span>
                  <span>{startup.equity}% equity</span>
                </div>
                <div className="funding-goal">
                  Goal: {formatCurrency(startup.fundingGoal)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
