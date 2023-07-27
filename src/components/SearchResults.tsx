import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { requestDistancesCalculation } from '../distanceSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import ResponseWaiting from './ResponseWaiting';
import ResponseError from './ResponseError';
import ResponseSuccess from './ResponseSuccess';
import { parseCities } from '../utils/utils';

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const citiesQuery = searchParams.get('cities');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers');
  const responseStatus = useAppSelector(state => state.distance.responseStatus) as ('loading' | 'rejected' | 'success');
  const distances = useAppSelector(state => state.distance.distances);

  const cities = parseCities(citiesQuery);

  useEffect(() => {
    dispatch(requestDistancesCalculation(cities));
  }, []);

  const contentByStatus = {
    loading: <ResponseWaiting />,
    rejected: <ResponseError />,
    success: <ResponseSuccess cities={cities} date={date} passengers={passengers} distances={distances} />
  };

  return contentByStatus[responseStatus];
}

export default SearchResults;