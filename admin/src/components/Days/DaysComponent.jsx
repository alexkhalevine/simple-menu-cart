import React from 'react';
import { useStateValue } from '../../contextState';
import Day from '../Day';
import './index.css';

const DaysComponent = () => {
  const [days, dispatch] = useStateValue();

  return (
    <div className="days">

      {
        Object.keys(days).map((dayName, index) => {
          const { open, dishes } = days[dayName]

          return (
            <Day
              key={`${dayName}_${index}`}
              name={dayName}
              open={open}
              dishes={dishes}
            />
          )
        })
      }
    </div>
  )
}

export default DaysComponent;
