import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { DateTimeFilter } from '../../common';

const HomeQuickMatch = () => (
  <div className="home-quick-match">
    <div className="grid-container">
      <div className="home--left">
        <div className="home__section-title">
          <h3>원하는 일정에 맞는 매치를 찾아보세요!</h3>
        </div>
        <DateTimeFilter where="home" />
        <Link to="/match" className="go-match-btn">
          Quick Match!
        </Link>
      </div>
    </div>
  </div>
);

export default HomeQuickMatch;
