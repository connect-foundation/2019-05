import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-dates/lib/css/_datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getDistrict } from '../../../util';

import { MatchContext, MatchActionCreator } from '../../../contexts/Match';
import { UserContext } from '../../../contexts/User';

import TextInputSection from '../../sidebar/TextInputSection';

import './index.scss';

const SEOUL_DISTRICT = getDistrict();

const gql = `
mutation ($host: Int, $author: String, $stadium: String, $area: Area, $date: String, $startTime: String, $endTime: String, $address: String, $etc: String){
  CreateMatch(host: $host, author: $author, stadium: $stadium, area: $area, date: $date, startTime: $startTime, endTime: $endTime, description: $etc, address: $address){
    seq
    host{
      name
    }
    author {
      name
    }
    stadium
    area
    date
    startTime
    endTime
    address
    description
  }
}
`;

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
  const { matchDispatch } = useContext(MatchContext);
  const handleCloseBtn = () => {
    matchDispatch(MatchActionCreator.toggleViewMatchRegistModal());
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
  const { matchDispatch } = useContext(MatchContext);
  const { userState } = useContext(UserContext);
  const [matchDate, setMatchDate] = useState(moment());
  const formRef = useRef();
  const makeFormData = () => {
    return new FormData(formRef.current);
  };
  const validateFormData = (formdata) => {
    const startTime = formdata.get('matchRegistStartTime');
    const endTime = formdata.get('matchRegistEndTime');
    if (startTime >= endTime)
      return '시작 시간이 끝나는 시간보다 늦을 수 없습니다.';
    return false;
  };
  const fetchToCreateMatch = async () => {
    const registerData = makeFormData();
    const validationMessage = validateFormData(registerData);
    if (validationMessage) return alert(validationMessage);
    const fetchBody = {
      query: gql,
      variables: {
        host: userState.playerInfo.team.seq,
        author: userState.playerInfo.playerId,
        stadium: sanitizeHtml(registerData.get('matchStadium')),
        area: sanitizeHtml(registerData.get('matchRegistDistrict')),
        date: sanitizeHtml(registerData.get('matchRegistDate')),
        startTime: sanitizeHtml(registerData.get('matchRegistStartTime')),
        endTime: sanitizeHtml(registerData.get('matchRegistEndTime')),
        address: sanitizeHtml(registerData.get('matchAddress')),
        etc: sanitizeHtml(registerData.get('matchEtc')),
      },
    };
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    };
    const data = await fetch(
      process.env.REACT_APP_GRAPHQL_ENDPOINT,
      fetchOption
    );
    const result = await data.json();

    if (result.error) return false;
    formRef.current.reset();
    return result.data.CreateMatch;
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();
    const result = await fetchToCreateMatch();
    if (!result) return alert('업로드가 실패하였습니다.');

    alert('신규 매치를 등록하였습니다.');
    matchDispatch(MatchActionCreator.toggleViewMatchRegistModal());
  };
  return (
    <form
      className="modal-form"
      onSubmit={submitEventHandler}
      name="matchRegisterForm"
      id="matchRegisterForm"
      ref={formRef}
    >
      <div className="input-container">
        <DistrictSection />
        <DateSection matchDate={matchDate} setMatchDate={setMatchDate} />
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
        className="register__select register__input"
      >
        {Object.entries(SEOUL_DISTRICT).map(([code, district]) => {
          return (
            <option key={code} value={code}>
              {district.KOR_NAME}
            </option>
          );
        })}
      </select>
      <label
        htmlFor="matchRegistDistrict"
        className="register__label has-default-value"
      >
        지역
      </label>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
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
        className="register__label has-default-value"
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
        <p className="match-register__label">시작시각</p>
        <TimePicker
          time={startTime}
          onTimeChange={(time) => handleTimeChange(time, setStartTime)}
          theme="classic"
        />
        <input
          type="hidden"
          id="matchRegistStartTime"
          name="matchRegistStartTime"
          value={startTime}
        />
      </div>
      <div className="time-section end-time">
        <p className="match-register__label">종료시각</p>
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

export default MatchRegistModal;
