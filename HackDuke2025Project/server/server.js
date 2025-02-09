const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const startups = require('./routes/startups');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackduke2025')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/startups', startups);
// app.use('/api/users', require('./routes/users'));      // Comment out until ready
// app.use('/api/portfolio', require('./routes/portfolio'));

// Handle port in use errors
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} in use, trying ${PORT + 1}`);
    const newPort = PORT + 1;
    const newServer = app.listen(newPort, () => {
      console.log(`Server now running on port ${newPort}`);
    });
    newServer.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error('Multiple ports occupied. Check your processes.');
        process.exit(1);
      }
    });
  }
});



