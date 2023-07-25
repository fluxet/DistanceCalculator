import React from 'react';
import { useAppSelector } from '../hook';


const ResponseError: React.FC = () => {
  const errorMessage = useAppSelector(state => state.distance.errorMessage);

  return (
    <div>
      <div>{errorMessage}</div>
    </div>
  );
}

export default ResponseError;