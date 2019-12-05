import React, { useContext } from 'react';
import { MatchContext } from '../../../contexts/Match/Context';
import './index.scss';

const MatchRegist = () => {
  const { matchState, dispatch } = useContext(MatchContext);
  const handleMatchRegisterBtn = () => {
    dispatch({
      type: 'TOGGLE_VIEW_MATCH_REGIST_MODAL',
      isViewRegistModal: matchState.isViewRegistModal,
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
