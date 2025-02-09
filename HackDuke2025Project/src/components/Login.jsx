import { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import defaultUsers from '../data/users.json';

const Login = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get current users from localStorage or use default
    const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || defaultUsers.users;

    // Check if user exists
    const user = storedUsers.find(u => u.email === email);
    
    if (!user) {
      setError('No account found with this email');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }

    // Successful login
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      investorType: user.investorType
    }));
    
    onClose();
    window.location.reload();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p className="switch-form">
          Don&apos;t have an account? <button onClick={onSwitch}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired
};

export default Login;