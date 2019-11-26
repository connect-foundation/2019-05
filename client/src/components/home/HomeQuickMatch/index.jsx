import React from 'react';
import './index.scss';
import { MatchFilter } from '../../common';

const HomeQuickMatch = () => (
  <div className="home-quick-match">
    <div className="grid-container">
      <div>원하는 조건의 매치를 찾아보세요!</div>
      <MatchFilter />
    </div>
  </div>
);

export default HomeQuickMatch;
