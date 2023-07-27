import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { TCities, getDistancesFields, getTotalDistance } from '../utils/distanceCalculation';


export interface IResponseSuccessProps {
  cities: TCities;
  distances: number[];
  date: string;
  passengers: string;
}

const ResponseSuccess: React.FC<IResponseSuccessProps> = ({ cities, date, passengers, distances }) => {
  console.log('distances: ', distances);
  const distancesFields = getDistancesFields(distances);
  const totalDistance = getTotalDistance(distances);
  const passengersContent = (+passengers === 1) ? 'passenger' : 'passengers';

  return (
    <div className='search-success'>
      <div className='route'>
        <div className='distances'>
          {distancesFields.map((distance) => <div className='item' key={_.uniqueId()}>{distance}</div>)}
        </div>

        <div className='cities'>
          {cities.map(([city]) => (
            <div className='item' key={city}>{city}</div>
          ))}
        </div>
      </div>

      <div className='conclusions'>
        <div><span className='bold'>{`${totalDistance} km`}</span>is total distance</div>
        <div><span className='bold'>{passengers}</span>{passengersContent}</div>
        <div className='bold'>{date}</div>
      </div>

      <div className='link-back'>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default ResponseSuccess;