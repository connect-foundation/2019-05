import React, { useContext, useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-dates/lib/css/_datepicker.css';
import { FilterContext, FilterActionCreator } from '../../../contexts/Filter';
import './index.scss';

const DateTimeFilter = ({ where }) => {
  return (
    <div className="match-filter">
      <DatePicker />
      <TimeRangePicker />
      {where === 'match' ? <NotificationBtn /> : null}
    </div>
  );
};

const DatePicker = () => {
  const [focused, setFocused] = useState(false);
  const { filterState, filterDispatch } = useContext(FilterContext);
  const handleChange = (date) => {
    filterDispatch(FilterActionCreator.setMatchDay(date));
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
  const { filterState, filterDispatch } = useContext(FilterContext);
  const { startTime, endTime } = filterState;

  const handleStartTimeChange = (time) => {
    const { hour, minute } = time;
    const newStartTime = `${hour}:${minute}`;
    filterDispatch(FilterActionCreator.setStartTime(newStartTime));
  };
  const handleEndTimeChange = (time) => {
    const { hour, minute } = time;
    const newEndTime = `${hour}:${minute}`;
    filterDispatch(FilterActionCreator.setEndTime(newEndTime));
  };

  return (
    <div className="time-range-picker">
      <TimePicker
        time={startTime}
        onTimeChange={(time) => handleStartTimeChange(time)}
        theme="classic"
      />
      <TimePicker
        time={endTime}
        onTimeChange={(time) => handleEndTimeChange(time)}
        theme="classic"
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
