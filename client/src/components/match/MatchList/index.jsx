import React from 'react';
import { Button } from '../../common';
import './index.scss';

const MatchList = () => {
  return (
    <div className="match-list">
      <MatchCard />
    </div>
  );
};

const MatchCard = () => {
  return (
    <div className="match-card">
      <div className="team-info">시발럼아 내가 좋아하면 안되냐</div>
      <div className="button-box">
        <Button> 전적 분석</Button>
        <Button> 매치 신청</Button>
      </div>
    </div>
  );
};

export default MatchList;
