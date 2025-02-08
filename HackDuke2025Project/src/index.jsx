import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import './index.css'; 
import App from './App'; 

// Create the root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); // Make sure the 'root' id matches your HTML file

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
