import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { DateTimeFilter } from '../../common';
import backgroundImg from '../../../assets/images/background.jpg';
const HomeQuickMatch = () => (
  <div className="home-quick-match">
    <div className="grid-container">
      <div className="home--left">
        <h3 className="home__section-title">
          원하는 일정에 맞는 매치를 찾아보세요!
        </h3>
        <DateTimeFilter />
        <Link to="/match" className="go-match-btn">
          Quick Match!
        </Link>
      </div>
      <div className="home--right background__image">
        <img src={backgroundImg} alt="" />
      </div>
    </div>
  </div>
);

export default HomeQuickMatch;
