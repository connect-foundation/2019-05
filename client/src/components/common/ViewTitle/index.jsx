import React from 'react';
import './index.scss';

const ViewTitle = (props) => {
  const { title } = props;
  return (
    <div className="view-title">
      <span>{title}</span>
    </div>
  );
};

export default ViewTitle;
