import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';


const ResponseWaiting: React.FC = () => {
  const override: CSSProperties = {
    margin: 'auto',
    marginTop: '40px',
  };

  return (
    <div className='waiting-page'>
      <div>Please, wait for server response</div>
      <ClipLoader
        cssOverride={override}
      />
    </div>
  );
}

export default ResponseWaiting;