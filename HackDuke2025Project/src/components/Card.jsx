//import React from "react";
import "./Card.css";
import PropTypes from 'prop-types';

const Card = ({ image, company, price, raised, goal }) => {
  return (
    <div className="card-container">
      <img src={image} alt={company} className="card-image" />
      <div className="card-content">
        <p className="card-company">{company}</p>
        <p className="card-price">Price: {price}</p>
        <div className="card-progress">
          <span>{raised} raised</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(parseInt(raised.replace("$", "")) / parseInt(goal.replace("$", ""))) * 100}
            className="progress-bar"
            readOnly
          />
          <span>{goal}</span>
        </div>
      </div>
    </div>
  );
};
Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  raised: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
};

export default Card;

