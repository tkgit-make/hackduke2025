import React, { useState } from 'react';
import './WalletDialog.css'; // Create a CSS file for styling
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon
import PaymentDialog from './PaymentDialog'; // Import the payment dialog

const WalletDialog = ({ onClose, userId }) => {
  const [amount, setAmount] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open the payment dialog
    setShowPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setAmount(''); // Clear the amount
    setShowPaymentDialog(false); // Close the payment dialog
    onClose(); // Close the WalletDialog as well
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <IoArrowBack onClick={onClose} style={{ cursor: 'pointer', marginRight: '10px', color: 'black' }} />
          <h2 className="dialog-title">Wallet</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="amount">Amount to Add:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      {showPaymentDialog && <PaymentDialog onClose={handleClosePaymentDialog} amount={amount} userId={userId} />}
    </div>
  );
};

export default WalletDialog; 