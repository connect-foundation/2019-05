import React, { useContext } from 'react';
import { MatchContext, MatchActions } from '../../../contexts/Match';
import './index.scss';

const MatchRegist = () => {
  const { matchDispatch } = useContext(MatchContext);
  const handleMatchRegisterBtn = () => {
    matchDispatch({
      type: MatchActions.TOGGLE_VIEW_MATCH_REGIST_MODAL,
    });
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
