import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';


const ResponseWaiting: React.FC = () => {
  const override: CSSProperties = {
    margin: 'auto',
  };

  return (
    <div>
      <div>Please, wait for server response</div>
      <ClipLoader
        cssOverride={override}
      />
    </div>
  );
}

export default ResponseWaiting;