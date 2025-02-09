import mongoose from 'mongoose';
import dotenv from 'dotenv';
import startUp from './models/startupaccount.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables with absolute path
dotenv.config({ path: join(__dirname, 'config.env') });

async function seedDatabase() {
  try {
    // Check if ATLAS_URI is defined
    if (!process.env.ATLAS_URI) {
      throw new Error('ATLAS_URI environment variable is not defined in config.env');
    }
    console.log('Found ATLAS_URI:', process.env.ATLAS_URI.substring(0, 20) + '...');  // Log first part of URI for debugging

    // Read the JSON file
    const rawData = await readFile(join(__dirname, '../src/data/sample_startups.json'), 'utf8');
    const { startups } = JSON.parse(rawData);

    // Connect to MongoDB
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to MongoDB');

    // Clear existing startups
    await startUp.deleteMany({});
    console.log('Cleared existing startups');

    // Insert startups one by one
    for (const startup of startups) {
      const newStartup = new startUp(startup);
      await newStartup.save();
      console.log(`Added startup: ${startup.startUpName}`);
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seedDatabase(); 