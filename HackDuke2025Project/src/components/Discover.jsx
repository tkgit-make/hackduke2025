import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Discover.css';
import postPlaceholder from '../assets/images/post-placeholder.png';
import { useCategory } from '../context/CategoryContext';

const Discover = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [selectedStage, setSelectedStage] = useState('All');
  const [startupsData, setStartupsData] = useState([]);
  const [industries, setIndustries] = useState(['All']);

  const stages = ['All', 'Pre-seed', 'Seed', 'Series A'];

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/startups');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const data = await response.json();
        setStartupsData(data);
        const uniqueIndustries = ['All', ...new Set(data.map(startup => startup.industry))];
        setIndustries(uniqueIndustries);
      } catch (err) {
        console.error('Error fetching startups:', err);
      }
    };

    fetchStartups();
  }, []);

  const filteredStartups = startupsData.filter(startup => {
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
            key={startup._id}
            className="startup-card"
            onClick={() => handleStartupClick(startup.startUpName)}
          >
            <div className="image-container">
              <img 
                src={startup.logo || postPlaceholder} 
                alt={startup.startUpName} 
                className="startup-logo"
                onError={(e) => {
                  e.target.src = postPlaceholder;
                }}
              />
              <div className="image-overlay">
                <h3>{startup.startUpName}</h3>
              </div>
            </div>
            <div className="startup-info">
              <p className="description">{startup.shortDescription}</p>
              <div className="tags">
                <span className="tag industry">{startup.industry}</span>
                <span className="tag stage">{startup.stage}</span>
              </div>
              <div className="location">{startup.homeLocation}</div>
              <div className="funding-info">
                <div className="funding-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${calculateProgress(startup.totalRaised, startup.targetGoal)}%` }}
                  ></div>
                </div>
                <div className="funding-details">
                  <span>{formatCurrency(startup.totalRaised)} raised</span>
                  <span>{startup.equityPerShare}% equity</span>
                  <span>{startup.sharesAvailable} of {startup.totalSharesOffered} shares left</span>
                </div>
                <div className="funding-goal">
                  Goal: {formatCurrency(startup.targetGoal)}
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
