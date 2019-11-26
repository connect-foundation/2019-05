import React from 'react';

const ViewTitle = (props) => {
  const { title } = props;
  return (
    <div className="view-title">
      <h2>{title}</h2>
    </div>
  );
};

export default ViewTitle;
