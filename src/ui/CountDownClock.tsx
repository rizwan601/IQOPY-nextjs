import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownClock: React.FC = () => {
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setEndDate(new Date("2024/4/16"));
  }, []);

  const time = useTimer({ 
    expiryTimestamp: endDate || new Date(), 
    onExpire: () => console.warn('onExpire called'), 
    autoStart: false 
  });

  useEffect(() => {
    if (endDate) {
      time.restart(endDate);
    }
  }, [endDate]);

  if (!endDate) {
    return null; // or return a placeholder component
  }

  return (
    <>
      <div className="time-count day">
        <span>{time.days}</span>days
      </div>
      <div className="time-count hour">
        <span>{time.hours}</span>hours
      </div>
      <div className="time-count min">
        <span>{time.minutes}</span>mins
      </div>
      <div className="time-count sec">
        <span>{time.seconds}</span>secs
      </div>
    </>
  );
}

export default CountdownClock;