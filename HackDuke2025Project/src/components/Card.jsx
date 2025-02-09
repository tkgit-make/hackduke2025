import { useState } from "react";
import "./Card.css";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({ image, company, price, raised, goal }) => {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);
  const raisedAmount = parseFloat(raised.replace("$", "").replace("K", "000"));
  const goalAmount = parseFloat(goal.replace("$", "").replace("K", "000"));
  const progressValue = (raisedAmount / goalAmount) * 100; 

  const handleClick = () => {
    // Get the clicked card's position and dimensions
    const card = document.querySelector('.card-container');
    const rect = card.getBoundingClientRect();
    
    // Store the position data as CSS variables
    document.documentElement.style.setProperty('--card-top', `${rect.top}px`);
    document.documentElement.style.setProperty('--card-left', `${rect.left}px`);
    document.documentElement.style.setProperty('--card-width', `${rect.width}px`);
    document.documentElement.style.setProperty('--card-height', `${rect.height}px`);

    setIsExpanding(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate(`/company/${company}`);
    }, 500);
  };

  return (
    <div 
      className={`card-container ${isExpanding ? 'expanding' : ''}`}
      onClick={handleClick}
    >
      <p className="card-company">{company}</p>
      <img src={image} alt={company} className="card-image" />
      <div className="card-content">
        <p className="card-price">Price: {price}</p>
        <div className="card-progress">
          <span>{raised} raised</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressValue}%` }}>
              <div className="progress-circle"></div>
            </div>
          </div>
          <span>{goal}</span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  raised: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
};

export default Card;