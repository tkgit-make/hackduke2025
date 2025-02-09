import React, { useState } from 'react';
import './InvestmentPaymentDialog.css'; // Create a CSS file for styling
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon
import { useUser } from '../context/UserContext'; // Import the useUser hook

const InvestmentPaymentDialog = ({ onClose, totalPrice, totalEquity }) => {
  const { walletBalance, deductFunds } = useUser(); // Access wallet balance and deduct function
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // Default to wallet payment
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment logic here
    if (paymentMethod === 'wallet') {
      if (walletBalance >= totalPrice) {
        deductFunds(totalPrice); // Deduct from wallet
        console.log(`Paying $${totalPrice} using wallet.`);
      } else {
        alert('Insufficient wallet balance.');
      }
    } else {
      console.log(`Paying $${totalPrice} using credit card.`);
      // Proceed with credit card payment logic
    }
    onClose(); // Close the dialog after processing
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <IoArrowBack onClick={onClose} style={{ cursor: 'pointer', marginRight: '10px', color: 'black' }} />
          <h2 className="dialog-title">Payment for Investment</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="payment-methods">
            <button
              type="button"
              className={`payment-button ${paymentMethod === 'wallet' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wallet')}
            >
              Use Wallet Balance
            </button>
            <button
              type="button"
              className={`payment-button ${paymentMethod === 'creditCard' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('creditCard')}
            >
              Use Credit Card
            </button>
          </div>

          {paymentMethod === 'creditCard' && (
            <div className="input-container">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardChange}
                required
              />
              <label>Expiration Date:</label>
              <input
                type="text"
                name="expirationDate"
                value={cardInfo.expirationDate}
                onChange={handleCardChange}
                required
              />
              <label>CVC:</label>
              <input
                type="text"
                name="cvc"
                value={cardInfo.cvc}
                onChange={handleCardChange}
                required
              />
            </div>
          )}

          <div className="payment-details">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Total Equity: ${totalEquity.toFixed(2)}</p>
            <p>Wallet Balance: ${walletBalance.toLocaleString()}</p>
          </div>
          <button type="submit" className="submit-button">Confirm Payment</button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentPaymentDialog; 