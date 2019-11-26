import React from 'react';
import './index.scss';

const MatchFilter = () => {
  return (
    <div className="match-filter">
      <RegionFilter />
      <TimePicker />
      <RankSwitch />
      <NotificationBtn />
    </div>
  );
};

// 지역 필터
const RegionFilter = () => {
  return <div>regionfilter</div>;
};

// 일시
const TimePicker = () => {
  return <div>timepicker</div>;
};

// 랭킹 토글
const RankSwitch = () => {
  return <div>rankswitch</div>;
};

// 알림 신청
const NotificationBtn = () => {
  return <div>NotificationBtn</div>;
};
export default MatchFilter;
