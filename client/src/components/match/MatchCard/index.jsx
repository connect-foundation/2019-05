import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { convertDistrictCode } from '../../../util';
import './index.scss';
import axios from 'axios';

const MatchCard = (props) => {
  const { matchInfo } = props;
  const { date, startTime, endTime, host, stadium, area } = matchInfo;
  const onClickHandler = async () => {
    const result = await axios.post('http://localhost:4000/mail', {
      matchInfo,
    });
    alert('매치 신청 이메일이 발송되었습니다.');
  };
  if (host.logo === null) host.logo = '/default_logo.png';
  return (
    <div className="match-card">
      <div className="match-info">
        <div className="match-info__area">{convertDistrictCode(area)}</div>
        <div className="match-info__inner">
          <div className="match-info__datetime">
            <h4 className="match-info__date">{date}</h4>
            <p className="match-info__time">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="match-info__stadium">@{stadium}</div>
        </div>
      </div>
      <div className="team-info">
        <div className="team-info__logo">
          <Link to={`/team/${host.seq}`}>
            <img src={host.logo} alt={host.name} />
          </Link>
        </div>
        <div className="team-info__name">
          <Link to={`/team/${host.seq}`}>{host.name}</Link>
        </div>
      </div>
      <div className="button-box">
        <button
          type="button"
          className="match-apply__btn"
          onClick={onClickHandler}
        >
          매치 신청
        </button>
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.shape({
    host: PropTypes.shape({
      seq: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }).isRequired,
    area: PropTypes.string.isRequired,
    stadium: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
};

MatchCard.defaultProps = {};

export default MatchCard;
