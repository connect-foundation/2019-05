import React, { useContext, useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-dates/lib/css/_datepicker.css';
import Switch from 'react-switch';
import { FilterContext } from '../../../contexts/Filter/Context';
import './index.scss';

const DateTimeFilter = () => {
  return (
    <div className="match-filter">
      <DatePicker />
      <TimeRangePicker />
      {/* <RankSwitch /> */}
      <NotificationBtn />
    </div>
  );
};

const DatePicker = () => {
  const [focused, setFocused] = useState(false);
  const { filterState, dispatch } = useContext(FilterContext);
  const handleChange = (date) => {
    dispatch({
      type: 'SET_MATCH_DAY',
      payload: date,
    });
  };

  return (
    <div className="date-picker">
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={(date) => handleChange(date)}
        onFocusChange={() => setFocused(!focused)}
        focused={focused}
        date={filterState.matchDay}
        displayFormat="YYYY-MM-DD"
      />
    </div>
  );
};

const TimeRangePicker = () => {
  const { filterState, dispatch } = useContext(FilterContext);
  const { startTime, endTime } = filterState;

  const handleStartTimeChange = (time) => {
    const { hour, minute } = time;
    dispatch({
      type: 'SET_START_TIME',
      payload: `${hour}:${minute}`,
    });
  };
  const handleEndTimeChange = (time) => {
    const { hour, minute } = time;
    dispatch({
      type: 'SET_END_TIME',
      payload: `${hour}:${minute}`,
    });
  };

  return (
    <div className="time-range-picker">
      <TimePicker
        time={startTime}
        onTimeChange={(time) => handleStartTimeChange(time)}
        theme="classic"
      />
      ~
      <TimePicker
        time={endTime}
        onTimeChange={(time) => handleEndTimeChange(time)}
        theme="classic"
      />
    </div>
  );
};

// 랭킹 토글
const RankSwitch = () => {
  const { filterState, dispatch } = useContext(FilterContext);
  const handleChange = () => dispatch({ type: 'SET_SIMILER_RANK' });

  return (
    <div className="rank-switch">
      <Switch
        onChange={handleChange}
        checked={filterState.isSimilerRank}
        onColor="#5CAEAE"
      />
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

export default DateTimeFilter;
