import React, { useContext, useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TeamIntroduction = () => {
  const [modState, setModState] = useState(false);

  return <div className="team-introduction"></div>;
};

const EmblemSection = () => {
  return (
    <div className="emblem__container">
      <div className="emblem__image">이미지가 들어갈 자리</div>
    </div>
  );
};

export default TeamIntroduction;
