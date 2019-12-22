import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { convertDistrictCode } from '../../../util';
import { MatchContext, MatchActionCreator } from '../../../contexts/Match';
import { UserContext } from '../../../contexts/User';
import './index.scss';

const MatchCard = (props) => {
  const { matchInfo } = props;
  const { seq, date, startTime, endTime, host, stadium, area } = matchInfo;
  const { matchDispatch } = useContext(MatchContext);
  const {
    userState: { playerInfo },
  } = useContext(UserContext);

  const checkApplyingList = (sequence, applyingList) => {
    return applyingList.some((val) => val.match.seq === sequence);
  };
  const handleMatchApplyBtn = () => {
    if (!playerInfo) return alert('매치 신청을 위해서는 로그인하셔야 합니다.');
    if (!playerInfo.phone || !playerInfo.email)
      return alert(
        '매치 신청을 위해서는 개인 연락처 정보를 등록하셔야 합니다.'
      );
    if (!playerInfo.team)
      return alert('매치 신청을 하기 위해서는 팀에 등록되어 있어야 합니다.');

    const alreadyApplied = checkApplyingList(
      seq,
      playerInfo.team.onApplyingList
    );

    if (alreadyApplied) return alert('이미 신청한 매치입니다.');

    matchDispatch(MatchActionCreator.toggleViewMatchApplyModal());
    matchDispatch(MatchActionCreator.selectMatchInfo(matchInfo));
  };

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
          <img
            src={
              host.logo === null
                ? '/default_logo.png'
                : `https://kr.object.ncloudstorage.com/quickkick-emblem/${host.logo}`
            }
            alt={host.name}
          />
        </div>
        <div className="team-info__name">{host.name}</div>
      </div>
      <div className="button-box">
        <button
          type="button"
          className="match-apply__btn"
          onClick={handleMatchApplyBtn}
        >
          매치 신청
        </button>
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  matchInfo: PropTypes.shape({
    seq: PropTypes.number.isRequired,
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
