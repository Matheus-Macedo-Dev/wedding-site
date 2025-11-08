import { useState, useEffect } from 'react';

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    
    // Before wedding - countdown
    if (difference > 0) {
      return {
        isMarried: false,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    // After wedding - count up
    const daysSinceWedding = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysSinceWedding / 30);
    const days = daysSinceWedding % 30;
    
    return {
      isMarried: true,
      months,
      days,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
