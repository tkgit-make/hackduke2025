import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, 'config.env') });

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to MongoDB');

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Try both possible collection names
    let startups = await mongoose.connection.db.collection('startups').find({}).toArray();
    if (startups.length === 0) {
      startups = await mongoose.connection.db.collection('startupaccounts').find({}).toArray();
    }
    
    console.log('Number of startups:', startups.length);
    if (startups.length > 0) {
      console.log('Sample startup:', startups[0]);
      console.log('Collection name used:', startups.length > 0 ? 'startups' : 'startupaccounts');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase(); 