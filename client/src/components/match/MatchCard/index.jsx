import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common';
import './index.scss';

const MatchCard = (props) => {
  const { matchInfo } = props;
  const { date, startTime, endTime, host, stadium } = matchInfo;
  const month = date.substr(4, 2);
  const day = date.substr(6, 2);
  const year = date.substr(0, 4);
  const start_hour = startTime.substr(0, 2);
  const end_hour = endTime.substr(0, 2);
  const start_minute = startTime.substr(2, 2);
  const end_minute = startTime.substr(2, 2);

  return (
    <div className="match-card">
      <div className="sash">마감임박</div>
      <div className="team-info">
        <div className="team-info__item team-info__item--date">
          <div className="team-info__month">DEC</div>
          <div className="team-info__day">{day}</div>
          <div className="team-info__year">{year}</div>
        </div>
        <div className="team-info__item">
          <div className="team-info__area">서울 남동권 리그</div>
          <div className="team-info__hostname">{host.name} vs ... </div>
          <div className="team-info__stadium">
            {start_hour}:{start_minute} - {end_hour}:{end_minute} @{stadium}
          </div>
        </div>
      </div>
      <div className="button-box">
        <Button className="button button--team "> 매치 신청</Button>
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.shape({
    host: PropTypes.shape({
      seq: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    stadium: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchCard;
