import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { convertDistrictCode } from '../../../util';
import './index.scss';

const TeamMatchCard = ({ matchInfo, mode }) => {
  const [listActive, listActivator] = useState(false);
  const appliedClass = classNames({
    'applied-team-list': true,
    active: listActive,
  });
  const listRef = useRef();
  const btnClickHandler = () => {
    listRef.current.style.height = listActive
      ? 0
      : `${listRef.current.scrollHeight}px`;
    listActivator(!listActive);
  };

  const hasApplied = mode && matchInfo.appliedLists.length > 0;
  const appliedList = hasApplied ? (
    <div className={appliedClass} ref={listRef}>
      <div className="applied-team-inner">
        <p className="applied-team-title">이 매치에 대결을 신청한 팀 리스트</p>
        <table className="quickkick-table apply-team-table">
          <thead>
            <tr>
              <th>순서</th>
              <th>팀이름</th>
              <th>연락처</th>
              <th>이메일</th>
            </tr>
          </thead>
          <tbody>
            {matchInfo.appliedLists.map((val, idx) => {
              return (
                <tr key={`applied-${val.seq}`}>
                  <td>{idx + 1}</td>
                  <td>{val.team.name}</td>
                  <td>{val.player.phone}</td>
                  <td>{val.player.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
  const buttonDownArrow = hasApplied ? (
    <div className="team-match__btn-container">
      <button
        type="button"
        className="team-match__down-btn"
        onClick={btnClickHandler}
      >
        <FontAwesomeIcon
          icon={listActive ? faChevronUp : faChevronDown}
          size="3x"
        />
      </button>
    </div>
  ) : null;
  return (
    <div className="team-match-info__container">
      <div className="team-match__card">
        <p className="team-match__date">{matchInfo.date}</p>
        <p className="team-match__time">
          {matchInfo.startTime}-{matchInfo.endTime}
        </p>
        <p className="team-match__area">
          {convertDistrictCode(matchInfo.area)}
        </p>
        <p className="team-match__stadium">{matchInfo.stadium}</p>
        {buttonDownArrow}
      </div>
      {appliedList}
    </div>
  );
};

const createUploadMatchList = (list, mode) => {
  if (!list) return null;
  if (list.length === 0)
    return (
      <div className="team-match__no-result">해당하는 경기가 없습니다.</div>
    );
  return list.map((val) => {
    const cardValue = mode === 'upload' ? val : val.match;
    return (
      <TeamMatchCard
        matchInfo={cardValue}
        key={`${mode}-${val.seq}`}
        mode={mode === 'upload'}
      />
    );
  });
};

const TeamMatchList = ({ uploadMatches, applyingMatches }) => {
  const [listMode, setListMode] = useState('upload');
  const matchList = {
    upload: uploadMatches,
    apply: applyingMatches,
  };

  const handleCategoryBtnClick = () => {
    const nextMode = listMode === 'upload' ? 'apply' : 'upload';
    setListMode(nextMode);
  };

  if (!matchList.upload && !matchList.apply) return null;

  const registerClassName = classNames({
    'team-match__category--upload': true,
    active: listMode === 'upload',
  });

  const applyClassName = classNames({
    'team-match__category--apply': true,
    active: listMode === 'apply',
  });
  return (
    <div className="team-match">
      <div className="grid-container">
        <h2>매치 리스트</h2>
        <div className="team-match__category">
          <button
            type="button"
            className={registerClassName}
            onClick={handleCategoryBtnClick}
          >
            내가 등록한 경기
          </button>
          <button
            type="button"
            className={applyClassName}
            onClick={handleCategoryBtnClick}
          >
            내가 신청한 경기
          </button>
        </div>
        <div className="team-match__container">
          {createUploadMatchList(matchList[listMode], listMode)}
        </div>
      </div>
    </div>
  );
};

export default TeamMatchList;
