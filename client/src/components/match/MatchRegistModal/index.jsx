import React, { useState } from 'react';

import './index.scss';

const seoulDistrict = [
  { korName: '종로구', engName: 'CNO' },
  { korName: '중  구', engName: 'CGS' },
  { korName: '용산구', engName: 'YSN' },
  { korName: '성동구', engName: 'SDG' },
  { korName: '광진구', engName: 'KJI' },
  { korName: '동대문구', engName: 'TDM' },
  { korName: '중랑구', engName: 'CNG' },
  { korName: '성북구', engName: 'SBK' },
  { korName: '강북구', engName: 'KBK' },
  { korName: '도봉구', engName: 'TBG' },
  { korName: '노원구', engName: 'NWN' },
  { korName: '은평구', engName: 'UPG' },
  { korName: '서대문구', engName: 'SDM' },
  { korName: '마포구', engName: 'MPO' },
  { korName: '양천구', engName: 'YGC' },
  { korName: '강서구', engName: 'KSS' },
  { korName: '구로구', engName: 'KRO' },
  { korName: '금천구', engName: 'KCN' },
  { korName: '영등포구', engName: 'YDP' },
  { korName: '동작구', engName: 'TJK' },
  { korName: '관악구', engName: 'KNK' },
  { korName: '서초구', engName: 'SCO' },
  { korName: '강남구', engName: 'KNM' },
  { korName: '송파구', engName: 'SPA' },
  { korName: '강동구', engName: 'KDG' },
];

const MatchRegistModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleCloseBtn = () => {
    setIsVisible(false);
  };
  const toggleModalVisible = () => {
    return isVisible ? 'visible' : '';
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
  return (
    <div className="modal-header">
      <div className="title">
        <p>매치 등록</p>
      </div>
      <div className="close-btn">
        <button type="button">X</button>
      </div>
    </div>
  );
};

const ModalForm = () => {
  return (
    <form className="modal-form">
      <DistrictSection />
      <TimeSection />
      <AddressSection />
      <EtcSection />
      <button type="submit" className="submit-btn">
        <p>등록하기</p>
      </button>
    </form>
  );
};

const DistrictSection = () => {
  return (
    <div className="district-section">
      <p className="district-title">지역 :</p>
      <select name="district">
        {seoulDistrict.map((district) => {
          return (
            <option key={district.engName} value={district.engName}>
              {district.korName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const TimeSection = () => {
  return (
    <div className="time-section">
      <p className="time-title">시간 :</p>
      <input type="date" />
      <input type="time" />
    </div>
  );
};

const AddressSection = () => {
  return (
    <div className="address-section">
      <p className="address-title">주소 :</p>
      <input type="text" />
    </div>
  );
};

const EtcSection = () => {
  return (
    <div className="etc-section">
      <p className="etc-title">비고 :</p>
      <input
        type="text"
        maxLength="50"
        placeholder="간단히 추가할 내용(50자)"
      />
    </div>
  );
};

export default MatchRegistModal;
