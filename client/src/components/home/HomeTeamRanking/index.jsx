import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const HomeTeamRanking = () => (
  <div className="home-team-ranking">
    <div className="grid-container">
      <h3 className="home__section-title">팀 랭킹을 확인할 수 있습니다!</h3>
      <Link to="/ranking">
        <button type="button">랭킹 보러 가기</button>
      </Link>
    </div>
  </div>
);

export default HomeTeamRanking;
