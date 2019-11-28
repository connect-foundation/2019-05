import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const HomeMatchStatus = () => (
  <div className="home-match-status">
    <div className="grid-container">
      <h3 className="home__section-title">현재 대기중인 매치</h3>
      <h6>486건</h6>
      <Link to="/match">
        <button type="button">더 보러 가기</button>
      </Link>
    </div>
  </div>
);

export default HomeMatchStatus;
