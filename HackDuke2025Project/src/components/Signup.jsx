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
    investmentPreferences: []
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

    // Get current users from localStorage or use default
    const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || defaultUsers.users;

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Check if email already exists
    if (storedUsers.some(user => user.email === formData.email)) {
      setError('An account with this email already exists');
      return;
    }

    // Create new user
    const newUser = {
      id: storedUsers.length + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      investorType: formData.investorType,
      investmentPreferences: [],
      dateJoined: new Date().toISOString().split('T')[0]
    };

    // Add user to stored users
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));

    // Log in the new user
    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      investorType: newUser.investorType
    }));

    console.log('Account created and logged in:', newUser);
    onClose();
    window.location.reload();
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