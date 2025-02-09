import "./Card.css";
import PropTypes from 'prop-types';

const Card = ({ image, company, price, raised, goal }) => {
  const raisedAmount = parseFloat(raised.replace("$", "").replace("K", "000"));
  const goalAmount = parseFloat(goal.replace("$", "").replace("K", "000"));
  const progressValue = (raisedAmount / goalAmount) * 100; 

  return (
    <div className="card-container">
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