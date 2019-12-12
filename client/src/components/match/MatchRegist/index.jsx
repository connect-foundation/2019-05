import React, { useContext } from 'react';
import { MatchContext, MatchActionCreator } from '../../../contexts/Match';
import './index.scss';

const MatchRegist = () => {
  const { matchDispatch } = useContext(MatchContext);
  const handleMatchRegisterBtn = () => {
    matchDispatch(MatchActionCreator.toggleViewMatchRegistModal());
  };

  return (
    <div className="match-register__btn--wrapper">
      <button
        type="button"
        className="match-register__btn"
        onClick={handleMatchRegisterBtn}
      >
        매치 등록
      </button>
    </div>
  );
};

export default MatchRegist;
