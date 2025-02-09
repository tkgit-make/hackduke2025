import { useEffect, useState, useRef } from 'react';
import './LoadingScreen.css';
import yoloLogoBlink from '../assets/images/yolo_fund_logo_blink.svg';
import yoloLogoRight from '../assets/images/yolo_fund_logo_right.svg';
import yoloLogoLeft from '../assets/images/yolo_fund_logo_left.svg';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logoState, setLogoState] = useState('right');
  const intervalRef = useRef(null);

  useEffect(() => {
    const sequence = [
      { state: 'right', delay: 500 },
      { state: 'blink', delay: 150 },
      { state: 'left', delay: 500 },
      { state: 'blink', delay: 150 }
    ];
    
    let currentIndex = 0;
    
    const animate = () => {
      const { state, delay } = sequence[currentIndex];
      setLogoState(state);
      
      intervalRef.current = setTimeout(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        animate();
      }, delay);
    };

    animate();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 2.5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
      <img 
        src={
          logoState === 'right' ? yoloLogoRight :
          logoState === 'left' ? yoloLogoLeft :
          yoloLogoBlink
        } 
        alt="Loading..." 
        className="loading-logo"
      />
    </div>
  );
};

export default LoadingScreen; 