import React from 'react';

const Error = ({ errorMsg }) => {
  return (
    <div className='p-2 bg-rose-100 rounded border-2 text-rose-600 border-rose-600 font-medium'>
      {errorMsg}
    </div>
  );
};

export default Error;
