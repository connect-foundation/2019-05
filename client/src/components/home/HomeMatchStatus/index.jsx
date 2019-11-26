import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const HomeMatchStatus = () => (
  <div className="home-match-status">
    <div className="grid-container">
      <div>현재 대기중인 매치</div>
      <div>486건</div>
      <Link to="/match">
        <button type="button">더 보러 가기</button>
      </Link>
    </div>
  </div>
);

export default HomeMatchStatus;
