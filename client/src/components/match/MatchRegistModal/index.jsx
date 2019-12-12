import React, { useContext, useState, useRef, forwardRef } from 'react';
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

import { MatchContext, MatchActions } from '../../../contexts/Match';
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
  const { matchState, matchDispatch } = useContext(MatchContext);
  const handleCloseBtn = () => {
    matchDispatch({
      type: MatchActions.TOGGLE_VIEW_MATCH_REGIST_MODAL,
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
  const [matchDate, setMatchDate] = useState(moment());
  const matchInputRef = {
    area: useRef(),
    startTime: useRef(),
    endTime: useRef(),
    stadium: useRef(),
    address: useRef(),
    etcRef: useRef(),
  };

  const submitEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="modal-form"
      onSubmit={submitEventHandler}
      name="matchRegisterForm"
      id="matchRegisterForm"
    >
      <div className="input-container">
        <DistrictSection ref={matchInputRef.area} />
        <DateSection matchDate={matchDate} setMatchDate={setMatchDate} />
      </div>
      <TimeSection ref={matchInputRef} />
      <TextInputSection
        title="구장"
        idText="matchStadium"
        required={Boolean(true)}
        ref={matchInputRef.stadium}
      />
      <TextInputSection
        title="주소"
        idText="matchAddress"
        required={Boolean(false)}
        ref={matchInputRef.address}
      />
      <TextInputSection
        title="비고"
        idText="matchEtc"
        required={Boolean(false)}
        maxlen="50"
        ref={matchInputRef.etcRef}
      />
      <button type="submit" className="submit-btn">
        등록하기
      </button>
    </form>
  );
};

const DistrictSection = forwardRef((props, ref) => {
  return (
    <div className="district-section input-box">
      <select
        id="matchRegistDistrict"
        name="matchRegistDistrict"
        className="match-register__select match-register__input"
        ref={ref}
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
});

const DateSection = ({ matchDate, setMatchDate }) => {
  const [focused, setFocused] = useState(false);

  const handleDateChange = (date) => setMatchDate(date);

  return (
    <div className="date-section input-box">
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={(date) => handleDateChange(date)}
        onFocusChange={() => setFocused(!focused)}
        focused={focused}
        date={matchDate}
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

const TimeSection = forwardRef((prop, ref) => {
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
        <input
          type="hidden"
          id="matchRegistStartTime"
          value={startTime}
          ref={ref.startTime}
        />
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
          ref={ref.endTime}
        />
      </div>
    </div>
  );
});
const TextInputSection = forwardRef(
  ({ title, idText, maxlen, required }, ref) => {
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
          ref={ref}
        />
        <label htmlFor={idText} className={`match-register__label ${label}`}>
          {title}
        </label>
      </div>
    );
  }
);

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
DateSection.propTypes = {
  matchDate: PropTypes.object.isRequired,
  setMatchDate: PropTypes.func.isRequired,
};

export default MatchRegistModal;
