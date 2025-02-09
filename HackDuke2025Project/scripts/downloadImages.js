import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

// Set up require for JSON import
const require = createRequire(import.meta.url);
const startups = require('../src/data/sample_startups.json');

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pexels API configuration
const PEXELS_API_KEY = 'DYE4zXBzNxZVunpwAlsFpYJCFe3hL2yQvSUhVSbeHHGS7zVFhXBMyvId'; // Get from https://www.pexels.com/api/
const BASE_URL = 'https://api.pexels.com/v1';

// Define image directories
const DIRS = {
  logos: '../src/assets/images/logos',
  banners: '../src/assets/images/banners',
  posts: '../src/assets/images/posts'
};

// Search queries for each startup type
const IMAGE_QUERIES = {
  CleanTech: {
    logo: 'green technology icon',
    banner: 'solar panel field',
    post: 'renewable energy installation'
  },
  HealthTech: {
    logo: 'healthcare technology icon',
    banner: 'medical laboratory technology',
    post: 'digital healthcare'
  },
  EdTech: {
    logo: 'education technology icon',
    banner: 'digital classroom',
    post: 'online learning'
  },
  FinTech: {
    logo: 'finance technology icon',
    banner: 'digital finance',
    post: 'blockchain technology'
  },
  Robotics: {
    logo: 'robot icon',
    banner: 'medical robot',
    post: 'healthcare automation'
  },
  'AI/ML': {
    logo: 'artificial intelligence icon',
    banner: 'data visualization',
    post: 'machine learning'
  }
};

async function createDirectories() {
  for (const dir of Object.values(DIRS)) {
    await fs.mkdir(path.resolve(__dirname, dir), { recursive: true });
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    await fs.writeFile(filepath, response.data);
    console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Error downloading ${filepath}:`, error.message);
  }
}

async function searchPexels(query, type) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        query,
        per_page: 1,
        orientation: type === 'banner' ? 'landscape' : 'square',
        size: type === 'logo' ? 'small' : 'medium'
      },
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    
    // Get the appropriate size URL based on type
    const photo = response.data.photos[0];
    if (type === 'logo') {
      return photo.src.small;
    } else if (type === 'banner') {
      return photo.src.landscape;
    } else {
      return photo.src.medium;
    }
  } catch (error) {
    console.error(`Error searching Pexels:`, error.message);
    return null;
  }
}

async function downloadStartupImages() {
  await createDirectories();

  for (const startup of startups.startups) {
    const industry = startup.industry;
    const queries = IMAGE_QUERIES[industry] || IMAGE_QUERIES['AI/ML'];
    const name = startup.startUpName.toLowerCase().replace(/\s+/g, '-');

    console.log(`Processing ${startup.startUpName}...`);

    // Download logo
    const logoUrl = await searchPexels(queries.logo, 'logo');
    if (logoUrl) {
      await downloadImage(
        logoUrl,
        path.resolve(__dirname, DIRS.logos, `${name}-logo.png`)
      );
    }

    // Download banner
    const bannerUrl = await searchPexels(queries.banner, 'banner');
    if (bannerUrl) {
      await downloadImage(
        bannerUrl,
        path.resolve(__dirname, DIRS.banners, `${name}-banner.png`)
      );
    }

    // Download post image
    const postUrl = await searchPexels(queries.post, 'post');
    if (postUrl) {
      await downloadImage(
        postUrl,
        path.resolve(__dirname, DIRS.posts, `${name}-post.jpg`)
      );
    }

    // Wait to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

// Run the script
downloadStartupImages()
  .then(() => console.log('Image download completed!'))
  .catch(error => console.error('Script failed:', error)); 