import React, { useState } from 'react';
import './PaymentDialog.css'; // Create a CSS file for styling
import { IoArrowBack } from "react-icons/io5"; // Import back arrow icon
import axios from 'axios'; // Import axios for API calls

const PaymentDialog = ({ onClose, amount, userId }) => {
  const [cardInfo, setCardInfo] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    zipCode: '',
    state: '',
    country: '',
  });

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle payment processing logic here
    console.log('Card Info:', cardInfo);
    console.log('Billing Info:', billingInfo);

    // Update the user's wallet balance
    try {
      await axios.patch(`/api/useraccounts/${userId}/wallet`, { amount });
      console.log('Wallet balance updated successfully');
    } catch (error) {
      console.error('Error updating wallet balance:', error);
    }

    // Clear the card and billing information
    setCardInfo({
      firstName: '',
      lastName: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    });

    setBillingInfo({
      firstName: '',
      lastName: '',
      address: '',
      zipCode: '',
      state: '',
      country: '',
    });

    // Close the dialog after processing
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <IoArrowBack onClick={onClose} style={{ cursor: 'pointer', marginRight: '10px', color: 'black' }} />
          <h2 className="dialog-title">Payment Processing</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Card Information</h3>
          <div className="input-container">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={cardInfo.firstName} onChange={handleCardChange} required />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={cardInfo.lastName} onChange={handleCardChange} required />
            </div>
          </div>
          <div className="input-container">
            <label>Card Number</label>
            <input type="text" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardChange} required />
          </div>
          <div className="input-container">
            <label>Expiration Date</label>
            <input type="text" name="expirationDate" value={cardInfo.expirationDate} onChange={handleCardChange} required />
          </div>
          <div className="input-container">
            <label>CVC</label>
            <input type="text" name="cvc" value={cardInfo.cvc} onChange={handleCardChange} required />
          </div>

          <h3>Billing Information</h3>
          <div className="input-container">
            <label>First Name</label>
            <input type="text" name="firstName" value={billingInfo.firstName} onChange={handleBillingChange} required />
          </div>
          <div className="input-container">
            <label>Last Name</label>
            <input type="text" name="lastName" value={billingInfo.lastName} onChange={handleBillingChange} required />
          </div>
          <div className="input-container">
            <label>Address</label>
            <input type="text" name="address" value={billingInfo.address} onChange={handleBillingChange} required />
          </div>
          <div className="input-container">
            <label>Zip Code</label>
            <input type="text" name="zipCode" value={billingInfo.zipCode} onChange={handleBillingChange} required />
          </div>
          <div className="input-container">
            <label>State</label>
            <input type="text" name="state" value={billingInfo.state} onChange={handleBillingChange} required />
          </div>
          <div className="input-container">
            <label>Country</label>
            <input type="text" name="country" value={billingInfo.country} onChange={handleBillingChange} required />
          </div>

          <button type="submit" className="submit-button">Submit Payment</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDialog; 