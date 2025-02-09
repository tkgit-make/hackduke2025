import React, { useState } from 'react';
import './InvestmentDialog.css'; // Create a CSS file for styling
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon
import InvestmentPaymentDialog from './InvestmentPaymentDialog'; // Import the payment dialog

const InvestmentDialog = ({ onClose, sharePrice, equityPerShare, walletBalance }) => {
  const [shares, setShares] = useState(1); // Default to 1 share
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const totalPrice = shares * sharePrice;
  const totalEquity = shares * equityPerShare;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open the payment dialog
    setPaymentDialogOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentDialogOpen(false);
    onClose(); // Close the investment dialog as well
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <IoArrowBack onClick={onClose} style={{ cursor: 'pointer', marginRight: '10px', color: 'black' }} />
          <h2 className="dialog-title">Invest in Company</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="shares">Number of Shares:</label>
            <input
              type="number"
              id="shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="investment-details">
            <p>Price per Share: ${sharePrice.toFixed(2)}</p>
            <p>Equity per Share: ${equityPerShare.toFixed(2)}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Total Equity: ${totalEquity.toFixed(2)}</p>
          </div>
          <button type="submit" className="submit-button">Confirm Investment</button>
        </form>
      </div>
      {paymentDialogOpen && (
        <InvestmentPaymentDialog
          onClose={handlePaymentClose}
          totalPrice={totalPrice}
          totalEquity={totalEquity}
          walletBalance={walletBalance}
        />
      )}
    </div>
  );
};

export default InvestmentDialog; 