import { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const Login = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send login data (email and password) to the backend to validate user credentials
      const response = await fetch('http://localhost:5050/api/userAccounts/', {  // Adjusted the URL to a login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred during login');
        return;
      }

      // Assuming the backend sends the user details after successful login, no need for another API call
      const { id, userName, email: userEmail, investorType } = data;

      // Store user details in localStorage for future requests
      localStorage.setItem('currentUser', JSON.stringify({
        id,
        userName,
        email: userEmail,
        investorType,
      }));

      // Close modal and reload page after successful login
      onClose();
      window.location.reload();  // This can be optimized or changed if not needed
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
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
  onSwitch: PropTypes.func.isRequired,
};

export default Login;
