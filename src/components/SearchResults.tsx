import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { parseCities } from '../utils';
import { requestDistancesCalculation } from '../distanceSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import ResponseWaiting from './ResponseWaiting';
import ResponseError from './ResponseError';

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const citiesQuery = searchParams.get('cities');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers');
  const responseStatus = useAppSelector(state => state.distance.responseStatus) as ('loading' | 'rejected' | 'success');
  const distances = useAppSelector(state => state.distance.distances);
  console.log('responseStatus: ', responseStatus);
  console.log('distances: ', distances);

  const cities = parseCities(citiesQuery);

  useEffect(() => {
    dispatch(requestDistancesCalculation(cities));
  }, []);

  const contentByStatus = {
    loading: <ResponseWaiting />,
    rejected: <ResponseError />,
    success: <div>123</div>,
  };

  return contentByStatus[responseStatus];

  return (
    <div>
      <div className='cities'>
        {cities.map(([city]) => (
          <div key={city}>{city}</div>
        ))}
      </div>

      <div className='link'>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default SearchResults;