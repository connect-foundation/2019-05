import React, { useContext, useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Switch from 'react-switch';
import { FilterContext } from '../../../contexts/Filter/Context';
import setFilterContext from '../../../contexts/Filter/setContext';
import './index.scss';

const MatchFilter = () => {
  return (
    <div className="match-filter">
      <RegionPicker />
      <TimePicker />
      <RankSwitch />
      <NotificationBtn />
    </div>
  );
};

const CheckBox = ({ title, value, onChange }) => (
  <div className="checkbox">
    <input type="checkbox" checked={value} onChange={onChange} />
    <span>{title}</span>
  </div>
);

// 지역 필터
const RegionPicker = () => {
  const [filterState, setFilterState] = useContext(FilterContext);

  const regions = [
    {
      title: '서남',
      isChecked: filterState.isCheckedSN,
      handleOnChange: setFilterContext.setCheckedSN.bind(null, setFilterState),
    },
    {
      title: '서북',
      isChecked: filterState.isCheckedSB,
      handleOnChange: setFilterContext.setCheckedSB.bind(null, setFilterState),
    },
    {
      title: '동북',
      isChecked: filterState.isCheckedDB,
      handleOnChange: setFilterContext.setCheckedDB.bind(null, setFilterState),
    },
    {
      title: '동남',
      isChecked: filterState.isCheckedDN,
      handleOnChange: setFilterContext.setCheckedDN.bind(null, setFilterState),
    },
  ];
  return (
    <div className="region-picker">
      {regions.map((region) => (
        <CheckBox
          key={region.title}
          title={region.title}
          value={region.isChecked}
          onChange={region.handleOnChange}
        />
      ))}
    </div>
  );
};

// 일시
const TimePicker = () => {
  const [focused, setFocused] = useState(false);
  const [filterState, setFilterState] = useContext(FilterContext);
  // const handle = setFilterContext.choiceMatchDay.bind(null, setState, {
  //   matchDay: 1,
  // });
  const handleChange = setFilterContext.setMatchDay.bind(null, setFilterState);
  return (
    <div className="time-picker">
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={(date) => handleChange({ matchDay: date })}
        onFocusChange={() => setFocused(!focused)}
        focused={focused}
        date={filterState.matchDay}
      />
    </div>
  );
};

// 랭킹 토글
const RankSwitch = () => {
  const [filterState, setFilterState] = useContext(FilterContext);
  const handleChange = setFilterContext.setSimilerRank.bind(
    null,
    setFilterState
  );

  return (
    <div className="rank-switch">
      <Switch onChange={handleChange} checked={filterState.isSimilerRank} />
    </div>
  );
};

// 알림 신청
const NotificationBtn = () => {
  return (
    <div className="notification-btn">
      <button type="button">알림 신청</button>
    </div>
  );
};

export default MatchFilter;
