import { useState, useEffect } from 'react';
import Card from '../components/Card';
import DigitalClock from '../components/DigitalClock';
import sampleStartupsData from '../data/sample_startups.json';
import './Discover.css';

const Discover = () => {
  const [startups, setStartups] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    // Add console log to check startup data
    console.log('Startup data:', sampleStartupsData.startups);
    
    const sortedStartups = [...sampleStartupsData.startups].sort((a, b) => {
      const progressA = (a.totalRaised / a.targetGoal) * 100;
      const progressB = (b.totalRaised / b.targetGoal) * 100;
      return progressB - progressA;
    });

    setStartups(sortedStartups);
  }, []);

  // Calculate countdowns for campaign end dates
  useEffect(() => {
    const calculateTimeLeft = (startup) => {
      // Add console log to check individual startup data
      console.log('Calculating countdown for:', startup);

      if (!startup.campaignDuration) {
        console.log('No campaign duration found for:', startup.startUpName);
        return null;
      }

      const now = new Date();
      // Calculate end date based on foundedDate and campaignDuration
      const startDate = new Date(startup.foundedDate);
      const endDate = new Date(startDate.getTime() + (startup.campaignDuration * 24 * 60 * 60 * 1000));
      
      console.log('Campaign dates:', {
        startDate,
        endDate,
        now,
        startup: startup.startUpName
      });

      if (endDate <= now) {
        console.log('Campaign ended for:', startup.startUpName);
        return { time: 'Campaign ended' };
      }

      const difference = endDate - now;

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      let timeString = '';
      if (days > 0) {
        timeString = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        timeString = `${hours}h ${minutes}m`;
      } else if (minutes > 0) {
        timeString = `${minutes}m`;
      } else {
        timeString = 'Ending now';
      }

      // Calculate percentage of campaign duration remaining
      const totalDuration = startup.campaignDuration * 24 * 60 * 60 * 1000;
      const remainingDuration = difference;
      const percentageRemaining = (remainingDuration / totalDuration) * 100;

      return {
        time: timeString,
        title: 'Campaign ends',
        percentageRemaining: Math.max(0, Math.min(100, percentageRemaining)),
        isUrgent: days <= 3
      };
    };

    const updateAllCountdowns = () => {
      const newCountdowns = {};
      startups.forEach(startup => {
        newCountdowns[startup.startupID] = calculateTimeLeft(startup);
      });
      // Add console log to check countdown calculations
      console.log('Updated countdowns:', newCountdowns);
      setCountdowns(newCountdowns);
    };

    if (startups.length > 0) {
      updateAllCountdowns();
      const timer = setInterval(updateAllCountdowns, 60000);
      return () => clearInterval(timer);
    }
  }, [startups]);

  const handleSort = (sortType) => {
    let sortedStartups = [...startups];
    
    switch (sortType) {
      case 'progress':
        sortedStartups.sort((a, b) => {
          const progressA = (a.totalRaised / a.targetGoal) * 100;
          const progressB = (b.totalRaised / b.targetGoal) * 100;
          return progressB - progressA;
        });
        break;
      case 'raised':
        sortedStartups.sort((a, b) => b.totalRaised - a.totalRaised);
        break;
      case 'goal':
        sortedStartups.sort((a, b) => b.targetGoal - a.targetGoal);
        break;
      case 'ending-soon':
        sortedStartups.sort((a, b) => {
          const timeLeftA = new Date(a.endDate) - new Date();
          const timeLeftB = new Date(b.endDate) - new Date();
          return timeLeftA - timeLeftB;
        });
        break;
      default:
        break;
    }
    
    setStartups(sortedStartups);
  };

  return (
    <div className="discover-container">
      <div className="discover-header" style={{ border: '1px solid blue', padding: '20px' }}>
        <div className="header-left" style={{ border: '1px solid green', padding: '10px' }}>
          <h1>Discover Startups</h1>
          <div style={{ 
            border: '5px solid red', 
            padding: '20px', 
            background: 'yellow',
            margin: '10px'
          }}>
            TEST ELEMENT
            <DigitalClock />
          </div>
        </div>
        <div className="sort-controls">
          <button onClick={() => handleSort('progress')}>Sort by Progress</button>
          <button onClick={() => handleSort('raised')}>Sort by Amount Raised</button>
          <button onClick={() => handleSort('goal')}>Sort by Goal</button>
          <button onClick={() => handleSort('ending-soon')}>Ending Soon</button>
        </div>
      </div>
      <div className="active-campaigns">
        <h2>Active Campaigns</h2>
        <div className="campaign-stats">
          {Object.values(countdowns).map((countdown, index) => {
            if (countdown && countdown.isUrgent) {
              return (
                <div key={index} className="urgent-campaign">
                  <span className="urgent-badge">Ending Soon</span>
                  <span className="countdown-display">{countdown.time}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="cards-grid">
        {startups.map((startup) => (
          <Card
            key={startup.startupID}
            name={startup.startUpName}
            description={startup.shortDescription}
            image={startup.image}
            logo={startup.logo}
            industry={startup.industry}
            location={startup.homeLocation}
            raised={startup.totalRaised}
            goal={startup.targetGoal}
            tags={startup.tagsData}
            countdown={countdowns[startup.startupID]}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover; 