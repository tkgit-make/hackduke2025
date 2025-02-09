import { useState } from 'react';
import './LaunchStartup.css';

const LaunchStartup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    founderName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fundingGoal: '',
    equity: '',
    pitch: '',
    website: '',
    logo: null
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Here you would typically send this to your backend
    console.log('Startup submission:', formData);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content launch-startup">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Launch Your Startup</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-section">
            <h3>Company Information</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select Industry</option>
                <option value="Clean Energy">Clean Energy</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Fintech">Fintech</option>
                <option value="AI">AI</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Company Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Founder Information</h3>
            <div className="form-group">
              <label>Founder Name</label>
              <input
                type="text"
                name="founderName"
                value={formData.founderName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Investment Details</h3>
            <div className="form-group">
              <label>Funding Goal ($)</label>
              <input
                type="number"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Equity Offered (%)</label>
              <input
                type="number"
                name="equity"
                value={formData.equity}
                onChange={handleChange}
                required
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label>Pitch Deck URL</label>
              <input
                type="url"
                name="pitch"
                value={formData.pitch}
                onChange={handleChange}
                placeholder="Link to your pitch deck"
              />
            </div>
            <div className="form-group">
              <label>Company Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-company.com"
              />
            </div>
            <div className="form-group">
              <label>Company Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  logo: e.target.files[0]
                }))}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Submit Startup</button>
        </form>
      </div>
    </div>
  );
};

export default LaunchStartup; 