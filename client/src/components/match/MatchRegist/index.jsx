import React, { useContext } from 'react';
import { MatchContext } from '../../../contexts/Match/Context';
import matchActions from '../../../contexts/Match/Actions';
import './index.scss';

const MatchRegist = () => {
  const { dispatch } = useContext(MatchContext);
  const handleMatchRegisterBtn = () => {
    dispatch({
      type: matchActions.TOGGLE_VIEW_MATCH_REGIST_MODAL,
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
