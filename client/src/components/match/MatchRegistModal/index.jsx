import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-dates/lib/css/_datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getDistrict } from '../../../util';

import { MatchContext } from '../../../contexts/Match/Context';
import './index.scss';

const SEOUL_DISTRICT = getDistrict();

const MatchRegistModal = () => {
  const { matchState } = useContext(MatchContext);

  const toggleModalVisible = () => {
    return matchState.isViewRegistModal ? 'visible' : '';
  };

  return (
    <div className={`match-regist-modal ${toggleModalVisible()}`}>
      <div className="modal-container">
        <ModalHeader />
        <ModalForm />
      </div>
      <div className="modal-background" />
    </div>
  );
};

const ModalHeader = () => {
  const { matchState, dispatch } = useContext(MatchContext);
  const handleCloseBtn = () => {
    dispatch({
      type: 'TOGGLE_VIEW_MATCH_REGIST_MODAL',
      isViewRegistModal: matchState.isViewRegistModal,
    });
  };

  return (
    <div className="modal-header">
      <div className="title">
        <p>매치 등록</p>
      </div>
      <div className="close-btn">
        <button type="button" onClick={handleCloseBtn}>
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        </button>
      </div>
    </div>
  );
};

const ModalForm = () => {
  return (
    <form className="modal-form">
      <div className="input-container">
        <DistrictSection />
        <DateSection />
      </div>
      <TimeSection />
      <TextInputSection
        title="구장"
        idText="matchStadium"
        required={Boolean(true)}
      />
      <TextInputSection
        title="주소"
        idText="matchAddress"
        required={Boolean(false)}
      />
      <TextInputSection
        title="비고"
        idText="matchEtc"
        required={Boolean(false)}
        maxlen="50"
      />
      <button type="submit" className="submit-btn">
        등록하기
      </button>
    </form>
  );
};

const DistrictSection = () => {
  return (
    <div className="district-section input-box">
      <select
        id="matchRegistDistrict"
        name="matchRegistDistrict"
        className="match-register__select match-register__input"
      >
        {Object.entries(SEOUL_DISTRICT).map(([code, district]) => {
          return (
            <option key={code} value={district.KOR_NAME}>
              {district.KOR_NAME}
            </option>
          );
        })}
      </select>
      <label
        htmlFor="matchRegistDistrict"
        className="match-register__label has-default-value"
      >
        지역
      </label>
    </div>
  );
};

const DateSection = () => {
  const [focused, setFocused] = useState(false);
  const [matchDay, setMatchDay] = useState(moment());
  const handleDateChange = (date) => setMatchDay(date);

  return (
    <div className="date-section input-box">
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={(date) => handleDateChange(date)}
        onFocusChange={() => setFocused(!focused)}
        focused={focused}
        date={matchDay}
        id="matchRegistDate"
        displayFormat="YYYY-MM-DD"
        required
      />
      <label
        htmlFor="matchRegistDate"
        className="match-register__label has-default-value"
      >
        날짜
      </label>
    </div>
  );
};

const TimeSection = () => {
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const handleTimeChange = (time, fn) => {
    const { hour, minute } = time;
    fn(`${hour}:${minute}`);
  };
  return (
    <div className="time-container">
      <div className="time-section start-time">
        <p className="match-register__label">시작시간</p>
        <TimePicker
          time={startTime}
          onTimeChange={(time) => handleTimeChange(time, setStartTime)}
          theme="classic"
        />
        <input type="hidden" id="matchRegistStartTime" value={startTime} />
      </div>
      <div className="time-section end-time">
        <p className="match-register__label">종료시간</p>
        <TimePicker
          time={endTime}
          onTimeChange={(time) => handleTimeChange(time, setEndTime)}
          theme="classic"
        />
        <input
          type="hidden"
          id="matchRegistEndTime"
          name="matchRegistEndTime"
          value={endTime}
        />
      </div>
    </div>
  );
};

const TextInputSection = ({ title, idText, maxlen, required }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const handleBlurEvent = () => {
    return value !== '' ? setLabel('active') : setLabel('');
  };
  return (
    <div className="input-box">
      <input
        type="text"
        id={idText}
        name={idText}
        maxLength={maxlen === undefined ? 255 : maxlen}
        className="match-register__input"
        onInput={(e) => setValue(e.target.value)}
        onFocus={() => setLabel('active')}
        onBlur={() => handleBlurEvent()}
        autoComplete="off"
        required={required}
      />
      <label htmlFor={idText} className={`match-register__label ${label}`}>
        {title}
      </label>
    </div>
  );
};

TextInputSection.propTypes = {
  title: PropTypes.string.isRequired,
  idText: PropTypes.string.isRequired,
  maxlen: PropTypes.string,
  required: PropTypes.bool,
};
TextInputSection.defaultProps = {
  maxlen: undefined,
  required: false,
};
export default MatchRegistModal;
