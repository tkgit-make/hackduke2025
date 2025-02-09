import { useState } from 'react';
import './Login.css';
import defaultUsers from '../data/users.json';

const Signup = ({ isOpen, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    investorType: 'individual', // or 'institutional'
    investmentPreferences: [],
    userCashAvailable: 0
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
  
    // Create user account object to send to the backend
    const newUser = {
      userName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      investorType: formData.investorType,
      investorPreferences: [],
      userCashAvailable: 0
    };
  
    try {
      const response = await fetch('http://localhost:5050/api/useraccounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }
  
      const createdUser = await response.json();
      console.log('Account created:', createdUser);
  
      // Close the modal and reload the page
      onClose();
      window.location.reload();
  
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content signup">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
          <div className="form-group">
            <label>Investor Type</label>
            <select
              name="investorType"
              value={formData.investorType}
              onChange={handleChange}
            >
              <option value="individual">Individual Investor</option>
              <option value="institutional">Institutional Investor</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Create Account</button>
        </form>
        <p className="switch-form">
          Already have an account? <button onClick={onSwitch}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;