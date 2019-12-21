import React, { useContext, useState } from 'react';
import axios from 'axios';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-dates/lib/css/_datepicker.css';
import classNames from 'classnames';
import { FilterContext, FilterActionCreator } from '../../../contexts/Filter';
import { MatchContext } from '../../../contexts/Match';
import { UserContext } from '../../../contexts/User';
import { convertDistrictCode } from '../../../util';
import './index.scss';

const DateTimeFilter = ({ where }) => {
  const filterClass = classNames({
    'match-filter': true,
    'in-match': where === 'match',
  });
  return (
    <div className={filterClass}>
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
    if (newStartTime >= endTime) {
      alert('시작 시간이 종료 시간보다 클 수 없습니다.');
      return;
    }
    filterDispatch(FilterActionCreator.setStartTime(newStartTime));
  };
  const handleEndTimeChange = (time) => {
    const { hour, minute } = time;
    const newEndTime = `${hour}:${minute}`;
    if (newEndTime <= startTime) {
      alert('시작 시간이 종료 시간보다 클 수 없습니다.');
      return;
    }
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

const gql = `
mutation($player: Int, $area: [Area], $date: String, $startTime: String, $endTime: String){
  CreateNotifier(player: $player, area: $area, date: $date, startTime: $startTime, endTime: $endTime){
    seq
    area
    date
    startTime
    endTime
  }
}
`;

// 알림 신청
const NotificationBtn = () => {
  const { filterState } = useContext(FilterContext);
  const { matchState } = useContext(MatchContext);
  const { userState } = useContext(UserContext);

  const getSelectedDistrictArray = (districtInfo) => {
    let newArr = Object.keys(districtInfo).filter(
      (districtCode) => districtInfo[districtCode].isSelected
    );
    if (newArr.length === 0) newArr = undefined;
    return newArr;
  };

  const setNotifier = async () => {
    const selectedArea = getSelectedDistrictArray(matchState.districtInfo);
    if (!userState.playerInfo)
      return alert('로그인한 회원만 알림 신청을 사용할 수 있습니다.');
    if (!selectedArea)
      return alert(
        '알림 신청을 하시려면 최소 한 개 이상의 지역구를 선택하셔야 합니다.'
      );
    const { seq } = userState.playerInfo;
    const requestBody = {
      query: gql,
      variables: {
        player: seq,
        startTime: filterState.startTime,
        endTime: filterState.endTime,
        date: filterState.matchDay.format('YYYY[-]MM[-]DD'),
        area: selectedArea,
      },
    };

    const response = await axios({
      method: 'post',
      url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(requestBody),
    });
    const result = response.data.data.CreateNotifier;
    if (!result) alert('등록이 처리되지 않았습니다. 재시도를 부탁드립니다.');
    const areaInKorean = selectedArea.map((val) => {
      return convertDistrictCode(val);
    });
    const alertMsg = `알림 신청이 정상 등록 되었습니다. 신청하신 날(${
      result.date
    }, ${result.startTime} - ${result.endTime})와 지역(${areaInKorean.join(
      ', '
    )})에 맞는 경기가 올라오면 알려드립니다!  :)`;
    alert(alertMsg);
  };
  return (
    <div className="notification-btn">
      <button type="button" onClick={setNotifier}>
        알림 신청
      </button>
    </div>
  );
};

export default DateTimeFilter;
