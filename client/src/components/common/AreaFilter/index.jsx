import React from 'react';
import './index.scss';

const areas = [
  '종로구',
  '중구',
  '용산구',
  '성동구',
  '광진구',
  '동대문구',
  '중랑구',
  '성북구',
  '강북구',
  '도봉구',
  '노원구',
  '은평구',
  '서대문구',
  '마포구',
  '양천구',
  '강서구',
  '구로구',
  '금천구',
  '영등포구',
  '동작구',
  '관악구',
  '서초구',
  '강남구',
  '송파구',
  '강동구',
];

const AreaFilter = () => {
  return (
    <div className="area-filter">
      {areas.map((area, idx) => (
        <CheckBox key={area} title={area} value={!!(idx % 2)} />
      ))}
    </div>
  );
};

const CheckBox = ({ title, value, onChange }) => (
  <div className="checkbox">
    <input type="checkbox" checked={value} onChange={onChange} />
    <span>{title}</span>
  </div>
);

export default AreaFilter;
