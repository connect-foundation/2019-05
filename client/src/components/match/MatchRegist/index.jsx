import React, { useContext } from 'react';
import { MatchContext } from '../../../contexts/Match/Context';

const MatchRegist = () => {
  const { matchState, dispatch } = useContext(MatchContext);
  const handleMatchRegistBtn = () => {
    dispatch({
      type: 'TOGGLE_VIEW_MATCH_REGIST_MODAL',
      isViewRegistModal: matchState.isViewRegistModal,
    });
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
