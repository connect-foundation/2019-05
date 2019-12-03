import React, { useState } from 'react';

const MatchRegist = () => {
  const handleMatchRegistBtn = () => {
    console.log('매치를 등록하고 싶니!?');
  };

  return (
    <div className="match-regist-btn-wraper">
      <button
        type="button"
        className="match-regist-btn"
        onClick={handleMatchRegistBtn}
      >
        매치 등록
      </button>
    </div>
  );
};

export default MatchRegist;
