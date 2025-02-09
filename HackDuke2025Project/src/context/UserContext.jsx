import React, { createContext, useContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(10000); // Default wallet balance

  // Function to add funds to the wallet
  const addFunds = (amount) => {
    setWalletBalance((prevBalance) => prevBalance + amount);
  };

  // Function to deduct funds from the wallet
  const deductFunds = (amount) => {
    setWalletBalance((prevBalance) => {
      if (prevBalance >= amount) {
        return prevBalance - amount;
      } else {
        throw new Error('Insufficient funds in wallet');
      }
    });
  };

  return (
    <UserContext.Provider value={{ walletBalance, addFunds, deductFunds }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
}; 