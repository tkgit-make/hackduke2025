const mongoose = require('mongoose');
const Startup = require('./models/Startup');
const dummyStartups = require('./dummyData');

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/hackduke2025');
    console.log('Connected to MongoDB');
    
    await Startup.deleteMany();
    console.log('Cleared existing startups');
    
    await Startup.insertMany(dummyStartups);
    console.log(`Inserted ${dummyStartups.length} startups`);
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB(); 