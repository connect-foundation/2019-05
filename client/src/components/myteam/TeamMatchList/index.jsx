import React, { useState } from 'react';
import { convertDistrictCode } from '../../../util';
import './index.scss';

const TeamMatchCard = ({ matchInfo, mode }) => {
  const appliedList =
    mode && matchInfo.appliedLists.length > 0 ? (
      <div className="applied-team-list">
        {matchInfo.appliedLists.map((val) => {
          return (
            <div className="applied-team-card">
              <div className="applied-team-info">{val.team.name}</div>
              <div className="applied-team-info">{val.player.phone}</div>
              <div className="applied-team-info">{val.player.email}</div>
            </div>
          );
        })}
      </div>
    ) : null;
  return (
    <div>
      <div className="team-match__card">
        <p className="team-match__date">{matchInfo.date}</p>
        <p className="team-match__time">
          {matchInfo.startTime}-{matchInfo.endTime}
        </p>
        <p className="team-match__area">
          {convertDistrictCode(matchInfo.area)}
        </p>
        <p className="team-match__stadium">{matchInfo.stadium}</p>
      </div>
      {appliedList}
    </div>
  );
};

const TeamMatchList = ({ uploadMatches, applyingMatches }) => {
  const [listMode, setListMode] = useState('upload');
  const createUploadMatchList = (matchList) => {
    if (matchList.length === 0)
      return (
        <div className="team-match__no-result">해당하는 경기가 없습니다.</div>
      );
    return matchList.map((val) => {
      const cardValue = listMode === 'upload' ? val : val.match;
      return (
        <TeamMatchCard
          matchInfo={cardValue}
          key={cardValue.seq}
          mode={listMode === 'upload'}
        />
      );
    });
  };
  const handleCategoryBtnClick = () => {
    const nextMode = listMode === 'upload' ? 'apply' : 'upload';
    setListMode(nextMode);
  };
  const matchList = listMode === 'upload' ? uploadMatches : applyingMatches;
  if (!matchList) return null;
  return (
    <div className="team-match">
      <div className="grid-container">
        <h2>매치 리스트</h2>
        <div className="team-match__category">
          <button
            type="button"
            className={`team-match__category--upload ${
              listMode === 'upload' ? 'active' : ''
            }`}
            onClick={handleCategoryBtnClick}
          >
            내가 등록한 경기
          </button>
          <button
            type="button"
            className={`team-match__category--apply ${
              listMode === 'apply' ? 'active' : ''
            }`}
            onClick={handleCategoryBtnClick}
          >
            내가 신청한 경기
          </button>
        </div>
        <div className="team-match__container">
          {createUploadMatchList(matchList)}
        </div>
      </div>
    </div>
  );
};

export default TeamMatchList;
