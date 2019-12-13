import React from 'react';
import MDSpinner from 'react-md-spinner';

const FetchLodingView = () => {
  return (
    <div className="spinner-container">
      <MDSpinner size="80px" borderSize="7px" />
    </div>
  );
};

export default FetchLodingView;
