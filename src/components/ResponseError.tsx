import React from 'react';
import { useAppSelector } from '../hook';
import { Link } from 'react-router-dom';


const ResponseError: React.FC = () => {
  const errorMessage = useAppSelector(state => state.distance.errorMessage);

  return (
    <div className='error-page'>
      <div>{errorMessage}</div>

      <div className='link-back'>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default ResponseError;