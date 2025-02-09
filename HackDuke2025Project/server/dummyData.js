const generateStartups = () => {
  const industries = [
    'Clean Energy', 'Healthcare', 'Fintech', 'AI', 'Logistics',
    'EdTech', 'AgTech', 'Cybersecurity', 'Biotech', 'Robotics'
  ];
  
  const locations = [
    'San Francisco, CA', 'New York, NY', 'Boston, MA', 'Austin, TX',
    'Seattle, WA', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL',
    'Denver, CO', 'Raleigh, NC'
  ];

  const stages = ['Pre-seed', 'Seed', 'Series A', 'Series B'];
  
  const startups = [];
  
  for(let i = 0; i < 50; i++) {
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const fundingGoal = Math.floor(Math.random() * 5000000) + 500000; // $500k-$5.5M
    const fundingRaised = Math.floor(fundingGoal * (Math.random() * 0.7)); // 0-70% of goal
    const posts = [];
    
    // Generate 2-5 posts per startup
    for(let p = 0; p < Math.floor(Math.random() * 4) + 2; p++) {
      posts.push({
        content: `${industry} innovation update! ${['New partnership', 'Product launch', 'Funding milestone', 'Team expansion'][p % 4]} announced.`,
        image: `./images/post-${Math.floor(Math.random() * 5) + 1}.png`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
        likes: Math.floor(Math.random() * 5000)
      });
    }

    startups.push({
      name: `${['Quantum', 'Nano', 'Smart', 'Eco', 'Bio'][i % 5]}${['Tech', 'Labs', 'Solutions', 'Innovations', 'Systems'][i % 5]} ${industry.split(' ')[0]}`,
      industry,
      shortDescription: `Revolutionizing ${industry.toLowerCase()} through ${['AI-powered', 'blockchain-based', 'sustainable', 'IoT-enabled'][i % 4]} solutions`,
      fundingGoal,
      fundingRaised,
      equity: Math.floor(Math.random() * 15) + 5, // 5-20%
      location: locations[Math.floor(Math.random() * locations.length)],
      stage: stages[Math.floor(Math.random() * stages.length)],
      posts
    });
  }
  
  return startups;
};

module.exports = generateStartups(); 